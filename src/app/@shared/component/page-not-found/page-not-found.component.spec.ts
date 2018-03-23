import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { By } from '@angular/platform-browser';

import { PageNotFoundComponent } from './page-not-found.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'app/material.module';


describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;

  let titleEl: DebugElement;
  let messageEl: DebugElement;

  const testErrorTitle = 'test_title';
  const testErrorMessage = 'test_message'; 
  const defaultErrorTitle = 'Error 404: Page not found.';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule
      ],
      declarations: [PageNotFoundComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;

    titleEl = fixture.debugElement.query(By.css('.error-title'));
    messageEl = fixture.debugElement.query(By.css('.error-message'));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test for title element
  it('should render error title', () => {
    expect(titleEl.nativeElement.hidden).toBeFalsy();
  });

  it('should display default error title', () => {
    expect(titleEl.nativeElement.innerText).toEqual(defaultErrorTitle);
  });

  it('should display error title', () => {
    component.errorTitle = testErrorTitle;
    fixture.detectChanges();
    expect(titleEl.nativeElement.innerText).toEqual(testErrorTitle);
  });

  // Test for message element
  it('should render error message', () => {
    expect(messageEl.nativeElement.hidden).toBeFalsy();
  });

  it('should display error message', () => {
    component.errorMessage = testErrorMessage;
    fixture.detectChanges();
    expect(messageEl.nativeElement.innerText).toEqual(testErrorMessage);
  });
});
