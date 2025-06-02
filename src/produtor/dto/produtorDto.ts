import { IsString, IsUUID } from 'class-validator';
import { IsCpfOrCnpj } from '@/common/validators/IsCpfCnpj.validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class InsertProdutorDto {
  @IsString({
    message: 'nome deve ser uma string',
  })
  @ApiProperty({
    description: 'Nome do produtor',
    example: 'João da Silva',
  })
  nome: string;

  @IsCpfOrCnpj({
    message: 'CPF ou CNPJ inválido',
  })
  @ApiProperty({
    description: 'CPF ou CNPJ do produtor',
    example: '123.456.789-09',
  })
  cpf_cnpj: string;
}

export class UpdateProdutorDto extends PartialType(InsertProdutorDto) {}

export class FindProdutorReturnDto {
  @IsUUID('4', {
    message: 'id deve ser um UUID válido',
  })
  id: string;
  @IsString({
    message: 'nome deve ser uma string',
  })
  nome: string;
  @IsCpfOrCnpj({
    message: 'CPF ou CNPJ inválido',
  })
  cpf_cnpj: string;
}
