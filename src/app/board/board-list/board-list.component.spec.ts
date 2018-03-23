import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardListComponent } from './board-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BoardService } from '@shared/service/board/board.service';
import { HttpClientModule } from '@angular/common/http';
import { BoardDialogService } from '@shared/service/board-dialog/board-dialog.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@shared/shared.module';

describe('BoardListComponent', () => {
  let component: BoardListComponent;
  let fixture: ComponentFixture<BoardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        SharedModule
      ],
      declarations: [ BoardListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        BoardService,
        BoardDialogService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
