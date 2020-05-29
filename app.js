//const argv = require("yargs").argv;
const color = require("colors");
const argv = require("./config/yargs").argv;
let comando = argv._[0];

const porHacer = require ("./por-hacer/por-hacer");

switch( comando ){
    case "crear":
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
    break;

    case "listar":
        let listado = porHacer.getListado();

        for ( let tarea of listado){ //Ciclo for basado en cada posicion de el, Muestra cada dato de cada posicion del arreglo
            console.log("========Por Hacer=========".green);
            console.log(tarea.descripcion);
            console.log("Estado: ",tarea.completado);
            console.log("========Por Hacer=========".green);
        }
    break;

    case "actualizar":
        console.log("Actualiza una tarea por hacer")
    break;

    case "borrar":
        let borrado = porHacer.borrar( argv.descripcion );
        console.log(borrado);
    break;

    default: 
    console.log("comando no reconocido");

};