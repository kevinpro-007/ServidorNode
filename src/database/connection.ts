import { Sequelize } from "sequelize"


const sequelize = new Sequelize('bp9zm89hyxw7y9qcop4g', 'upwxfbqt37r6viks', 'uCpnsVDDnZuRkVQrEz19',{
    host: 'bp9zm89hyxw7y9qcop4g-mysql.services.clever-cloud.com',
    port: 3306,
    dialect: 'mysql'
   
})
// const sequelize = new Sequelize('pos', 'root', '1004',{
//     host: 'localhost',
//     dialect: 'mysql'
// })
/*

const sequelize = new Sequelize('tramites1', 'root', '54321',{
    host: 'localhost',
    port: 7194,
    dialect: 'mysql'
   
})
const sequelize = new Sequelize('bp9zm89hyxw7y9qcop4g', 'upwxfbqt37r6viks', 'uCpnsVDDnZuRkVQrEz19',{
    host: 'bp9zm89hyxw7y9qcop4g-mysql.services.clever-cloud.com',
    port: 3306,
    dialect: 'mysql'
   
})
*/
export default sequelize