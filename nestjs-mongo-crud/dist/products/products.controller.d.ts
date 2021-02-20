import { ProductService } from './products.service';
export declare class ProductsController {
    private readonly productService;
    constructor(productService: ProductService);
    addProduct(prodTitle: string, prodDesc: string, prodPrice: number): Promise<{
        id: string;
    }>;
    getAllProducts(): Promise<{
        id: string;
        title: string;
        description: string;
        price: number;
    }[]>;
    getProduct(prodId: string): Promise<{
        id: string;
        title: string;
        description: string;
        price: number;
    }>;
    updateProduct(prodId: string, prodTitle: string, prodDesc: string, prodPrice: number): Promise<{
        message: string;
        id: string;
        title: string;
        description: string;
        price: number;
    }>;
    deleteProduct(prodId: string): Promise<void>;
}
