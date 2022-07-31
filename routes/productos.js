const { Router } = require('express'); 
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { obtenerProductos, 
        obtenerProducto,
        crearProducto,
        actualizarProducto,
        borrarProducto
        } = require('../controllers/productos');

const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');

const router = Router();

// Obtener todas las categorias - publico
router.get('/', obtenerProductos);

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
], obtenerProducto);

// Crear producto - privado - cualquier persona con un token válido
router.post('/', [ 
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], crearProducto );

// Actualizar - privado - cualquiera con token valido
router.put('/:id',[
    validarJWT,
    //check('categoria','No es un id de Mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], actualizarProducto);

// Borrar una coregoria - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mong valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],borrarProducto); 
   


module.exports = router;


