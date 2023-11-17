import { TestBed } from '@angular/core/testing';


describe('GlobalDialogCreatorService', () => {
  let service: GlobalDialogCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalDialogCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
