import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardSubscriptionComponent } from './board-subscription.component';

describe('BoardSubscriptionComponent', () => {
  let component: BoardSubscriptionComponent;
  let fixture: ComponentFixture<BoardSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
