
export const camelToPascal = (str:string):string => str.replace(/^[a-z]/, (letter:string):string => `${letter.toUpperCase()}`);
export const pascalToCamel = (str:string):string => str.replace(/^[A-Z]/, (letter:string):string => `${letter.toLowerCase()}`);


export const camelToSnake = (str:string):string => 
    str
    .replace(/(^[A-Z])/, (first:string) => first.toLowerCase())
    .replace(/([A-Z])/g, (other:string) => `_${other.toLowerCase()}`); 
export const pascalToSnake = (str:string):string => 
    str
    .replace(/(^[A-Z])/, (first:string) => first.toLowerCase())
    .replace(/([A-Z])/g, (other:string) => `_${other.toLowerCase()}`);


export const pascalToKebab = (str:string):string => 
    str
    .replace(/(^[A-Z])/, (first:string) => first.toLowerCase())
    .replace(/([A-Z])/g, (other:string) => `-${other.toLowerCase()}`);
export const camelToKebab = (str:string):string => 
    str
    .replace(/(^[A-Z])/, (first:string) => first.toLowerCase())
    .replace(/([A-Z])/g, (other:string) => `-${other.toLowerCase()}`);
