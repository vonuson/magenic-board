import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavigationModule } from 'app/navigation/navigation.module';
import { BoardService } from '@shared/service/board/board.service';
import { HttpClientModule } from '@angular/common/http';
import { BoardDialogService } from '@shared/service/board-dialog/board-dialog.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NavigationModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        BoardService,
        BoardDialogService
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'mb'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('mb');
  }));
});
