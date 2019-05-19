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
            return yield this.getClient().getAttribute(this.id, attribute);
        });
    }
    // Obtener el HTML del selector
    getHTML(includeSelectorTag = true) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getClient().$(this.id).getHTML(includeSelectorTag);
        });
    }
    // Obtener la localización de un elemento
    getLocation(axis) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getClient().$(this.id).getLocation(axis);
        });
    }
    // Obtener la propiedad de un elemento
    getTagName() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getClient().getTagName(this.id);
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
            return yield this.getClient().$(this.id).getCssProperty(cssProperty);
        });
    }
    // Método para obtener el número de elementos
    getCount(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            if (selector.length !== 0) {
                return yield this.getClient().elements(selector).then((res) => {
                    return res.value.length;
                });
            }
            return yield this.getClient().elements(this.id).then((res) => {
                return res.value.length;
            });
        });
    }
    // Método para obtener el texto
    getText() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getClient().getText(this.id);
        });
    }
    // Obtener si un elemento está habilitado o no
    isEnabled() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getClient().isEnabled(this.id);
        });
    }
    // Obtener si un elemento está visible o no
    isVisible() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getClient().isVisible(this.id);
        });
    }
    // Obtener si un elemento existe o no
    isExisting() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getClient().isExisting(this.id);
        });
    }
}
exports.Root = Root;
