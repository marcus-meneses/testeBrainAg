import { Module } from '@nestjs/common';
import { ProdutorController } from '@produtor/produtor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutorService } from '@produtor/produtor.service';
import { FazendaService } from '@fazenda/fazenda.service';
import { Produtor } from '@/common/entities/produtor.entity';
import { Fazenda } from '@/common/entities/fazenda.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Produtor, Fazenda])],
  controllers: [ProdutorController],
  providers: [ProdutorService, FazendaService],
})
export class ProdutorModule {}
