import { Test, TestingModule } from '@nestjs/testing';
import { MockSafraController as SafraController } from '@safra/tests/mocks/safra.mock.controller';
import { MockSafraService as SafraService } from '@safra/tests/mocks/safra.mock.service';
import {
  mockCreateSafraDto,
  mockUpdateSafraDto,
  expectedCreatedSafra,
  mockSafras,
} from '@safra/tests/mocks/safra.mock';

describe('SafraController', () => {
  let controller: SafraController;
  let service: SafraService;

  const mockSafraId = '9b8e9e50-8e45-4b83-8f27-c8a6c0ef77f0';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SafraController],
      providers: [SafraService],
    }).compile();

    controller = module.get<SafraController>(SafraController);
    service = module.get<SafraService>(SafraService);
  });

  it('should return all safras', () => {
    const result = controller.findAll();
    expect(result).toEqual(mockSafras.slice(0, 2));
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return one safra by id', () => {
    const result = controller.findOne(mockSafraId);
    expect(result.id).toBe(mockSafraId);
    expect(service.findOne).toHaveBeenCalledWith(mockSafraId);
  });

  it('should create a safra', () => {
    const result = controller.create(mockCreateSafraDto);
    expect(result).toEqual(expectedCreatedSafra);
    expect(service.create).toHaveBeenCalledWith(mockCreateSafraDto);
  });

  it('should update a safra', () => {
    const result = controller.update(mockSafraId, mockUpdateSafraDto);
    expect(result.id).toBe(mockSafraId);
    expect(result.cultura).toBe(mockUpdateSafraDto.cultura);
    expect(service.update).toHaveBeenCalledWith(
      mockSafraId,
      mockUpdateSafraDto,
    );
  });

  it('should remove a safra', () => {
    const result = controller.remove(mockSafraId);
    expect(result.id).toBe(mockSafraId);
    expect(service.remove).toHaveBeenCalledWith(mockSafraId);
  });
});
