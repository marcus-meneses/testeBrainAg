import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import {
  ApiParam,
  ApiTags,
  ApiOperation as SwaggerApiOperation,
} from '@nestjs/swagger';

import {
  InsertProdutorDto,
  UpdateProdutorDto,
} from '@/produtor/dto/produtorDto';
import { ProdutorService } from '@produtor/produtor.service';

@Controller('produtores')
@ApiTags('Produtores')
export class ProdutorController {
  constructor(private readonly produtorService: ProdutorService) {}

  @Get()
  @SwaggerApiOperation({
    summary: 'Listar todos os produtores',
    description:
      'Retorna uma lista de todos os produtores cadastrados no sistema.',
  })
  findAll() {
    return this.produtorService.findAll();
  }

  @Get(':id')
  @SwaggerApiOperation({
    summary: 'Buscar produtor por ID',
    description: 'Retorna os detalhes de um produtor específico pelo seu ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do produtor a ser buscado',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  findOne(@Param('id') id: string) {
    return this.produtorService.findOne(id);
  }

  @Post()
  @SwaggerApiOperation({
    summary: 'Criar um novo produtor',
    description: 'Cria um novo produtor com os dados fornecidos.',
  })
  create(@Body() body: InsertProdutorDto) {
    return this.produtorService.create(body);
  }

  @Put(':id')
  @SwaggerApiOperation({
    summary: 'Atualizar um produtor existente',
    description: 'Atualiza os dados de um produtor específico pelo seu ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do produtor a ser atualizado',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  update(@Param('id') id: string, @Body() body: UpdateProdutorDto) {
    return this.produtorService.update(id, body);
  }

  @Delete(':id')
  @SwaggerApiOperation({
    summary: 'Remover um produtor',
    description: 'Remove um produtor específico pelo seu ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do produtor a ser removido',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.produtorService.remove(id);
  }

  @Get(':id/fazendas')
  @SwaggerApiOperation({
    summary: 'Listar fazendas de um produtor',
    description:
      'Retorna uma lista de fazendas associadas a um produtor específico pelo seu ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do produtor cujas fazendas serão listadas',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  findFazendasByProdutor(@Param('id') id: string) {
    return this.produtorService.findFazendasByProdutor(id);
  }
}
