import {
  InsertFazendaDto,
  UpdateFazendaDto,
  FindFazendaReturnDto,
} from '@fazenda/dto/fazenda.Dto';

export const mockFazendas: FindFazendaReturnDto[] = [
  {
    id: 'fc7b6e26-61a3-47a4-b2a6-5d74e242a1f0',
    produtor_id: '53cf0d6a-4d76-4b66-a7d0-9e1d2b0f2b42',
    nome: 'Fazenda São João',
    cidade: 'Uberaba',
    estado: 'MG',
    area_total: 150.0,
    area_agricultavel: 120.0,
    area_vegetacao: 30.0,
  },
  {
    id: '2a9cf29a-8ef2-4c15-bdf2-8b3878f4d9a2',
    produtor_id: '53cf0d6a-4d76-4b66-a7d0-9e1d2b0f2b42',
    nome: 'Fazenda Primavera',
    cidade: 'Londrina',
    estado: 'PR',
    area_total: 200.0,
    area_agricultavel: 180.0,
    area_vegetacao: 20.0,
  },
];

export const mockCreateFazendaDto: InsertFazendaDto = {
  produtor_id: 'c8b6318a-ff9f-493b-9897-6fbd62f1a7dd',
  nome: 'Fazenda Nova Esperança',
  cidade: 'Barretos',
  estado: 'SP',
  area_total: 300.0,
  area_agricultavel: 250.0,
  area_vegetacao: 50.0,
};

export const expectedCreatedFazenda: FindFazendaReturnDto = {
  id: 'generated-id',
  ...mockCreateFazendaDto,
};

export const mockUpdateFazendaDto: UpdateFazendaDto = {
  produtor_id: '53cf0d6a-4d76-4b66-a7d0-9e1d2b0f2b42',
  nome: 'Fazenda São João Atualizada',
  cidade: 'Uberaba',
  estado: 'MG',
  area_total: 160.0,
  area_agricultavel: 130.0,
  area_vegetacao: 30.0,
};

export const expectedUpdatedFazenda: FindFazendaReturnDto = {
  id: 'fc7b6e26-61a3-47a4-b2a6-5d74e242a1f0',
  nome: mockUpdateFazendaDto.nome || '',
  cidade: mockUpdateFazendaDto.cidade || '',
  estado: mockUpdateFazendaDto.estado || '',
  area_total: mockUpdateFazendaDto.area_total || 0,
  area_agricultavel: mockUpdateFazendaDto.area_agricultavel || 0,
  area_vegetacao: mockUpdateFazendaDto.area_vegetacao || 0,
  produtor_id:
    mockUpdateFazendaDto.produtor_id || '53cf0d6a-4d76-4b66-a7d0-9e1d2b0f2b42',
};
