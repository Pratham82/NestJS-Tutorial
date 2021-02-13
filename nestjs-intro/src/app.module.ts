import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProdctsModule } from './products/products.module'

@Module({
  imports: [ProdctsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
