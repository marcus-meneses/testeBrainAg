import { Test, TestingModule } from '@nestjs/testing';
import { MockFazendaController as FazendaController } from '@fazenda/tests/mocks/fazenda.mock.controller';
import { MockFazendaService as FazendaService } from '@fazenda/tests/mocks/fazenda.mock.service';
import { MockSafraService as SafraService } from '@/safra/tests/mocks/safra.mock.service';
import {
  mockFazendas,
  mockCreateFazendaDto,
  mockUpdateFazendaDto,
  expectedCreatedFazenda,
} from '@fazenda/tests/mocks/fazenda.mock';
import { CulturaTipo } from '@common/types/safraTypes';
import { mockSafras } from '@/safra/tests/mocks/safra.mock';

describe('FazendaController', () => {
  let controller: FazendaController;
  let fazendaService: FazendaService;
  let safraService: SafraService;

  const fazendaId = '2a9cf29a-8ef2-4c15-bdf2-8b3878f4d9a2';
  const produtorId = '53cf0d6a-4d76-4b66-a7d0-9e1d2b0f2b42';
  const cultura = CulturaTipo.Cafe;
  const ano = 2023;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FazendaController],
      providers: [FazendaService, SafraService],
    }).compile();

    controller = module.get<FazendaController>(FazendaController);
    fazendaService = module.get(FazendaService);
    safraService = module.get(SafraService);
  });

  it('should return all fazendas', () => {
    const result = controller.findAll();
    expect(result).toEqual(mockFazendas);
    expect(fazendaService.findAll).toHaveBeenCalled();
  });

  it('should return a fazenda by id', () => {
    const result = controller.findOne(fazendaId);
    expect(result.id).toBe(fazendaId);
    expect(fazendaService.findOne).toHaveBeenCalledWith(fazendaId);
  });

  it('should return safras by fazenda ID', () => {
    const result = controller.findSafraByFazenda(fazendaId);
    expect(result).toEqual(mockSafras.filter((s) => s.fazenda_id == fazendaId));
    expect(safraService.findByFazendaId).toHaveBeenCalledWith(fazendaId);
  });

  it('should return safras by fazenda ID and ano', () => {
    const result = controller.findSafraByFazendaAndAno(fazendaId, ano);
    expect(result?.[0].ano).toBe(ano);
    expect(safraService.findByFazendaIdAndAno).toHaveBeenCalledWith(
      fazendaId,
      ano,
    );
  });

  it('should return safras by fazenda ID and cultura', () => {
    const result = controller.findSafraByFazendaAndCultura(fazendaId, cultura);
    expect(result?.[0].cultura).toBe(cultura);
    expect(safraService.findByFazendaIdAndCultura).toHaveBeenCalledWith(
      fazendaId,
      cultura,
    );
  });

  it('should return safras by fazenda ID, cultura and ano', () => {
    const result = controller.findSafraByFazendaIdAndCulturaAndAno(
      fazendaId,
      cultura,
      ano,
    );
    expect(result?.[0].ano).toBe(ano);
    expect(safraService.findByFazendaIdAndCulturaAndAno).toHaveBeenCalledWith(
      fazendaId,
      cultura,
      ano,
    );
  });

  it('should create a fazenda', () => {
    const result = controller.create(mockCreateFazendaDto);
    expect(result).toEqual(expectedCreatedFazenda);
    expect(fazendaService.create).toHaveBeenCalledWith(mockCreateFazendaDto);
  });

  it('should update a fazenda', () => {
    const result = controller.update(fazendaId, mockUpdateFazendaDto);
    expect(result.id).toBe(fazendaId);
    expect(fazendaService.update).toHaveBeenCalledWith(
      fazendaId,
      mockUpdateFazendaDto,
    );
  });

  it('should remove a fazenda', () => {
    const result = controller.remove(fazendaId);
    expect(result).toEqual(mockFazendas[1]);
    expect(fazendaService.remove).toHaveBeenCalledWith(fazendaId);
  });

  it('should return fazendas by produtor ID', () => {
    const result = controller.findByProdutor(produtorId);
    expect(result).toEqual(mockFazendas);
    expect(fazendaService.findByProdutorId).toHaveBeenCalledWith(produtorId);
  });
});
