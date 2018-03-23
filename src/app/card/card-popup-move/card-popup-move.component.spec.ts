import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPopupMoveComponent } from './card-popup-move.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CardDetailService } from '@shared/service/card-detail/card-detail.service';
import { HttpClientModule } from '@angular/common/http';
import { CardListService } from '@shared/service/card-list/card-list.service';
import { ArrayExtensionService } from '@shared/service/array-extension/array-extension.service';
import { InputDialogComponent } from '@shared/component/input-dialog/input-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

describe('CardPopupMoveComponent', () => {
  let component: CardPopupMoveComponent;
  let fixture: ComponentFixture<CardPopupMoveComponent>;

  let data = { }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ CardPopupMoveComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        CardDetailService,
        CardListService,
        ArrayExtensionService,
        { provide: MAT_DIALOG_DATA, useValue: { data } },
        { provide: MatDialogRef, useValue: { CardPopupMoveComponent } }
      ]
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
