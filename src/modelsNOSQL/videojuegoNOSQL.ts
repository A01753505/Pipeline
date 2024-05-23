import dynamodb from '../services/dynamoService';
import joi from 'joi';
import { PREFIX_NAME } from '../config';


const VideojuegoModel = dynamodb.define('videojuego',{
    hashKey:'videojuegoID',
    timestamps:false,
    schema:{
        videojuegoID: dynamodb.types.uuid(),
		pais: joi.string().required(),
		autor: joi.string().required(),
		version: joi.string().required(),
    },
    tableName:`Videojuego${PREFIX_NAME}`
});


dynamodb.createTables((err:any)=>{
    if(err)
        return console.log('Error al crear la tabla',err);
    console.log('Tabla creada exitosamente');
})

export default VideojuegoModel;