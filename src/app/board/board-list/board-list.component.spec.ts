import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { BoardListComponent } from './board-list.component';
import { IBoard } from '@shared/model/contract/board';

import { BoardDialogService } from '@shared/service/board-dialog/board-dialog.service';
import { BoardServiceStub } from '@shared/service/board/board.service.stub';
import { BoardService } from '@shared/service/board/board.service';

import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@shared/shared.module';

describe('BoardListComponent', () => {
  let component: BoardListComponent;
  let fixture: ComponentFixture<BoardListComponent>;

  let boardHeaderEl: DebugElement;
  let gridCreateEl: DebugElement;
  let gridTextEl: DebugElement;

  const testBoards: Array<IBoard> = [
    { id: 1, boardName: 'board_name1', boardColor: 'rgb(0, 121, 191)' },
    { id: 2, boardName: 'board_name2', boardColor: 'blue' }    
  ]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule
      ],
      declarations: [BoardListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: BoardService, useClass: BoardServiceStub },
        BoardDialogService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    boardHeaderEl = fixture.debugElement.query(By.css('.boards-header-text'));
    gridCreateEl = fixture.debugElement.query(By.css('.grid-text-create'));
    gridTextEl = fixture.debugElement.query(By.css('.grid-text-display'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render board header', () => {
    expect(boardHeaderEl.nativeElement.hidden).toBeFalsy();
  });

  it('should display board header message', () => {
    expect(boardHeaderEl.nativeElement.innerText).toEqual('Personal Boards');
  });

  it('should render grid create message', () => {
    expect(gridCreateEl.nativeElement.hidden).toBeFalsy();
  });

  it('should display grid create message', () => {
    expect(gridCreateEl.nativeElement.innerText).toEqual('Create new board...');
  });

  it('should render grid text message', () => {
    expect(gridTextEl.nativeElement.hidden).toBeFalsy();
  });

  it('should display grid text message', () => {
    expect(gridTextEl.nativeElement.innerText).toEqual(testBoards[0].boardName);
  });

  it('should change tile color', () => {
    expect(gridTextEl.parent.styles.backgroundColor).toEqual(testBoards[0].boardColor);
  });
});
