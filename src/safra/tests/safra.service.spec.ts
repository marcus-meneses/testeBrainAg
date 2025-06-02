import { MockSafraService as SafraService } from '@safra/tests/mocks/safra.mock.service';
import {
  mockCreateSafraDto,
  expectedCreatedSafra,
  mockUpdateSafraDto,
  expectedUpdatedSafra,
} from '@safra/tests/mocks/safra.mock';
import { CulturaTipo } from '@common/types/safraTypes';

describe('SafraService', () => {
  let service: SafraService;

  beforeEach(() => {
    service = new SafraService();
  });

  it('should return all safras', () => {
    const result = service.findAll();
    expect(result).toHaveLength(2);
    expect(result[0].cultura).toBe(CulturaTipo.Soja);
  });

  it('should return a safra by ID', () => {
    const id = 'test-safra-id';
    const result = service.findOne(id);
    expect(result.id).toBe(id);
    expect(result.fazenda_id).toBeDefined();
  });

  it('should create a safra', () => {
    const result = service.create(mockCreateSafraDto);
    expect(result).toEqual(expectedCreatedSafra);
  });

  it('should update a safra', () => {
    const result = service.update(expectedUpdatedSafra.id, mockUpdateSafraDto);
    expect(result).toEqual({
      id: expectedUpdatedSafra.id,
      ...mockUpdateSafraDto,
    });
  });

  it('should remove a safra', () => {
    const result = service.remove('any-safra-id');
    expect(result.id).toBe('any-safra-id');
    expect(result.cultura).toBe(CulturaTipo.Soja);
  });

  it('should return safras by fazenda ID', () => {
    const fazendaId = 'de123a6b-bb14-4c1f-8675-ef49e84250e6';
    const result = service.findByFazendaId(fazendaId);
    expect(result.every((s) => s.fazenda_id === fazendaId)).toBe(true);
  });

  it('should return safras by fazenda ID and ano', () => {
    const fazendaId = 'de123a6b-bb14-4c1f-8675-ef49e84250e6';
    const ano = 2024;
    const result = service.findByFazendaIdAndAno(fazendaId, ano);
    expect(result).not.toBeNull();
    expect(result?.every((s) => s.ano === ano)).toBe(true);
  });

  it('should return safras by fazenda ID and cultura', () => {
    const fazendaId = 'de123a6b-bb14-4c1f-8675-ef49e84250e6';
    const cultura = CulturaTipo.Milho;
    const result = service.findByFazendaIdAndCultura(fazendaId, cultura);
    expect(result).not.toBeNull();
    expect(result?.every((s) => s.cultura === cultura)).toBe(true);
  });

  it('should return safras by fazenda ID, cultura and ano', () => {
    const fazendaId = 'de123a6b-bb14-4c1f-8675-ef49e84250e6';
    const cultura = CulturaTipo.Milho;
    const ano = 2024;
    const result = service.findByFazendaIdAndCulturaAndAno(
      fazendaId,
      cultura,
      ano,
    );
    expect(result).not.toBeNull();
    expect(result?.length).toBeGreaterThan(0);
    result?.forEach((s) => {
      expect(s.ano).toBe(ano);
      expect(s.cultura).toBe(cultura);
    });
  });
});
