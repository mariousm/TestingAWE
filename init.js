// IMPORTACIÓN
const testing_awe = require("testing-awe");

// Ejecución de la toolkit.
// 1º Generamos el fichero de configuración si éste no está creado.
// 2º Comprobamos que el fichero de configuración es correcto.
// 3º Comprobamos las rutas de los proyectos Electron y Spectron.
// 4ª Generamos los ficheros de la toolkit, por cada HTML encontrado
// dentro de las carpetas de la raíz del proyecto Electron.     
testing_awe.walkDir();