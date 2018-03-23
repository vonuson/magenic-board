import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListComponent } from './card-list.component';
import { SharedModule } from '@shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { CardListService } from '@shared/service/card-list/card-list.service';
import { ArrayExtensionService } from '@shared/service/array-extension/array-extension.service';
import { HttpClientModule } from '@angular/common/http';

describe('CardListComponent', () => {
  let component: CardListComponent;
  let fixture: ComponentFixture<CardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [ CardListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        CardListService,
        ArrayExtensionService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
