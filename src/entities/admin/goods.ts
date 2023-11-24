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

  @OneToOne((type) => GoodsStock, (goodsStock) => goodsStock.goods, {
    cascade: true,
  })
  goodsStock: GoodsStock;

  @BeforeInsert()
  @BeforeUpdate()
  createDetails() {
    console.log('createDetails');
    this.details = `${this.goodsName}\n\n`;

    this.size.includes('\n')
      ? (this.details += `尺码：\n`)
      : (this.details += `尺码：`);
    this.details += `${this.size}\n\n`;

    if (this.fabric != null && this.fabric != '') {
      this.details += `面料：${this.fabric}\n\n`;
    }

    this.details += `颜色：${this.color}\n\n`;

    if (this.other != null && this.other != '') {
      this.details += `${this.other}\n`;
    }
    this.details += `纯尾货，性价比高，良心推荐～\n\n`;

    this.details += `洗涤建议：${this.wash}\n\n\n`;

    this.details += `声明：所售商品均不附带任何品牌价值，根据规定，均已做剪标、拆标处理，望知晓\n\n`;

    this.details += `默认所有商品剪标、拆标、无标，可能存在浮土、小黄点、挂纱、抽丝、轻微褪色、轻微染色、走线不齐、以及剪标造成的里布小破损等不影响穿着的小瑕疵。大瑕疵商品介绍会特别写明并做特价处理`;
  }
}
