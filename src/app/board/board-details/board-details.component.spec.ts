import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardDetailsComponent } from './board-details.component';
import { CardListComponent } from 'app/card/card-list/card-list.component';
import { CardModule } from 'app/card/card.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BoardService } from '@shared/service/board/board.service';
import { HttpClientModule } from '@angular/common/http';

describe('BoardDetailsComponent', () => {
  let component: BoardDetailsComponent;
  let fixture: ComponentFixture<BoardDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        CardModule,
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [ 
        BoardDetailsComponent
      ],
      providers: [
        BoardService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
