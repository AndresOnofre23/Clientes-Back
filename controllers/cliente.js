'use strict'

var Cliente = require('../models/cliente');
var fs = require('fs');
var path = require('path');

var controller = {
	
	home: function(req, res){
		return res.status(200).send({
			message: 'Soy la home'
		});
	},

	test: function(req, res){
		return res.status(200).send({
			message: "Soy el metodo o accion test del controlador de project"
		});
	},

	saveProject: function(req, res){
		var cliente = new Cliente();

		var params = req.body;
		cliente.name = params.name;
		cliente.apellido = params.apellido;
		cliente.correo = params.correo;
		cliente.numero = params.numero;

		cliente.save((err, projectStored) => {
			if(err) return res.status(500).send({message: 'Error al guardar el documento.'});

			if(!projectStored) return res.status(404).send({message: 'No se ha podido guardar el proyecto.'});

			return res.status(200).send({cliente: projectStored});
		});
	},

	getProject: function(req, res){
		var clienteid = req.params.id;

		if(clienteid == null) return res.status(404).send({message: 'El proyecto no existe.'});

		Cliente.findById(clienteid, (err, cliente) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!cliente) return res.status(404).send({message: 'El proyecto no existe.'});

			return res.status(200).send({
				cliente
			});

		});
	},

	getProjects: function(req, res){

		Cliente.find({}).sort('-year').exec((err, clientes) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!clientes) return res.status(404).send({message: 'No hay clientes que mostrar.'});

			return res.status(200).send({clientes});
		});

	},

	updateProject: function(req, res){
		var clienteid = req.params.id;
		var update = req.body;

		Cliente.findByIdAndUpdate(clienteid, update, {new:true}, (err, projectUpdated) => {
			if(err) return res.status(500).send({message: 'Error al actualizar'});

			if(!projectUpdated) return res.status(404).send({message: 'No existe el proyecto para actualizar'});

			return res.status(200).send({
				cliente: projectUpdated
			});
		});

	},

	deleteProject: function(req, res){
		var clienteid = req.params.id;

		Cliente.findByIdAndRemove(clienteid, (err, projectRemoved) => {
			if(err) return res.status(500).send({message: 'No se ha podido borrar el proyecto'});

			if(!projectRemoved) return res.status(404).send({message: "No se puede eliminar ese proyecto."});

			return res.status(200).send({
				cliente: projectRemoved
			});
		});
	},



};

module.exports = controller;