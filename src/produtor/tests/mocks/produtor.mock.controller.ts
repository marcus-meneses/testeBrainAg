import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Inject,
} from '@nestjs/common';

import {
  InsertProdutorDto,
  UpdateProdutorDto,
} from '@/produtor/dto/produtorDto';
import { MockProdutorService as ProdutorService } from '@produtor/tests/mocks/produtor.mock.service';
import { MockFazendaService as FazendaService } from '@fazenda/tests/mocks/fazenda.mock.service';

@Controller('mock-produtor')
export class MockProdutorController {
  constructor(
    @Inject(ProdutorService)
    private readonly produtorService: ProdutorService,

    @Inject(FazendaService)
    private readonly fazendaService: FazendaService,
  ) {}

  @Get()
  findAll() {
    return this.produtorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtorService.findOne(id);
  }

  @Get(':id/fazenda')
  findFazendaByProdutor(@Param('id') id: string) {
    return this.fazendaService.findByProdutorId(id);
  }

  @Post()
  create(@Body() body: InsertProdutorDto) {
    return this.produtorService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateProdutorDto) {
    return this.produtorService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtorService.remove(id);
  }
}
