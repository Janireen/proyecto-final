const express = require("express");

const app = express();
const path = require("path");
const dotenv = require("dotenv")
const hbs = require("hbs");


//configuración de entornos
require("dotenv").config();
const axios = require("axios")



//rutas para importar
const personajesRouter = require("./routes/personajes");
const uploadRouter = require("./routes/uploadRoutes")
const personajeRouter = require("./routes/personaje");

//middleware para servir contenidos estáticos
app.use(express.static(path.join(__dirname, "public")));
//Configuración de vistas
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

//parciales de hbs
hbs.registerPartials(path.join(__dirname, "views", "partials"));



//ruta principal
app.get("/",function (req, res) {
    res.render("index", {
        layout: "layouts/main",
        title: "Mundo de Harry Potter",
        message: "Partió como una simple ídea sobre la historía de un niño mago mientras viajaba en tren de Manchester a Londres en 1990"
    });
});


app.get("/acerca",function (req, res) {
    res.render("acerca", {
        title: "Acerca de nosotros",
        message: "información acerca de nosotros"
    
    })
});

app.get("/contacto",function (req, res) {
    res.send("contacto")
});

//Ruta para mostrar personajes
app.get("/personajes", async (req,res) => {

    try {
     const response = await axios.get("https://hp-api.herokuapp.com/api/characters");
     const characters = response.data;
     res.render("personajes", { characters });
} catch(error) {
    console.error("Error al obtener el personaje, error");
    res.status(500).send("Error al obtener el personaje")
}
});


    
//rutas
app.use("/personajes", personajesRouter);
app.use("/upload", uploadRouter);
app.use("/personaje", personajeRouter);


app.use((req, res, next) => {
    res.status(404).render("error404", {title: "pagina no encotrada"});
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})