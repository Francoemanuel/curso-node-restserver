const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');

// obtener usuarios
const usuariosGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

//     const usuarios = await Usuario.find()
//         .skip( Number( desde ))
//         .limit( Number( limite )); 
    
//    const total = await Usuario.countDocuments(query);

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip( Number( desde ))
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        usuarios
    });
}

// Crea un usuario
const usuariosPost = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });



    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar e DB
    await usuario.save();

    res.json({
       msg: 'post API',
       usuario
    });
}

const usuariosPut = async(req, res = response) => {
    
    const {id} = req.params;
    const { _id, password, google, correo, ...resto } = req.body;
    // Se desestructura lo que se quiere modificar
    
    //TODO validar contra base de datos
    if ( password ){
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }
    const usuario = await Usuario.findByIdAndUpdate( id, resto, {new: true});
   

    res.json(usuario);
};

const usuariosPatch = (req, res = respuesta) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete =  async(req, res = respuesta) => {

    const { id } = req.params;

    // Fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false});    
    
    res.json(usuario);
};


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}