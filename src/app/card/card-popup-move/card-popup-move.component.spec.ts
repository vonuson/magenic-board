import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPopupMoveComponent } from './card-popup-move.component';

describe('CardPopupMoveComponent', () => {
  let component: CardPopupMoveComponent;
  let fixture: ComponentFixture<CardPopupMoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardPopupMoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPopupMoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
