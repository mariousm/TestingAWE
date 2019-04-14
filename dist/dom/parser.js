"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// IMPORTACIONES
const fs_1 = require("fs");
var htmlparser = require("htmlparser2");
// PARSER
// Escribe/añade la información en un fichero .ts
// Entrada:
//          path: ruta del fichero
//          data: información del fichero
// Salida:
function writeFile(path, data) {
    fs_1.writeFileSync(path, data);
}
// Convierte el HTML en un String sin espacios entre etiquetas
// Entrada:
//          path: fichero html a parsear
// Salida:
//          string: html sin espacios
function htmlToString(path) {
    let toReturn = '';
    toReturn = fs_1.readFileSync(path, 'utf8').replace(/>\s+</g, "><");
    return toReturn.trim();
}
// Devuelve el tipo de etiqueta HTML que lee junto con su id
// Entrada:
//          path: fichero html a parsear
// Salida:
//          Array<Array<string>> --> [[tag, id]]
function parser(path) {
    let list = [];
    let html = "";
    html = htmlToString(path);
    var parser = new htmlparser.Parser({
        onopentag: function (name, attribs) {
            if (attribs.id !== undefined && attribs.id !== "") {
                list.push([name.trim(), attribs.id.trim()]);
            }
        }
    }, { decodeEntities: true });
    parser.write(html);
    parser.end();
    return list;
}
// Devuelve el nombre de la clase HTML correspondiente a ese tag
// Entrada:
//          tag: nombre de la etiqueta
// Salida:
//          nameClass: nombre de la clase de ese tag
function nameTagClass(tag) {
    let nameClass = "";
    let regExpr = new RegExp('[hH][1-6]'); // Expresión regular para determinar si el tag es h1...h6
    if (regExpr.test(tag)) {
        return tag[0].toUpperCase();
    }
    nameClass = tag.toLowerCase();
    nameClass = nameClass[0].toUpperCase() + tag.slice(1);
    return nameClass;
}
// Devuelve el nombre del id, cuando el id sea dinámico
// Entrada:
//          id: nombre del id del elemento
// Salida:
//          nameId: sustitución de la parte dinámica por param
function nameIdTag(id) {
    let nameId = "";
    if (id.startsWith("{{")) { // Si el id comienza por el elemento dinámico
        return "\'#\' + param + " + "\'" + id.replace(/\{\{[aA-zZ>]+\}\}/g, "") + "\'";
    }
    else if (id.endsWith("}}")) { // Si el id termina por el elemento dinámico
        return "\'#" + id.replace(/\{\{[aA-zZ>]+\}\}/g, "") + "\'" + " + param";
    }
    else {
        nameId = id.replace(/\{\{[aA-zZ>]+\}\}/g, "@"); // Si estoy entre medias del id
        let firstPart = nameId.slice(0, nameId.indexOf("@"));
        let secondPart = nameId.slice(nameId.indexOf("@") + 1);
        return "\'#" + firstPart + "\' " + "+ param + " + "\'" + secondPart + "\'";
    }
}
// Método que va a contener la lógica de los id dinámicos
// Entrada:
//          path: fichero html a parsear
// Salida:
function logicParser(path) {
    let data = "";
    let list = [];
    let regExpr = new RegExp('\{\{[aA-zZ>]+\}\}'); // Expresión regular para determinar si un id es dinámico o no
    list = parser(path); // Obtenemos la etiqueta junto con su id
    console.log(list);
    data = "import * as awe from \"testing-awe\";\n\n"; // Añadimos las importaciones
    for (let node of list) {
        if (regExpr.test(node[1])) {
            // Es un id dinámico
            let nameFunction = node[1].replace(/\{\{[aA-zZ>]+\}\}/g, "");
            let nameClass = nameTagClass(node[0]);
            data += "export function " + nameFunction + "(param: string) : awe." + nameClass + " {\n";
            data += "\tlet id : string = " + nameIdTag(node[1]) + ";\n";
            data += "\treturn new awe." + nameClass + "(id)\n";
            data += "};\n";
        }
        else {
            // Es un id estático
            data += "export const " + node[1] + " = " + "new awe." + nameTagClass(node[0]) + "('#" + node[1] + "');\n";
        }
    }
    writeFile("C:\\Users\\mario\\Desktop\\PruebaTookit\\dashboard.toolkit.ts", data); //Escribimos el fichero
    // TODO recorrer la lista y mirar si elemento es estático, llamar a un método para que escriba el código necesario
    // si es un elemento dinámico, abstraer {{ lo que sea }} y generar un objeto parametrizado en el fichero intermedio,
    // cuyo nombre el método sea el nombre del id sin el {{ lo que sea }}, cuyo parámetro sea un número, y dentro de ese
    // método instanciar el objeto.
}
exports.logicParser = logicParser;
