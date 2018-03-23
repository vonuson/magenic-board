import { TestBed, inject, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { By } from '@angular/platform-browser';

import { InputDialogComponent } from '@shared/component/input-dialog/input-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@shared/shared.module';

describe('InputDialogComponent', () => {
  let component: InputDialogComponent;
  let fixture: ComponentFixture<InputDialogComponent>;

  let titleEl: DebugElement;
  let messageEl: DebugElement;
  let btnEl: DebugElement;

  const data = {
    title: 'test_title',
    message: 'test_message',
    btn: 'test_button'
  }
  const defaultTitleMessage = '';
  const defaultButton = 'btn';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { data } },
        { provide: MatDialogRef, useValue: { InputDialogComponent } }
      ]
    })
      .compileComponents();
  }));
  
  beforeEach(() => {
    fixture = TestBed.createComponent(InputDialogComponent);
    component = fixture.componentInstance;

    titleEl = fixture.debugElement.query(By.css('.header-text'));
    messageEl = fixture.debugElement.query(By.css('.message-text'));
    btnEl = fixture.debugElement.query(By.css('.dialog-button'));

    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test for title element
  it('should render dialog title', () => {
    expect(titleEl.nativeElement.hidden).toBeFalsy();
  });

  it('should display default title if undefined', () => {
    expect(titleEl.nativeElement.innerText).toEqual(defaultTitleMessage);
  });

  it('should display dialog title', () => {
    component.title = data.title;
    fixture.detectChanges();
    expect(titleEl.nativeElement.innerText).toEqual(data.title);
  });

  // Test for message element
  it('should render dialog message', () => {
    expect(messageEl.nativeElement.hidden).toBeFalsy();
  });

  it('should display default message if undefined', () => {
    expect(messageEl.nativeElement.innerText).toEqual(defaultTitleMessage);
  });

  it('should display dialog message', () => {
    component.message = data.message;
    fixture.detectChanges();
    expect(messageEl.nativeElement.innerText).toEqual(data.message);
  });

  // Test for button element
  it('should render dialog button', () => {
    expect(btnEl.nativeElement.hidden).toBeFalsy();
  });

  it('should display default button name if undefined', () => {
    expect(btnEl.nativeElement.innerText).toEqual(defaultButton);
  });

  it('should display dialog button', () => {
    component.btn = data.btn;
    fixture.detectChanges();
    expect(btnEl.nativeElement.innerText).toEqual(data.btn);
  });
});
