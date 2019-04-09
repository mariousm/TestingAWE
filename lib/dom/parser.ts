// IMPORTACIONES
import { readFileSync } from "fs";
var htmlparser = require("htmlparser2");

// Convierte el HTML en un String sin espacios entre etiquetas
function htmlToString(path: string): string {

    let toReturn : string = ''

    toReturn = readFileSync(path, 'utf8').replace(/>\s+</g, "><")

    return toReturn.trim()
}

// Devuelve el tipo de etiqueta HTML que lee junto con su id
function parser(path: string): Array<Array<string>> {

    let list: Array<Array<string>> = []
    let html: string = htmlToString(path)

    var parser = new htmlparser.Parser({
        onopentag: function(name: string, attribs: { id: string; }){
            if(attribs.id !== undefined && attribs.id !== ""){
                list.push([name, attribs.id])
            }
        }
    }, {decodeEntities: true});
    parser.write(html)
    parser.end()
    
    return list
}

// Método que va a contener la lógica de los id dinámicos
// Entrada: lista que devuelve el parser
export function logicParser(path: string) {

    let list: Array<Array<string>> = []

    list = parser(path)

    console.log(list)

    // TODO recorrer la lista y mirar si elemento es estático, llamar a un método para que escriba el código necesario
    // si es un elemento dinámico, abstraer {{ lo que sea }} y generar un objeto parametrizado en el fichero intermedio,
    // cuyo nombre el método sea el nombre del id sin el {{ lo que sea }}, cuyo parámetro sea un número, y dentro de ese
    // método instanciar el objeto.
}
