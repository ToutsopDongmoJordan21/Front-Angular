import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageDetailsComponent } from './garage-details.component';

describe('GarageDetailsComponent', () => {
  let component: GarageDetailsComponent;
  let fixture: ComponentFixture<GarageDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GarageDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
