'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientetSchema = Schema({
	name: String,
	apellido: String,
	correo: String,
	numero: String,
});

module.exports = mongoose.model('clientes', ClientetSchema);
// projects  --> guarda los documents en la coleccion