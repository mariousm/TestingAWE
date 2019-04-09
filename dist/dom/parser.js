"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// IMPORTACIONES
const fs_1 = require("fs");
var htmlparser = require("htmlparser2");
// Convierte el HTML en un String sin espacios entre etiquetas
function htmlToString(path) {
    let toReturn = '';
    toReturn = fs_1.readFileSync(path, 'utf8').replace(/>\s+</g, "><");
    return toReturn.trim();
}
// Devuelve el tipo de etiqueta HTML que lee junto con su id
function parser(path) {
    let list = [];
    let html = htmlToString(path);
    var parser = new htmlparser.Parser({
        onopentag: function (name, attribs) {
            if (attribs.id !== undefined && attribs.id !== "") {
                list.push([name, attribs.id]);
            }
        }
    }, { decodeEntities: true });
    parser.write(html);
    parser.end();
    return list;
}
// Método que va a contener la lógica de los id dinámicos
// Entrada: lista que devuelve el parser
function logicParser(path) {
    let list = [];
    let regExpr = new RegExp('\{\{[aA-zZ>]+\}\}'); //Expresión regular para determinar si un id es dinámico o no
    list = parser(path);
    console.log(list);
    for (let node of list) {
        if (regExpr.test(node[1])) {
            //Es que es un id dinámico
            console.log("Es un elemento dinámico");
        }
        else {
            console.log("Es un elemento estático");
        }
    }
    // TODO recorrer la lista y mirar si elemento es estático, llamar a un método para que escriba el código necesario
    // si es un elemento dinámico, abstraer {{ lo que sea }} y generar un objeto parametrizado en el fichero intermedio,
    // cuyo nombre el método sea el nombre del id sin el {{ lo que sea }}, cuyo parámetro sea un número, y dentro de ese
    // método instanciar el objeto.
}
exports.logicParser = logicParser;
