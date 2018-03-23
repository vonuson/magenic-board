import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ArrayExtensionService } from '@shared/service/array-extension/array-extension.service';
import { CardDetailServiceStub } from '@shared/service/card-detail/card-detail.service.stub';
import { CardDetailService } from '@shared/service/card-detail/card-detail.service';

import { CardDetailComponent } from './card-detail.component';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from 'app/material.module';
import { ICard } from '@shared/model/contract/card';

describe('CardDetailComponent', () => {
  let component: CardDetailComponent;
  let fixture: ComponentFixture<CardDetailComponent>;
  let cardDetailService: CardDetailService;

  let testCards: Array<ICard> = [
    { id: 1, boardId: 1, cardListId: 1, cardName: 'card_name', order: 1 },
    { id: 2, boardId: 1, cardListId: 1, cardName: 'card_name2', order: 2 },
  ]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        MaterialModule
      ],
      declarations: [ CardDetailComponent ],
      providers: [
        { provide: CardDetailService, useClass: CardDetailServiceStub },
        ArrayExtensionService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDetailComponent);
    component = fixture.componentInstance;
    cardDetailService = fixture.debugElement.injector.get(CardDetailService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // This test the ngOnit part where it calls the CardDetailService
  it('should retrieve cards from an input of cardList', () => {
    component.cardList = { id: 1, boardId: 1, listName: 'list_name', order: 1 }
    fixture.detectChanges();
    expect(component.cards).toEqual(testCards);
  });
});
