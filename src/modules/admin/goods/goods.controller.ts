import { GetStockDto } from './goods.dto';
import { PaginatedResponseDto } from '@/common/class/res.class';
import Goods from '@/entities/admin/goods';
import GoodsStock from '@/entities/admin/goodsStock';
import { ADMIN_PREFIX } from '@/modules/admin/admin.constants';
import {
  CreateGoodsDto,
  DeleteGoodsDto,
  PageSearchGoodsDto,
  UpdateGoodsDto,
  UpdateStockDto,
} from '@/modules/admin/goods/goods.dto';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { GoodsService } from './goods.service';

@ApiSecurity(ADMIN_PREFIX)
@ApiTags('商品管理模块')
@Controller('manage')
export class GoodsController {
  constructor(private goodsService: GoodsService) {}

  @ApiOperation({ summary: '分页查询商品信息' })
  @ApiOkResponse({ type: [Goods] })
  @Get('page')
  async page(
    @Query() dto: PageSearchGoodsDto,
  ): Promise<PaginatedResponseDto<Goods>> {
    const [list, total] = await this.goodsService.page(dto);
    return {
      list,
      pagination: {
        size: dto.limit,
        page: dto.page,
        total,
      },
    };
  }

  @ApiOperation({ summary: '新增商品' })
  @Post('add')
  async add(@Body() dto: CreateGoodsDto): Promise<void> {
    await this.goodsService.add(dto);
  }

  @ApiOperation({ summary: '删除商品' })
  @Post('delete')
  async delete(@Body() dto: DeleteGoodsDto): Promise<void> {
    await this.goodsService.delete(dto);
  }

  @ApiOperation({ summary: '更新商品' })
  @Post('update')
  async update(@Body() dto: UpdateGoodsDto): Promise<void> {
    await this.goodsService.update(dto);
  }

  @ApiOperation({ summary: '更新库存' })
  @Post('updateStock')
  async updateStock(@Body() dto: UpdateStockDto): Promise<void> {
    await this.goodsService.updateStock(dto);
  }

  @ApiOperation({ summary: '获取库存' })
  @ApiOkResponse({ type: [GoodsStock] })
  @Get('getStock')
  async getStock(@Query() dto: GetStockDto): Promise<GoodsStock> {
    return await this.goodsService.getStock(dto);
  }
}
