import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTravelingPComponent } from './edit-traveling-p.component';

describe('EditTravelingPComponent', () => {
  let component: EditTravelingPComponent;
  let fixture: ComponentFixture<EditTravelingPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTravelingPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTravelingPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
