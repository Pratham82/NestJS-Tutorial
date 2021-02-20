"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ProductService = class ProductService {
    constructor(productModel) {
        this.productModel = productModel;
        this.products = [];
    }
    async insertProduct(title, desc, price) {
        const newProduct = new this.productModel({
            title,
            description: desc,
            price,
        });
        const res = await newProduct.save();
        return res.id;
    }
    async getProducts() {
        const products = await this.productModel.find().exec();
        return products.map(product => ({
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
        }));
    }
    async getSingleProduct(productId) {
        const product = await this.findProduct(productId);
        return {
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
        };
    }
    async updateProduct(productId, title, desc, price) {
        const updatedProduct = await this.findProduct(productId);
        if (title) {
            updatedProduct.title = title;
        }
        if (desc) {
            updatedProduct.description = desc;
        }
        if (price) {
            updatedProduct.price = price;
        }
        const product = await updatedProduct.save();
        return {
            message: 'Product Updated',
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
        };
    }
    async removeProduct(productId) {
        const result = await this.productModel.deleteOne({
            _id: productId
        }).exec();
        if (result.n === 0) {
            throw new common_1.NotFoundException('Could not find product.');
        }
    }
    async findProduct(productId) {
        let product;
        try {
            product = await this.productModel.findById(productId);
        }
        catch (error) {
            throw new common_1.NotFoundException('Could not find the product with given ID');
        }
        if (!product) {
            throw new common_1.NotFoundException('Could not find the product with given ID');
        }
        return product;
    }
};
ProductService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Product')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=products.service.js.map