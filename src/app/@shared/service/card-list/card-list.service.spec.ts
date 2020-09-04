import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpParams, HttpRequest } from '@angular/common/http';

import { ICardList } from '@shared/model/contract/card-list';
import { environment } from '@environments/environment';
import { CardListService } from './card-list.service';

describe('CardListService', () => {
  const testBoardId = '1';
  const testCardList: Array<ICardList> = [
    { id: 1, boardId: 1, listName: 'listName', order: 1 },
    { id: 2, boardId: 1, listName: 'listName2', order: 2 },
    { id: 3, boardId: 2, listName: 'listName3', order: 1 },
  ];
  const testAddCardList: ICardList = { id: 4, boardId: 1, listName: 'add_listName', order: 3 };
  // Filter test data based on boardId
  const filteredTestCardList = testCardList.filter(_ => _.boardId === Number(testBoardId));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [CardListService]
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it('should be created', inject([CardListService], (service: CardListService) => {
    expect(service).toBeTruthy();
  }));

  describe('getCardListByBoardId()', () => {
    it('should send an expected getCardListByBoardId() request  with boardId parameter',
      async(inject([CardListService, HttpTestingController],
      (service: CardListService, backend: HttpTestingController) => {
        service.getCardListByBoardId(testBoardId).subscribe();

        backend.expectOne((req: HttpRequest<any>) => {
          const body = new HttpParams({ fromString: req.body });

          return req.url === environment.CARD_LIST_URL
            && req.method === 'GET'
            && req.params.get('boardId') === testBoardId;
        }, `GET to '/card-list' with boardId parameter`);
      }))
    );

    it(`should return an Observable<ICardList[]>`, async(inject([CardListService, HttpTestingController],
      (service: CardListService, backend: HttpTestingController) => {
        service.getCardListByBoardId(testBoardId).subscribe((next) => {
          // Test the length of the returned cards.
          expect(next.length).toBe(filteredTestCardList.length);

          // Test the content of the 1st returned card.
          expect(next[0].id).toBe(filteredTestCardList[0].id);
          expect(next[0].listName).toBe(filteredTestCardList[0].listName);
          expect(next[0].order).toBe(filteredTestCardList[0].order);

          // Test the content of the 2nd returned card.
          expect(next[1].id).toBe(filteredTestCardList[1].id);
          expect(next[1].listName).toBe(filteredTestCardList[1].listName);
          expect(next[1].order).toBe(filteredTestCardList[1].order);
        });

        const expectedTestUrl = environment.CARD_LIST_URL + '?boardId=' + testBoardId;

        backend.expectOne(expectedTestUrl).flush(filteredTestCardList, { status: 200, statusText: 'Ok' });
      }))
    );
  });

  describe('addCard()', () => {
    it('should send an expected addCardList() request', async(inject([CardListService, HttpTestingController],
      (service: CardListService, backend: HttpTestingController) => {
        service.addCardList(testAddCardList).subscribe();

        backend.expectOne((req: HttpRequest<any>) => {
          const body = new HttpParams({ fromString: req.body });

          return req.url === environment.CARD_LIST_URL
            && req.method === 'POST';
        }, `POST to '/card-list' with card object parameter`);
      }))
    );

    it(`should add a new card to the list`, async(inject([CardListService, HttpTestingController],
      (service: CardListService, backend: HttpTestingController) => {
        let originalLenghtBeforeAdd;

        service.addCardList(testAddCardList).subscribe((next) => {
          expect(filteredTestCardList.length).toBe(originalLenghtBeforeAdd + 1);

          // Since index is 0 based. originalLenghtBeforeAdd = original index + 1
          expect(filteredTestCardList[originalLenghtBeforeAdd].id).toBe(testAddCardList.id);
          expect(filteredTestCardList[originalLenghtBeforeAdd].listName).toBe(testAddCardList.listName);
          expect(filteredTestCardList[originalLenghtBeforeAdd].order).toBe(testAddCardList.order);
        });

        originalLenghtBeforeAdd = filteredTestCardList.length;
        filteredTestCardList.push(testAddCardList);

        backend.expectOne(environment.CARD_LIST_URL).flush(filteredTestCardList, { status: 200, statusText: 'Ok' });
      }))
    );
  });
});
