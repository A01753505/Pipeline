import dynamodb from '../services/dynamoService';
import joi from 'joi';
import { PREFIX_NAME } from '../config';


const UserModel = dynamodb.define('user',{
    hashKey:'awsCognitoId',
    timestamps:true,
    schema:{
        awsCognitoId: joi.string().required(),
		pais: joi.string().required(),
		autor: joi.string().required(),
		version: joi.string().required(),
    },
    tableName:`Videojuego${PREFIX_NAME}`,
    indexes: [
		{
			hashKey: 'email',
			pais: 'EmailIndex',
			type: 'global',
		},
	],
});


dynamodb.createTables((err:any)=>{
    if(err)
        return console.log('Error al crear la tabla',err);
    console.log('Tabla creada exitosamente');
})

export default UserModel;