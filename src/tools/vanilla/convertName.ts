
export const pascalToCamel = (str:string):string => str.replace(/^[A-Z]/, (letter:string):string => `${letter.toLowerCase()}`);
export const camelToPascal = (str:string):string => str.replace(/^[A-Z]/, (letter:string):string => `${letter.toUpperCase()}`);

export const camelToSnake = (str:string):string => str.replace(/[A-Z]/g, (letter:string):string => `_${letter.toLowerCase()}`);
export const pascalToSnake = (str:string):string => str.replace(/[A-Z]/g, (letter:string):string => `_${letter.toLowerCase()}`).replace(/^_/, '');


export const pascalToSlug = (str:string):string => 
    str
    .replace(/(^[A-Z])/, (first:string) => first.toLowerCase())
    .replace(/([A-Z])/g, (other:string) => `-${other.toLowerCase()}`)
export const camelToSlug = (str:string):string => 
    str
    .replace(/(^[A-Z])/, (first:string) => first.toLowerCase())
    .replace(/([A-Z])/g, (other:string) => `-${other.toLowerCase()}`)
