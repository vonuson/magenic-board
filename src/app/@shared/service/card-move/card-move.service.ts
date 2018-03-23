import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';

import { CardDetailService } from '../card-detail/card-detail.service';
import { ICard } from '@shared/model/contract/card';

@Injectable()
export class CardMoveService {

  constructor(
    private http: HttpClient,
    private cardDetailService: CardDetailService) { }

  public moveCard(card: ICard, order: number): Observable<Object> {
    return this.cardDetailService.editCard(card);
  }
}
