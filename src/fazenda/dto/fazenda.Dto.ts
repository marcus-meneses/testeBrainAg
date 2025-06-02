import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class InsertFazendaDto {
  @IsUUID('4', {
    message: 'produtor_id deve ser um UUID válido',
  })
  @ApiProperty({
    description: 'ID do produtor associado à fazenda',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  produtor_id: string;

  @IsString({
    message: 'nome deve ser uma string',
  })
  @ApiProperty({
    description: 'Nome da fazenda',
    example: 'Fazenda Boa Vista',
  })
  nome: string;

  @IsString({
    message: 'cidade deve ser uma string',
  })
  @ApiProperty({
    description: 'Cidade onde a fazenda está localizada',
    example: 'São Paulo',
  })
  cidade: string;

  @IsString({
    message: 'estado deve ser uma string',
  })
  @ApiProperty({
    description: 'Estado onde a fazenda está localizada',
    example: 'SP',
  })
  estado: string;

  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
      maxDecimalPlaces: 4,
    },
    {
      message: 'area_total (hA) deve ser um número com até 4 casas decimais',
    },
  )
  @ApiProperty({
    description: 'Área total da fazenda em hectares (hA)',
    example: 150.5,
  })
  area_total: number;

  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
      maxDecimalPlaces: 4,
    },
    {
      message:
        'area_agricultavel (hA) deve ser um número com até 4 casas decimais',
    },
  )
  @ApiProperty({
    description: 'Área cultivável da fazenda em hectares (hA)',
    example: 100.0,
  })
  area_agricultavel: number;

  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
      maxDecimalPlaces: 4,
    },
    {
      message:
        'area_vegetacao (hA) deve ser um número com até 4 casas decimais',
    },
  )
  @ApiProperty({
    description: 'Área de vegetação preservada da fazenda em hectares (hA)',
    example: 50.5,
  })
  area_vegetacao: number;
}

export class UpdateFazendaDto extends PartialType(InsertFazendaDto) {}

export class FindFazendaReturnDto {
  @IsUUID('4', {
    message: 'id deve ser um UUID válido',
  })
  id: string;

  @IsUUID('4', {
    message: 'produtor_id deve ser um UUID válido',
  })
  produtor_id?: string;

  @IsString({
    message: 'nome deve ser uma string',
  })
  nome: string;

  @IsString({
    message: 'cidade deve ser uma string',
  })
  cidade: string;

  @IsString({
    message: 'estado deve ser uma string',
  })
  estado: string;

  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
      maxDecimalPlaces: 4,
    },
    {
      message: 'area_total (hA) deve ser um número com até 4 casas decimais',
    },
  )
  area_total: number;

  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
      maxDecimalPlaces: 4,
    },
    {
      message:
        'area_agricultavel (hA) deve ser um número com até 4 casas decimais',
    },
  )
  area_agricultavel: number;

  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
      maxDecimalPlaces: 4,
    },
    {
      message:
        'area_vegetacao (hA) deve ser um número com até 4 casas decimais',
    },
  )
  area_vegetacao: number;
}
