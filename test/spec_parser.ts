// IMPORTACIONES
import { assert } from "chai";
import * as path from "path";
import * as fs from "fs";
import * as fsExtra from "fs-extra";
import * as config from "../dist/config/configuration";
import * as parser from "../dist/parser/parser";


//
function remove(ruta: string) {
    let bool = false;

    try {
        if (exist(ruta)) { // Si exite el directorio lo borramos
            if (fs.statSync(ruta).isDirectory()) { // Si es un directorio
                fsExtra.emptyDirSync(ruta); // Borra todo lo que haya dentro menos el propio directorio
                bool = true;
            } else { // Si es un archivo
                fs.unlinkSync(ruta); // Borramos el archivo
                bool = true
            }
        }

    } catch (error) {
        console.log(error)
    }

    return bool
}

//
function exist(ruta: string) {
    return fs.existsSync(ruta);
}

describe("UnitTest PARSER", () => {

    it.only("writeFile CORRECT", () => {

        for (let i = 0; i < 2; ++i) {
            let name = "writeFile" + (i + 1).toString() + ".ts";
            let file = path.join(__dirname, "materialOUT", name);
            // Comprobamos si existe el fichero, si existe lo borramos
            remove(file);
            // Creamos el fichero
            parser.writeFile(file, name);
            // Comprobamos que lo ha creado
            assert.equal(exist(file), true)

            // Comprobamos que el contenido del fichero es el esperado
            let content = fs.readFileSync(file, 'utf8')
            assert.equal(content, name)
        }
    });

    // it.only("writeFile FAIL", () => {

    //     // Comprobamos que si introducimos un number falla
    //     parser.writeFile(1234,123);
    //     assert.equal(exist(1234), false) // Imprime por pantalla la excepción

    //     // Comprobamos que si introducimor un number y un string falla
    //     parser.writeFile(1234, "data");
    //     assert.equal(exist(1234), false) // Imprime por pantalla la excepción

    //     // Comprobamos que si introducimos un string y un number falla
    //     parser.writeFile("1234", 1234)
    //     assert.equal(exist(1234), false) // Imprime por pantalla la excepción

    //     // Comprobamos que si metemos dos string, crea el fichero pero en la raíz del proyecto
    //     parser.writeFile("1234", "data")
    //     assert.equal(exist("1234"), true) // Imprime por pantalla la excepción

    //     // Eliminamos el fichero generado en la raíz del proyecto
    //     remove("1234");

    //     // Estos errores los controlamos, ya que este método es accesible sólo por mí,
    //     // y cuando llamamos a este método, me garantizo de que la ruta sea correcta,
    //     // siempre y cuando los parámetros sean strings, ya que de lo contrario mostraremos la excepción
    // });

    it.only("htmlToString CORRECT", () => {

        for (let i = 0; i < 2; ++i) {
            // INICIAL
            let name = "html" + (i + 1).toString() + ".html";
            let file = path.join(__dirname, "materialIN", name);
            let html = parser.htmlToString(file);

            // ESPERADO
            name = "html" + (i + 1).toString() + ".txt";
            file = path.join(__dirname, "materialIN", name);
            let expected = fs.readFileSync(file, 'utf8');

            // Comprobamos que el inicial sea igual al esperado
            assert.equal(html, expected);
        }
    });

    // it.only("htmlToString FAIL", () => {

    //     // Comprobamos que si le pasamos un number nos salta una excepción y que su contenido está vacío
    //     let html = parser.htmlToString(123);
    //     assert.equal(html, '');

    //     // Comprobamos que si le pasamos una ruta incorrecta nos salta una excepción y su contenido está vacío
    //     html = parser.htmlToString("html1.html");
    //     assert.equal(html, '');

    //     // Estos errores los controlamos, ya que este método es accesible sólo por mí,
    //     // y cuando llamamos a este método, me garantizo que la ruta sea correcta, y que tenga un fichero html, ya 
    //     // que de lo contrario no leemos ni generamos un fichero.
    // })

    it.only("parser CORRECT", () => {

        // Comprobamos en el html1.html hay 5 elementos, y se corresponden con los esperados.
        // Nos quedamos con los elementos que tienen definido el id y que éste es válido (si no tiene espacios)
        let file = path.join(__dirname, "materialIN", "html1.html");
        let expected = [["h3", "dashboard_title"], ["div", "dashboard_div"], ["a", "dashboard_a_details_hero_{{i}}"], ["div", "dashboard_div_detail_hero_{{i}}"], ["h4", "dashboard_h4_detail_hero_name_{{i}}"]]
        let elements = parser.parser(file);
        assert.equal(elements.length, 5)

        for (let i = 0; i < elements.length; ++i) {
            assert.equal(elements[i][0], expected[i][0]);
            assert.equal(elements[i][1], expected[i][1]);
        }

        // Comprobamos en el fichero html2.html hay 4 elementos, y se corresponden con los esperados.
        file = path.join(__dirname, "materialIN", "html2.html");
        expected = [["div", "messages_div"], ["h2", "messages_h2"], ["button", "messages_button_clear"], ["div", "messages_div1"]];
        elements = parser.parser(file);

        for (let i = 0; i < elements.length; ++i) {
            assert.equal(elements[i][0], expected[i][0]);
            assert.equal(elements[i][1], expected[i][1]);
        }
    });

    // it.only("parser FAIL", () => {

    //     // Comprobamos que si le pasamos un number nos muestra la excepción y la lista está vacía
    //     let elements = parser.parser(132);
    //     assert.equal(elements.length, 0);

    //     // Comprobamos que si le pasamos una ruta incorrecta, nos devuelve una excepción y la lista vacía
    //     elements = parser.parser("html1.html");
    //     assert.equal(elements.length, 0);

    //     // Estos errores los controlamos, ya que este método es accesible sólo por mí,
    //     // y cuanbdo llamamos a este método, me garantizo que la ruta sea correcta, y sólo llamamos a este método
    //     // cuando hay un fichero html dentro de la ruta
    // });

    it.only("nameTagClass CORRECT", () => {

        // Comprobamos que los nombres de la clase HTML se corresponden con el tag
        // Aunque tengo un método que me proporciona los nombre de las clases (de forma dinámica), dicho método está en otro archivo .ts
        // por lo que he preferido meterlas a mano, ya que en este test quiero probar solo los métodos del fichero parser.ts
        let names = ["a", "abbr", "address", "article", "audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h", "head", "header", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "main", "mark", "meta", "meter", "nav", "noscript", "ol", "option", "p", "pre", "progress", "q", "root", "s", "samp", "section", "select", "small", "source", "span", "strong", "sub", "summary", "sup", "svg", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "u", "ul", "var", "video", "wbr"]

        for (let name of names) { // Nombre de las clases
            assert.equal(parser.nameTagClass(name), name[0].toUpperCase() + name.slice(1))
        }
    });

    // it.only("nameTagClass FAIL", () => {

    //     // Comprobamos que si le pasamos un número nos muestra una excepción, y su nombre está vacío
    //     let name = parser.nameTagClass(1123);
    //     assert.equal(name, '');

    //     // Comprobamos que si no le pasamos nada nos muestra una excepción
    //     name = parser.nameTagClass();
    //     assert.equal(name, '');
    // });

    it.only("nameVarFunc CORRECT", () => {

        // Comprobamos que pasandole un id, nos proporciona el nombre de la función o la variable
        // Si tiene algún caracter distinto de [a-zA-Z0-9], lo eliminamos y el siguietne caracter lo ponemos en mayúsculas
        let name = parser.nameVarFunc("dashboard_title");
        assert.equal(name, "dashboardTitle");

        name = parser.nameVarFunc("dashboard_a_details_hero_");
        assert.equal(name, "dashboardADetailsHero");

        name = parser.nameVarFunc("16_dashboard_a_05_details_hero_1997");
        assert.equal(name, "16DashboardA05DetailsHero1997");

        name = parser.nameVarFunc("''''''!!!!!!!7dashboard_a__________details_hero_¡'¡'%6/$€*-/");
        assert.equal(name, "7dashboardADetailsHero6");

        name = parser.nameVarFunc("dashboard_a_2568/!='¡pepe_details_hero_123");
        assert.equal(name, "dashboardA2568PepeDetailsHero123");
    });

    // it.only("nameVarFunc FAIL", () => {

    //     // Comprobamos que si introducimos un number nos muestra una excepción, y el nombre de la función o variable está vacía
    //     let name = parser.nameVarFunc(123);
    //     assert.equal(name, '');

    //     // Comprobamos que si no le pasamos nada nos muestra una excepción, y el nombre de la función o variable está vacía
    //     name = parser.nameVarFunc();
    //     assert.equal(name, '');

    //     // Estos errores los controlamos, ya que este método es accesible solo por mi, y siempre que llamamos a esta función,
    //     // le pasamos un string, ya que de lo contrario no es llamada.
    // })

    it.only("paramsIdTag CORRECT", () => {

        // Comprobamos que pasandole un id nos proporciona de forma correcta los parámetros del método, junto con su id
        // Este método sirve para generar los métodos de los id dinámicos, los cuales, se encuentran en los ficheros generador por la toolkit.
        // Por lo tanto para los id estáticos no se llama a este método
        let params = parser.paramsIdTag("dashboard_a_details_hero_{{i}}")
        assert.equal(params[0], "param1 : string");
        assert.equal(params[1], "'#' + 'dashboard_a_details_hero_' + param1")

        params = parser.paramsIdTag("{{i}}_dashboard_a_details_hero_{{i}}")
        assert.equal(params[0], "param1 : string, param2 : string");
        assert.equal(params[1], "'#' + param1 + '_dashboard_a_details_hero_' + param2")

        params = parser.paramsIdTag("{{i}}_dashboard_a_details_hero_{{j}}")
        assert.equal(params[0], "param1 : string, param2 : string");
        assert.equal(params[1], "'#' + param1 + '_dashboard_a_details_hero_' + param2")

        params = parser.paramsIdTag("{{i}}_dashboard_{{i}}_details_hero_{{i}}")
        assert.equal(params[0], "param1 : string, param2 : string, param3 : string");
        assert.equal(params[1], "'#' + param1 + '_dashboard_' + param2 + '_details_hero_' + param3")

        params = parser.paramsIdTag("{{i}}_dashboard_{{j}}_details_hero_{{k}}")
        assert.equal(params[0], "param1 : string, param2 : string, param3 : string");
        assert.equal(params[1], "'#' + param1 + '_dashboard_' + param2 + '_details_hero_' + param3")

    });

    // it.only("paramsIdTag FAIL", () => {

    //     // Comprobamos que si le pasamos un number nos salta una excepción, y que los parámetros están vacíos
    //     let params = parser.paramsIdTag(123);
    //     assert.equal(params[0], "");
    //     assert.equal(params[1], "'#'");

    //     // Comprobamos que si no le pasamos nada nos muestra una excepción, y los parámetros son undefined
    //     params = parser.paramsIdTag();
    //     assert.equal(params[0], undefined);
    //     assert.equal(params[1], undefined);

    //     // Estos errores los controlamos, ya que este método es accesible solo por mi, y simpre que llamemos a esta función,
    //     // le pasamos un string, de lo contrario no la llaría, además solo la llamamos si el id es dinámico, es decir, {{ dinámico }}

    // });

    it.only("createFileApplicationInstance CORRECT", () => {

        // Comprobamos que pasándole la ruta de la aplicación y la ruta de salida nos genera el fichero
        let inPath = path.join(__dirname, "..");
        let outPath = path.join(__dirname, "materialOUT");
        // Comprobamos si existe el fichero, si existe lo borramos
        remove(path.join(outPath, "applicationInstance.awe.ts"));
        // Creamos el fichero
        parser.createFileApplicationInstance(inPath, outPath);
        // Comprobamos que ha creado el fichero
        assert.equal(exist(path.join(outPath, "applicationInstance.awe.ts")), true);
        // Comprobamos el contenido del fichero
        let content = fs.readFileSync(path.join(outPath, "applicationInstance.awe.ts"), 'utf8')
        let expected = "import { ApplicationInstance } from \"testing-awe\";\n\nexport const applicationInstance: ApplicationInstance = ApplicationInstance.getInstance(\"testing-awe\");"
        assert.equal(content, expected)
    });

    // it.only("createFileApplicationInstance FAIL", () => {

    //     // Comprobamos que si le pasamos dos number nos muestra una excepción y no genera el fichero
    //     parser.createFileApplicationInstance(123, 123);
    //     assert.equal(exist(123), false);

    //     // Comprobamos que si no le pasamos nada nos muestra una excepción y no genera el fichero
    //     parser.createFileApplicationInstance()

    //     // Comprobamos que si metemos dos string, falla porque no existe el directorio
    //     parser.createFileApplicationInstance("1234", "data")
    //     assert.equal(exist("applicationInstance.awe.ts"), false) // Imprime por pantalla la excepción

    //     // Estos errores los controlamos, ya que este método es accesible solo por mi, y siempre que llamemos a esta función
    //     // le pasamos directorio correcto.
    // });

    it.only("logicParser CORRECT", () => {

        // Comprobamos que pasando un fichero HTML, la ruta de salida y los elementos HTML nos lo genera de forma correcta
        let elements = []
        let names = ["a", "abbr", "address", "audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h", "head", "header", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "main", "mark", "meta", "meter", "nav", "noscript", "ol", "option", "p", "pre", "progress", "q", "root", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "u", "ul", "var", "video", "wbr"]

        for (let name of names) { // Nombre de las clases
            elements.push(name[0].toUpperCase() + name.slice(1))
        }

        // Probamos para el fichero html1.html
        let html = path.join(__dirname, "materialIN", "html1.html");
        let outPath = path.join(__dirname, "materialOUT", "html1.awe.ts");
        // Generamos el fichero
        parser.logicParser(html, outPath, elements)
        // Comprobamos que ha generado el fichero
        assert.equal(exist(outPath), true)
        // Comprobamos que el contenido es el esperado
        let content = fs.readFileSync(outPath, 'utf8')
        let expected = "import * as awe from \"testing-awe\";\n\nexport const dashboardTitle = new awe.H('#dashboard_title');\nexport const dashboardDiv = new awe.Div('#dashboard_div');\nexport function dashboardADetailsHero(param1 : string) : awe.A {\n\tlet id : string = '#' + 'dashboard_a_details_hero_' + param1;\n\treturn new awe.A(id)\n};\nexport function dashboardDivDetailHero(param1 : string) : awe.Div {\n\tlet id : string = '#' + 'dashboard_div_detail_hero_' + param1;\n\treturn new awe.Div(id)\n};\nexport function dashboardH4DetailHeroName(param1 : string) : awe.H {\n\tlet id : string = '#' + 'dashboard_h4_detail_hero_name_' + param1;\n\treturn new awe.H(id)\n};\n"
        assert.equal(content, expected);

        // Probamos para el fichero html2.html
        html = path.join(__dirname, "materialIN", "html2.html");
        outPath = path.join(__dirname, "materialOUT", "html2.awe.ts");
        // Generamos el fichero
        parser.logicParser(html, outPath, elements)
        // Comprobamos que ha generado el fichero
        assert.equal(exist(outPath), true)
        // Comprobamos que el contenido es el esperado
        content = fs.readFileSync(outPath, 'utf8');
        expected = "import * as awe from \"testing-awe\";\n\nexport const messagesDiv = new awe.Div('#messages_div');\nexport const messagesH2 = new awe.H('#messages_h2');\nexport const messagesButtonClear = new awe.Button('#messages_button_clear');\nexport const messagesDiv1 = new awe.Div('#messages_div1');\n"
        assert.equal(content, expected);
    });

    // it.only("logicParser FAIL", () => {

    //     let elements = []
    //     let names = ["a", "abbr", "address", "audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h", "head", "header", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "main", "mark", "meta", "meter", "nav", "noscript", "ol", "option", "p", "pre", "progress", "q", "root", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "u", "ul", "var", "video", "wbr"]

    //     for (let name of names) { // Nombre de las clases
    //         elements.push(name[0].toUpperCase() + name.slice(1))
    //     }

    //     // Comprobamos que si le pasamos number en los tres parámetros, falla y salta una excepción la cual la vemos en la consola
    //     parser.logicParser(123, 123, elements);
    //     assert.equal(exist(123), false);

    //     // Comprobamos que si le pasamos al primero un number y al segundo la ruta lo genera
    //     remove(path.join(__dirname, "materialOUT", "123.awe.ts"));
    //     parser.logicParser(123, path.join(__dirname, "materialOUT", "123.awe.ts"), elements);
    //     assert.equal(exist(path.join(__dirname, "materialOUT", "123.awe.ts")), true);
    //     // Comprobamos su contenido
    //     let content = fs.readFileSync(path.join(__dirname, "materialOUT", "123.awe.ts"), 'utf8')
    //     let expected ="import * as awe from \"testing-awe\";\n\n";
    //     assert.equal(content, expected);

    //     // Comprobamos que si le pasamos al primero la ruta html, y al segundo el número falla
    //     parser.logicParser(path.join(__dirname, "materialIN", "html1.html"), 123, elements);
    //     assert.equal(exist(123), false);

    //     // Estos errores están controlados, ya que este método es solo accesible por mi, y solo llamamos a este método cuando
    //     // tenemos dos proyectos válidos, y si hemos encontrado un archivo HTML, por lo que siempre le pasamos string con rutas adecuadas.
    // });

});
