// IMPORTACIONES
import * as fs from "fs";
import * as fsExtra from "fs-extra";
import * as path from "path";
import { logicParser, createFileApplicationInstance } from '../parser/parser';


// Método que va a recorrer la estructura src del proyecto Angular/Electron
// Entrada:
//          appElectronPath: ruta del proyecto Angular/Electron
//          appSpectronPath: ruta del proyecto de Spectron
// Salida:
//          
function walkDirSrc(appElectronPath: string, appSpectronPath: string) {

    fs.readdirSync(appElectronPath).forEach(dirFile => {
        let electronOutPath = path.join(appElectronPath, dirFile); // Ruta para el recorrido en el proyecto Angular/Electron
        let relativePath = path.relative(appElectronPath, electronOutPath); // Obtenemos la ruta relativa desde el proyecto Electron padre hasta cada uno de los hijos
        let spectronOutPath = path.resolve(appSpectronPath, relativePath); // Ruta para el recorrido en el proyecto Spectron

        if (fs.statSync(electronOutPath).isDirectory()) { // Si es un directorio
            // createDirectory(spectronOutPath) // Creamos el directorio
            walkDirSrc(electronOutPath, spectronOutPath)

        } else {  // Si es un archivo
            createFile(dirFile, electronOutPath, spectronOutPath) // Creamos el fichero

        }
    });
};

// Método que crea el directorio de forma paralela desde el proyecto Angular/Electron al proyecto Spectron
// Entrada:
//          spectronPath: ruta del proyecto Spectron
// Salida:
//          generación del directorio
function createDirectory(spectronPath: string) {

    if (fs.existsSync(spectronPath)) { // Si exite el directorio lo borramos, ya que de lo contrario da Error
        fsExtra.emptyDirSync(spectronPath); // Borra todo lo que haya dentro menos el propio directorio
        fs.rmdirSync(spectronPath); // Borra el directorio, una vez que hemos borrado todo lo que hay dentro
    }
    fsExtra.ensureDirSync(spectronPath) // Resolvemos el appSpectronPath con el path relativo para crear el directorio
}

// Método que crea el fichero de la toolkit por cada html que encontramos
// Entrada:
//          file: nombre del fichero
//          electronPath: ruta del proyecto Angular/Electron en el que se encuentra el HTML
//          spectronPath: ruta del proyecto Spectron en el que vamos a generar el fichero
// Salida:
//          generación del fichero
function createFile(file: string, electronPath: string, spectronPath: string) {

    if (path.extname(electronPath) === ".html") { // Generamos el fichero de la toolkit por cada html que hayamos encontrado
        let spectronPathDirectory = ""; // Ruta para la creación del fichero
        let indexLastSlashWindows = spectronPath.lastIndexOf("\\");
        let indexLastSlashUnix = spectronPath.lastIndexOf("/");

        if (process.platform === "win32") { // Si estamos en Windows
            // Para cambiar el nombre y la extensión del  fichero generado
            spectronPath = spectronPath.slice(0, indexLastSlashWindows + 1) + file.substring(0, file.indexOf(".")) + ".awe.ts";
            spectronPathDirectory = spectronPath.slice(0, indexLastSlashWindows + 1);

        } else { // Si estamos en Unix
            // Para cambiar el nombre y la extensión del  fichero generado
            spectronPath = spectronPath.slice(0, indexLastSlashUnix + 1) + file.substring(0, file.indexOf(".")) + ".awe.ts";
            spectronPathDirectory = spectronPath.slice(0, indexLastSlashUnix + 1);
        }

        fsExtra.ensureDirSync(spectronPathDirectory);

        if (fs.existsSync(spectronPath)) { // Si exite el fichero lo borramos, de lo contrario da Error
            fs.unlinkSync(spectronPath);
        }

        logicParser(electronPath, spectronPath) // logicParser genera los ficheros
    }
}

// Método que va a recorrer la estructura principal del proyecto Angular/Electron
// para detectar si es un proyecto Electron y si tiene la carpeta src
// Entrada:
//          appElectronPath: ruta del proyecto Angular/Electron
//          appSpectronPath: ruta del proyecto Spectron
// Salida:
//          Creación de toda la estructura de carpeta src con los fichero generados
export function walkDir(appElectronPath: string, appSpectronPath: string) {

    fs.readdirSync(appElectronPath).forEach(dirFile => {

        let electronOutPath = path.join(appElectronPath, dirFile); // Ruta para el recorrido en el proyecto Angular/Electron

        if (fs.statSync(electronOutPath).isDirectory()) { // Si es un directorio
            if (dirFile.toLowerCase().trim() === "src") {
                appSpectronPath = path.join(appSpectronPath, "testingAWE", dirFile); 
                createDirectory(appSpectronPath)
                createFileApplicationInstance(appElectronPath, appSpectronPath) // Genere el fichero Aplication Instance
                walkDirSrc(electronOutPath, appSpectronPath)
            }
        }
    });
}
