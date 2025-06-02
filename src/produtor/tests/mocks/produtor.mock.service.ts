import { Injectable } from '@nestjs/common';
import {
  mockProdutores,
  expectedCreatedProdutor,
  expectedUpdatedProdutor,
} from '@produtor/tests/mocks/produtor.mock';

@Injectable()
export class MockProdutorService {
  findAll = jest.fn(() => mockProdutores);

  findOne = jest.fn((id: string) => ({
    ...mockProdutores[0],
    id,
  }));

  create = jest.fn((_body) => expectedCreatedProdutor);

  update = jest.fn(
    (id: string, body) =>
      ({
        id,
        ...body,
      }) as typeof expectedUpdatedProdutor,
  );

  remove = jest.fn((id: string) => ({
    ...mockProdutores[0],
    id,
  }));
}
