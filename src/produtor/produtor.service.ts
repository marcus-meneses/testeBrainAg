import { HttpException, Injectable } from '@nestjs/common';
import {
  InsertProdutorDto,
  UpdateProdutorDto,
  FindProdutorReturnDto,
} from '@produtor/dto/produtorDto';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Produtor } from '@/common/entities/produtor.entity';

@Injectable()
export class ProdutorService {
  constructor(
    @InjectRepository(Produtor)
    private readonly produtorRepository: Repository<Produtor>,
  ) {}
  async findAll(): Promise<FindProdutorReturnDto[]> {
    return await this.produtorRepository.find({
      select: ['id', 'nome', 'cpf_cnpj'],
      order: {
        nome: 'ASC',
      },
    });
  }

  async findOne(id: string): Promise<FindProdutorReturnDto | null> {
    const produtor = await this.produtorRepository.findOne({
      where: { id: id },
      select: ['id', 'nome', 'cpf_cnpj'],
      order: {
        nome: 'ASC',
      },
    });

    if (!produtor) {
      throw new HttpException('Produtor not found', 404);
    }
    return produtor;
  }

  async create(body: InsertProdutorDto): Promise<FindProdutorReturnDto> {
    try {
      const produtor = this.produtorRepository.create(body);
      await this.produtorRepository.insert(produtor);
      return produtor;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new HttpException(errorMessage, 400);
    }
  }

  async update(
    id: string,
    body: UpdateProdutorDto,
  ): Promise<FindProdutorReturnDto> {
    const produtor = await this.produtorRepository.update(id, body);
    if (produtor.affected === 0) {
      throw new HttpException('Produtor not found', 404);
    }
    return (await this.produtorRepository.findOne({
      where: { id: id },
      select: ['id', 'nome', 'cpf_cnpj'],
    })) as FindProdutorReturnDto;
  }

  async remove(id: string): Promise<FindProdutorReturnDto> {
    const produtor = await this.produtorRepository.findOne({
      where: { id: id },
      select: ['id', 'nome', 'cpf_cnpj'],
    });
    if (!produtor) {
      throw new HttpException('Produtor not found', 404);
    }

    await this.produtorRepository.delete({
      id: id,
    });

    return produtor as FindProdutorReturnDto;
  }

  async findFazendasByProdutor(id: string): Promise<unknown> {
    const produtor = await this.produtorRepository.findOne({
      relations: ['fazendas'],
      where: { id: id },
    });

    if (!produtor) {
      throw new HttpException('Produtor not found', 404);
    }

    return produtor;
  }
}
