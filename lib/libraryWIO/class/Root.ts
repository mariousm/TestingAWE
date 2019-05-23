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
        let attributeName: string = "";

        try {
            attributeName = await this.getClient().getAttribute(this.id, attribute);

        } catch (error) {
            console.log(error);
        }

        return attributeName
    }

    // Obtener el HTML del selector
    async getHTML(includeSelectorTag: boolean = true) {
        let html: string = "";

        try {
            html = await this.getClient().getHTML(this.id, includeSelectorTag);

        } catch (error) {
            console.log(error);
        }

        return html
    }

    // Obtener la localización de un elemento
    async getLocation(axis?: string) {
        let location: any;

        try {
            location = await this.getClient().$(this.id).getLocation(axis);

        } catch (error) {
            console.log(error);
        }

        return location
    }

    // Obtener la propiedad de un elemento
    async getTagName() {
        let tag: string = "";

        try {
            tag = await this.getClient().getTagName(this.id);

        } catch (error) {
            console.log(error);
        }
        return tag
    }

    // Obtener el alto y/o ancho de un elemento
    async getElementSize(prop?: string) {
        return await this.getClient().getElementSize(this.id, prop);
    }

    // Obtener las propiedades css
    async getCSSProperty(cssProperty: string) {
        let css: any = ""

        try {
            css = await this.getClient().getCssProperty(this.id, cssProperty);

        } catch (error) {
            console.log(error);
        }

        return css
    }

    // Método para obtener el número de elementos
    async getCount(selector: string) {
        let count: number = 0;

        try {
            if (selector.length !== 0) {
                count = await this.getClient().elements(selector).then((res) => {
                    return res.value.length;
                });

            } else {
                count = await this.getClient().elements(this.id).then((res) => {
                    return res.value.length;
                });
            }

        } catch (error) {
            console.log(error);
        }

        return count
    }

    // Método para obtener el texto
    async getText() {
        let text: string = "";

        try {
            text = await this.getClient().getText(this.id);

        } catch (error) {
            console.log(error);
        }

        return text
    }

    // Obtener si un elemento está habilitado o no
    async isEnabled() {
        let isEnabled: boolean = false;

        try {
            isEnabled = await this.getClient().isEnabled(this.id);

        } catch (error) {
            console.log(error);
        }

        return isEnabled
    }

    // Obtener si un elemento está visible o no
    async isVisible() {
        let isVisible: boolean = false;

        try {
            isVisible = await this.getClient().isVisible(this.id);

        } catch (error) {
            console.log(error);
        }

        return isVisible
    }

    // Devuelve verdadero si un elemento está visible y dentro de la ventana gráfica
    async isVisibleWithinViewport() {
        let isVisibleWithinViewport: boolean = false;

        try {
            isVisibleWithinViewport = await this.getClient().isVisibleWithinViewport(this.id);

        } catch (error) {
            console.log(error);
        }

        return isVisibleWithinViewport
    }

    // Obtener si un elemento existe o no
    async isExisting() {
        let isExisting: boolean = false;

        try {
            isExisting = await this.getClient().isExisting(this.id);

        } catch (error) {
            console.log(error);
        }

        return isExisting
    }

    // Obtiene si el elemnto HTML tiene focus o no
    async hasFocus() {
        let hasFocus: boolean = false;

        try {
            hasFocus = await this.getClient().hasFocus(this.id);

        } catch (error) {
            console.log(error);
        }

        return hasFocus
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
    async waitForVisible(miliseconds?: number, reverse?: boolean) {
        try {
            return await this.getClient().waitForVisible(this.id, miliseconds, reverse);

        } catch (error) {
            console.log(error);
        }
    }

    // Esperar a que un elemento esté (des)habilitado en x milisegundos
    async waitForEnabled(miliseconds?: number, reverse?: boolean) {
        try {
            return await this.getClient().waitForEnabled(this.id, miliseconds, reverse);

        } catch (error) {
            console.log(error);
        }
    }

    // Esparar a que un elemento exista en el árbol DOM en x milisegundos
    async waitForExist(miliseconds?: number, reverse?: boolean) {
        try {
            return await this.getClient().waitForExist(this.id, miliseconds, reverse);

        } catch (error) {
            console.log(error);
        }
    }


    // Método para comprobar el selector
    checkSelector(id: string): boolean {
        let check: boolean = false;
        let selector: string = "";

        try {
            selector = this.getSelector()
            if (selector === id) {
                check = true;
            }

        } catch (error) {
            console.log(error);
        }

        return check
    }

    // Método para comprobar un atributo
    async checkAttribute(attributeName: string) {
        let check: boolean = false;
        let attribute: string = "";

        try {
            attribute = await this.getAttribute(attributeName);
            if (attribute === attributeName) {
                check = true;
            }

        } catch (error) {
            console.log(error);
        }

        return check
    }

    // Método para comprobar el HTML
    async checkHTML(html: string, includeSelectorTag: boolean = true) {
        let check: boolean = false;
        let sHtml: string = "";

        try {
            sHtml = await this.getHTML(includeSelectorTag);
            if (sHtml === html) {
                check = true;
            }

        } catch (error) {
            console.log(error);
        }

        return check
    }

    // Método para comprobar la localización
    async checkLocation(x: number, y: number) {
        let check: boolean = false;
        let location = undefined;
        let sX: number = 0;
        let sY: number = 0;

        try {
            location = await this.getLocation();
            sX = location.x
            sY = location.y;
            if ((sX === x) && (sY === y)) {
                check = true;
            }

        } catch (error) {
            console.log(error);
        }

        return check
    }

    // Método para comprobar el nombre de la etiqueta HTML
    async checkTagNAme(tagName: string) {
        let check: boolean = false;
        let tag: string = "";

        try {
            tag = await this.getTagName();
            if (tag === tagName) {
                check = true;
            }

        } catch (error) {
            console.log(error);
        }

        return check
    }

    // Método para comprobar el ancho y alto de un elemento
    async checkElementSize(width: number, height: number) {
        let check: boolean = false;
        let sWidth: number = 0;
        let sHeight: number = 0;

        try {
            sWidth = await this.getElementSize('width');
            sHeight = await this.getElementSize('height');
            if ((sWidth === width) && (sHeight === height)) {
                check = true;
            }

        } catch (error) {
            console.log(error);
        }

        return check
    }

    // Método para comprobar el número de elementos
    async checkCount(number: number, selector: string) {
        let check: boolean = false;
        let count: number = 0;

        try {
            count = await this.getCount(selector);
            if (count === number) {
                check = true;
            }

        } catch (error) {
            console.log(error);
        }

        return check
    }

    // Método para comprobar el testo de un elemeto
    async checkText(text: string) {
        let check: boolean = false;
        let texto: string = "";

        try {
            texto = await this.getText();
            if (texto === text) {
                check = true;
            }

        } catch (error) {
            console.log(error);
        }

        return check
    }
}