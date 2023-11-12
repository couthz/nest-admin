import Goods from '@/entities/admin/goods';
import GoodsStock from '@/entities/admin/goodsStock';
import { GoodsController } from '@/modules/admin/goods/goods.controller';
import { GoodsService } from '@/modules/admin/goods/goods.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Goods, GoodsStock])],
  controllers: [GoodsController],
  providers: [GoodsService],
})
export class GoodsModule {}
