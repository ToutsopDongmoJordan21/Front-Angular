import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAccessoireComponent } from './update-accessoire.component';

describe('UpdateAccessoireComponent', () => {
  let component: UpdateAccessoireComponent;
  let fixture: ComponentFixture<UpdateAccessoireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAccessoireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAccessoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
