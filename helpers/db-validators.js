const Role = require('../models/role');
const {Usuario, Categoria, Producto} = require('../models');

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol){
        throw new Error(`El rol ${ rol } no está registrado enla BD`)
    }
}

    // Verificar si el correo existe
const emailExiste = async(correo = '') => {    
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail){
        throw new Error(`El correo ${ correo } ya esta registrado`)
    }
}

const existeUsuarioPorId = async(id) => {    
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario){
        throw new Error(`El id no existe ${ id } `);
    }
}
/**
 *  Categorias 
 */

const existeCategoriaPorId = async(id) => {
    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria){
        throw new Error(`El id no existe ${ id }`);
    }
}

/**
 *  Productos 
 */

const existeProductoPorId = async(id) => {
    const existeProducto = await Producto.findById(id);
    if(!existeProducto){
        throw new Error(`El id no existe ${ id }`);
    }
}

/**
 *  Validar colecciones permitidas 
 */

const coleccionesPermitidas = ( coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes( coleccion );
    if( !incluida ) {
        throw new Error(`La coleccion ${ coleccion } no es permitida, ${ colecciones }`);
    }
    return true;
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}