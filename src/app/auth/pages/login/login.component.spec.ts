import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';

import { Location } from "@angular/common";
import { Router } from "@angular/router";


describe('LoginComponent unit test', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [LoginComponent],
      providers: [
        Location
    ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check input validator minLenght ', () => {
    component.username.setValue('a');
    expect(component.username.valid).toBeFalsy();
    expect(component.username.hasError('minlength')).toBeTruthy();
  });

  it('check input validator maxLenght ', () => {
    component.username.setValue('012345678901234567890123456789');
    expect(component.username.valid).toBeFalsy();
    expect(component.username.hasError('maxlength')).toBeTruthy();
  });

  it('check input validator empty ', () => {
    component.username.setValue('');
    expect(component.username.valid).toBeFalsy();
    expect(component.username.hasError('required')).toBeTruthy();
  });

  it('check input validator isValid ', () => {
    component.username.setValue('Hector');
    expect(component.username.valid).toBeTruthy();
  });

  it('check button click ', () => {
    component.username.setValue('Héctor');
    fixture.debugElement.query(By.css('button')).nativeElement.click();

    expect(component.username.valid).toBeTruthy();
  });

});
