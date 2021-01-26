
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



type Case = 'camel' | 'pascal' | 'snakeLower' | 'snakeUpper' | 'kebabLower' | 'kebabUpper';

// testTest, TestTest, test_test, TEST_TEST, test-test, TEST-TEST

const convertCase = (nameStarting: string, caseEnding: Case):string => {

    let result = nameStarting;

    let list: string[] = 
        nameStarting
        .split(/[-_]+/)
        .reduce( 
            (acc, current)=> [...acc, ...current.split(/(?=[A-Z][a-z])/)]
            , [] as string[]
        );
    
    for (let )
        

    if (caseEnding === 'camel'){
        list.reduce((acc, current, index)=>{
            if (index === 0){
                return acc + current
            }
            else {
                return acc + current.replace(/^[A-Z]/, str => str.toUpperCase());
            }
        }, '');
    }
    else if (caseEnding === 'pascal'){
        list.reduce((acc, current, index)=>{
            return acc + current.replace(/^[A-Z]/, str => str.toUpperCase());
        }, '');
    }
    else if (caseEnding === 'snakeLower'){
        list.reduce((acc, current, index)=>{
            if (index === 0){
                return acc + current
            }
            else {
                return acc + current.replace(/^[A-Z]/, str => str.toUpperCase());
            }
        }, '');
    }

    return result;
}