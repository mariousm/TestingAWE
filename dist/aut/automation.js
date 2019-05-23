"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// IMPORTACIONES
const fs = require("fs");
const fsExtra = require("fs-extra");
const path = require("path");
const parser_1 = require("../parser/parser");
const configuration_1 = require("../config/configuration");
// Método que va a recorrer la estructura src del proyecto Angular/Electron
// Entrada:
//          appElectronPath: ruta del proyecto Angular/Electron
//          appSpectronPath: ruta del proyecto de Spectron
// Salida:
//          
function walkDirSrc(appElectronPath, appSpectronPath) {
    try {
        fs.readdirSync(appElectronPath).forEach(dirFile => {
            let electronOutPath = path.join(appElectronPath, dirFile); // Ruta para el recorrido en el proyecto Angular/Electron
            let relativePath = path.relative(appElectronPath, electronOutPath); // Obtenemos la ruta relativa desde el proyecto Electron padre hasta cada uno de los hijos
            let spectronOutPath = path.resolve(appSpectronPath, relativePath); // Ruta para el recorrido en el proyecto Spectron
            if (fs.statSync(electronOutPath).isDirectory()) { // Si es un directorio
                // createDirectory(spectronOutPath) // Creamos el directorio
                walkDirSrc(electronOutPath, spectronOutPath);
            }
            else { // Si es un archivo
                createFile(dirFile, electronOutPath, spectronOutPath); // Creamos el fichero
            }
        });
    }
    catch (error) {
        console.log(error);
    }
}
;
// Método que crea el directorio de forma paralela desde el proyecto Angular/Electron al proyecto Spectron
// USADO SOLO PARA LA CREACIÓN DE LA CARPETA testingAWE en el proyecto Spectron
// Entrada:
//          spectronPath: ruta del proyecto Spectron
// Salida:
//          generación del directorio
function createDirectory(spectronPath) {
    try {
        if (fs.existsSync(spectronPath)) { // Si exite el directorio lo borramos, ya que de lo contrario da Error
            fsExtra.emptyDirSync(spectronPath); // Borra todo lo que haya dentro menos el propio directorio
            // fs.rmdirSync(spectronPath); // Borra el directorio, una vez que hemos borrado todo lo que hay dentro
        }
        fsExtra.ensureDirSync(spectronPath); // Resolvemos el appSpectronPath con el path relativo para crear el directorio
    }
    catch (error) {
        console.log(error);
    }
}
// Método que crea el fichero de la toolkit por cada html que encontramos
// Entrada:
//          file: nombre del fichero
//          electronPath: ruta del proyecto Angular/Electron en el que se encuentra el HTML
//          spectronPath: ruta del proyecto Spectron en el que vamos a generar el fichero
// Salida:
//          generación del fichero
function createFile(file, electronPath, spectronPath) {
    try {
        if (path.extname(electronPath) === ".html") { // Generamos el fichero de la toolkit por cada html que hayamos encontrado
            let spectronPathDirectory = ""; // Ruta para la creación del fichero
            let htmlElements = getHtmlElements(); // Todos los elementos html que soporta la librería
            let indexLastSlashWindows = spectronPath.lastIndexOf("\\");
            let indexLastSlashUnix = spectronPath.lastIndexOf("/");
            if (process.platform === "win32") { // Si estamos en Windows
                // Para cambiar el nombre y la extensión del  fichero generado
                spectronPath = spectronPath.slice(0, indexLastSlashWindows + 1) + file.substring(0, file.indexOf(".")) + ".awe.ts";
                spectronPathDirectory = spectronPath.slice(0, indexLastSlashWindows + 1);
            }
            else { // Si estamos en Unix
                // Para cambiar el nombre y la extensión del  fichero generado
                spectronPath = spectronPath.slice(0, indexLastSlashUnix + 1) + file.substring(0, file.indexOf(".")) + ".awe.ts";
                spectronPathDirectory = spectronPath.slice(0, indexLastSlashUnix + 1);
            }
            fsExtra.ensureDirSync(spectronPathDirectory);
            if (fs.existsSync(spectronPath)) { // Si exite el fichero lo borramos, de lo contrario da Error
                fs.unlinkSync(spectronPath);
            }
            parser_1.logicParser(electronPath, spectronPath, htmlElements); // logicParser genera los ficheros
        }
    }
    catch (error) {
        console.log(error);
    }
}
// Método que nos permite determinar si la ruta de la aplicación spectron o electron
// es la raíz del proyecto
// Entrada:
//          appPath: ruta del proyecto Spectron o Electron
// Salida:
//          isCheck: nos permite saber si es correcto o no
function checkAppPath(appPath) {
    let isCheck = false; // Para determinar si la ruta es la raíz del proyecto
    let validations = 0; // Variable para comprobar si cumple todos los requisitos
    try {
        fs.readdirSync(appPath).forEach(dirFile => {
            if (dirFile.toLowerCase().trim() === ("package.json"))
                ++validations; // Es un proyecto que usa npm
        });
        if (validations === 1)
            isCheck = true;
    }
    catch (error) {
        console.log(error);
    }
    return isCheck;
}
// Método que permite determinar si el proyecto Angular/Electron y el proyecto Spectron
// están en la misma carpte, es decir, al mismo nivel
// Entrada:
//          appElectronPath: ruta del proyecto Angular/Electron
//          appSpectronPath: ruta del proyecto Spectron
// Salida:
//          isCheck: nos permite saber si es correcto o no
function checkSameRoot(appElectronPath, appSpectronPath) {
    let isCheck = false; // Para determinar si ambos proyecto están a la misma altura
    let indexLastSlashElectron = 0;
    let indexLastSlashSpectron = 0;
    try {
        if (process.platform === "win32") {
            indexLastSlashElectron = appElectronPath.lastIndexOf("\\");
            indexLastSlashSpectron = appSpectronPath.lastIndexOf("\\");
        }
        else {
            indexLastSlashElectron = appElectronPath.lastIndexOf("/");
            indexLastSlashSpectron = appSpectronPath.lastIndexOf("/");
        }
        appElectronPath = appElectronPath.slice(0, indexLastSlashElectron + 1);
        appSpectronPath = appSpectronPath.slice(0, indexLastSlashSpectron + 1);
        if (appElectronPath === appSpectronPath)
            isCheck = true;
    }
    catch (error) {
        console.log(error);
    }
    return isCheck;
}
// Método que comprueba que exite el directorio pasado por parámetro
// Entrada:
//          path: ruta del directorio
// Salida:
//          isCheck: nos permite saber si existe o no
function checkExistDirectory(path) {
    let isCheck = false;
    try {
        if (fs.existsSync(path))
            isCheck = true;
    }
    catch (error) {
        console.log(error);
    }
    return isCheck;
}
// Método que realiza todas las  validaciones de la automatización
// Entrada:
//          appElectronPath: ruta del proyecto Angular/Electron
//          appSpectronPath: ruta del proyecto Spectron
// Salida:
//          isCheck: nos permite saber si es correcto o no
function check(appElectronPath, appSpectronPath) {
    let isCheck = true;
    try {
        if (checkExistDirectory(appElectronPath)) { // Si existe el directorio del proyecto Electron
            if (checkExistDirectory(appSpectronPath)) { // Si existe el directorio del proyecto Spectron
                if (!checkAppPath(appElectronPath)) { // Comprobamos que el proyecto Electron es válido
                    isCheck = false;
                    console.error("ERROR: compruebe que es un proyecto Electron válido");
                }
                if (!checkAppPath(appSpectronPath)) { // Comprobamos que el proyecto Spectron es válido
                    isCheck = false;
                    console.error("ERROR: compruebe que es un proyecto Spectron válido");
                }
                if (!checkSameRoot(appElectronPath, appSpectronPath)) { // Comprobamos que estamos en el mismo directorio
                    isCheck = false;
                    console.error("ERROR: compruebe que ambos proyectos están en el mismo directorio");
                }
            }
            else {
                isCheck = false;
                console.error("ERROR: el directorio " + appSpectronPath + " no existe");
            }
        }
        else {
            isCheck = false;
            console.error("ERROR: el directorio " + appElectronPath + " no existe");
        }
    }
    catch (error) {
        console.log(error);
    }
    return isCheck;
}
// Método que convierte el path al estilo del sistema operativo que se está ejecutando,
// Entrada:
//          path: ruta a convertir
// Salida:
//          pathUnixWindows: ruta con el formato de Unix
function pathUnixWindows(path) {
    let pathUnixWindows = "";
    try {
        if (process.platform === "win32") { // Si se ejecuta en windows
            if (path.indexOf("/") !== -1) { // Si trae el path de Unix hay que convertir
                for (let i = 0; i < path.length; ++i) {
                    path[i] === "/" ? pathUnixWindows += "\\" : pathUnixWindows += path[i];
                }
            }
            else {
                pathUnixWindows = path;
            }
        }
        else { // Si se ejecuta en Unix
            if (path.indexOf("\\") !== -1) { // Si trae el path de Windows hay que convertir
                for (let i = 0; i < path.length; ++i) {
                    path[i] === "\\" ? pathUnixWindows += "/" : pathUnixWindows += path[i];
                }
            }
            else {
                pathUnixWindows = path;
            }
        }
    }
    catch (error) {
        console.log(error);
    }
    return pathUnixWindows;
}
// Método que devuelve en una lista, los elementos HTML de la librería que están creados
// Entrada:
//
// Salida:
//          htmlElements: lista que contiene los elementos HTML de la librería que están creados
function getHtmlElements() {
    let htmlElements = new Array();
    try {
        let libreryPath = path.join(__dirname, "..", "libraryWIO", "class"); // Ruta donde se encuentran definidas las clases
        let dirFilePath; // Ruta para saber si es un archivo o un directorio
        let file; // Nombre de la clase
        if (checkExistDirectory(libreryPath)) {
            fs.readdirSync(libreryPath).forEach(dirFile => {
                dirFilePath = path.join(libreryPath, dirFile);
                if (fs.statSync(dirFilePath).isFile()) { // Si es un archivo
                    file = dirFile.slice(0, dirFile.indexOf("."));
                    if (!htmlElements.includes(file)) {
                        htmlElements.push(file);
                    }
                }
            });
        }
    }
    catch (error) {
        console.log(error);
    }
    return htmlElements;
}
// Método que va a recorrer la estructura principal del proyecto Angular/Electron
// para detectar si es un proyecto Electron y si tiene la carpeta src
// Entrada:
//          appElectronPath: ruta del proyecto Angular/Electron
//          appSpectronPath: ruta del proyecto Spectron
// Salida:
//          Creación de toda la estructura de carpeta src con los fichero generados
function walkDir() {
    try {
        // Si está creado el fichero de configuración, con sus propiedades de forma correcta
        if (configuration_1.checkAweconfig()) {
            // Obtenemos las rutas de los proyectos del fichero aweconfig.json
            let directories = configuration_1.getProjectPath();
            let appElectronPath = directories[0];
            let appSpectronPath = directories[1];
            // Obtenemos las carpetas a ignorar
            let ignore = configuration_1.getIgnore();
            // Llamo a que convierta el path, para el checkRoot, ya que compruebo todo el string con slash incluidos
            appElectronPath = pathUnixWindows(appElectronPath);
            appSpectronPath = pathUnixWindows(appSpectronPath);
            // Si todas las validaciones son correctas respecto a las rutas de los proyectos
            if (check(appElectronPath, appSpectronPath)) {
                createDirectory(path.join(appSpectronPath, "testingAWE")); // Elimina la estructura si ya está creada, y que la  cree de nuevo
                parser_1.createFileApplicationInstance(appElectronPath, path.join(appSpectronPath, "testingAWE")); // Genere el fichero Aplication Instance
                fs.readdirSync(appElectronPath).forEach(dirFile => {
                    let electronOutPath = path.join(appElectronPath, dirFile); // Ruta para el recorrido en el proyecto Angular/Electron
                    if (fs.statSync(electronOutPath).isDirectory()) { // Si es un directorio
                        if (!ignore.includes(dirFile)) { // Si no está incluido en el ignore, generamos los ficheros awe.ts por cada html encontrado
                            let appSpectronOutPath = path.join(appSpectronPath, "testingAWE", dirFile);
                            walkDirSrc(electronOutPath, appSpectronOutPath);
                        }
                    }
                });
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}
exports.walkDir = walkDir;
