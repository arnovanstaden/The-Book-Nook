export interface IHead {
    title: string;
}

export interface IPage {
    children: React.ReactNode;
    title: string;
    classNameProp?: string;
    noContainer?: boolean
}

export interface IHeader {
    heading: string;
    subheading: string;
}

export interface IBook {
    name: string;
    author: string;
    genre: string;
    pages: number;
    rating: number;
    year: string;
    user: string;
    cover: string;
}