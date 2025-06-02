import { Module } from '@nestjs/common';
import { FazendaController } from '@fazenda/fazenda.controller';
import { FazendaService } from '@fazenda/fazenda.service';
import { SafraService } from '@/safra/safra.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fazenda } from '@/common/entities/fazenda.entity';
import { Safra } from '@/common/entities/safra.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fazenda, Safra])],
  controllers: [FazendaController],
  providers: [FazendaService, SafraService],
})
export class FazendaModule {}
