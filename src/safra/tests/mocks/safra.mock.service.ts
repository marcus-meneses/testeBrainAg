import { Injectable } from '@nestjs/common';
import { mockSafras } from '@safra/tests/mocks/safra.mock';
import { CulturaTipo } from '@common/types/safraTypes';

@Injectable()
export class MockSafraService {
  findAll = jest.fn(() => mockSafras.slice(0, 2));

  findOne = jest.fn((id: string) => ({
    ...mockSafras[0],
    id,
  }));

  create = jest.fn(
    (dto) =>
      ({
        id: 'generated-id',
        ...dto,
      }) as unknown,
  );

  update = jest.fn(
    (id: string, dto) =>
      ({
        id: id,
        ...dto,
      }) as unknown,
  );

  remove = jest.fn((id: string) => ({
    ...mockSafras[0],
    id,
  }));

  findByFazendaId = jest.fn((fazendaId: string) =>
    mockSafras.filter((s) => s.fazenda_id == fazendaId),
  );

  findByFazendaIdAndAno = jest.fn((fazendaId: string, ano: number) =>
    mockSafras.filter((s) => s.fazenda_id == fazendaId && s.ano == ano),
  );

  findByFazendaIdAndCultura = jest.fn(
    (fazendaId: string, cultura: CulturaTipo) =>
      mockSafras.filter(
        (s) => s.fazenda_id == fazendaId && s.cultura == cultura,
      ),
  );

  findByFazendaIdAndCulturaAndAno = jest.fn(
    (fazendaId: string, cultura: CulturaTipo, ano: number) =>
      mockSafras.filter(
        (s) =>
          s.fazenda_id == fazendaId && s.cultura == cultura && s.ano == ano,
      ),
  );
}
