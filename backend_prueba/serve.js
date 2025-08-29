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
        return res.status(200).json({token:'123'})
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

app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});