import { Module } from '@nestjs/common';
import { ProdutorModule } from '@produtor/produtor.module';
import { FazendaModule } from '@fazenda/fazenda.module';
import { SafraModule } from '@safra/safra.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';

@Module({
  imports: [
    ProdutorModule,
    FazendaModule,
    SafraModule,
    TypeOrmModule.forRoot(config),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
