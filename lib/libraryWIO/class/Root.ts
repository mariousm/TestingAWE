// IMPORTACIONES
import { ApplicationInstance } from "../ApplicationInstance";
import { SpectronClient } from 'spectron';

export abstract class Root {
    // ATRIBUTOS
    protected id: string;


    // CONSTRUCTOR
    constructor(id: string) {
        this.id = id;
    }


    // MÉTODOS

    // Obtener el cliente de la aplicación
    getClient(): SpectronClient {
        return ApplicationInstance.getInstance(ApplicationInstance.getNameProject()).getClient()
    }

    // Obtener el selector
    getSelector(): string {
        return this.id;
    }

    // Obtener un atributo de la etiqueta
    async getAttribute(attribute: string) {
        return await this.getClient().getAttribute(this.id, attribute);
    }

    // Obtener el HTML del selector
    async getHTML(includeSelectorTag: boolean = true) {
        return await this.getClient().$(this.id).getHTML(includeSelectorTag);
    }

    // Obtener la localización de un elemento
    async getLocation(axis?: string) {
        return await this.getClient().$(this.id).getLocation(axis);
    }

    // Obtener la propiedad de un elemento
    async getTagName() {
        return await this.getClient().getTagName(this.id);
    }

    // Obtener el alto y/o ancho de un elemento
    async getElementSize(prop?: string) {
        return await this.getClient().getElementSize(this.id, prop);
    }

    // Obtener las propiedades css
    async getCSSProperty(cssProperty: string) {
        return await this.getClient().$(this.id).getCssProperty(cssProperty);
    }

    // Método para obtener el número de elementos
    async getCount(selector: string) {
        if (selector.length !== 0) {
            return await this.getClient().elements(selector).then((res) => {
                return res.value.length;
            });
        }
        return await this.getClient().elements(this.id).then((res) => {
            return res.value.length;
        });
    }

    // Método para obtener el texto
    async getText() {
        return await this.getClient().getText(this.id);
    }

    // Obtener si un elemento está habilitado o no
    async isEnabled() {
        return await this.getClient().isEnabled(this.id);
    }

    // Obtener si un elemento está visible o no
    async isVisible() {
        return await this.getClient().isVisible(this.id);
    }

    // Obtener si un elemento existe o no
    async isExisting() {
        return await this.getClient().isExisting(this.id);
    }
}