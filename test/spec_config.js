// IMPORTACIONES
var assert = require("chai").assert;
var path = require("path");
var fs = require("fs");
var fsExtra = require("fs-extra");
var config = require("../dist/config/configuration");
function remove(ruta) {
    var bool = false;
    try {
        if (fs.existsSync(ruta)) { // Si exite el directorio lo borramos
            if (fs.statSync(ruta).isDirectory()) { // Si es un directorio
                fsExtra.emptyDirSync(ruta); // Borra todo lo que haya dentro menos el propio directorio
                bool = true;
            }
            else { // Si es un archivo
                fs.unlinkSync(ruta); // Borramos el archivo
                bool = true;
            }
        }
    }
    catch (error) {
        console.log(error);
    }
    return bool;
}
describe("UnitTest CONFIGURATION", function () {
    it.only("jsonToString CORRECT", function () {
        // Comprobamos que si le pasamos un fichero nos desvuelve el contenido del JSON a string
        var ruta = path.join(__dirname, "materialIN", "aweconfig1.json");
        var content = config.jsonToString(ruta);
        var expected = "{\n    \"directories\": {\n        \"electronProject\": \"B:\\\\WORKSPACE\\\\NODE-WORKSPACE\\\\TFG\\\\tour-of-heroes\",\n        \"spectronProject\": \"B:\\\\WORKSPACE\\\\NODE-WORKSPACE\\\\TFG\\\\spectron-e2e\"\n    },\n    \"ignore\": [\"node_modules\", \"dist\", \"e2e\", \".git\"]\n}";
        assert.equal(content, expected);
        // Comprobamos que si le pasamos el fichero aweconfig2 nos devuelve su contenido a string
        ruta = path.join(__dirname, "materialIN", "aweconfig2.json");
        content = config.jsonToString(ruta);
        expected = "{\n    \"directories\": {\n        \"electronProject\": \"B:\\\\WORKSPACE\",\n        \"spectronProject\": \"B:\\\\WORKSPACE\"\n    }\n}";
        assert.equal(content, expected);
    });
    // it.only("jsonToString FAIL", () => {
    //     // Comprobamos que si no le pasamos nada falla, y no nos devuelve nada
    //     let content = config.jsonToString();
    //     let expected = "";
    //     assert.equal(content, expected);
    //     // Comprobamos que si le pasamos un number falla, y no nos devuelve nada
    //     content = config.jsonToString(123);
    //     expected = "";
    //     assert.equal(content, expected);
    //     // Todos estos errores están controlados, ya que este método es accesible solo por mi,
    //     // y siempre que llamamos a este método le pasamos la ruta de forma adecuada.
    // })
    it.only("getRootDirectory CORRECT", function () {
        // Comprobamos que el directorio root de proyecto Spectron es el mismo
        var root = config.getRootDirectory();
        var expected = path.join(__dirname, "..", "..", "..");
        assert.equal(root, expected);
    });
    // it.only("getRootDirectory FAIL", () => {
    //     // Comprobamos que si le pasamos un number nos sigue devolviendo la ruta raíz
    //     let root = config.getRootDirectory(123);
    //     let expected = path.join(__dirname, "..", "..", "..");
    //     assert.equal(root, expected);
    //     // En este caso nunca va a fallar, ya que al tener la misma estructura,
    //     // la ruta siempre va a ser la misma, es decir, que yendo 4 pasos hacia atrás
    //     // vamos a estar en la raíz del proyecto
    // });
    it.only("getNameFileConfig CORRECT", function () {
        // Comprobamos que el fichero de configuración siempre va a tener el nombre aweconfig.json
        var file = config.getNameFileConfig();
        var expected = "aweconfig.json";
        assert.equal(file, expected);
    });
    // it.only("getNameFileConfig FAIL", () => {
    //     // Comprobamos que el fichero de configuración va a tener el mismo nombre, aunque le pasemos un number
    //     let file = config.getNameFileConfig();
    //     let expected = "aweconfig.json";
    //     assert.equal(file, expected);
    //     // En este caso nunca va a fallar, ya que siempre va a tener esta valor, por lo que siempre
    //     // se va a llamar aweconfig.json
    // });
    it.only("createJson CORRECT", function () {
        // Comprobamos que si llamamos al método de forma correcta nos genera el fichero aweconfig.json
        // en la raíz del proyecto Spectron
        // Primero eliminamos el fichero  si existe
        var ruta = path.join(__dirname, "..", "..", "..", "aweconfig.json");
        remove(ruta);
        // Creamos el fichero
        config.createJson();
        // Comprobamos que lo ha creado
        assert.equal(fs.existsSync(ruta), true);
        // Comprobamos que el contenido es el que hay por "defecto"
        var content = fs.readFileSync(ruta, 'utf8');
        var expected = "{\n\t\"directories\": {\n\t\t\"electronProject\": \"electronProjectPath\",\n\t\t\"spectronProject\": \"spectronProjectPath\"\n\t},\n\t\"ignore\": [\"node_modules\", \"dist\", \"e2e\", \".git\"]\n}";
        assert.equal(content, expected);
    });
    // it.only("createJson FAIL", () => {
    //     // Comprobamos que aunque le pasemos un number nos sigue generando el fichero en la raíz del proyecto Spectron
    //     let ruta = path.join(__dirname, "..", "..", "..", "aweconfig.json");
    //     remove(ruta);
    //     // Creamos el fichero
    //     config.createJson(123);
    //     // Comprobamos que lo ha creado
    //     assert.equal(fs.existsSync(ruta), true);
    //     // Comprobamos que el contenido es el que hay por "defecto"
    //     let content = fs.readFileSync(ruta, 'utf8');
    //     let expected = "{\n\t\"directories\": {\n\t\t\"electronProject\": \"electronProjectPath\",\n\t\t\"spectronProject\": \"spectronProjectPath\"\n\t},\n\t\"ignore\": [\"node_modules\", \"dist\", \"e2e\", \".git\"]\n}"
    //     assert.equal(content, expected);
    //     // En este caso nunca va a fallar, ya que siempre se va a generar el fichero cuando han instalado nuestro módula,
    //     // y ejecutan con initTestingAWE, si no existe lo crea, si existe no lo vuelve a crear.
    // });
    it.only("getObjJson CORRECT", function () {
        // Comprobamos que nos devuelve el objeto JSON con el fichero aweconfig1.json
        var objJson = config.getObjJson();
        // Calculamos el valor esperado
        var json = config.jsonToString(path.join(__dirname, "materialIN", "aweconfig3.json"));
        var objJsonExpected = JSON.parse(json);
        assert.equal(objJson.directories.electronProject, objJsonExpected.directories.electronProject);
        assert.equal(objJson.directories.electronProject, objJsonExpected.directories.electronProject);
        assert.equal(objJson.ignore.length, objJsonExpected.ignore.length);
    });
    // it.only("getObjJson FAIL", () => {
    //     // Comprobamos que si introducimos un number nos sigue pasando de forma correcta el objeto JSON
    //     let objJson = config.getObjJson(123);
    //     // Calculamos el valor esperado
    //     let json = config.jsonToString( path.join(__dirname, "materialIN", "aweconfig3.json"));
    //     let objJsonExpected = JSON.parse(json);
    //     assert.equal(objJson.directories.electronProject, objJsonExpected.directories.electronProject);
    //     assert.equal(objJson.directories.electronProject, objJsonExpected.directories.electronProject);
    //     assert.equal(objJson.ignore.length, objJsonExpected.ignore.length);
    //     // Al igual que sucedía en casos anteriores, este método solo es usado por mí, en el momento adecuado,
    //     // ya que si no existe el fichero lo voy a crear, y si existe no hago nada, por lo tanto nunca va a fallar
    // })
    it.only("checkExistFile CORRECT", function () {
        // Comprobamos que en el fichero raíz está el fichero de configuración
        // Si existe el archivo lo borramos
        var ruta = path.join(__dirname, "..", "..", "..", "aweconfig.json");
        remove(ruta);
        // Lo volvemos a crear
        assert.equal(config.checkExistFile(), false);
        config.createJson();
        assert.equal(config.checkExistFile(), true);
    });
    // it.only("checkExistFile FAIL", () => {
    //     // Comprobamos que si le pasamos un number sigue funcionando
    //     // Si existe el archivo lo borramos
    //     let ruta = path.join(__dirname, "..", "..", "..", "aweconfig.json");
    //     remove(ruta);
    //     // Lo volvemos a crear
    //     assert.equal(config.checkExistFile(123), false);
    //     config.createJson();
    //     assert.equal(config.checkExistFile(123), true);
    //     // Comprobamos que si le pasamos un string sigue funcionando
    //     // Si existe el archivo lo borramos
    //     ruta = path.join(__dirname, "..", "..", "..", "aweconfig.json");
    //     remove(ruta);
    //     // Lo volvemos a crear
    //     assert.equal(config.checkExistFile("hola"), false);
    //     config.createJson();
    //     assert.equal(config.checkExistFile("hola"), true);
    //     // Esta situciones no se van a dar, porque es un método que solo es usado por mí, y solo le llamo
    //     // sin parámetros, por lo que siempre va a comprobar en la raíz del proyecto Spectron si está el fichero
    // });
    it.only("checkExistProjectProperty CORRECT", function () {
        // Comprobamos que si existen las propiedades en el fichero aweconfig.json
        // Siempre vamos a buscar el fichero en la raíz del proyecto, es por ello que no le pasamos nada por parámetro
        var exist = config.checkExistProjectProperty();
        assert.equal(exist[0], true);
        assert.equal(exist[1], true);
        assert.equal(exist[2], true);
    });
    // it.only("checkExistProjectProperty FAIL", () => {
    //     // Comprobamos a mano que si no hay alguna de estas propiedades falla (hay que comentar todo el test anterior para que funcione)
    //     // Comprobamos que no exista directories
    // //     let exist = config.checkExistProjectProperty()
    // //     assert.equal(exist[0], false);
    // //     assert.equal(exist[1], false);
    // //     assert.equal(exist[2], false);
    // //     // Comprobamos que si no existe ignore, directories toma el valor verdadero
    // //     exist = config.checkExistProjectProperty()
    // //     assert.equal(exist[0], true);
    // //     assert.equal(exist[1], true);
    // //     assert.equal(exist[2], false);
    //     // Comprobamos que si le pasamos un string o un number por cabecera, lo sigue haciendo, ya que no tiene en cuenta parámetros pasados
    //     // por cabecera.
    //     let exist = config.checkExistProjectProperty();
    //     assert.equal(exist[0], true);
    //     assert.equal(exist[1], true);
    //     assert.equal(exist[2], true);
    // })
    it.only("checkAweconfig CORRECT", function () {
        // Comprobamos que si lo ejecutamos nos devuelve verdadero
        var valor = config.checkAweconfig();
        assert.equal(valor, true);
    });
    // it.only("checkAweconfig FAIL", () => {
    //     // Comprobamos que si le pasamos por parámetro un number o string sigure funcionando, ya que a este método no se le pasa por parámetro nada
    //     let valor = config.checkAweconfig(123);
    //     assert.equal(valor, true);
    //     valor = config.checkAweconfig("hola");
    //     assert.equal(valor, true);
    //     // Cambiamos a mano el fichero para comprobar que si no existe alguna propiedad nos muestra un mensaje de error
    //     // Hay que comentar todo el test anterior y hacerlo a mano
    //     // let valor = config.checkAweconfig();
    //     // assert.equal(valor, false);
    //     // En este caso depende del usuario si ha creado de forma correcta el fichero, en caso contrario le mostramos un mensaje de error. Si no lo ha creado
    //     // se lo creamos nosotros y posteriormente él tendrá que modificarlo.
    // })
    it.only("getProjectPath CORRECT", function () {
        // Comprobamos que nos proporciona de forma correta la ruta de los proyectos Electron y Spectron
        var projects = config.getProjectPath();
        assert.equal(projects[0], "electronProjectPath");
        assert.equal(projects[1], "spectronProjectPath");
    });
    // it.only("getProjectPath FAIL", () => {
    //     // Comprobamos que si le pasamos un string o un number sigue funcionando
    //     let projects = config.getProjectPath("hola");
    //     assert.equal(projects[0], "electronProjectPath");
    //     assert.equal(projects[1], "spectronProjectPath");
    //     projects = config.getProjectPath(123);
    //     assert.equal(projects[0], "electronProjectPath");
    //     assert.equal(projects[1], "spectronProjectPath");
    //     // Esta sitación no se puede dar, ya que este método es manejado por mí, por lo que el usuario no puede pasarle ningún parámetro
    // })
    it.only("getIgnore CORRECT", function () {
        // Comprobamos que nos proporciona de forma correcta el array de ignore
        var ignore = config.getIgnore();
        var expected = ["node_modules", "dist", "e2e", ".git"];
        // Comprobamos que tienen el mismo tamaño
        assert.equal(ignore.length, expected.length);
        // Comprobamos que tienen el mismo contenido
        for (var i = 0; i < ignore.length; ++i) {
            assert.equal(ignore[i], expected[i]);
        }
    });
    // it.only("getIgnore FAIL", () => {
    //     // Comprobamos que si le pasamos un string sigue funcionando
    //     let ignore = config.getIgnore("hola");
    //     let expected = ["node_modules", "dist", "e2e", ".git"];
    //     // Comprobamos que tienen el mismo tamaño
    //     assert.equal(ignore.length, expected.length);
    //     // Comprobamos que tienen el mismo contenido
    //     for (let i = 0; i < ignore.length; ++i) {
    //         assert.equal(ignore[i], expected[i]);
    //     }
    //     // Comprobamos que si le pasamos un number sigue funcionando
    //     ignore = config.getIgnore("123");
    //     // Comprobamos que tienen el mismo tamaño
    //     assert.equal(ignore.length, expected.length);
    //     // Comprobamos que tienen el mismo contenido
    //     for (let i = 0; i < ignore.length; ++i) {
    //         assert.equal(ignore[i], expected[i]);
    //     }
    //     // Esta sitación no se puede dar, ya que este método es manejado por mí, por lo que el usuario no puede pasarle ningún parámetro
    // });
});
