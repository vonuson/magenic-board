import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPopupEditComponent } from './card-popup-edit.component';

describe('CardPopupEditComponent', () => {
  let component: CardPopupEditComponent;
  let fixture: ComponentFixture<CardPopupEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardPopupEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPopupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
