import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Check,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Produtor } from '@common/entities/produtor.entity';
import { Safra } from '@/common/entities/safra.entity';

@Entity('Fazenda')
@Check(`
    "area_agricultavel" + "area_vegetacao" <= "area_total"
    `)
export class Fazenda {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Produtor, (produtor) => produtor.fazendas, {
    nullable: false,
  })
  @JoinColumn({ name: 'produtor_id' })
  produtor: Produtor;

  @Column({ type: 'text', nullable: false })
  nome: string;

  @Column({ type: 'text', nullable: false })
  cidade: string;

  @Column({ type: 'text', nullable: false })
  estado: string;

  @Column({ type: 'numeric', nullable: false, precision: 12, scale: 4 })
  area_total: number;

  @Column({ type: 'numeric', nullable: false, precision: 12, scale: 4 })
  area_agricultavel: number;

  @Column({ type: 'numeric', nullable: false, precision: 12, scale: 4 })
  area_vegetacao: number;

  @OneToMany((_type) => Safra, (safra) => safra.fazenda)
  safras: Safra[];
}
