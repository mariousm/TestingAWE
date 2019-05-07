// IMPORTACIONES
import * as path from "path";
import * as fs from "fs";


// CONFIGURACIÓN INICIAL

// Método que convierte el contenido de un archivo a un string
// Entrada:
//          path: ruta en la que se encuentra el archivo
// Salida:
//          toReturn: contenido del fichero en string
function jsonToString(path: string): string {

    let toReturn: string = '';

    toReturn = fs.readFileSync(path, 'utf8');

    return toReturn.trim()
}

// Método que crea el fichero JSON por defecto, es decir, si no existe
// crea un esqueleto, y es el usuario quién lo debe modificar
// Entrada:
//          nothing: la ruta raíz se desconoce, se generará en el directorio
//                  raíz de donde esté instalado la toolkit
// Salida:
//          generación del fichero aweconfig.json
function createJson() {

    let nameFile: string = getNameFileConfig();
    let data: string = "";

    data += "{\n";
    data += "\t\"directories\": {\n";
    data += "\t\t\"electronProject\": \"electronProjectPath\",\n";
    data += "\t\t\"spectronProject\": \"spectronProjectPath\"\n";
    data += "\t},\n";
    data += "\t\"ignore\": [\"node_modules\", \"dist\", \"e2e\", \".git\"]\n";
    data += "}";

    fs.writeFileSync(path.join(getRootDirectory(), nameFile), data) // Escribimos el fichero
}

// Devuelve la ruta del proyecto raíz en el que está instalado el módulo
// Entrada:
//          nothing: la ruta raíz se desconoce
// Salida:
//          path: ruta del proyecto raíz
function getRootDirectory(): string {

    return path.join(__dirname, "..", "..", "..", "..")
}

// Devuelve el nombre del archivo de configuración
// Entrada:
//          nothing
// Salida:
//          name: nombre del fichero
function getNameFileConfig(): string {
    return "aweconfig.json"
}

// Método que generar el objeto JSON
// Entrada:
//          nothing
// Salida:
//          objJson: el objeto JSON
function getObjJson(): any {

    // No hace falta comprobar que existe el directorio y el fichero,
    // porque si no existe en la automatización, no haremos la llamada para obtener la configuración
    let json: string = jsonToString(path.join(getRootDirectory(), getNameFileConfig()));
    let objJson: any = JSON.parse(json);

    return objJson
}

// Método que comprueba que existe el fichero aweconfig.json en la raíz del proyecto Spectron
// Entrada:
//          nothing
// Salida:
//          isCheck: determina si existe el fichero de configuración o no
function checkExistFile(): boolean {

    let isCheck: boolean = false; // Para determinar si existe el archivo aweconfig.json

    fs.readdirSync(getRootDirectory()).forEach(dirFile => {
        if (dirFile.toLowerCase().trim() === getNameFileConfig()) isCheck = true; // Existe el archivo
    });

    return isCheck
}

// Comprueba si existen la propiedades  del fichero aweconfig.json
// Entrada:
//          nothing
// Salida:
//          isCheck: devuelve una lista, en la primera posición el valor del proyecto Angular
//                  en la segunda posición el valor del proyecto Spectron,
//                  en la tercera posición si existe ignore
//                  [existAngularPath, existSpectronPath, existIgnore]
function checkExistProjectProperty(): Array<boolean> {

    let isCheck: Array<boolean> = [false, false, false];
    let objJson: any = getObjJson();

    if (objJson.directories.electronProject !== undefined) isCheck[0] = true;
    if (objJson.directories.spectronProject !== undefined) isCheck[1] = true;
    if (objJson.ignore !== undefined) {
        let aux: Array<string> = objJson.ignore
        if (aux.length > 0) isCheck[2] = true;
    }

    return isCheck
}

export function checkAweconfig(): boolean {

    let isCheck: boolean = true;
    let isChechProperty: Array<boolean> = [];

    if (!checkExistFile()) {
        createJson();
        console.log("NOTA: modifique el fichero " + getNameFileConfig());
    }

    isChechProperty = checkExistProjectProperty();

    if (!isChechProperty[0]) {
        isCheck = false;
        console.log("ERROR: no está definida la propiedad electronProject en " + getNameFileConfig());
    }

    if (!isChechProperty[1]) {
        isCheck = false;
        console.log("ERROR: no está definida la propiedad spectronProject en " + getNameFileConfig());
    }

    return isCheck
}

// Método que proporciona la ruta del proyecto Angular/Electron y la ruta del proyecto Spectron
// Entrada:
//          nothing 
// Salida:
//          path: rutas de los proyectos
export function getProjectPath(): Array<string> {

    // No hace falta comprobar que existe el directorio y el fichero,
    // porque si no existe en la automatización, no haremos la llamada para obtener la configuración
    let path: Array<string> = [];
    let objJson: any = getObjJson();

    path.push(objJson.directories.electronProject);
    path.push(objJson.directories.spectronProject);

    return path
}

// Método que proporciona las carpetas a ignorar del proyecto Augnular/Electron
// Entrada:
//          nothing
// Salida:
//          ignore: carpetas a ignorar
export function getIgnore(): Array<string> {

    // No hace falta comprobar que existe el directorio y el fichero,
    // porque si no existe en la automatización, no haremos la llamada para obtener la configuración
    let ignore: Array<string> = [];
    let objJson: any = getObjJson();
    let isChechProperty: Array<boolean> = checkExistProjectProperty();

    if (isChechProperty[2]) {
        ignore = objJson.ignore;
    }

    return ignore
} 
