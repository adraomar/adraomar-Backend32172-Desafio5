const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const Contenedor = require("./managers/contenedorProductos");

const prodService = new Contenedor("productos.txt");

const viewsFolder = path.join(__dirname, "views");

const app = express();

let usuarios = [
    {name:"Pedro", edad:23},
    {name:"Pablo", edad:31}
]

app.listen(8080, () => console.log(`Server listening on port 8080`));
app.use(express.static(__dirname+"/public"));
app.engine("handlebars", handlebars.engine());
app.set("views", viewsFolder);
app.set("view engine", "handlebars");

// Midlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// RUTAS
app.get("/", (req, res) => {
    res.render("home");
})

app.get("/contactos", (req, res) => {
    res.render("contacto");
})

app.get("/usuarios", (req, res) => {
    res.render("usuarios", {
        people:usuarios,
        email:"adra.omar2@gmail.com"
    });
})

app.post("/productos", async (req, res) => {
    const newProducto = req.body;
    console.log(newProducto);
    await prodService.save(newProducto);
    res.redirect("/");
})

app.get("/productos", async (req, res) => {
    const productos = await prodService.getAll();
    res.render("productos", {
        productos: productos
    });
})