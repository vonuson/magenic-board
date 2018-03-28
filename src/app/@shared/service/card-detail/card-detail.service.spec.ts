import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpParams, HttpRequest } from '@angular/common/http';

import { CardDetailService } from './card-detail.service';
import { environment } from '@environments/environment';
import { ICard } from '@shared/model/contract/card';

describe('CardDetailService', () => {
  const testBoardId = '1';
  const testCardListId = '1';
  const testCards: Array<ICard> = [
    { id: 1, boardId: 1, cardListId: 1, cardName: 'card_name', order: 1 },
    { id: 2, boardId: 1, cardListId: 1, cardName: 'card_name2', order: 2 },
    { id: 3, boardId: 2, cardListId: 1, cardName: 'card_name3', order: 1 },
    { id: 4, boardId: 1, cardListId: 2, cardName: 'card_name4', order: 2 },
  ]
  const testAddCard: ICard ={ id: 5, boardId: 1, cardListId: 1, cardName: 'added_card_name', order: 3 };
  const testEditCard: ICard ={ id: 1, boardId: 1, cardListId: 1, cardName: 'edited_card_name', order: 1 };
  // Filter test data based on boardId and CardList Id
  let filteredTestCards = testCards.filter(_ => _.boardId === Number(testBoardId) && _.cardListId === Number(testCardListId));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [CardDetailService]
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it('should be created', inject([CardDetailService], (service: CardDetailService) => {
    expect(service).toBeTruthy();
  }));

  describe('getCardsById()', () => {
    it('should send an expected getCardsById() request with boardId and cardListId parameters', async(inject([CardDetailService, HttpTestingController],
      (service: CardDetailService, backend: HttpTestingController) => {
        service.getCardsById(testBoardId, testCardListId).subscribe();

        backend.expectOne((req: HttpRequest<any>) => {
          const body = new HttpParams({ fromString: req.body });

          return req.url === environment.CARD_URL
            && req.method === 'GET'
            && req.params.get('boardId') === testBoardId
            && req.params.get('cardListId') === testCardListId
        }, `GET to '/card-detail' with boardId and cardListId parameters`);
      }))
    );

    it(`should return an Observable<ICard[]>`, async(inject([CardDetailService, HttpTestingController],
      (service: CardDetailService, backend: HttpTestingController) => {
        service.getCardsById(testBoardId, testCardListId).subscribe((next) => {
          // Test the length of the returned cards.
          expect(next.length).toBe(filteredTestCards.length);

          // Test the content of the 1st returned card.
          expect(next[0].id).toBe(filteredTestCards[0].id);
          expect(next[0].cardName).toBe(filteredTestCards[0].cardName);
          expect(next[0].order).toBe(filteredTestCards[0].order);

          // Test the content of the 2nd returned card.
          expect(next[1].id).toBe(filteredTestCards[1].id);
          expect(next[1].cardName).toBe(filteredTestCards[1].cardName);
          expect(next[1].order).toBe(filteredTestCards[1].order);
        });

        let expectedTestUrl = environment.CARD_URL + '?boardId=' + testBoardId + '&cardListId=' + testCardListId;

        backend.expectOne(expectedTestUrl).flush(filteredTestCards, { status: 200, statusText: 'Ok' });
      }))
    );
  });

  describe('addCard()', () => {
    it('should send an expected addCard() request', async(inject([CardDetailService, HttpTestingController],
      (service: CardDetailService, backend: HttpTestingController) => {
        service.addCard(testAddCard).subscribe();

        backend.expectOne((req: HttpRequest<any>) => {
          const body = new HttpParams({ fromString: req.body });

          return req.url === environment.CARD_URL
            && req.method === 'POST'
        }, `POST to '/card-detail' with card object parameter`);
      }))
    );

    it(`should add a new card to the list`, async(inject([CardDetailService, HttpTestingController],
      (service: CardDetailService, backend: HttpTestingController) => {
        service.addCard(testAddCard).subscribe((next) => {
          expect(filteredTestCards.length).toBe(originalLenghtBeforeAdd + 1);

          // Since index is 0 based. originalLenghtBeforeAdd = original index + 1
          expect(filteredTestCards[originalLenghtBeforeAdd].id).toBe(testAddCard.id);
          expect(filteredTestCards[originalLenghtBeforeAdd].cardName).toBe(testAddCard.cardName);
          expect(filteredTestCards[originalLenghtBeforeAdd].order).toBe(testAddCard.order);
        });

        let originalLenghtBeforeAdd = filteredTestCards.length;
        filteredTestCards.push(testAddCard);

        backend.expectOne(environment.CARD_URL).flush(filteredTestCards, { status: 200, statusText: 'Ok' });
      }))
    );
  });
  
  describe('editCard()', () => {

    it('should send an expected addCard() request', async(inject([CardDetailService, HttpTestingController],
      (service: CardDetailService, backend: HttpTestingController) => {
        service.editCard(testEditCard).subscribe();

        backend.expectOne((req: HttpRequest<any>) => {
          const body = new HttpParams({ fromString: req.body });

          return req.url === environment.CARD_URL + '/' + testEditCard.id
            && req.method === 'PUT'
        }, `PUT to '/card-detail' with card object parameter`);
      }))
    );

    it(`should edit card based on card id`, async(inject([CardDetailService, HttpTestingController],
      (service: CardDetailService, backend: HttpTestingController) => {
        service.addCard(testEditCard).subscribe((next) => {
          expect(filteredTestCards[indexToBeEdited].id).toBe(testEditCard.id);
          expect(filteredTestCards[indexToBeEdited].cardName).toBe(testEditCard.cardName);
          expect(filteredTestCards[indexToBeEdited].order).toBe(testEditCard.order);
        });

        let indexToBeEdited = filteredTestCards.findIndex(_ =>  _.id === testEditCard.id);
        filteredTestCards[indexToBeEdited] = testEditCard;

        backend.expectOne(environment.CARD_URL).flush(filteredTestCards, { status: 200, statusText: 'Ok' });
      }))
    );
  });
});
