import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Inject,
} from '@nestjs/common';

import {
  InsertSafraDto,
  UpdateSafraDto,
  FindSafraReturnDto,
} from '@safra/dto/safra.Dto';
import { MockSafraService as SafraService } from '@safra/tests/mocks/safra.mock.service';

@Controller('mock-safra')
export class MockSafraController {
  constructor(
    @Inject(SafraService)
    private readonly safraService: SafraService,
  ) {}

  @Get()
  findAll(): FindSafraReturnDto[] {
    return this.safraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): FindSafraReturnDto {
    return this.safraService.findOne(id);
  }

  @Post()
  create(@Body() body: InsertSafraDto): FindSafraReturnDto {
    return this.safraService.create(body) as FindSafraReturnDto;
  }

  @Post(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateSafraDto,
  ): FindSafraReturnDto {
    return this.safraService.update(id, body) as FindSafraReturnDto;
  }

  @Delete(':id')
  remove(@Param('id') id: string): FindSafraReturnDto {
    return this.safraService.remove(id);
  }
}
