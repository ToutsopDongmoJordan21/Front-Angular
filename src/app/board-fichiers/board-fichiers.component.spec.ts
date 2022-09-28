import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardFichiersComponent } from './board-fichiers.component';

describe('BoardFichiersComponent', () => {
  let component: BoardFichiersComponent;
  let fixture: ComponentFixture<BoardFichiersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardFichiersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardFichiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
