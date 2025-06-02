import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { CulturaTipo } from '@common/types/safraTypes';
import { Fazenda } from '@/common/entities/fazenda.entity';

@Entity('Safra')
export class Safra {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Fazenda, (fazenda) => fazenda.safras, {
    nullable: false,
  })
  @JoinColumn({ name: 'fazenda_id' })
  fazenda: Fazenda;

  @Column({ type: 'int', nullable: false })
  ano: number;

  @Column({ type: 'enum', enum: CulturaTipo, nullable: false })
  cultura: CulturaTipo;

  @Column({ type: 'numeric', nullable: false, precision: 12, scale: 4 })
  area: number;
}
