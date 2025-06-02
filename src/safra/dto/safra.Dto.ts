import { IsEnum, IsInt, IsNumber, IsUUID } from 'class-validator';
import { CulturaTipo } from '@/common/types/safraTypes';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class InsertSafraDto {
  @IsUUID('4', {
    message: 'fazenda_id deve ser um UUID válido',
  })
  @ApiProperty({
    description: 'ID da fazenda associada à safra',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  fazenda_id: string;

  @IsInt({
    message: 'ano deve ser um número inteiro',
  })
  @ApiProperty({
    description: 'Ano da safra',
    example: 2023,
  })
  ano: number;

  @IsEnum(CulturaTipo, {
    message:
      'cultura deve ser um dos valores válidos: ' +
      Object.values(CulturaTipo).toString(),
  })
  @ApiProperty({
    description: 'Tipo de cultura da safra',
    enum: CulturaTipo,
    example: CulturaTipo.Soja,
  })
  cultura: CulturaTipo;

  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
      maxDecimalPlaces: 4,
    },
    {
      message: 'area (plantada) deve ser um número com até 4 casas decimais',
    },
  )
  @ApiProperty({
    description: 'Área plantada da safra em hectares (hA)',
    example: 150.5,
  })
  area: number;
}

export class UpdateSafraDto extends PartialType(InsertSafraDto) {}

export class FindSafraReturnDto {
  @IsUUID('4', {
    message: 'id deve ser um UUID válido',
  })
  id: string;
  @IsUUID('4', {
    message: 'fazenda_id deve ser um UUID válido',
  })
  fazenda_id: string;
  @IsInt({
    message: 'ano deve ser um número inteiro',
  })
  ano: number;
  @IsEnum(CulturaTipo, {
    message:
      'cultura deve ser um dos valores válidos: ' +
      Object.values(CulturaTipo).toString(),
  })
  cultura: CulturaTipo;
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
      maxDecimalPlaces: 4,
    },
    {
      message: 'area (plantada) deve ser um número com até 4 casas decimais',
    },
  )
  area: number;
}
