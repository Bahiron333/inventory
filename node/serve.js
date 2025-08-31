const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡API funcionando!');
});

app.post('/auth/login',(req,res)=>{
    const {data} = req.body;
    console.log(data)
    if(data.correo=="bahiron"){
        return res.status(200).json({token:'123',id:'145'})
    }else{
        return res.status(301).json({mensaje:'Correo no valido'})
    }
    
})

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
      id:'9GFG9GF8F98GF90GFGF90GFG09GFGF09',
      nombre: 'bahiron abraham dueñas jimenez',
      estado: 'Activo',
      departamento: 'Desarrollo en el area de comercio e industrias de la burogracias',
      activos: 124521875648646536522,
      licencias: 1245545646546542136522
    },
     {
      id:'231',
      nombre: 'Miguel',
      estado: 'desactivado',
      departamento: 'Desarrollo',
      activos: 7,
      licencias: 4
    },
     {
      id:'869',
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


app.get('/user/:id/cliente/:idcliente/miembros',(req,res)=>{

  const miembros = [
    {
      id:'9GFG9GwF8F98',
      foto: 'https://www.istockphoto.com/resources/images/PhotoFTLP/P1-regional-iStock-1985150440.jpg',
      nombre: 'bahiron abraham dueñas jimenez',
      estado: 'Activo',
      area: 'Desarrollo en el area de comercio e industrias de la burogracias',
      rol: ['admin'],
      correo: 'bahiron@gmail.com'
    },
        {
      id:'9GFG59GF8F98',
      foto: 'https://www.istockphoto.com/resources/images/PhotoFTLP/P1-regional-iStock-1985150440.jpg',
      nombre: 'bahiron abraham dueñas jimenez',
      estado: 'Activo',
      area: 'Desarrollo en el area de comercio e industrias de la burogracias',
      rol: ['admin'],
      correo: 'bahiron@gmail.com'
    },
        {
      id:'9GFG89GF8F98',
      foto: 'https://www.istockphoto.com/resources/images/PhotoFTLP/P1-regional-iStock-1985150440.jpg',
      nombre: 'bahiron abraham dueñas jimenez',
      estado: 'Activo',
      area: 'Desarrollo en el area de comercio e industrias de la burogracias',
      rol: ['admin'],
      correo: 'bahiron@gmail.com'
    },
  ]

  return res.status(200).json({miembros})
});

app.get('/cliente/:id/miembro/:idMiembro',(req,res)=>{
  const miembro = {
    id: '1223365',
    nombre: 'Bahiron Abraham Dueñas Jimenez',
    correo: 'bahiron39macro@gmail.com',
    estado: 'Activo',
    suspendido: true,
    rol: 'admin',
    area: 'IT soporte',
    permisos: [
      usuarios = {
        ver: true,
        modificar: true,
        eliminar:true
      },
       inventario = {
        ver: true,
        modificar: false,
        eliminar:true
      },
       miembros = {
        ver: true,
        modificar: true,
        eliminar:true
      }
    ]
  }

  return res.status(200).json({miembro});
});

app.put('/cliente/:idCliente/miembro',(req,res)=>{
  console.log(req.body.miembro);
  return res.status(200).json("listo");
});

app.delete('/cliente/:idCliente/miembro/:id_miembro',(req,res)=>{
  res.status(200).json("El miembro fue eliminado exitosamente");
});

app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});