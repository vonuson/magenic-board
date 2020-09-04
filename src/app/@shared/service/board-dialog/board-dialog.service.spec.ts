import { TestBed, inject } from '@angular/core/testing';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material';

import { BoardDialogService } from './board-dialog.service';
import { BoardService } from '@shared/service/board/board.service';
import { BoardServiceStub } from '@shared/service/board/board.service.stub';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@shared/shared.module';

describe('BoardDialog.Service', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let service: BoardDialogService;
  let dialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        NoopAnimationsModule,
        RouterTestingModule
      ],
      providers: [
        BoardDialogService,
        MatDialog,
        { provide: BoardService, useClass: BoardServiceStub },
      ]
    });
  });

  beforeEach(inject([BoardDialogService, MatDialog, OverlayContainer],
    (s: BoardDialogService, md: MatDialog, oc: OverlayContainer) => {
      service = s;
      dialog = md;
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
    }));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('showBoardInputDialog()', () => {
    it('should be able to open dialog', () => {
      service.showBoardInputDialog();

      expect(service.inputDialogComponentRef).toBeTruthy();
      // 'enter' is the state of the container when the dialog has been opened
      expect(service.inputDialogComponentRef._containerInstance._state).toBe('enter');
    });

    it('should transfer the data to the dialog', () => {
      service.showBoardInputDialog();

      // service.inputDialogComponentRef.componentInstance;
      expect(service.inputDialogComponentRef.componentInstance.data).toBe(service.data);
    });

    it('should display the transfered data to the dialog', () => {
      service.showBoardInputDialog();

      expect(service.inputDialogComponentRef.componentInstance.title).toBe(service.data.title);
      expect(service.inputDialogComponentRef.componentInstance.message).toBe(service.data.message);
      expect(service.inputDialogComponentRef.componentInstance.btn).toBe(service.data.btn);
    });

    it('should be able to close dialog', () => {
      service.showBoardInputDialog();

      service.inputDialogComponentRef.close();
      // 'exit' is the state of the container when the dialog has been closed
      expect(service.inputDialogComponentRef._containerInstance._state).toBe('exit');
    });
  });

  describe('changePosition()', () => {
    it('should be able to update the position', () => {
      service.showBoardInputDialog();
      const overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;

      expect(overlayPane.clientTop).toBe(0);
      expect(overlayPane.clientLeft).toBe(0);

      service.changePosition(10, 20);
      expect(overlayPane.style.marginTop).toBe('10px');
      expect(overlayPane.style.marginLeft).toBe('20px');

      service.changePosition(20, 20);
      expect(overlayPane.style.marginTop).toBe('20px');
      expect(overlayPane.style.marginLeft).toBe('20px');

      service.changePosition(20, 10);
      expect(overlayPane.style.marginTop).toBe('20px');
      expect(overlayPane.style.marginLeft).toBe('10px');
    });

    it('should reposition when it\'s about to be cut on the screen.', () => {
      service.showBoardInputDialog();
      const overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;
      const expectedMarginTop = window.innerHeight - 210 + 'px';
      const expectedMarginLeft = window.innerWidth - 320 + 'px';

      service.changePosition(window.innerHeight, window.innerWidth);
      expect(overlayPane.style.marginTop).toBe(expectedMarginTop);
      expect(overlayPane.style.marginLeft).toBe(expectedMarginLeft);
    });
  });

  describe('setRefreshFlag()', () => {
    it('should be able to set the refresh flag to true', () => {
      service.setRefreshFlag(true);

      service.isRefresh$.subscribe((flag) => {
        expect(flag).toBeTruthy();
      });
    });

    it('should be able to set the refresh flag to false', () => {
      service.setRefreshFlag(false);

      service.isRefresh$.subscribe((flag) => {
        expect(flag).toBeFalsy();
      });
    });
  });
});
