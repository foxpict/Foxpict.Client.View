import { MatMaterialModule } from './mat-material.module';

describe('MatMaterialModule', () => {
  let matMaterialModule: MatMaterialModule;

  beforeEach(() => {
    matMaterialModule = new MatMaterialModule();
  });

  it('should create an instance', () => {
    expect(matMaterialModule).toBeTruthy();
  });
});
