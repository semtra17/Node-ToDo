const fs = require("fs");

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);//TRANSFORMA UN OBJETO EN FORMATO JSON

    fs.writeFile("./BaseDeDatos/data.json", data, (err) => {
        if ( err )throw new Error ("No se pudo grabar", err);
    });

    
    
}

const cargarDB = () => {
    //El TRY SIRVE PARA SIEMPRE MANEJAR EL ERRO RPOR SI LA DATABSE ESTA VACIA Y PODAMOS MANEJAR EL ERROR A PESAR DE ESO
    try{
        
        listadoPorHacer = require("../BaseDeDatos/data.json");// transofrma un archivo JSON EN UN OBJETO JAVASCRIPT
    }catch(err) {
        listadoPorHacer = [];

    }

}


let listadoPorHacer = [];


const crear = (descripcion) => {

    cargarDB();//CARGO LA BASE DE DATOS PARA PODE RMODIFICARLA


    let porHacer = {
        descripcion,
        completado: false,
    };

    listadoPorHacer.push(porHacer);
    guardarDB();//guarda en la base de datos JSON

    return porHacer;

}

const getListado = () =>{
    cargarDB();
    return listadoPorHacer;  


}


const actualizar = (descripcion , completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion)

    if (index >= 0){
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
         return false;
    }
}


const borrar = (descripcion) => {
    cargarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === nuevoListado.length){
        return false;
    }else { 
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
    
    

}

module.exports = {
    crear,
    getListado,
    borrar,
}