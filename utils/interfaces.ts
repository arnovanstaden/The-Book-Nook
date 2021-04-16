export interface IHead {
    title: string;
}

export interface IPage {
    children: React.ReactNode;
    title: string;
    classNameProp?: string;
    noContainer?: boolean
    center?: boolean;
}

export interface IHeader {
    heading: string;
    subheading?: string;
}

export interface IBook {
    title: string;
    authors: string[];
    description: string;
    recommendation: string;
    genre: string;
    pages: number;
    rating: number;
    year: string;
    user: string;
    cover: {
        small: string;
        large: string
    };
    thumbnail: string;
    id: string;
}

export interface INotification {
    text: string
}

export interface IAuthenticationData {
    email: string;
    password: string;
    username?: string;
}