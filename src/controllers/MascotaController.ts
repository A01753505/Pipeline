import { Request,Response } from "express";
import AbstractController from "./AbstractControllers";
import db from "../models";


class MascotaController extends AbstractController{
    //Singleton
    //Atributo de clase
    private static _instance: MascotaController;
    //Metodo de clase
    public static get instance():AbstractController{
        if(!this._instance){
            this._instance = new MascotaController("mascota");
        }
        return this._instance;
    }
    //Declarar todas las rutas del controlador
    protected initRoutes(): void {
        this.router.post('/crearMascota',this.postCrearMascota.bind(this));
        this.router.get('/consultar',this.getConsultarMascotas.bind(this));
    }

    private async postCrearMascota(req: Request,res: Response){
        try{
            console.log(req.body);
            await db.Mascota.create(req.body); //INSERT
            console.log("Mascota creada");
            res.status(200).send("<h1>Mascota creada</h1>");

        }catch(error:any){
            console.log(error);
            res.status(500).send('Internal server error' + error);
        }
    }

    private async getConsultarMascotas(req: Request,res: Response){
        try{
            console.log("Consultar mascotas");
            let mascotas = await db["Mascota"].findAll(); //SELECT * FROM Agente;
            res.status(200).json(mascotas);

        }catch(error:any){
            console.log(error);
            res.status(500).send('Internal server error' + error);
        }
    }
}

export default MascotaController;