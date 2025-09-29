// serve.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const { MongoClient } = require("mongodb");
const path = require("path");
const multer = require("multer");
const nodemailer = require("nodemailer");
const fs = require("fs");


const app = express();
app.use(cors());

// ✅ Configuración para aceptar bodies grandes
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

mongoose.connect('mongodb+srv://miguel:051128@tabla.ll6ecwd.mongodb.net/test')
  .then(() => console.log('✅ Mongo conectado'))
  .catch(err => console.error('❌ Mongo error', err));

// --- Schema / Modelo para la colección "usuarios" ---
const usuarioSchema = new mongoose.Schema({
  clienteid: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  numero: { type: String, default: "" },
  direccion: { type: String, default: "" },
  nclientes: { type: Number, default: 0 },
  foto: { type: String, default: "" }, // almacenada en Base64 o ruta
  contrasena: { type: String, required: true },
  fechaRegistro: { type: Date, default: Date.now() } // 👈 aquí la clave
},{ versionKey: false });

// --- Schema / Modelo para la colección "Clientes" ---
const clienteSchema = new mongoose.Schema({
  clienteid: { type: String, required: true, unique: true },
  nombre:     { type: String, required: true },
  codigo: { type: String, required: true, unique: true },
  correo:     { type: String, required: true, unique: true },
  numero:     { type: String, default: "" },   
  direccion:  { type: String, default: "" },
  descripcion:{ type: String, default: "" },
  foto:       { type: String, default: "" },   
  fechaRegistro: { type: Date, default: Date.now }
}, { timestamps: true, versionKey: false });
const Cliente = mongoose.model('Cliente', clienteSchema, 'clientes');


// Evitar devolver la contraseña en JSON
usuarioSchema.set('toJSON', {
  transform: (doc, ret) => { delete ret.contrasena, delete ret.createdAt; return ret; }
});

// Forzar que el modelo use la colección 'usuarios'
const Usuario = mongoose.model('Usuario', usuarioSchema, 'usuarios');

// --- Rutas ---
app.get('/', (req, res) => {
  res.send('¡API funcionando!');
});

// Login
app.post('/auth/login', async (req, res) => {
  const { data } = req.body;

  if (!data || !data.correo || !data.contrasena) {
    return res.status(400).json({ error: "Correo y contraseña son obligatorios" });
  }

  try {
    const usuario = await Usuario.findOne({ correo: data.correo });
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    console.log("🔎 Usuario encontrado:", usuario);

    // Tomamos el hash de la BD
    const hash = usuario.contrasena;
    if (!hash) {
      return res.status(500).json({ error: "El usuario no tiene contraseña guardada" });
    }

    // Comparar texto plano con el hash almacenado
    const passwordValida = await bcrypt.compare(data.contrasena, hash);

    console.log("🔑 Contraseña ingresada:", data.contrasena);
    console.log("📂 Hash en BD:", hash);
    console.log("✅ ¿Coincide?", passwordValida);

    if (!passwordValida) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Sacamos el campo de la contraseña para no mandarlo al cliente
    const { contrasena, ...usuarioSinPass } = usuario.toObject();

    return res.status(200).json({
      token: "123456",
      id: usuario._id,
      usuario: usuarioSinPass
    });

  } catch (err) {
    console.error("❌ Error en /auth/login:", err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});


// Registro

// --- Código fijo de prueba ---
const CODIGO_PRUEBA = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;

// --- Configuración Nodemailer ---
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "miguelangelrivera123o@gmail.com",
    pass: "bicovduhpytqzinb"
  }
});

transporter.verify((error, success) => {
  if (error) console.error("❌ Error SMTP:", error);
  else console.log("✅ Gmail listo para enviar correos");
});

// --- Registro de usuario ---

// --- Configuración multer para subir archivos ---
const upload = multer({ dest: "uploads/" });

// --- Registro de usuario ---
app.post("/auth/register", async (req, res) => {
  try {
    const { data } = req.body;  // 🔑 leer datos dentro de "data"
    if (!data) return res.status(400).json({ error: "Datos no enviados" });

    const {
      nombre,
      correo,
      direccion,
      telefono,   // Angular lo manda como "telefono"
      password,   // Angular lo manda como "password"
      foto        // Angular lo manda como string base64
    } = data;

    // Validaciones mínimas
    if (!nombre || !correo || !password) {
      return res.status(400).json({ error: "Nombre, correo y contraseña son obligatorios" });
    }

    // Validar que no exista el correo
    const existe = await Usuario.findOne({ correo }).lean();
    if (existe) {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

    // Normalizar campos opcionales
    const direccionFinal = direccion || "N/A";
    const numeroFinal = telefono || "0000000000";
    const fotoFinal = foto || "default.png";

    // Hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Crear nuevo usuario
    const nuevoUsuario = new Usuario({
      clienteid: new mongoose.Types.ObjectId().toString(), // porque es required
      nombre,
      correo,
      direccion: direccionFinal,
      numero: numeroFinal,
      foto: fotoFinal,
      contrasena: password_hash
    });

    await nuevoUsuario.save();

    res.status(200).json({
      mensaje: "Usuario registrado correctamente ✅",
      usuario: { ...nuevoUsuario.toObject(), contrasena: undefined }
    });

  } catch (err) {
    console.error("❌ Error en registro:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// --- Enviar código de verificación ---
app.post("/enviar-codigo", (req, res) => {
  const { correo } = req.body;
  if (!correo) return res.status(400).json({ error: "Correo es obligatorio" });

  const mailOptions = {
    from: "miguelangelrivera123o@gmail.com",
    to: correo,
    subject: "Código de verificación (PRUEBA)",
    text: `Tu código de verificación es: ${CODIGO_PRUEBA}`,
    html: `<p>Tu código de verificación es: <b>${CODIGO_PRUEBA}</b></p>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return res.status(500).json({ error: "No se pudo enviar el correo", detalle: error.toString() });
    console.log("✅ Correo enviado:", info.response);
    return res.status(200).json({ mensaje: "Código enviado correctamente" });
  });
});

// --- Verificar código ---
app.post('/auth/register/codigo/verificar', (req, res) => {
  const codigoRecibido = req.body.codigo;
  if (parseInt(codigoRecibido) === CODIGO_PRUEBA) {
    return res.status(200).json({ permiso: true });
  } else {
    return res.status(200).json({ permiso: false });
  }
});

module.exports = app;

// --- Otros endpoints de clientes (demo) ---
app.get('/clientes/:id', (req, res) => {
  const clientes = [
    { id: 'FS7SDDS949F9wF0FD', nombre: 'cosidic S.A.S', direccion: 'Cra 4 N 43-56 sur', representante: 'bahiron abraham dueñas jimenez', fecha_asociacion: '10/05/2025' },
    { id: '523', nombre: 'datacanter', representante: 'Miguel', direccion: 'Empresa x', fecha_asociacion: '10/05/2025' }
  ];
  const user = { id: '123', role: ['admin'] };
  res.status(200).json({ clientes, user });
});

app.delete('/clientes/:id', (req, res) => {
  res.status(200).json({ mensaje: "error al eliminar el cliente" });
});

app.put('/clientes/unirse/:id', (req, res) => {
  const codigo = req.body.codigo || null;
  const empresa = { id: 'FS7SDfDS949F9F0FD', nombre: 'cosidic S.A.S' };
  return res.status(200).json({ empresa });
});

// helper local dentro del mismo archivo (no cambia nada fuera)
function generarCodigo(length = 5) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let out = '';
  for (let i = 0; i < length; i++) {
    out += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return out;
}

async function generarCodigoUnico(length = 5) {
  // intenta generar un código que no exista ya en la colección
  for (let intent = 0; intent < 10; intent++) {
    const codigo = generarCodigo(length);
    const existe = await Cliente.findOne({ codigo }).lean();
    if (!existe) return codigo;
  }
  throw new Error('No se pudo generar un código único después de varios intentos');
}

app.post('/clientes/create/:id', async (req, res) => {
  try {
    const { dataCliente } = req.body || {};
    if (!dataCliente) return res.status(400).json({ error: "Faltan datos (dataCliente)" });

    const { nombre, descripcion, direccion, correo, numero, foto } = dataCliente;

    if (!nombre || !correo) {
      return res.status(400).json({ error: "Nombre y correo son obligatorios" });
    }

    // Normalizar campos
    const descripcionFinal = descripcion || "N/A";
    const direccionFinal   = direccion || "N/A";
    const numeroFinal      = numero || "0000000000";

    // Foto
    const fotoFinal = foto || "default.png";

    // 👇 Generar código aleatorio de 5 caracteres
    const generarCodigo = () => {
      return Math.random().toString(36).substring(2, 7).toUpperCase();
    };
    const codigoFinal = generarCodigo();

    // Crear cliente con el código
    const nuevoCliente = new Cliente({
      clienteid: new mongoose.Types.ObjectId().toString(),
      codigo: codigoFinal,  // <-- 👈 aquí se guarda
      nombre,
      descripcion: descripcionFinal,
      direccion: direccionFinal,
      correo,
      numero: numeroFinal,
      foto: fotoFinal
    });

    await nuevoCliente.save();

    return res.status(201).json({
      mensaje: "Cliente creado correctamente ✅",
      cliente: nuevoCliente.toObject()
    });

  } catch (error) {
    console.error("❌ Error en /clientes/create/:id", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
});


  app.get('/user/:id/cliente/:idcliente/informacion', (req, res) => {
    const cliente = {
      foto: 'https://www.istockphoto.com/resources/images/PhotoFTLP/P1-regional-iStock-1985150440.jpg',
      nombre: 'cosidic',
      correo: 'prueba@gmail.com',
      direccion: 'Cra 4 #78 -2 norte',
      representante: 'Nombre Apellido',
      descripcion: 'Long description...',
      fecha_asociacion: '12/0/2025',
      id: 'FS7SDDS949F9wF0FD',
      codigo: 'DJ8FDS8SF',
      cantidadUsuario: 78,
      cantidadActivos: 45
    };
    return res.status(200).json({ cliente });
  });

  app.get('/user/:id/cliente/:idcliente/users', (req, res) => {
    const users = [
      { id: '123', nombre: 'bahiron', estado: 'activo', departamento: 'IT soporte' },
      { id: '231', nombre: 'Miguel', estado: 'desactivado', departamento: 'Desarrollo' }
    ];
    return res.status(200).json({ users });
  });

  app.get('/user/:id/cliente/:idcliente/miembros', (req, res) => {
    const miembros = [
      { id: '9GFG9GwF8F98', nombre: 'bahiron', estado: 'Activo', area: 'Desarrollo...', rol: ['admin'], correo: 'bahiron@gmail.com' }
    ];
    return res.status(200).json({ miembros });
  });

  app.get('/cliente/:id/miembro/:idMiembro', (req, res) => {
    const miembro = {
      id: '1223365',
      nombre: 'Bahiron',
      correo: 'bahiron39macro@gmail.com',
      estado: 'Activo',
      suspendido: true,
      rol: 'admin'
    };
    return res.status(200).json({ miembro });
  });

  app.put('/cliente/:idCliente/miembro', (req, res) => {
    return res.status(200).json("listo");
  });

  app.delete('/cliente/:idCliente/miembro/:id_miembro', (req, res) => {
    res.status(200).json("El miembro fue eliminado exitosamente");
  });

  app.get('/cliente/:idCliente/inventario/activos', (req, res) => {
    return res.status(200).json({ hardware: [], software: [] });
  });

  app.get('/cliente/:idCliente/inventario/:categoria/:tipoActivo', (req, res) => {
    const categoria = req.params.categoria;
    const tipo = req.params.tipoActivo;
    return res.status(200).json({ activo: [] });
  });

  // --- UN SOLO LISTEN ---
  app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
  });

