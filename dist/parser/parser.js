"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// IMPORTACIONES
const path = require("path");
const fs_1 = require("fs");
var htmlparser = require("htmlparser2");
// PARSER
// Escribe/añade la información en un fichero .ts
// Entrada:
//          path: ruta del fichero
//          data: información del fichero
// Salida:
//function writeFile(path: string, data: string) {
function writeFile(path, data) {
    try {
        fs_1.writeFileSync(path, data);
    }
    catch (error) {
        console.log(error);
    }
}
exports.writeFile = writeFile;
// Convierte el HTML en un String sin espacios entre etiquetas
// Entrada:
//          path: fichero html a parsear
// Salida:
//          toReturn: html sin espacios
// function htmlToString(path: string): string {
function htmlToString(path) {
    let toReturn = '';
    try {
        toReturn = fs_1.readFileSync(path, 'utf8').replace(/>\s+</g, "><");
    }
    catch (error) {
        console.log(error);
    }
    return toReturn.trim();
}
exports.htmlToString = htmlToString;
// Devuelve el tipo de etiqueta HTML que lee junto con su id
// Entrada:
//          path: fichero html a parsear
// Salida:
//          Array<Array<string>> --> [[tag, id]]
// function parser(path: string): Array<Array<string>> {
function parser(path) {
    let list = [];
    try {
        let html = "";
        let regExpr = new RegExp('\\s+'); // The \s metacharacter is used to find a whitespace character.
        html = htmlToString(path);
        var parser = new htmlparser.Parser({
            onopentag: function (name, attribs) {
                if (attribs.id !== undefined && attribs.id !== "") { // Comprobamos lo más básico, que tenga definido el id y que no esté vacío
                    if (!regExpr.test(attribs.id)) { // Si el id no tiene ningún espacio, es un id correcto según el estandar (vale todo a excepción de whitespace character)
                        list.push([name.toLowerCase().trim(), attribs.id.toLowerCase().trim()]);
                    }
                }
            }
        }, { decodeEntities: true });
        parser.write(html);
        parser.end();
    }
    catch (error) {
        console.log(error);
    }
    return list;
}
exports.parser = parser;
// Devuelve el nombre de la clase HTML correspondiente a ese tag
// Entrada:
//          tag: nombre de la etiqueta
// Salida:
//          nameClass: nombre de la clase de ese tag
// function nameTagClass(tag: string): string {
function nameTagClass(tag) {
    let nameClass = "";
    try {
        let regExpr = new RegExp('[hH][1-6]'); // Expresión regular para determinar si el tag es h1...h6
        if (regExpr.test(tag)) {
            return tag[0].toUpperCase();
        }
        nameClass = tag.toLowerCase();
        nameClass = nameClass[0].toUpperCase() + tag.slice(1);
    }
    catch (error) {
        console.log(error);
    }
    return nameClass;
}
exports.nameTagClass = nameTagClass;
// Devuelve el nombre de la variable o de la función sin caracteres especiales
// Entrada:
//          id: nombre del id del elemento
// Salida:
//          varFunc: nombre de la variable o de la función
//function nameVarFunc(id: string): string {
function nameVarFunc(id) {
    let varFunc = "";
    try {
        let esMayuscula = false; // Variable que se pone a true cuando leemos un caracter especial, nameHero0 en vez de name_hero_0
        let regExpr = new RegExp('[a-zA-Z0-9]'); // Nos sirve para determinar si tiene algún caracter especial.
        id = id.toLowerCase();
        for (let i = 0; i < id.length; ++i) {
            if (regExpr.test(id[i])) { // Es un caracter "normal", en el caso de que sea especial que no lo añada
                let letraActual = id[i];
                if (esMayuscula === true) {
                    letraActual = letraActual.toUpperCase();
                    esMayuscula = false;
                }
                varFunc += letraActual;
            }
            else {
                esMayuscula = true;
            }
        }
    }
    catch (error) {
        console.log(error);
    }
    return varFunc;
}
exports.nameVarFunc = nameVarFunc;
// Devuelve la cabecera de la signatura, y el nombre del id cuando éste sea dinámico
// Entrada:
//          id: nombre del id del elemento
// Salida:
//          params: Array<string> -> [head, nameId]
//                  en la primera posición guardamos la signatura del método (sólo los parámetros)
//                  en la segunda posición guardamos el nombre del id
// function paramsIdTag(id: string): Array<string> {
function paramsIdTag(id) {
    let params = []; // Array que devolvemos con la cabecera y el nombre del id
    try {
        let head = ""; // Parámetros pasados por cabecera al método
        let nameId = "\'#\'"; // Nombre del id
        let param = 1; // Contador que nos sirve para escribir param1, param2... Dependiendo del número de parámtros que tiene el id
        let esPrimeraLlave = false; // Variable que nos permite determinar si vamos a empezar a leer un id dinámico
        let estadoIdDinamico = false; // Flag para cuando estamos dentro del id dinámico {{ here }}
        let estado = true; // Flag cuando estamos fuera del id dinámico
        let cadenaLeida = ''; // Cadena que leemos cuando estamos fuera del id dinámico, es decir, cuanto estado = true
        for (let i = 0; i < id.length; ++i) {
            if (esPrimeraLlave === false) {
                if (id[i] === "{") { // Comprobamos la primera llave
                    esPrimeraLlave = true;
                    if (i !== 0) { // Ya que si está al comienzo del todo va a añadir un ''
                        nameId += " + \'" + cadenaLeida + "\'"; // Cuando ya no estamos dentro del id dinámico, guardamos lo leído
                        cadenaLeida = '';
                    }
                    continue;
                }
                else if (id[i] === "}") { // Comprobamos la tercera llave
                    esPrimeraLlave = true;
                    estadoIdDinamico = false;
                    continue;
                }
                if (estado === true) { // Guardamos la cadena que leemos cuando estamos fuera del id dinámico
                    cadenaLeida += id[i];
                }
            }
            if (esPrimeraLlave === true) {
                if (id[i] === "{") { // Comprobamos la segunda llave
                    esPrimeraLlave = false;
                    estadoIdDinamico = true;
                    estado = false;
                    continue;
                }
                else if (id[i] === "}") { // Comprobamos la cuarta llave
                    esPrimeraLlave = false;
                    estado = true;
                    nameId += " + param" + param.toString();
                    head += "param" + param.toString() + " : string, ";
                    ++param;
                    continue;
                }
            }
        }
        head = head.slice(0, head.length - 2); // Borramos el espacio y la última coma
        params.push(head); // Establecemos en la primera posición la cabecera
        params.push(nameId); // Establecemos el nombre del id
    }
    catch (error) {
        console.log(error);
    }
    return params;
}
exports.paramsIdTag = paramsIdTag;
// Método que genera el fichero AplicationsInstance.awe.ts
// Entrada:
//          appElectronPath: ruta del proyecto Angular/Electron
//          outPath: ruta de salida para la generación del fichero ApplicationInstance
// Salida:
//          generación del fichero ApplicactionInstance
function createFileApplicationInstance(appElectronPath, outPath) {
    try {
        let nameProjectElectron = path.basename(appElectronPath);
        let nameFile = "applicationInstance.awe.ts";
        let data = "";
        data += "import { ApplicationInstance } from \"testing-awe\";\n\n";
        data += "export const applicationInstance: ApplicationInstance = ApplicationInstance.getInstance(\"" + nameProjectElectron + "\");";
        writeFile(path.join(outPath, nameFile), data); //Escribimos el fichero
    }
    catch (error) {
        console.log(error);
    }
}
exports.createFileApplicationInstance = createFileApplicationInstance;
// Método que va a contener la lógica de la generación de los ficheros
// Entrada:
//          htmlPath: fichero html a parsear
//          outPath: ruta de salida para el fichero generado por la toolkit
//          htmlElements: elementos HTML que están soportados por la librería
// Salida:
//          fichero awe.ts generado por la toolkit
function logicParser(htmlPath, outPath, htmlElements) {
    try {
        let data = "";
        let list = [];
        let regExpr = new RegExp('\{\{[aA-zZ>]+\}\}'); // Expresión regular para determinar si un id es dinámico o no
        list = parser(htmlPath); // Obtenemos la etiqueta junto con su id
        data = "import * as awe from \"testing-awe\";\n\n"; // Añadimos las importaciones
        for (let node of list) {
            if (regExpr.test(node[1])) {
                // Es un id dinámico
                let nameFunction = nameVarFunc(node[1].replace(/\{\{[aA-zZ>]+\}\}/g, ""));
                let nameClass = nameTagClass(node[0]);
                if (htmlElements.includes(nameClass)) { // Si el elemento HTML está soportado por la librería
                    let params = paramsIdTag(node[1]); // Primera posición head, segunda el nombre del id
                    data += "export function " + nameFunction + "(" + params[0] + ") : awe." + nameClass + " {\n";
                    data += "\tlet id : string = " + params[1] + ";\n";
                    data += "\treturn new awe." + nameClass + "(id)\n";
                    data += "};\n";
                }
            }
            else {
                // Es un id estático
                let nameClass = nameTagClass(node[0]);
                if (htmlElements.includes(nameClass)) { // Si el elemento HTML está soportado por la librería
                    data += "export const " + nameVarFunc(node[1]) + " = " + "new awe." + nameClass + "('#" + node[1] + "');\n";
                }
            }
        }
        writeFile(outPath, data); //Escribimos el fichero
    }
    catch (error) {
        console.log(error);
    }
}
exports.logicParser = logicParser;
