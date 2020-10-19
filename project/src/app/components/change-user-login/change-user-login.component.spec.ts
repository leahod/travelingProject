import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeUserLoginComponent } from './change-user-login.component';

describe('ChangeUserLoginComponent', () => {
  let component: ChangeUserLoginComponent;
  let fixture: ComponentFixture<ChangeUserLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeUserLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeUserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
