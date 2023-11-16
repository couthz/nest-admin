import Goods from '@/entities/admin/goods';
import { ApiProperty } from '@nestjs/swagger';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'goods_stock' })
export default class GoodsStock extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 1000 })
  @ApiProperty()
  stock: string;

  @OneToOne((type) => Goods, (goods) => goods.goodsStock)
  @JoinColumn()
  goods: Goods;
}
