import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Min,
  MinLength,
} from 'class-validator';
import { PageOptionsDto } from '@/common/dto/page.dto';

export class PageSearchGoodsDto extends PageOptionsDto {
  @ApiProperty({
    required: false,
    description: '品名',
  })
  @IsString()
  @IsOptional()
  goodsName = '';
}

export class DeleteGoodsDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}

export class CreateGoodsDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  goodsName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  color: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  size: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  fabric: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  other: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  wash: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  price: string;
}

export class UpdateGoodsDto extends CreateGoodsDto {
  @ApiProperty({
    description: 'goodsID',
  })
  @IsInt()
  @Min(0)
  id: number;
}

export class UpdateStockDto {
  @IsNumber()
  @IsNotEmpty()
  goodsId: number;

  @IsString()
  @IsNotEmpty()
  stock: string;
}

export class GetStockDto {
  @IsString()
  @IsNotEmpty()
  goodsId: string;
}
