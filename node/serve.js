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

app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});