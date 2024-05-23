import { Request,Response } from "express";
import AbstractController from "./AbstractControllers";
import VideojuegoModel from "../modelsNOSQL/videojuegoNOSQL";


class VideojuegoController extends AbstractController{
    //Singleton
    //Atributo de clase
    private static _instance: VideojuegoController;
    //Metodo de clase
    public static get instance():AbstractController{
        if(!this._instance){
            this._instance = new VideojuegoController("videojuego");
        }
        return this._instance;
    }
    //Declarar todas las rutas del controlador
    protected initRoutes(): void {
        this.router.post('/crearVideojuego',this.postCrearVideojuego.bind(this));
        this.router.get('/consultaVideojuego',this.getConsultaVideojuego.bind(this));
    }

    private async postCrearVideojuego(req: Request,res: Response){
        try{
            console.log(req.body);
            await VideojuegoModel.create(req.body);
            console.log("Videojuego creado");
            res.status(200).send("<h1>Videojuego creado</h1>");
        }catch(err){
            console.log(err);
            res.status(500).send('Internal server error' + err);
        }
    }

    private async getConsultaVideojuego(req: Request,res: Response){
        try{
            const videojuegos = await VideojuegoModel.scan().exec().promise();
            console.log(videojuegos);
            res.status(200).send(videojuegos[0].Items);
        }catch(err){
            console.log(err)
            res.status(500).send('Internal server error' + err);
        }
    }
}

export default VideojuegoController;