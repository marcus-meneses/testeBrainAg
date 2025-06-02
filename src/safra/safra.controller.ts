import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiParam,
  ApiTags,
  ApiOperation as SwaggerApiOperation,
} from '@nestjs/swagger';

import { InsertSafraDto, UpdateSafraDto } from '@safra/dto/safra.Dto';
import { SafraService } from '@safra/safra.service';

@Controller('safra')
@ApiTags('Safras')
export class SafraController {
  constructor(private readonly safraService: SafraService) {}

  @Get()
  @SwaggerApiOperation({
    summary: 'Listar todas as safras',
    description: 'Retorna uma lista de todas as safras cadastradas no sistema.',
  })
  findAll() {
    return this.safraService.findAll();
  }

  @Get(':id')
  @SwaggerApiOperation({
    summary: 'Buscar safra por ID',
    description: 'Retorna os detalhes de uma safra específica pelo seu ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da safra a ser buscada',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  findOne(@Param('id') id: string) {
    return this.safraService.findOne(id);
  }

  @Post()
  @SwaggerApiOperation({
    summary: 'Criar uma nova safra',
    description: 'Cria uma nova safra com os dados fornecidos.',
  })
  create(@Body() body: InsertSafraDto) {
    return this.safraService.create(body);
  }

  @Put(':id')
  @SwaggerApiOperation({
    summary: 'Atualizar uma safra existente',
    description: 'Atualiza os dados de uma safra específica pelo seu ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da safra a ser atualizada',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  update(@Param('id') id: string, @Body() body: UpdateSafraDto) {
    return this.safraService.update(id, body);
  }

  @Delete(':id')
  @SwaggerApiOperation({
    summary: 'Remover uma safra',
    description: 'Remove uma safra específica pelo seu ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da safra a ser removida',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  remove(id: string) {
    return this.safraService.remove(id);
  }
}
