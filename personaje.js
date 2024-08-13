const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const Personaje = require("../models/personajes");
const upload = multer({ dest:"uploads/"});


//Ruta para mostrar todos los personajes
router.get("/", async (req, res) => {
    try{
        const figura = await Personaje.find();//obtiene todos los personajes de la base de datos
        console.log("personaje", Personaje)
        res.render("personaje", { layout : "layout/main", Personaje });// renderiza las vistas de los personajes obtenidos   
    }catch(error){
        console.error("Error al obtener los personajes; ", error);
        res.status(500).send("Hubo un error al obtener los personajes") 
    }
})

// Ruta para mostrar el formulario de carga
router.get("/crear",  (req, res) => {
    res.render("formulario", { layout: "layout/main" });
  });
  
  
  
  //Ruta para manejar la creación de un nuevo personaje
  router.post("/crear", upload.single("imagen")), async (req, res) => {
      const { nombre, edad, casa, rol} = req.body;
      const imagenPath = req.file.path; //Ruta de la imagen guardada en el servidor
      try{
          const nuevoPersonaje = new Personaje({
              nombre,
              edad: parseInt(edad),
              casa,
              rol,
              imagen: imagenPath, //Guarda la ruta de la imagen en la base
          });
          await nuevoPersonaje.save();
          res.render("Figura creado correctamente")
      } catch(error){
          console.error("Error al cargar el personaje: ", error);
          res.status(500).send("Hubo un error al crear el personaje")
  
      }
  }
  
  
  
  
  
  module.exports = router;
  
  