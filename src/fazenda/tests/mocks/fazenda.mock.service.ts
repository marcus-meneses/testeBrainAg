import { Injectable } from '@nestjs/common';
import {
  mockFazendas,
  expectedCreatedFazenda,
  expectedUpdatedFazenda,
} from '@fazenda/tests/mocks/fazenda.mock';

@Injectable()
export class MockFazendaService {
  findAll = jest.fn(() => mockFazendas);

  findOne = jest.fn((id: string) => ({
    ...mockFazendas[0],
    id,
  }));

  create = jest.fn((_body) => expectedCreatedFazenda);

  update = jest.fn(
    (id: string, body) =>
      ({
        id,
        ...body,
      }) as typeof expectedUpdatedFazenda,
  );

  remove = jest.fn((id: string) => ({
    ...mockFazendas[1],
    id,
  }));

  findByProdutorId = jest.fn((produtorId: string) =>
    mockFazendas.map((f) => ({ ...f, produtor_id: produtorId })),
  );
}
