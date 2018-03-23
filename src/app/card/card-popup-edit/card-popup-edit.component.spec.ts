import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPopupEditComponent } from './card-popup-edit.component';
import { SharedModule } from '@shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from 'app/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CardPopupEditComponent', () => {
  let component: CardPopupEditComponent;
  let fixture: ComponentFixture<CardPopupEditComponent>;

  let data = { }  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        MaterialModule,
        BrowserAnimationsModule
      ],
      declarations: [ CardPopupEditComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { data } },
        { provide: MatDialogRef, useValue: { CardPopupEditComponent } }
      ]
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
