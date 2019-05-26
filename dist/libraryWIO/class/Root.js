"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// IMPORTACIONES
const ApplicationInstance_1 = require("../ApplicationInstance");
class Root {
    // CONSTRUCTOR
    constructor(id) {
        this.id = id;
    }
    // MÉTODOS
    // Obtener el cliente de la aplicación
    getClient() {
        return ApplicationInstance_1.ApplicationInstance.getInstance(ApplicationInstance_1.ApplicationInstance.getNameProject()).getClient();
    }
    // Obtener el selector
    getSelector() {
        return this.id;
    }
    // Obtener un atributo de la etiqueta
    getAttribute(attribute) {
        return __awaiter(this, void 0, void 0, function* () {
            let attributeName = "";
            try {
                attributeName = yield this.getClient().getAttribute(this.id, attribute);
            }
            catch (error) {
                console.log(error);
            }
            return attributeName;
        });
    }
    // Obtener el HTML del selector
    getHTML(includeSelectorTag = true) {
        return __awaiter(this, void 0, void 0, function* () {
            let html = "";
            try {
                html = yield this.getClient().getHTML(this.id, includeSelectorTag);
            }
            catch (error) {
                console.log(error);
            }
            return html;
        });
    }
    // Obtener la localización de un elemento
    getLocation(axis) {
        return __awaiter(this, void 0, void 0, function* () {
            let location;
            try {
                location = yield this.getClient().$(this.id).getLocation(axis);
            }
            catch (error) {
                console.log(error);
            }
            return location;
        });
    }
    // Obtener la propiedad de un elemento
    getTagName() {
        return __awaiter(this, void 0, void 0, function* () {
            let tag = "";
            try {
                tag = yield this.getClient().getTagName(this.id);
            }
            catch (error) {
                console.log(error);
            }
            return tag;
        });
    }
    // Obtener el alto y/o ancho de un elemento
    getElementSize(prop) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getClient().getElementSize(this.id, prop);
        });
    }
    // Obtener las propiedades css
    getCSSProperty(cssProperty) {
        return __awaiter(this, void 0, void 0, function* () {
            let css = "";
            try {
                css = yield this.getClient().getCssProperty(this.id, cssProperty);
            }
            catch (error) {
                console.log(error);
            }
            return css;
        });
    }
    // Método para obtener el número de elementos
    getCount(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            let count = 0;
            try {
                if (selector.length !== 0) {
                    count = yield this.getClient().elements(selector).then((res) => {
                        return res.value.length;
                    });
                }
                else {
                    count = yield this.getClient().elements(this.id).then((res) => {
                        return res.value.length;
                    });
                }
            }
            catch (error) {
                console.log(error);
            }
            return count;
        });
    }
    // Método para obtener el texto
    getText() {
        return __awaiter(this, void 0, void 0, function* () {
            let text = "";
            try {
                text = yield this.getClient().getText(this.id);
            }
            catch (error) {
                console.log(error);
            }
            return text;
        });
    }
    // Obtener si un elemento está habilitado o no
    isEnabled() {
        return __awaiter(this, void 0, void 0, function* () {
            let isEnabled = false;
            try {
                isEnabled = yield this.getClient().isEnabled(this.id);
            }
            catch (error) {
                console.log(error);
            }
            return isEnabled;
        });
    }
    // Obtener si un elemento está visible o no
    isVisible() {
        return __awaiter(this, void 0, void 0, function* () {
            let isVisible = false;
            try {
                isVisible = yield this.getClient().isVisible(this.id);
            }
            catch (error) {
                console.log(error);
            }
            return isVisible;
        });
    }
    // Devuelve verdadero si un elemento está visible y dentro de la ventana gráfica
    isVisibleWithinViewport() {
        return __awaiter(this, void 0, void 0, function* () {
            let isVisibleWithinViewport = false;
            try {
                isVisibleWithinViewport = yield this.getClient().isVisibleWithinViewport(this.id);
            }
            catch (error) {
                console.log(error);
            }
            return isVisibleWithinViewport;
        });
    }
    // Obtener si un elemento existe o no
    isExisting() {
        return __awaiter(this, void 0, void 0, function* () {
            let isExisting = false;
            try {
                isExisting = yield this.getClient().isExisting(this.id);
            }
            catch (error) {
                console.log(error);
            }
            return isExisting;
        });
    }
    // Obtiene si el elemnto HTML tiene focus o no
    hasFocus() {
        return __awaiter(this, void 0, void 0, function* () {
            let hasFocus = false;
            try {
                hasFocus = yield this.getClient().hasFocus(this.id);
            }
            catch (error) {
                console.log(error);
            }
            return hasFocus;
        });
    }
    // Arrastrar un elemento o otro destino (selector)
    // async dragAndDrop(destination: string) {
    //     return this.getClient().dragAndDrop(this.id, destination);
    // }
    // Mover el ratón un offset a partir de un elemento
    // async moveToObject(xoffset?: number, yoffset?: number) {
    //     return await this.getClient().moveToObject(this.id, xoffset, yoffset);
    // }
    // Esparar a que un elemento esté (in))visible en x milisegundos
    waitForVisible(miliseconds, reverse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.getClient().waitForVisible(this.id, miliseconds, reverse);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    // Esperar a que un elemento esté (des)habilitado en x milisegundos
    waitForEnabled(miliseconds, reverse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.getClient().waitForEnabled(this.id, miliseconds, reverse);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    // Esparar a que un elemento exista en el árbol DOM en x milisegundos
    waitForExist(miliseconds, reverse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.getClient().waitForExist(this.id, miliseconds, reverse);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    // Método para comprobar el selector
    checkSelector(id) {
        let check = false;
        let selector = "";
        try {
            selector = this.getSelector();
            if (selector === id) {
                check = true;
            }
        }
        catch (error) {
            console.log(error);
        }
        return check;
    }
    // Método para comprobar un atributo
    checkAttribute(attributeName) {
        return __awaiter(this, void 0, void 0, function* () {
            let check = false;
            let attribute = "";
            try {
                attribute = yield this.getAttribute(attributeName);
                if (attribute === attributeName) {
                    check = true;
                }
            }
            catch (error) {
                console.log(error);
            }
            return check;
        });
    }
    // Método para comprobar el HTML
    checkHTML(html, includeSelectorTag = true) {
        return __awaiter(this, void 0, void 0, function* () {
            let check = false;
            let sHtml = "";
            try {
                sHtml = yield this.getHTML(includeSelectorTag);
                if (sHtml === html) {
                    check = true;
                }
            }
            catch (error) {
                console.log(error);
            }
            return check;
        });
    }
    // Método para comprobar la localización
    checkLocation(x, y) {
        return __awaiter(this, void 0, void 0, function* () {
            let check = false;
            let location = undefined;
            let sX = 0;
            let sY = 0;
            try {
                location = yield this.getLocation();
                sX = location.x;
                sY = location.y;
                if ((sX === x) && (sY === y)) {
                    check = true;
                }
            }
            catch (error) {
                console.log(error);
            }
            return check;
        });
    }
    // Método para comprobar el nombre de la etiqueta HTML
    checkTagNAme(tagName) {
        return __awaiter(this, void 0, void 0, function* () {
            let check = false;
            let tag = "";
            try {
                tag = yield this.getTagName();
                if (tag === tagName) {
                    check = true;
                }
            }
            catch (error) {
                console.log(error);
            }
            return check;
        });
    }
    // Método para comprobar el ancho y alto de un elemento
    checkElementSize(width, height) {
        return __awaiter(this, void 0, void 0, function* () {
            let check = false;
            let sWidth = 0;
            let sHeight = 0;
            try {
                sWidth = yield this.getElementSize('width');
                sHeight = yield this.getElementSize('height');
                if ((sWidth === width) && (sHeight === height)) {
                    check = true;
                }
            }
            catch (error) {
                console.log(error);
            }
            return check;
        });
    }
    // Método para comprobar el número de elementos
    checkCount(number, selector) {
        return __awaiter(this, void 0, void 0, function* () {
            let check = false;
            let count = 0;
            try {
                count = yield this.getCount(selector);
                if (count === number) {
                    check = true;
                }
            }
            catch (error) {
                console.log(error);
            }
            return check;
        });
    }
    // Método para comprobar el testo de un elemeto
    checkText(text) {
        return __awaiter(this, void 0, void 0, function* () {
            let check = false;
            let texto = "";
            try {
                texto = yield this.getText();
                if (texto === text) {
                    check = true;
                }
            }
            catch (error) {
                console.log(error);
            }
            return check;
        });
    }
}
exports.Root = Root;
