import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './products.model';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) { }
  async insertProduct(title: string, desc: string, price: number) {
    // Creating a product Object
    const newProduct = new this.productModel({
      title,
      description: desc,
      price,
    });

    // Adding the newly created object into the Products Array
    const res = await newProduct.save();

    return res.id as string;
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

  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  async updateProduct(productId: string, title: string, desc: string, price: number) {
    const updatedProduct = await this.findProduct(productId)
    if (title) {
      updatedProduct.title = title
    }
    if (desc) {
      updatedProduct.description = desc
    }
    if (price) {
      updatedProduct.price = price
    }
    const product = await updatedProduct.save()
    return {
      message: 'Product Updated',
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  async removeProduct(productId: string) {
    const result = await this.productModel.deleteOne({
      _id: productId
    }).exec()
    if (result.n === 0) {
      throw new NotFoundException('Could not find product.');
    }
  }

  private async findProduct(productId: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(productId);
    } catch (error) {
      throw new NotFoundException('Could not find the product with given ID');
    }
    if (!product) {
      throw new NotFoundException('Could not find the product with given ID');
    }

    return product;
  }
}
