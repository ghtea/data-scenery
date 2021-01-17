
export type Link = {
    id: string;        //   camelcase
    name?: string;
}

export type Category = {
    id: string;        //   camelcase
    name?: string;
    listLink: Link[];
}

const nav: Category[] = [
    {
        id: 'Sports',
        listLink: [
            {id: 'Football'} 
        ],
    }
]


export default nav;