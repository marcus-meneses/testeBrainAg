import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ApiParam, ApiOperation as SwaggerApiOperation } from '@nestjs/swagger';

import { InsertFazendaDto, UpdateFazendaDto } from '@fazenda/dto/fazenda.Dto';
import { FazendaService } from '@fazenda/fazenda.service';

@Controller('fazendas')
@ApiTags('Fazendas')
export class FazendaController {
  constructor(private readonly fazendaService: FazendaService) {}

  @Get()
  @SwaggerApiOperation({
    summary: 'Listar todas as fazendas',
    description:
      'Retorna uma lista de todas as fazendas cadastradas no sistema.',
  })
  findAll() {
    return this.fazendaService.findAll();
  }

  @Get(':id')
  @SwaggerApiOperation({
    summary: 'Buscar fazenda por ID',
    description: 'Retorna os detalhes de uma fazenda específica pelo seu ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da fazenda a ser buscada',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  findOne(@Param('id') id: string) {
    return this.fazendaService.findOne(id);
  }

  @Post()
  @SwaggerApiOperation({
    summary: 'Criar uma nova fazenda',
    description: 'Cria uma nova fazenda com os dados fornecidos.',
  })
  create(@Body() body: InsertFazendaDto) {
    return this.fazendaService.create(body);
  }

  @Put(':id')
  @SwaggerApiOperation({
    summary: 'Atualizar uma fazenda existente',
    description: 'Atualiza os dados de uma fazenda específica pelo seu ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da fazenda a ser atualizada',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  update(@Param('id') id: string, @Body() body: UpdateFazendaDto) {
    return this.fazendaService.update(id, body);
  }

  @Delete(':id')
  @SwaggerApiOperation({
    summary: 'Remover uma fazenda',
    description: 'Remove uma fazenda específica pelo seu ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da fazenda a ser removida',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.fazendaService.remove(id);
  }

  @Get(':id/safras')
  @SwaggerApiOperation({
    summary: 'Listar safras de uma fazenda',
    description:
      'Retorna uma lista de safras associadas a uma fazenda específica pelo seu ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da fazenda a ser buscada',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  findSafrasByFazenda(@Param('id') id: string) {
    return this.fazendaService.findSafrasByFazenda(id);
  }

  @Get(':id/safras/:ano')
  @SwaggerApiOperation({
    summary: 'Listar safras de uma fazenda em um determinado ano',
    description:
      'Retorna uma lista de safras associadas a uma fazenda em um determinado ano específica pelo seu ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da fazenda a ser buscada',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @ApiParam({
    name: 'ano',
    description: 'Ano das safras a serem buscadas',
    type: Number,
    example: '2023',
    required: true,
  })
  findSafrasByFazendaAndAno(
    @Param('id') id: string,
    @Param('ano') ano: number,
  ) {
    return this.fazendaService.findSafrasByFazendaAndAno(id, ano);
  }
}
