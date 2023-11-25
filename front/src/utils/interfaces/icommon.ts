export interface IProduct {
    product_id: string,
    title: string,
    image_url: string,
    price: number,
    available: boolean,
    creation_date: string,
    stamp: string,
    quantity: number,
    country: string,
    type_name: string,
    category: string,
    cat_id: number,
    c_id: number,
    t_id: number
}

export interface ICartEntity {
    product_id: string,
    title: string,
    image_url: string,
    price: number,
    available: boolean,
    creation_date: string,
    stamp: string,
    quantity: number,
    country: string,
    type_name: string,
    category: string,
    selected_quantity: number
}

export interface ICategory {
    category_id: number,
    category: string
}

export interface ICountries {
    country_id: number,
    country: string
}

export interface ICandleTypes {
    type_id: number,
    type_name: string
}

export interface IAdditionalInfo {
    categories: ICategory[]
    types: ICandleTypes[]
    countries: ICountries[]
}