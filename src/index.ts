import Server from './provider/Server';
import {PORT,NODE_ENV} from './config';
import express from 'express';
import cors from 'cors';
import MascotaController from './controllers/MascotaController';
import VideojuegoController from './controllers/VideojuegoController';

const server = new Server({
    port:PORT,
    env:NODE_ENV,
    middlewares:[
        express.json(),
        express.urlencoded({extended:true}),
        cors()
    ],
    controllers:[
        MascotaController.instance,
        VideojuegoController.instance
    ]
});

//Extendiendo la interfaz Request de Express para poder acceder a los datos del usuario
declare global {
    namespace Express {
        interface Request {
            user: string;
            token: string;
        }
    }
}

server.init();