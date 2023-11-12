import Goods from '@/entities/admin/goods';
import GoodsStock from '@/entities/admin/goodsStock';
import {
  CreateGoodsDto,
  DeleteGoodsDto,
  GetStockDto,
  PageSearchGoodsDto,
  UpdateGoodsDto,
  UpdateStockDto,
} from '@/modules/admin/goods/goods.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(Goods) private goodsRepository: Repository<Goods>,
    @InjectRepository(GoodsStock)
    private stockRepository: Repository<GoodsStock>,
  ) {}

  /**
   * 分页加载角色信息
   */
  async page(param: PageSearchGoodsDto): Promise<[Goods[], number]> {
    const { limit, page, goodsName } = param;
    const result = await this.goodsRepository.findAndCount({
      where: {
        goodsName: Like(`%${goodsName}%`),
      },
      order: {
        id: 'ASC',
      },
      take: limit,
      skip: (page - 1) * limit,
      relations: ['goodsStock'],
    });
    return result;
  }

  /**
   * @param param
   */
  async add(param: CreateGoodsDto): Promise<void> {
    // 分配角色
    let newGoods: Goods = this.goodsRepository.create(param);
    await this.goodsRepository.insert(newGoods);
  }

  async delete(param: DeleteGoodsDto): Promise<void> {
    // 分配角色
    await this.goodsRepository.delete(param.id);
  }

  async update(param: UpdateGoodsDto): Promise<void> {
    // 分配角色
    let goods: Goods = await this.goodsRepository.findOne({
      where: { id: param.id },
    });
    // 修改实体
    Object.assign(goods, param);
    await this.goodsRepository.save(goods);
  }

  async updateStock(param: UpdateStockDto): Promise<void> {
    console.log(param.goodsId);
    // 分配角色
    const stock: GoodsStock = await this.stockRepository.findOne({
      where: { goods: { id: param.goodsId } },
    });
    if (!stock) {
      const goods = await this.goodsRepository.findOne({
        where: { id: param.goodsId },
      });
      const newStock: GoodsStock = await this.stockRepository.create({
        ...param,
        goods,
      });
      await this.stockRepository.save(newStock);
    } else {
      stock.stock = param.stock;
      await this.stockRepository.save(stock);
    }
  }

  async getStock(param: GetStockDto): Promise<GoodsStock> {
    // 分配角色
    const stock: GoodsStock = await this.stockRepository.findOne({
      where: { goods: { id: parseInt(param.goodsId) } },
    });
    return stock;
  }
}
