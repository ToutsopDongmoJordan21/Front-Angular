import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePaymentComponent } from './profile-payment.component';

describe('ProfilePaymentComponent', () => {
  let component: ProfilePaymentComponent;
  let fixture: ComponentFixture<ProfilePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
