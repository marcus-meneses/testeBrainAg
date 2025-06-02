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
import { CulturaTipo } from '@common/types/safraTypes';
import {
  InsertFazendaDto,
  UpdateFazendaDto,
  FindFazendaReturnDto,
} from '@fazenda/dto/fazenda.Dto';
import { MockFazendaService } from '@fazenda/tests/mocks/fazenda.mock.service';
import { MockSafraService } from '@safra/tests/mocks/safra.mock.service';

@Controller('Fazenda')
export class MockFazendaController {
  constructor(
    @Inject(MockFazendaService)
    private readonly fazendaService: MockFazendaService,

    @Inject(MockSafraService)
    private readonly safraService: MockSafraService,
  ) {}

  @Get()
  findAll(): FindFazendaReturnDto[] {
    return this.fazendaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): FindFazendaReturnDto {
    return this.fazendaService.findOne(id);
  }

  @Get(':id/safra')
  findSafraByFazenda(@Param('id') id: string) {
    return this.safraService.findByFazendaId(id);
  }

  @Get(':id/:ano')
  findSafraByFazendaAndAno(@Param('id') id: string, @Param('ano') ano: number) {
    return this.safraService.findByFazendaIdAndAno(id, ano);
  }

  @Get(':id/:cultura')
  findSafraByFazendaAndCultura(
    @Param('id') id: string,
    @Param('cultura') cultura: CulturaTipo,
  ) {
    return this.safraService.findByFazendaIdAndCultura(id, cultura);
  }

  @Get(':id/:cultura/:ano')
  findSafraByFazendaIdAndCulturaAndAno(
    @Param('id') id: string,
    @Param('cultura') cultura: CulturaTipo,
    @Param('ano') ano: number,
  ) {
    return this.safraService.findByFazendaIdAndCulturaAndAno(id, cultura, ano);
  }

  @Post()
  create(@Body() body: InsertFazendaDto): FindFazendaReturnDto {
    return this.fazendaService.create(body);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateFazendaDto,
  ): FindFazendaReturnDto {
    return this.fazendaService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fazendaService.remove(id);
  }

  @Get('produtor/:produtorId')
  findByProdutor(@Param('produtorId') produtorId: string) {
    return this.fazendaService.findByProdutorId(produtorId);
  }
}
