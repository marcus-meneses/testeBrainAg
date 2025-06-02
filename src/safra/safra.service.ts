import { HttpException, Injectable } from '@nestjs/common';
import {
  InsertSafraDto,
  UpdateSafraDto,
  FindSafraReturnDto,
} from '@safra/dto/safra.Dto';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CulturaTipo } from '@common/types/safraTypes';
import { Safra } from '@/common/entities/safra.entity';

@Injectable()
export class SafraService {
  constructor(
    @InjectRepository(Safra)
    private readonly safraRepository: Repository<Safra>,
  ) {}
  async findAll(): Promise<FindSafraReturnDto[]> {
    const safras = await this.safraRepository.find({
      relations: ['fazenda'],
      select: ['id', 'fazenda', 'ano', 'cultura', 'area'],
      order: {
        ano: 'ASC',
      },
    });

    if (!safras || safras.length === 0) {
      return [];
    }

    return safras.map((safra) => ({
      id: safra.id,
      fazenda_id: safra.fazenda.id,
      ano: safra.ano,
      cultura: safra.cultura,
      area: safra.area,
    })) as FindSafraReturnDto[];
  }

  async findOne(id: string): Promise<FindSafraReturnDto> {
    const safra = await this.safraRepository.findOne({
      relations: ['fazenda'],
      where: { id: id },

      select: ['id', 'fazenda', 'ano', 'cultura', 'area'],
    });
    if (!safra) {
      throw new HttpException('Safra not found', 404);
    }
    return {
      id: safra.id,
      fazenda_id: safra.fazenda.id,
      ano: safra.ano,
      cultura: safra.cultura,
      area: safra.area,
    } as FindSafraReturnDto;
  }

  async create(body: InsertSafraDto): Promise<FindSafraReturnDto> {
    try {
      const safra = this.safraRepository.create(body);
      await this.safraRepository.insert(safra);
      return {
        id: safra.id,
        fazenda_id: safra.fazenda.id,
        ano: safra.ano,
        cultura: safra.cultura,
        area: safra.area,
      } as FindSafraReturnDto;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new HttpException(errorMessage, 400);
    }
  }

  async update(id: string, body: UpdateSafraDto): Promise<FindSafraReturnDto> {
    const safra = await this.safraRepository.update(id, body);
    if (safra.affected === 0) {
      throw new HttpException('Safra not found', 404);
    }
    const updatedSafra = await this.safraRepository.findOne({
      relations: ['fazenda'],
      where: { id: id },
      select: ['id', 'fazenda', 'ano', 'cultura', 'area'],
    });

    if (!updatedSafra) {
      throw new HttpException('Safra not found after update', 404);
    }
    return {
      id: updatedSafra.id,
      fazenda_id: updatedSafra.fazenda.id,
      ano: updatedSafra.ano,
      cultura: updatedSafra.cultura,
      area: updatedSafra.area,
    } as FindSafraReturnDto;
  }

  async remove(id: string): Promise<FindSafraReturnDto> {
    const safra = await this.safraRepository.findOne({
      relations: ['fazenda'],
      where: { id: id },
      select: ['id', 'fazenda', 'ano', 'cultura', 'area'],
    });
    if (!safra) {
      throw new HttpException('Safra not found', 404);
    }

    await this.safraRepository.delete({ id: id });

    return {
      id: safra.id,
      fazenda_id: safra.fazenda.id,
      ano: safra.ano,
      cultura: safra.cultura,
      area: safra.area,
    } as FindSafraReturnDto;
  }

  async findByFazendaId(fazendaId: string): Promise<FindSafraReturnDto[]> {
    const safras = await this.safraRepository.find({
      relations: ['fazenda'],
      where: { fazenda: { id: fazendaId } },
      select: ['id', 'fazenda', 'ano', 'cultura', 'area'],
      order: {
        ano: 'ASC',
      },
    });

    if (!safras || safras.length === 0) {
      return [];
    }

    return safras.map((safra) => ({
      id: safra.id,
      fazenda_id: safra.fazenda.id,
      ano: safra.ano,
      cultura: safra.cultura,
      area: safra.area,
    })) as FindSafraReturnDto[];
  }

  async findByFazendaIdAndAno(
    fazendaId: string,
    ano: number,
  ): Promise<FindSafraReturnDto[] | null> {
    const safras = await this.safraRepository.find({
      relations: ['fazenda'],
      where: { fazenda: { id: fazendaId }, ano: ano },
      select: ['id', 'fazenda', 'ano', 'cultura', 'area'],
      order: {
        ano: 'ASC',
      },
    });

    if (!safras || safras.length === 0) {
      return null;
    }

    return safras.map((safra) => ({
      id: safra.id,
      fazenda_id: safra.fazenda.id,
      ano: safra.ano,
      cultura: safra.cultura,
      area: safra.area,
    })) as FindSafraReturnDto[];
  }

  async findByFazendaIdAndCultura(
    fazendaId: string,
    cultura: CulturaTipo,
  ): Promise<FindSafraReturnDto[] | null> {
    const safras = await this.safraRepository.find({
      relations: ['fazenda'],
      where: { fazenda: { id: fazendaId }, cultura: cultura },
      select: ['id', 'fazenda', 'ano', 'cultura', 'area'],
      order: {
        ano: 'ASC',
      },
    });

    if (!safras || safras.length === 0) {
      return null;
    }

    return safras.map((safra) => ({
      id: safra.id,
      fazenda_id: safra.fazenda.id,
      ano: safra.ano,
      cultura: safra.cultura,
      area: safra.area,
    })) as FindSafraReturnDto[];
  }

  async findByFazendaIdAndCulturaAndAno(
    fazendaId: string,
    cultura: CulturaTipo,
    ano: number,
  ): Promise<FindSafraReturnDto[] | null> {
    const safras = await this.safraRepository.find({
      relations: ['fazenda'],
      where: {
        fazenda: { id: fazendaId },
        cultura: cultura,
        ano: ano,
      },
      select: ['id', 'fazenda', 'ano', 'cultura', 'area'],
      order: {
        ano: 'ASC',
      },
    });

    if (!safras || safras.length === 0) {
      return null;
    }

    return safras.map((safra) => ({
      id: safra.id,
      fazenda_id: safra.fazenda.id,
      ano: safra.ano,
      cultura: safra.cultura,
      area: safra.area,
    })) as FindSafraReturnDto[];
  }
}
