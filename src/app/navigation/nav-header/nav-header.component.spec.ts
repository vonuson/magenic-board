import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavHeaderComponent } from './nav-header.component';
import { BoardDialogService } from '@shared/service/board-dialog/board-dialog.service';
import { BoardService } from '@shared/service/board/board.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from 'app/material.module';
import { HttpClientModule } from '@angular/common/http';

describe('NavHeaderComponent', () => {
  let component: NavHeaderComponent;
  let fixture: ComponentFixture<NavHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        MaterialModule,
        HttpClientModule
      ],
      declarations: [ NavHeaderComponent ],
      providers: [
        BoardService,
        BoardDialogService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
