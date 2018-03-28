import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HttpClientModule, HttpParams, HttpRequest } from '@angular/common/http';

import { environment } from '@environments/environment';
import { IBoard } from '@shared/model/contract/board';
import { BoardService } from './board.service';

describe('BoardService', () => {
  const testId = 1;
  const testBoards: Array<IBoard> = [
    { id: 1, boardName: 'board_name1', boardColor: 'rgb(0, 121, 191)' },
    { id: 2, boardName: 'board_name2', boardColor: 'blue' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [BoardService]
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it('should be created', inject([BoardService], (service: BoardService) => {
    expect(service).toBeTruthy();
  }));

  describe('getAllBoard()', () => {
    it('should send an expected getAllBoard() request', async(inject([BoardService, HttpTestingController],
      (service: BoardService, backend: HttpTestingController) => {
        service.getAllBoard().subscribe();

        backend.expectOne((req: HttpRequest<any>) => {
          const body = new HttpParams({ fromString: req.body });

          return req.url === environment.BOARDS_URL
            && req.method === 'GET'
        }, `GET to '/boards' without parameters`);
      }))
    );

    it(`should return an Observable<IBoard[]>`, async(inject([BoardService, HttpTestingController],
      (service: BoardService, backend: HttpTestingController) => {
        service.getAllBoard().subscribe((next) => {
          // Test the length of the returned boards.
          expect(next.length).toBe(testBoards.length);

          // Test the content of the 1st returned board.
          expect(next[0].id).toBe(testBoards[0].id);
          expect(next[0].boardName).toBe(testBoards[0].boardName);
          expect(next[0].boardColor).toBe(testBoards[0].boardColor);

          // Test the content of the 2nd returned board.
          expect(next[1].id).toBe(testBoards[1].id);
          expect(next[1].boardName).toBe(testBoards[1].boardName);
          expect(next[1].boardColor).toBe(testBoards[1].boardColor);
        });

        backend.expectOne(environment.BOARDS_URL).flush(testBoards, { status: 200, statusText: 'Ok' });
      }))
    );
  });

  describe('getBoard()', () => {

    it('should send an expected getBoard() request with parameter', async(inject([BoardService, HttpTestingController],
      (service: BoardService, backend: HttpTestingController) => {
        service.getBoard(testId).subscribe();

        backend.expectOne((req: HttpRequest<any>) => {
          const body = new HttpParams({ fromString: req.body });

          return req.url === environment.BOARDS_URL + '/' + testId
            && req.method === 'GET'
        }, `GET to '/boards' with id parameter`);
      }))
    );

    it(`should return an Observable<IBoard>`, async(inject([BoardService, HttpTestingController],
      (service: BoardService, backend: HttpTestingController) => {
        service.getBoard(1).subscribe((next) => {
          expect(next.id).toBe(testBoards[testId - 1].id);
          expect(next.boardName).toBe(testBoards[testId - 1].boardName);
          expect(next.boardColor).toBe(testBoards[testId - 1].boardColor);
        });

        backend.expectOne(environment.BOARDS_URL + '/' + testId).flush(testBoards[0], { status: 200, statusText: 'Ok' });
      }))
    );
  });
});
