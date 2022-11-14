console.log("Script cargado correctamente!");

const template = Handlebars.compile(`
    <ul>
        <li>{{nombre}}</li>
        <li>{{apellido}}</li>
        <li>{{edad}}</li>
        <li>{{correo}}</li>
    </ul>
`);

const html = template({
    nombre: "Omar",
    apellido: "Adra",
    edad: 25,
    correo: "adra.omar2@gmail.com"
});

const html2 = template({
    nombre: "Paula",
    apellido: "Barrionuevo",
    edad: 24,
    correo: "paulabarrion2@gmail.com"
});

const contenedor = document.getElementById("contenedor");
contenedor.innerHTML = html2;

console.log(html);