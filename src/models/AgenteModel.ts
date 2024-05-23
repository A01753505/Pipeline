import {Model} from 'sequelize';
import AgenteController from '../controllers/AgenteController';

interface MascotaAttributes {
    mascotaID:string;
    nombre:string;
    tipo:string;
    color:string;
}

module.exports = (sequelize:any, DataTypes:any) => {
    class Mascota extends Model<MascotaAttributes> implements MascotaAttributes{

        public mascotaID!:string;
        public nombre!:string;
        public tipo!:string;
        public color!:string;

        static associate(models:any){

        }

    }
    Mascota.init({
        mascotaID:{
            type: DataTypes.integer,
            autoIncrement:true,
            primaryKey: true,
            allowNull:false
        },
        nombre:{
            type:DataTypes.STRING,
            allowNull:false
        },
        tipo: {
            type:DataTypes.STRING,
            allowNull:false
        },
        color:{
            type:DataTypes.STRING(30),
            allowNull:false
        }
    },{
        sequelize,
        modelName:'Mascota'
    });
    return Mascota;

}