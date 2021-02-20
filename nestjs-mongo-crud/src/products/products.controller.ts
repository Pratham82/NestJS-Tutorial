import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common'
import { ProductService } from './products.service'

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedId = await this.productService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    )
    return { id: generatedId }
  }

  @Get()
  getAllProducts() {
    return this.productService.getProducts()
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productService.getSingleProduct(prodId)
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    return this.productService.updateProduct(prodId, prodTitle, prodDesc, prodPrice)

  }

  @Delete(':id')
  deleteProduct(@Param('id') prodId: string) {
    return this.productService.removeProduct(prodId)

  }
}

