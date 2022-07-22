import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoireListComponent } from './accessoire-list.component';

describe('AccessoireListComponent', () => {
  let component: AccessoireListComponent;
  let fixture: ComponentFixture<AccessoireListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessoireListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessoireListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
