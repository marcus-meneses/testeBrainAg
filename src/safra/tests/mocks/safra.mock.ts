import {
  InsertSafraDto,
  UpdateSafraDto,
  FindSafraReturnDto,
} from '@safra/dto/safra.Dto';
import { CulturaTipo } from '@common/types/safraTypes';

export const mockSafras: FindSafraReturnDto[] = [
  {
    id: '9b8e9e50-8e45-4b83-8f27-c8a6c0ef77f0',
    fazenda_id: 'de123a6b-bb14-4c1f-8675-ef49e84250e6',
    ano: 2023,
    cultura: CulturaTipo.Soja,
    area: 100.0,
  },
  {
    id: 'a9d9b9b1-2e14-41c4-9631-d226abc4a391',
    fazenda_id: 'de123a6b-bb14-4c1f-8675-ef49e84250e6',
    ano: 2024,
    cultura: CulturaTipo.Milho,
    area: 150.0,
  },
  {
    id: 'c2fa0ac3-cb3c-47cd-bbc9-0a56e9ad4e10',
    fazenda_id: '2a9cf29a-8ef2-4c15-bdf2-8b3878f4d9a2',
    ano: 2023,
    cultura: CulturaTipo.Cafe,
    area: 75.0,
  },
  {
    id: '1b14ddc7-f879-4ec4-bd6e-547ea2cf7f3f',
    fazenda_id: '42b36f17-8b96-42dc-9bc0-4ff514e2fd11',
    ano: 2023,
    cultura: CulturaTipo.Soja,
    area: 90.0,
  },
];

export const mockCreateSafraDto: InsertSafraDto = {
  fazenda_id: '8f5e1bd9-b3b0-4a41-b3c5-1229fbd80aa1',
  ano: 2025,
  cultura: CulturaTipo.Trigo,
  area: 300.0,
};

export const mockUpdateSafraDto: UpdateSafraDto = {
  fazenda_id: 'de123a6b-bb14-4c1f-8675-ef49e84250e6',
  ano: 2024,
  cultura: CulturaTipo.Algodao,
  area: 180.0,
};

export const expectedCreatedSafra: FindSafraReturnDto = {
  id: 'generated-id',
  ...mockCreateSafraDto,
};

export const expectedUpdatedSafra: FindSafraReturnDto = {
  id: '9b8e9e50-8e45-4b83-8f27-c8a6c0ef77f0',
  fazenda_id: mockCreateSafraDto.fazenda_id || '',
  ano: mockUpdateSafraDto.ano || 0,
  cultura: mockUpdateSafraDto.cultura || ('' as CulturaTipo),
  area: mockUpdateSafraDto.area || 0,
};
