import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Check,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import {
  isValidCpf,
  isValidCnpj,
} from '@common/validators/IsCpfCnpj.validator';

import { Fazenda } from '@/common/entities/fazenda.entity';

@Entity('Produtor')
@Check(`"cpf_cnpj" ~ '^\\d{3}\\.\\d{3}\\.\\d{3}\\-\\d{2}$' OR
        "cpf_cnpj" ~ '^\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}\\-\\d{2}$'`)
export class Produtor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true, nullable: false })
  cpf_cnpj: string;

  @Column({ type: 'text', nullable: false })
  nome: string;

  @OneToMany(() => Fazenda, (fazenda) => fazenda.produtor)
  fazendas: Fazenda[];

  @BeforeInsert()
  @BeforeUpdate()
  validateCpfCnpj() {
    const clean = this.cpf_cnpj.replace(/\D/g, '');
    if (clean.length === 11) {
      if (!isValidCpf(clean)) {
        throw new Error('CPF inválido');
      }
    } else if (clean.length === 14) {
      if (!isValidCnpj(clean)) {
        throw new Error('CNPJ inválido');
      }
    }
  }
}
