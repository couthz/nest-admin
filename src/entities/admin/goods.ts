import GoodsStock from '@/entities/admin/goodsStock';
import { ApiProperty } from '@nestjs/swagger';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'goods' })
export default class Goods extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ name: 'goods_name' })
  @ApiProperty()
  goodsName: string;

  @Column()
  @ApiProperty()
  color: string;

  @Column()
  @ApiProperty()
  size: string;

  @Column({ nullable: true })
  @ApiProperty()
  fabric: string;

  @Column({ nullable: true })
  @ApiProperty()
  other: string;

  @Column({ default: '中性洗涤剂，常温手洗/干洗' })
  @ApiProperty()
  wash: string;

  @Column()
  @ApiProperty()
  price: string;

  @Column({ length: 1000 })
  @ApiProperty()
  details: string;

  @OneToOne((type) => GoodsStock, (goodsStock) => goodsStock.goods)
  goodsStock: GoodsStock;

  @BeforeInsert()
  @BeforeUpdate()
  createDetails() {
    console.log('createDetails');
    this.details = `${this.goodsName}\n\n颜色:${this.color}\n\n尺码:\n${this.size}\n\n`;

    if (this.fabric != null && this.fabric != '') {
      this.details += `面料:${this.fabric}\n\n`;
    }

    if (this.other != null && this.other != '') {
      this.details += `${this.other}\n\n`;
    }

    this.details += `洗涤建议:${this.wash}\n\n纯尾货，性价比高，良心推荐\n\n\n默认所有商品都有微小残次，无窟窿无洞等大问题\n但可能存在浮土、小脏、轻微染色、走线不齐等毛病\n大瑕疵商品介绍会特别写明并做特价处理\n\n声明：\n本店所售商品均不附带任何品牌价值\n根据规定，均已做剪标、拆标处理，望知晓`;
  }
}
