import { Injectable, NotFoundException } from '@nestjs/common'
import { Product } from './products.model'

@Injectable()
export class ProductService {
  private products: Product[] = []

  insertProduct(title: string, desc: string, price: number) {
    // Creating a product Object
    const prodId = Math.random().toString()
    const newProduct = new Product(prodId, title, desc, price)

    // Adding the newly created object into the Products Array
    this.products.push(newProduct)
    return prodId
  }

  getProducts() {
    return [...this.products]
  }

  getSingleProduct(productId: string) {
    const product = this.products.find((product) => product.id === productId)
    if (!product) {
      throw new NotFoundException('Could not find the product with given ID')
    }
    return { ...product }
  }
}
