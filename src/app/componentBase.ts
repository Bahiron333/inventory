import { ActivatedRoute } from "@angular/router";
import { FotoService } from "./services/foto/foto.service";
import { AuthService } from "./services/Auth/auth.service";
import { Location } from "@angular/common";

export class ComponenteBase{

     
    constructor(protected router?:ActivatedRoute, protected fotoService?:FotoService, protected authService?:AuthService, protected location?:Location){
        router?.parent?.paramMap.subscribe(params=>{
            this.id = params.get('id')
            this.idCliente = params.get('idcliente');   
        });
        
    }
    
    //busqueda de elementos
    protected Filtrados(element:any){
        return this.textBuscar != "" ? element.filter((x:any)=>
        x.id.includes(this.textBuscar) ||
        x.nombre.toLowerCase().includes(this.textBuscar.toLocaleLowerCase())
        ) : element;
    }

    protected trackById(index:number, element:any):number{
        return element.id;
    }

    //fotos en los elementos necesarios
    //dar un valor a la foto
    protected Foto(url:any, id?:any){
      if(id==null||id==undefined){
         //si no se encontro la foto, no se sobre escribe
        if(this.foto!="icono-foto.png"){
        this.foto = url;
        }
        return this.foto;
      }else{
        //si no se encontro la foto, no se sobre escribe
        if(this.fotos[id]!="icono-foto.png"){
            this.fotos[id] = url;
        }
            return this.fotos[id];
        }
    }

    Volver = () =>this.location?.back();


    protected textBuscar:any = "";
    protected idCliente:any = ""
    protected id:any = null;
    
    //mostrarFoto
    protected foto:String = "";
    protected fotos:any = [];
    
    //permisos de la cuenta 
    protected permisos:any = null;

}