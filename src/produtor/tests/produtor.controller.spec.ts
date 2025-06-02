import { Test, TestingModule } from '@nestjs/testing';
import { MockProdutorController as ProdutorController } from '@produtor/tests/mocks/produtor.mock.controller';
import { MockProdutorService as ProdutorService } from '@produtor/tests/mocks/produtor.mock.service';
import { MockFazendaService as FazendaService } from '@fazenda/tests/mocks/fazenda.mock.service';

import {
  mockProdutores,
  mockCreateProdutorDto,
  expectedCreatedProdutor,
  mockUpdateProdutorDto,
  expectedUpdatedProdutor,
} from '@produtor/tests/mocks/produtor.mock';

import { mockFazendas } from '@fazenda/tests/mocks/fazenda.mock';

describe('ProdutorController', () => {
  let controller: ProdutorController;
  let produtorService: ProdutorService;
  let fazendaService: FazendaService;

  const produtorId = 'a1eebc70-bc3b-43e9-9a82-5b7d9d68e982';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutorController],
      providers: [
        {
          provide: ProdutorService,
          useValue: {
            findAll: jest.fn().mockReturnValue(mockProdutores),
            findOne: jest.fn().mockImplementation((_id) => mockProdutores[0]),
            create: jest.fn().mockReturnValue(expectedCreatedProdutor),
            update: jest.fn().mockImplementation(
              (id, dto) =>
                ({
                  id: id as string,
                  ...dto,
                }) as typeof expectedUpdatedProdutor,
            ),
            remove: jest.fn().mockImplementation((_id) => mockProdutores[0]),
          },
        },
        {
          provide: FazendaService,
          useValue: {
            findByProdutorId: jest.fn().mockReturnValue(mockFazendas),
          },
        },
      ],
    }).compile();

    controller = module.get<ProdutorController>(ProdutorController);
    produtorService = module.get<ProdutorService>(ProdutorService);
    fazendaService = module.get<FazendaService>(FazendaService);
  });

  it('should return all produtores', () => {
    const result = controller.findAll();
    expect(result).toEqual(mockProdutores);
    expect(produtorService.findAll).toHaveBeenCalled();
  });

  it('should return one produtor by ID', () => {
    const result = controller.findOne(produtorId);
    expect(result).toEqual(mockProdutores[0]);
    expect(produtorService.findOne).toHaveBeenCalledWith(produtorId);
  });

  it('should return fazendas by produtor ID', () => {
    const result = controller.findFazendaByProdutor(produtorId);
    expect(result).toEqual(mockFazendas);
    expect(fazendaService.findByProdutorId).toHaveBeenCalledWith(produtorId);
  });

  it('should create a produtor', () => {
    const result = controller.create(mockCreateProdutorDto);
    expect(result).toEqual(expectedCreatedProdutor);
    expect(produtorService.create).toHaveBeenCalledWith(mockCreateProdutorDto);
  });

  it('should update a produtor', () => {
    const result = controller.update(produtorId, mockUpdateProdutorDto);
    expect(result.id).toBe(produtorId);
    expect(result.nome).toBe(mockUpdateProdutorDto.nome);
    expect(produtorService.update).toHaveBeenCalledWith(
      produtorId,
      mockUpdateProdutorDto,
    );
  });

  it('should remove a produtor', () => {
    const result = controller.remove(produtorId);
    expect(result).toEqual(mockProdutores[0]);
    expect(produtorService.remove).toHaveBeenCalledWith(produtorId);
  });
});
