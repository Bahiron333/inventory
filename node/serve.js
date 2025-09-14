const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors()); 
app.use(express.json()); 

mongoose.connect('mongodb+srv://miguel:051128@tabla.ll6ecwd.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const clienteSchema = new mongoose.Schema({
  clienteid: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  numero: { type: String, default: "" },
  direccion: { type: String, default: "" },
  nclientes: { type: Number, default: 0 },
  foto: { type: String, default: "" },
  contrasena: { type: String, required: true }
});

clienteSchema.set('toJSON', {
  transform: (doc, ret) => { delete ret.contrasena; return ret; }
});

const Cliente = mongoose.model('Cliente', clienteSchema);

// Login
app.post('/auth/login', async (req, res) => {
  const { correo, contrasena } = req.body;
  if (!correo || !contrasena) return res.status(400).json({ error: "Correo y contraseña son obligatorios" });

  try {
    const cliente = await Cliente.findOne({ correo }).lean();
    if (!cliente) return res.status(404).json({ error: "Cliente no encontrado" });
    if (cliente.contrasena !== contrasena) return res.status(401).json({ error: "Contraseña incorrecta" });
    delete cliente.contrasena;
    return res.json({ success: true, cliente });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));



app.post('/auth/register',(req,res)=>{
    const {data} = req.body;
    console.log(data);
    return res.status(200).json("Los mensaje se cargaron exitosamente")
});

app.post('/auth/register/codigo',(req,res)=>{
    const correo = req.body;
    console.log(correo)
    res.status(200).json("error");
})

app.post('/auth/register/codigo/verificar',(req,res)=>{
  const codigo_res = "123";
  const codigo = req.body.codigo;
  console.log(codigo)
    if(codigo==codigo_res){
        const permiso = true
      res.status(200).json({permiso})
    }else{
        const permiso = false
      res.status(301).json({permiso})
    }
})

//mostrar cliente
app.get('/clientes/:id',(req,res)=>{

    console.log(req.headers['authorization']);
    console.log(req.params.id);

    const clientes = [
        {  
            id:'FS7SDDS949F9wF0FD', 
            nombre:'cosidic S.A.S',
            direccion:'Cra 4 N 43-56 sur',
            representante:'bahiron abraham dueñas jimenez',
            fecha_asociacion:'10/05/2025'     
        },
        {   id:'523', 
            nombre:'datacanter',
            representante: 'Miguel', 
            direccion:'Empresa x',
            fecha_asociacion:'10/05/2025'
        },
          {  
            id:'FS7SDDSr949F9F0FD', 
            nombre:'cosidic S.A.S',
            direccion:'Cra 4 N 43-56 sur',
            representante:'bahiron abraham dueñas jimenez',
            fecha_asociacion:'10/05/2025'     
        },
          {  
            id:'FS7SDfDS949F9F0FD', 
            nombre:'cosidic S.A.S',
            direccion:'Cra 4 N 43-56 sur',
            representante:'bahiron abraham dueñas jimenez',
            fecha_asociacion:'10/05/2025'     
        }

    ]

    const user={
        id: '123',
        role: ['admin'],
    }

    res.status(200).json({clientes,user})

})


//eliminar cliente 
app.delete('/clientes/:id',(req,res)=>{
  res.status(200).json({mensaje:"error al eliminar el cliente"});
});

//crear un cliente 
app.put('/clientes/unirse/:id',(req,res)=>{

  const {codigo} = req.body.codigo
  console.log(codigo);
  empresa={  
            id:'FS7SDfDS949F9F0FD', 
            nombre:'cosidic S.A.S',
            direccion:'Cra 4 N 43-56 sur',
            representante:'bahiron abraham dueñas jimenez',
            fecha_asociacion:'10/05/2025'     
        }
  return res.status(200).json({empresa})
})

app.post('/clientes/create/:id',(req,res)=>{
  const datos = req.body.dataCliente;
    console.log(datos)
    return res.status(200).json("holaa");
});

app.get('/user/:id/cliente/:idcliente/informacion',(req,res)=>{
  const cliente = {
    foto: 'https://www.istockphoto.com/resources/images/PhotoFTLP/P1-regional-iStock-1985150440.jpg',
    nombre: 'cosidic',
    correo: 'prueba@gmail.com',
    direccion: 'Cra 4 #78 -2 norte',
    representante: 'Nombre Segundo Apellido Segundo',
    descripcion: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain,',
    fecha_asociacion: '12/0/2025',
    id: 'FS7SDDS949F9wF0FD',
    codigo: 'DJ8FDS8SF',
    cantidadUsuario:78,
    cantidadActivos: 45
  }

  return res.status(200).json({cliente});
});

app.get('/user/:id/cliente/:idcliente/users',(req,res)=>{

  const users = [
    {
      id:'123',
      foto: 'https://www.istockphoto.com/resources/images/PhotoFTLP/P1-regional-iStock-1985150440.jpg',
      nombre: 'bahiron',
      estado: 'activo',
      departamento: 'IT soporte',
      activos: 12,
      licencias: 26
    },
     {
      id:'231',
      foto: 'https://www.istockphoto.com/resources/images/PhotoFTLP/P1-regional-iStock-1985150440.jpg',
      nombre: 'Miguel',
      estado: 'desactivado',
      departamento: 'Desarrollo',
      activos: 7,
      licencias: 4
    },
     {
      id:'869',
      foto: 'https://www.istockphoto.com/resources/images/PhotoFTLP/P1-regional-iStock-1985150440.jpg',
      nombre: 'Darwin',
      estado: 'activo',
      departamento: 'Anality Data',
      activos: 3,
      licencias: 2
    }
  ]

  console.log("Hola")
  return res.status(200).json({users})
});

app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});
