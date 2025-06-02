import { Safra } from '@/common/entities/safra.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SafraController } from '@safra/safra.controller';
import { SafraService } from '@safra/safra.service';

@Module({
  imports: [TypeOrmModule.forFeature([Safra])],
  controllers: [SafraController],
  providers: [SafraService],
})
export class SafraModule {}
