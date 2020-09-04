import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';

import { BoardDetailsComponent } from './board-details.component';

import { ArrayExtensionService } from '@shared/service/array-extension/array-extension.service';
import { CardListServiceStub } from '@shared/service/card-list/card-list.service.stub';
import { CardListService } from '@shared/service/card-list/card-list.service';
import { BoardServiceStub } from '@shared/service/board/board.service.stub';
import { BoardService } from '@shared/service/board/board.service';

import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@shared/shared.module';
import { CardModule } from 'app/card/card.module';

describe('BoardDetailsComponent', () => {
  let component: BoardDetailsComponent;
  let fixture: ComponentFixture<BoardDetailsComponent>;
  let boardEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CardModule,
        RouterTestingModule,
        SharedModule
      ],
      declarations: [
        BoardDetailsComponent
      ],
      providers: [
        { provide: BoardService, useClass: BoardServiceStub },
        { provide: CardListService, useClass: CardListServiceStub },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 1 })
          }
        },
        ArrayExtensionService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardDetailsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    boardEl = fixture.debugElement.query(By.css('.board-text'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change the background color', () => {
    expect(document.body.style.backgroundColor).toBe(component.board.boardColor);
  });

  it('should render board name', () => {
    expect(boardEl.nativeElement.hidden).toBeFalsy();
  });

  it('should display board name', () => {
    expect(boardEl.nativeElement.innerText).toEqual(component.board.boardName);
  });

  it('should change the background color to default (white) when destroyed', () => {
    component.ngOnDestroy();
    expect(document.body.style.backgroundColor).toBe('white');
  });
});
