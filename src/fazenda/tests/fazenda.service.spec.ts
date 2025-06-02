import { MockFazendaService as FazendaService } from '@fazenda/tests/mocks/fazenda.mock.service';
import {
  mockFazendas,
  mockCreateFazendaDto,
  expectedCreatedFazenda,
  mockUpdateFazendaDto,
  expectedUpdatedFazenda,
} from '@fazenda/tests/mocks/fazenda.mock';

describe('FazendaService', () => {
  let service: FazendaService;

  beforeEach(() => {
    service = new FazendaService();
  });

  it('should return all fazendas', () => {
    const result = service.findAll();
    expect(result).toHaveLength(2);
    expect(result[0].nome).toBe(mockFazendas[0].nome);
  });

  it('should return a fazenda by ID', () => {
    const id = '0c2f9330-3c59-4605-8d11-5cf3c5d725af';
    const result = service.findOne(id);
    expect(result.id).toBe(id);
    expect(result.nome).toBeDefined();
  });

  it('should create a fazenda', () => {
    const result = service.create(mockCreateFazendaDto);
    expect(result).toEqual(expectedCreatedFazenda);
  });

  it('should update a fazenda', () => {
    const result = service.update(
      expectedUpdatedFazenda.id,
      mockUpdateFazendaDto,
    );
    expect(result).toEqual(expectedUpdatedFazenda);
  });

  it('should remove a fazenda', () => {
    const id = '74d30c62-b913-48b9-bcee-9dc2157c1e36';
    const result = service.remove(id);
    expect(result.id).toBe(id);
    expect(result.nome).toBeDefined();
  });

  it('should return fazendas by produtor ID', () => {
    const produtorId = '53cf0d6a-4d76-4b66-a7d0-9e1d2b0f2b42';
    const result = service.findByProdutorId(produtorId);
    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((f) => f.produtor_id === produtorId)).toBe(true);
  });
});
