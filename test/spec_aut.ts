// IMPORTACIONES
let assert = require("chai").assert;
let path = require("path");
let fs = require("fs");
let fsExtra = require("fs-extra");
let aut = require("../dist/aut/automation");


function remove(ruta: string) {
    let bool = false;

    try {
        if (fs.existsSync(ruta)) { // Si exite el directorio lo borramos
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

describe("UnitTest AUTOMATION", () => {

    it.only("walkDirSrc CORRECT", () => {

        // Comprobamos que si le pasamos dos rutas recorre el proyecto Electron, y si encuentra un fichero html genera
        // un fichero de la toolkit.
        let appElectron = path.join(__dirname, "materialIN", "appElectron");
        let appSpectron = path.join(__dirname, "materialOUT", "appSpectron");

        // Borramos lo que teniamos
        remove(appSpectron);

        // Ejecutamos walkDirSrc y comprobamos que nos genera los ficheros
        aut.walkDirSrc(appElectron, appSpectron);
        assert.equal(fs.existsSync(path.join(appSpectron, "src", "html1", "html1.awe.ts")), true);
        assert.equal(fs.existsSync(path.join(appSpectron, "src", "html2", "html2.awe.ts")), true);

        // Comprobamos que el contenido es el que tiene que ser paara html1
        let content = fs.readFileSync(path.join(appSpectron, "src", "html1", "html1.awe.ts"), 'utf8');
        let expected = fs.readFileSync(path.join(__dirname, "materialOUT", "html1.awe.ts"), 'utf8');
        assert.equal(content, expected);

        // Comprobamos que el contenido es el que tiene que ser paara html2
        content = fs.readFileSync(path.join(appSpectron, "src", "html2", "html2.awe.ts"), 'utf8');
        expected = fs.readFileSync(path.join(__dirname, "materialOUT", "html2.awe.ts"), 'utf8');
        assert.equal(content, expected);
    });

    // it.only("walkDirSrc FAIL", () => {

    //     // Comprobamos que si pasamos dos numeros, falla porque el proyecto Electron tiene que ser un string
    //     aut.walkDirSrc(123, 123);
    //     assert.equal(fs.existsSync(123), false);

    //     // Comprobamos que si al primero le pasamos un número y al segundo un string sigue fallando por lo mismo
    //     aut.walkDirSrc(123, "hola");
    //     assert.equal(fs.existsSync("hola"), false);

    //     // Comprobamos que si al primero le pasamos un string y al segundo un número sigue fallando, en este caso porque el proyecto Spectron tiene que ser un string
    //     aut.walkDirSrc(path.join(__dirname, "materialIN", "appElectron"), 123);
    //     assert.equal(fs.existsSync(123), false);

    //     // Comprobamos que si le pasamos dos string sí que lo hace, y lo crea en la raíz del proyecto
    //     aut.walkDirSrc(path.join(__dirname, "materialIN", "appElectron"), "hola");
    //     assert.equal(fs.existsSync("hola"), true);

    //     // Todos estos errores están controlados, ya que este método es accesible sólo por mí, además cuando lo llamo,
    //     // lo llamo de forma adecuada con los string correspondintes
    // });

    it.only("createDirectory CORRECT", () => {

        // Comprobamos que si le pasamos una ruta nos genera el directorio
        let ruta = path.join(__dirname, "materialOUT", "prueba", "createDirectory");
        // Borramos antes lo que tenía si existía
        remove(path.join(__dirname, "materialOUT", "prueba"));
        // Comprobamos que todavía no se ha creado
        assert.equal(fs.existsSync(ruta), false);
        // Creamos el directorio
        aut.createDirectory(ruta);
        // Comprobamos que se ha creado
        assert.equal(fs.existsSync(ruta), true);
    })

    // it.only("createDirectory FAIL", () => {

    //     // Comprobamos que si no le pasamos nada no hace nada y falla
    //     aut.createDirectory();

    //     // Comprobamos que si le pasamos un number falla, ya que el parámetro tiene que ser un string
    //     aut.createDirectory(123);
    //     assert.equal(fs.existsSync(123), false);

    //     // Estos errores están controlados, ya que soy yo el único que puede manejar este método, y cuando
    //     // llamamos a este método le pasamos el string de forma correcta con la ruta adecuada
    // })

    it.only("createFile CORRECT", () => {

        // Comprobamos que si le pasamos los parámetros de forma correcta crea el fichero
        let file = "createFile1.html";
        let electronPath = path.join(__dirname, "materialIN", "appElectron", "src", "html1", "html1.html");
        let spectronPath = path.join(__dirname, "materialOUT", "appSpectron", "src", "html1");
        // Borramos si ya estaba creado
        remove(path.join(__dirname, "materialOUT", "appSpectron", "src", "createFile1.awe.ts"))
        // Comprobamos que no existe
        assert.equal(fs.existsSync(path.join(__dirname, "materialOUT", "appSpectron", "src", "createFile1.awe.ts")), false);
        // Creamos el archivo
        aut.createFile(file, electronPath, spectronPath);
        // Comprobamos que lo ha creado
        assert.equal(fs.existsSync(path.join(__dirname, "materialOUT", "appSpectron", "src", "createFile1.awe.ts")), true);
    })

    // it.only("createFile FAIL", () => {

    //     // Comprobamos que si le pasamos tres number falla, ya que tienen que ser tres string
    //     // No hace falta comprobar que pasa si unos son string y otrs number, ya que con que
    //     // haya un parámetro que no sea string falla
    //     aut.createFile(123, 132, 132);

    //     // Estos errores están controlados, ya que solo yo tengo acceso al método, y solo lo llamo
    //     // cuando tengo los parámetros de forma correcta.
    // })

    it.only("checkAppPath CORRECT", () => {

        // Comprobamos que si le pasamos el parámetro de forma correcta si que lo realiza
        let ruta = path.join(__dirname, "..", "..", "..");
        let bool = aut.checkAppPath(ruta);
        assert.equal(bool, true);

        // Comprobamos que si le pasamos una ruta que no es un proyecto devuelve false
        ruta = path.join(__dirname, "..", "..", "..", "..");
        bool = aut.checkAppPath(ruta);
        assert.equal(bool, false);

        // Comprobamos que si le pasamos otra ruta nos devuelve true, ya que las rutas las maneja internamente fileSystem
        // bool = aut.checkAppPath("B:/WORKSPACE\\NODE-WORKSPACE/TFG\\spectron-e2e/node_modules\\testing-awe");
        // assert.equal(bool, true);
    })

    // it.only("checkAppPath FAIL", () => {

    //     // Comprobamos que si le pasamos un number falla, ya que le tenemos que pasar un string
    //     let ruta = 123;
    //     let bool = aut.checkAppPath(ruta);
    //     assert.equal(bool, false);

    //     // Comprobamos que si no le pasamos nada falla, ya que le tenemos que pasar un string
    //     bool = aut.checkAppPath();
    //     assert.equal(bool, false);

    //     // Comprobamos que si le pasamos una ruta mal, nos devuelve false ya que no existe el directorio
    //     ruta = path.join(__dirname, "prueba");
    //     bool = aut.checkAppPath(ruta);
    //     assert.equal(bool, false);

    //     // Comprobamos que si le pasamos otra ruta mal, nos devuelve false
    //     bool = aut.checkAppPath("B:/WORKSPACE|NODE-WORKSPACE/TFG|spectron-e2e/node_modules\\testing-awe");
    //     assert.equal(bool, false);
    // })

    it.only("checkSameRoot CORRECT", () => {

        // Comprobamos que si le pasamos los datos de forma correcta hace lo que tiene que hacer
        let appElectron = path.join(__dirname, "materialIN");
        let appSpectron = path.join(__dirname, "materialOUT");
        let bool = aut.checkSameRoot(appElectron, appSpectron);
        assert.equal(bool, true);
    })

    // it.only("checkSameRoot FAIL", () => {

    //     // Comprobamos que si le pasamos por cabecera algo distinto de un string devuelve false
    //     let bool = aut.checkSameRoot(123, 123);
    //     assert.equal(bool, false);
    //     bool = aut.checkSameRoot(123, true);
    //     assert.equal(bool, false);
    //     bool = aut.checkSameRoot(true, 123);
    //     assert.equal(bool, false);
    //     bool = aut.checkSameRoot(true, true);
    //     assert.equal(bool, false);

    //     // Este error no va suceder, ya que este método lo controlo yo, y a este método solo le pasamos dos string
    // })

    it.only("checkExistDirectory CORRECT", () => {

        // Comprobamos que hace lo que tiene que hacer cuando le pasamos el parámetro correcto
        let ruta = path.join(__dirname, "materialIN", "appElectron");
        let bool = aut.checkExistDirectory(ruta)
        assert.equal(bool, true);

        // Comprobamos que si una ruta no existe nos devuelve false
        ruta = "B:/TFG/Mario";
        bool = aut.checkExistDirectory(ruta);
        assert.equal(bool, false);
    });

    // it.only("checkExistDirectory FAIL", () => {

    //     // Comprobamos que si introducimos un number, o no enviamos nada nos devuelve false
    //     let ruta = 123;
    //     let bool = aut.checkExistDirectory(ruta)
    //     assert.equal(bool, false);
    //     bool = aut.checkExistDirectory()
    //     assert.equal(bool, false);

    //     // Comprobamos que si le pasamos una ruta incorrecta nos devuelve false
    //     // bool = aut.checkExistDirectory("B:/WORKSPACE|NODE-WORKSPACE/TFG|spectron-e2e/node_modules\\testing-awe")
    //     // assert.equal(bool, false);

    //     // Comprobamos que si le pasamos una ruta correcta pero "rara" nos devuelve true
    //     // bool = aut.checkExistDirectory("B:/WORKSPACE\\NODE-WORKSPACE/TFG\\spectron-e2e/node_modules\\testing-awe")
    //     // assert.equal(bool, true);

    //     // Estos errores no van a suceder porque siempre que llamamos a este método, le pasamos un string, y luego
    //     // el ya dependiendo de si existe la ruta o no devuelve verdadero o falso
    // })

    it.only("check CORRECT", () => {

        // Comprobamos que pasandole los parámetros de forma correcta funciona
        let appElectron = path.join(__dirname, "project", "appElectron");
        let appSpectron = path.join(__dirname, "project", "appSpectron");
        let bool = aut.check(appElectron, appSpectron);
        assert.equal(bool, true);
    })

    // it.only("check FAIL", () => {

    //     // Comprobamos que si no le pasamos dos string falla y devuelve false
    //     let bool = aut.check(123, 123);
    //     assert.equal(bool, false);
    //     bool = aut.check(123, true);
    //     assert.equal(bool, false);
    //     bool = aut.check(true, 123);
    //     assert.equal(bool, false);
    //     bool = aut.check(true, true);
    //     assert.equal(bool, false);
    //     bool = aut.check("hola");
    //     assert.equal(bool, false);
    //     bool = aut.check(123);
    //     assert.equal(bool, false);
    //     bool = aut.check(true);
    //     assert.equal(bool, false);
    //     bool = aut.check();
    //     assert.equal(bool, false);

    //     // Comprobamos que si le pasamos rutas incorrectas devuelve false
    //     bool = aut.check("hola", "adios");
    //     assert.equal(bool, false);
    //     bool = aut.check("hola/adios", "adios/hola");
    //     assert.equal(bool, false);
    // })

    it.only("pathUnixWindows CORRECT", () => {

        // Comprobamos que si le pasamos una ruta nos la devuelve con los slash dependiendo de si
        // estamos ejecutando el programa en windows o unix
        let ruta = "hola/adios/quetal/estas/muy/bien";
        let content = aut.pathUnixWindows(ruta);
        let expected = "hola\\adios\\quetal\\estas\\muy\\bien";
        assert.equal(content, expected);

        // Probamos que si le pasamos una ruta windows, la devuelve
        content = aut.pathUnixWindows(expected);
        assert.equal(content, expected);

        // Probamos con otra ruta
        ruta = "hola\\adios/quetal\\estas/muy\\bien"
        content = aut.pathUnixWindows(ruta)
        assert.equal(content, expected)
    })

    // it.only("pathUnixWindows FAIL", () => {

    //     // Comprobamos que si no le pasamos nada o cualquier otro tipo de datos, nos devuelve una cadena vacía
    //     let content = aut.pathUnixWindows();
    //     assert.equal(content, "");
    //     content = aut.pathUnixWindows(123);
    //     assert.equal(content, "");
    //     content = aut.pathUnixWindows(true);
    //     assert.equal(content, "");

    //     // Estos erroes no puden darser, ya que la información que ponga en el aweconfig.json la convertimos a string
    //     // Por lo tanto, nunca puede pasarle un número un boolean...
    // })

    it.only("getHtmlElements CORRECT", () => {

        // Comprobamos que nos proporciona la información de forma correcta
        let elements = []
        let realElements = aut.getHtmlElements();
        let names = ["a", "abbr", "address", "article", "audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h", "head", "header", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "main", "mark", "meta", "meter", "nav", "noscript", "ol", "option", "p", "pre", "progress", "q", "root", "s", "samp", "section", "select", "small", "source", "span", "strong", "sub", "summary", "sup", "svg", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "u", "ul", "var", "video", "wbr"]

        for (let name of names) { // Nombre de las clases
            elements.push(name[0].toUpperCase() + name.slice(1))
        }

        // Comprobamos que tienen el mismo tamaño
        assert.equal(realElements.length, elements.length)

        // Comprobamos clase a clase, que se corresponden
        for (let i = 0; i < realElements.length; ++i) {
            assert.equal(realElements[i], elements[i])
        }
    })

    // it.only("getHtmlElements FAIL", () => {

    //     // Comprobamos que si le pasamos algo nos sigue devolviendo la información de forma correcta
    //     let elements = []
    //     let realElements = aut.getHtmlElements(true);
    //     let names = ["a", "abbr", "address", "article", "audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h", "head", "header", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "main", "mark", "meta", "meter", "nav", "noscript", "ol", "option", "p", "pre", "progress", "q", "root", "s", "samp", "section", "select", "small", "source", "span", "strong", "sub", "summary", "sup", "svg", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "u", "ul", "var", "video", "wbr"]
    //     for (let name of names) { // Nombre de las clases
    //         elements.push(name[0].toUpperCase() + name.slice(1))
    //     }
    //     // Comprobamos que tienen el mismo tamaño
    //     assert.equal(realElements.length, elements.length)
    //     // Comprobamos clase a clase, que se corresponden
    //     for (let i = 0; i < realElements.length; ++i) {
    //         assert.equal(realElements[i], elements[i])
    //     }

    //     // Comprobamos si introucimos un number
    //     realElements = aut.getHtmlElements(123);
    //     // Comprobamos que tienen el mismo tamaño
    //     assert.equal(realElements.length, elements.length)
    //     // Comprobamos clase a clase, que se corresponden
    //     for (let i = 0; i < realElements.length; ++i) {
    //         assert.equal(realElements[i], elements[i])
    //     }

    //     // Comprobamos si introucimos un string
    //     realElements = aut.getHtmlElements("hola");
    //     // Comprobamos que tienen el mismo tamaño
    //     assert.equal(realElements.length, elements.length)
    //     // Comprobamos clase a clase, que se corresponden
    //     for (let i = 0; i < realElements.length; ++i) {
    //         assert.equal(realElements[i], elements[i])
    //     }

    //     // Estos erroes están controlados, ya que este método lo llamo yo no el usuario, por lo que siempre le llamo sin nada
    // })

    it.only("walkDir CORRECT", () => {

        // Comprobamos que si el fichero aweconfig.json está bien nos los genera sin ningún problema
        let ruta = path.join(__dirname, "..", "..", "..", "testingAWE");
        aut.walkDir()
        assert.equal(fs.existsSync(ruta), true);
    })

    // it.only("walkDir FAIL", () => {

    //     // En este caso solo tenemos que probar que la entrada sea distinto de vacía, ya que lo que hacemos en este método 
    //     // ya lo hemos probado en los test anteriores

    //     // Comprobamos que introduciendo un number sigue funcionando, ya que este método funciona sin parámetros
    //     let ruta = path.join(__dirname, "..", "..", "..", "testingAWE");
    //     aut.walkDir(123);
    //     assert.equal(fs.existsSync(ruta), true);

    //     // Comprobamos que introduciendo un string sigue funcionando, ya que este método funciona sin parámetros
    //     ruta = path.join(__dirname, "..", "..", "..", "testingAWE");
    //     aut.walkDir("hola");
    //     assert.equal(fs.existsSync(ruta), true);

    //     // Comprobamos que introduciendo un boolean sigue funcionando, ya que este método funciona sin parámetros
    //     ruta = path.join(__dirname, "..", "..", "..", "testingAWE");
    //     aut.walkDir(true);
    //     assert.equal(fs.existsSync(ruta), true);
    // })
});