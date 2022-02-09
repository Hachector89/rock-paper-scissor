import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ValidateUserGuard } from './validate-user.guard';

describe('ValidateUserGuard', () => {
  let guard: ValidateUserGuard;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ValidateUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
