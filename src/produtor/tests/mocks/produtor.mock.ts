import {
  InsertProdutorDto,
  UpdateProdutorDto,
  FindProdutorReturnDto,
} from '@produtor/dto/produtorDto';

export const mockProdutores: FindProdutorReturnDto[] = [
  {
    id: 'a1eebc70-bc3b-43e9-9a82-5b7d9d68e982',
    nome: 'João da Silva',
    cpf_cnpj: '12345678901',
  },
  {
    id: 'c9bace9a-bb8d-4b02-8b86-25de379f1d23',
    nome: 'Maria Oliveira',
    cpf_cnpj: '10987654321',
  },
];

export const mockCreateProdutorDto: InsertProdutorDto = {
  nome: 'Novo Produtor',
  cpf_cnpj: '11122233344',
};

export const expectedCreatedProdutor: FindProdutorReturnDto = {
  id: 'generated-id',
  ...mockCreateProdutorDto,
};

export const mockUpdateProdutorDto: UpdateProdutorDto = {
  nome: 'João Atualizado',
  cpf_cnpj: '12312312300',
};

export const expectedUpdatedProdutor: FindProdutorReturnDto = {
  id: 'a1eebc70-bc3b-43e9-9a82-5b7d9d68e982',
  nome: mockUpdateProdutorDto.nome || 'João da Silva',
  cpf_cnpj: mockUpdateProdutorDto.cpf_cnpj || '123.456.789-01',
};
