import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTravelingDComponent } from './edit-traveling-d.component';

describe('EditTravelingDComponent', () => {
  let component: EditTravelingDComponent;
  let fixture: ComponentFixture<EditTravelingDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTravelingDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTravelingDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
