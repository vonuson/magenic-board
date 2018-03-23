import { HoverClassDirective } from './hover-class.directive';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('HoverClassDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directiveInstance: HoverClassDirective;
  let directiveEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        HoverClassDirective
      ]
    });
  });

  beforeEach(() => {
    TestBed.overrideComponent(TestComponent, {
      set: {
        template: '<div mbHoverClass="testClass"></div>'
      }
    })

    fixture = TestBed.createComponent(TestComponent);

    directiveEl = fixture.debugElement.query(By.directive(HoverClassDirective));
    directiveInstance = directiveEl.injector.get(HoverClassDirective);

    fixture.detectChanges();
  });

  it('should create an instance', async(() => {
    expect(directiveEl).not.toBeNull();
  }));

  it('should set/unset the styling css on hover', async(() => {
    // The div before the hover has no 'testClass' css class.
    expect(directiveEl.nativeElement.classList.contains('testClass')).toBe(false);

    // Simulate mouseover
    directiveInstance.mouseover();
    fixture.detectChanges();
    
    // The div during the hover has 'testClass' css class.
    expect(directiveEl.nativeElement.classList.contains('testClass')).toBe(true);

    // Simulate mouseout
    directiveInstance.mouseout();
    fixture.detectChanges();
    
    // The div during the mouseout has no 'testClass' css class.
    expect(directiveEl.nativeElement.classList.contains('testClass')).toBe(false);
  }));
});

// Test Component
@Component({
    selector: 'test-cmp',
    template: ''
})
class TestComponent { }