import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardCarComponent } from './board-car.component';

describe('BoardCarComponent', () => {
  let component: BoardCarComponent;
  let fixture: ComponentFixture<BoardCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
