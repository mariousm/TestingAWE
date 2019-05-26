// IMPORTACIONES
import * as path from "path";
import { readFileSync, writeFileSync } from "fs";
var htmlparser = require("htmlparser2");


// PARSER

// Escribe/añade la información en un fichero .ts
// Entrada:
//          path: ruta del fichero
//          data: información del fichero
// Salida:
//function writeFile(path: string, data: string) {
export function writeFile(path: string, data: string) {

    try {

        writeFileSync(path, data);

    } catch (error) {
        console.log(error);
    }
}

// Convierte el HTML en un String sin espacios entre etiquetas
// Entrada:
//          path: fichero html a parsear
// Salida:
//          toReturn: html sin espacios
// function htmlToString(path: string): string {
export function htmlToString(path: string): string {

    let toReturn: string = '';

    try {

        toReturn = readFileSync(path, 'utf8').replace(/>\s+</g, "><");

    } catch (error) {
        console.log(error);
    }

    return toReturn.trim()
}

// Devuelve el tipo de etiqueta HTML que lee junto con su id
// Entrada:
//          path: fichero html a parsear
// Salida:
//          Array<Array<string>> --> [[tag, id]]
// function parser(path: string): Array<Array<string>> {
export function parser(path: string): Array<Array<string>> {

    let list: Array<Array<string>> = [];

    try {

        let html: string = "";
        let regExpr: RegExp = new RegExp('\\s+'); // The \s metacharacter is used to find a whitespace character.

        html = htmlToString(path);

        var parser = new htmlparser.Parser({
            onopentag: function (name: string, attribs: { id: string; }) {
                if (attribs.id !== undefined && attribs.id !== "") { // Comprobamos lo más básico, que tenga definido el id y que no esté vacío
                    if (!regExpr.test(attribs.id)) { // Si el id no tiene ningún espacio, es un id correcto según el estandar (vale todo a excepción de whitespace character)
                        list.push([name.toLowerCase().trim(), attribs.id.toLowerCase().trim()]);
                    }
                }
            }
        }, { decodeEntities: true });
        parser.write(html);
        parser.end();

    } catch (error) {
        console.log(error);
    }

    return list
}

// Devuelve el nombre de la clase HTML correspondiente a ese tag
// Entrada:
//          tag: nombre de la etiqueta
// Salida:
//          nameClass: nombre de la clase de ese tag
// function nameTagClass(tag: string): string {
export function nameTagClass(tag: string): string {

    let nameClass: string = "";

    try {

        let regExpr: RegExp = new RegExp('[hH][1-6]'); // Expresión regular para determinar si el tag es h1...h6

        if (regExpr.test(tag)) {
            return tag[0].toUpperCase();
        }

        nameClass = tag.toLowerCase();
        nameClass = nameClass[0].toUpperCase() + tag.slice(1);

    } catch (error) {
        console.log(error);
    }

    return nameClass
}

// Devuelve el nombre de la variable o de la función sin caracteres especiales
// Entrada:
//          id: nombre del id del elemento
// Salida:
//          varFunc: nombre de la variable o de la función
//function nameVarFunc(id: string): string {
export function nameVarFunc(id: string): string {

    let varFunc: string = "";

    try {

        let esMayuscula: boolean = false; // Variable que se pone a true cuando leemos un caracter especial, nameHero0 en vez de name_hero_0
        let regExpr: RegExp = new RegExp('[a-zA-Z0-9]'); // Nos sirve para determinar si tiene algún caracter especial.

        id = id.toLowerCase();

        for (let i = 0; i < id.length; ++i) {
            if (regExpr.test(id[i])) { // Es un caracter "normal", en el caso de que sea especial que no lo añada
                let letraActual = id[i];
                if (esMayuscula === true) {
                    letraActual = letraActual.toUpperCase();
                    esMayuscula = false;
                }
                varFunc += letraActual;
            } else {
                esMayuscula = true;
            }
        }

    } catch (error) {
        console.log(error);
    }

    return varFunc
}

// Devuelve la cabecera de la signatura, y el nombre del id cuando éste sea dinámico
// Entrada:
//          id: nombre del id del elemento
// Salida:
//          params: Array<string> -> [head, nameId]
//                  en la primera posición guardamos la signatura del método (sólo los parámetros)
//                  en la segunda posición guardamos el nombre del id
// function paramsIdTag(id: string): Array<string> {
export function paramsIdTag(id: string): Array<string> {

    let params: Array<string> = []; // Array que devolvemos con la cabecera y el nombre del id

    try {

        let head: string = ""; // Parámetros pasados por cabecera al método
        let nameId = "\'#\'"; // Nombre del id
        let param: number = 1; // Contador que nos sirve para escribir param1, param2... Dependiendo del número de parámtros que tiene el id
        let esPrimeraLlave: boolean = false; // Variable que nos permite determinar si vamos a empezar a leer un id dinámico
        let estadoIdDinamico: boolean = false; // Flag para cuando estamos dentro del id dinámico {{ here }}
        let estado: boolean = true; // Flag cuando estamos fuera del id dinámico
        let cadenaLeida: string = ''; // Cadena que leemos cuando estamos fuera del id dinámico, es decir, cuanto estado = true

        for (let i = 0; i < id.length; ++i) {

            if (esPrimeraLlave === false) {
                if (id[i] === "{") { // Comprobamos la primera llave
                    esPrimeraLlave = true;

                    if (i !== 0) { // Ya que si está al comienzo del todo va a añadir un ''
                        nameId += " + \'" + cadenaLeida + "\'"; // Cuando ya no estamos dentro del id dinámico, guardamos lo leído
                        cadenaLeida = '';
                    }
                    continue
                } else if (id[i] === "}") { // Comprobamos la tercera llave
                    esPrimeraLlave = true;
                    estadoIdDinamico = false;
                    continue
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
                    continue
                } else if (id[i] === "}") { // Comprobamos la cuarta llave
                    esPrimeraLlave = false;
                    estado = true;
                    nameId += " + param" + param.toString();
                    head += "param" + param.toString() + " : string, ";
                    ++param;
                    continue
                }
            }
        }

        head = head.slice(0, head.length - 2); // Borramos el espacio y la última coma
        params.push(head); // Establecemos en la primera posición la cabecera
        params.push(nameId); // Establecemos el nombre del id

    } catch (error) {
        console.log(error);
    }

    return params
}


// Método que genera el fichero AplicationsInstance.awe.ts
// Entrada:
//          appElectronPath: ruta del proyecto Angular/Electron
//          outPath: ruta de salida para la generación del fichero ApplicationInstance
// Salida:
//          generación del fichero ApplicactionInstance
export function createFileApplicationInstance(appElectronPath: string, outPath: string) {

    try {

        let nameProjectElectron: string = path.basename(appElectronPath);
        let nameFile: string = "applicationInstance.awe.ts";
        let data: string = "";

        data += "import { ApplicationInstance } from \"testing-awe\";\n\n";
        data += "export const applicationInstance: ApplicationInstance = ApplicationInstance.getInstance(\"" + nameProjectElectron + "\");";

        writeFile(path.join(outPath, nameFile), data) //Escribimos el fichero

    } catch (error) {
        console.log(error);
    }
}


// Método que va a contener la lógica de la generación de los ficheros
// Entrada:
//          htmlPath: fichero html a parsear
//          outPath: ruta de salida para el fichero generado por la toolkit
//          htmlElements: elementos HTML que están soportados por la librería
// Salida:
//          fichero awe.ts generado por la toolkit
export function logicParser(htmlPath: string, outPath: string, htmlElements: Array<string>) {

    try {

        let data: string = "";
        let list: Array<Array<string>> = [];
        let regExpr: RegExp = new RegExp('\{\{[aA-zZ>]+\}\}'); // Expresión regular para determinar si un id es dinámico o no

        list = parser(htmlPath) // Obtenemos la etiqueta junto con su id
        data = "import * as awe from \"testing-awe\";\n\n"; // Añadimos las importaciones

        for (let node of list) {
            if (regExpr.test(node[1])) {
                // Es un id dinámico
                let nameFunction: string = nameVarFunc(node[1].replace(/\{\{[aA-zZ>]+\}\}/g, ""));
                let nameClass: string = nameTagClass(node[0]);

                if (htmlElements.includes(nameClass)) { // Si el elemento HTML está soportado por la librería

                    let params: Array<string> = paramsIdTag(node[1]); // Primera posición head, segunda el nombre del id

                    data += "export function " + nameFunction + "(" + params[0] + ") : awe." + nameClass + " {\n";
                    data += "\tlet id : string = " + params[1] + ";\n";
                    data += "\treturn new awe." + nameClass + "(id)\n";
                    data += "};\n";
                }

            } else {
                // Es un id estático
                let nameClass: string = nameTagClass(node[0]);

                if (htmlElements.includes(nameClass)) { // Si el elemento HTML está soportado por la librería
                    data += "export const " + nameVarFunc(node[1]) + " = " + "new awe." + nameClass + "('#" + node[1] + "');\n";
                }
            }
        }
        writeFile(outPath, data) //Escribimos el fichero

    } catch (error) {
        console.log(error);
    }
}
