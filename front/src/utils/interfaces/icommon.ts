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
    category: string
}

export interface ICategory {
    category_id: number,
    category: string
}