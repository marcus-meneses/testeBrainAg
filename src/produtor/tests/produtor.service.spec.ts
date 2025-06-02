import { MockProdutorService as ProdutorService } from '@produtor/tests/mocks/produtor.mock.service';
import {
  mockProdutores,
  mockCreateProdutorDto,
  expectedCreatedProdutor,
  mockUpdateProdutorDto,
  expectedUpdatedProdutor,
} from '@produtor/tests/mocks/produtor.mock';

describe('ProdutorService', () => {
  let service: ProdutorService;

  beforeEach(() => {
    service = new ProdutorService();
  });

  it('should return all produtores', () => {
    const result = service.findAll();
    expect(result).toEqual(mockProdutores);
    expect(result).toHaveLength(2);
  });

  it('should return a produtor by ID', () => {
    const id = 'a1eebc70-bc3b-43e9-9a82-5b7d9d68e982';
    const result = service.findOne(id);
    expect(result.id).toBe(id);
    expect(result.nome).toBeDefined();
    expect(result.cpf_cnpj).toMatch(/^\d{11}$/);
  });

  it('should create a produtor', () => {
    const result = service.create(mockCreateProdutorDto);
    expect(result).toEqual(expectedCreatedProdutor);
  });

  it('should update a produtor', () => {
    const id = expectedUpdatedProdutor.id;
    const result = service.update(id, mockUpdateProdutorDto);
    expect(result).toEqual(expectedUpdatedProdutor);
  });

  it('should remove a produtor', () => {
    const id = '1f839d88-b891-4fd8-ae88-2c19735ad9f0';
    const result = service.remove(id);
    expect(result.id).toBe(id);
    expect(result.nome).toBeDefined();
    expect(result.cpf_cnpj).toMatch(/^\d{11}$/);
  });
});
