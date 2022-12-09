type DomContent = string | Node;

type ElementFactory<T extends HTMLElement> = (attrtibutes: object, ...content: DomContent[]) => T

export function el(type: string, attrtibutes: object, ...content: DomContent[]) {
    const result = document.createElement(type);

    if (attrtibutes) {
        for (let key in attrtibutes) {
            if (key.startsWith('on')) {
                result.addEventListener(key.slice(2).toLowerCase(), attrtibutes[key]);
            } else {
                result[key] = attrtibutes[key];
            }
        }
    }

    for (const item of content) {
        result.append(item);
    }

    return result;

}

export const tr: ElementFactory<HTMLTableRowElement> = el.bind(null, 'tr');
export const td: ElementFactory<HTMLTableCellElement> = el.bind(null, 'td');
export const a: ElementFactory<HTMLLinkElement> = el.bind(null, 'a');
export const button: ElementFactory<HTMLButtonElement> = el.bind(null, 'button');