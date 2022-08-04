

const generarJWT   = require('./generar-jwt');
const dbValidator  = require('./db-validators');
const googleVerify = require('./google-verify');
const subirArchivo = require('./subir-archivo');


module.exports = {
    ...generarJWT,  
    ...dbValidator, 
    ...googleVerify,
    ...subirArchivo
}