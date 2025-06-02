import { HttpException, Injectable } from '@nestjs/common';
import {
  InsertFazendaDto,
  UpdateFazendaDto,
  FindFazendaReturnDto,
} from '@fazenda/dto/fazenda.Dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fazenda } from '@/common/entities/fazenda.entity';

@Injectable()
export class FazendaService {
  constructor(
    @InjectRepository(Fazenda)
    private readonly fazendaRepository: Repository<Fazenda>,
  ) {}

  async findAll(): Promise<FindFazendaReturnDto[]> {
    const fazendas = await this.fazendaRepository.find({
      relations: ['produtor'],
      select: [
        'id',
        'produtor',
        'nome',
        'cidade',
        'estado',
        'area_total',
        'area_agricultavel',
        'area_vegetacao',
      ],
      order: {
        nome: 'ASC',
      },
    });

    if (!fazendas || fazendas.length === 0) {
      throw new HttpException('No fazendas found', 404);
    }

    return fazendas.map((fazenda) => ({
      id: fazenda.id,
      produtor_id: fazenda.produtor.id,
      nome: fazenda.nome,
      cidade: fazenda.cidade,
      estado: fazenda.estado,
      area_total: fazenda.area_total,
      area_agricultavel: fazenda.area_agricultavel,
      area_vegetacao: fazenda.area_vegetacao,
    })) as FindFazendaReturnDto[];
  }

  async findOne(id: string): Promise<FindFazendaReturnDto> {
    const fazenda = await this.fazendaRepository.findOne({
      relations: ['produtor'],
      where: { id: id },
      select: [
        'id',
        'produtor',
        'nome',
        'cidade',
        'estado',
        'area_total',
        'area_agricultavel',
        'area_vegetacao',
      ],
    });

    if (!fazenda) {
      throw new HttpException('Fazenda not found', 404);
    }

    return {
      id: fazenda.id,
      produtor_id: fazenda.produtor.id,
      nome: fazenda.nome,
      cidade: fazenda.cidade,
      estado: fazenda.estado,
      area_total: fazenda.area_total,
      area_agricultavel: fazenda.area_agricultavel,
      area_vegetacao: fazenda.area_vegetacao,
    } as FindFazendaReturnDto;
  }

  async create(body: InsertFazendaDto): Promise<FindFazendaReturnDto> {
    try {
      const fazenda = this.fazendaRepository.create(body);
      await this.fazendaRepository.insert(fazenda);
      return {
        id: fazenda.id,
        produtor_id: fazenda.produtor.id,
        nome: fazenda.nome,
        cidade: fazenda.cidade,
        estado: fazenda.estado,
        area_total: fazenda.area_total,
        area_agricultavel: fazenda.area_agricultavel,
        area_vegetacao: fazenda.area_vegetacao,
      } as FindFazendaReturnDto;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new HttpException('Error creating fazenda: ' + errorMessage, 400);
    }
  }

  async update(
    id: string,
    body: UpdateFazendaDto,
  ): Promise<FindFazendaReturnDto> {
    const fazenda = await this.fazendaRepository.update(id, body);
    if (fazenda.affected === 0) {
      throw new HttpException('Fazenda not found', 404);
    }
    const updated = await this.fazendaRepository.findOne({
      relations: ['produtor'],
      where: { id: id },
      select: [
        'id',
        'produtor',
        'nome',
        'cidade',
        'estado',
        'area_total',
        'area_agricultavel',
        'area_vegetacao',
      ],
    });

    if (!updated) {
      throw new HttpException('Fazenda not found after update', 404);
    }

    return {
      id: updated.id,
      produtor_id: updated.produtor.id,
      nome: updated.nome,
      cidade: updated.cidade,
      estado: updated.estado,
      area_total: updated.area_total,
      area_agricultavel: updated.area_agricultavel,
      area_vegetacao: updated.area_vegetacao,
    };
  }

  async remove(id: string): Promise<FindFazendaReturnDto> {
    const fazenda = await this.fazendaRepository.findOne({
      relations: ['produtor'],
      where: { id: id },
      select: [
        'id',
        'produtor',
        'nome',
        'cidade',
        'estado',
        'area_total',
        'area_agricultavel',
        'area_vegetacao',
      ],
    });

    if (!fazenda) {
      throw new HttpException('Fazenda not found', 404);
    }

    await this.fazendaRepository.delete({ id: id });

    return {
      id: fazenda.id,
      produtor_id: fazenda.produtor.id,
      nome: fazenda.nome,
      cidade: fazenda.cidade,
      estado: fazenda.estado,
      area_total: fazenda.area_total,
      area_agricultavel: fazenda.area_agricultavel,
      area_vegetacao: fazenda.area_vegetacao,
    };
  }

  async findSafrasByFazenda(id: string): Promise<unknown> {
    const fazenda = await this.fazendaRepository.findOne({
      relations: ['produtor', 'safras'],
      where: { id: id },
    });

    if (!fazenda) {
      throw new HttpException('Fazenda not found', 404);
    }

    return {
      id: fazenda.id,
      produtor_id: fazenda.produtor.id,
      nome: fazenda.nome,
      cidade: fazenda.cidade,
      estado: fazenda.estado,
      area_total: fazenda.area_total,
      area_agricultavel: fazenda.area_agricultavel,
      area_vegetacao: fazenda.area_vegetacao,
      safras: fazenda.safras,
    };
  }

  async findSafrasByFazendaAndAno(id: string, ano: number): Promise<unknown> {
    const fazenda = await this.fazendaRepository.findOne({
      relations: ['produtor', 'safras'],
      where: { id: id },
    });

    if (!fazenda) {
      throw new HttpException('Fazenda not found', 404);
    }

    const safrasAno = fazenda.safras.filter((s) => s.ano == ano);

    if (safrasAno.length === 0) {
      throw new HttpException('Safra not found for the given year', 404);
    }

    return {
      id: fazenda.id,
      produtor_id: fazenda.produtor.id,
      nome: fazenda.nome,
      cidade: fazenda.cidade,
      estado: fazenda.estado,
      area_total: fazenda.area_total,
      area_agricultavel: fazenda.area_agricultavel,
      area_vegetacao: fazenda.area_vegetacao,
      safra: safrasAno, // Assuming you want the first safra for the given year
    };
  }
}
