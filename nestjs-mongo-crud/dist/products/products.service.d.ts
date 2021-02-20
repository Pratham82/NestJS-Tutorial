import { Model } from 'mongoose';
import { Product } from './products.model';
export declare class ProductService {
    private readonly productModel;
    private products;
    constructor(productModel: Model<Product>);
    insertProduct(title: string, desc: string, price: number): Promise<string>;
    getProducts(): Promise<{
        id: string;
        title: string;
        description: string;
        price: number;
    }[]>;
    getSingleProduct(productId: string): Promise<{
        id: string;
        title: string;
        description: string;
        price: number;
    }>;
    updateProduct(productId: string, title: string, desc: string, price: number): Promise<{
        message: string;
        id: string;
        title: string;
        description: string;
        price: number;
    }>;
    removeProduct(productId: string): Promise<void>;
    private findProduct;
}
