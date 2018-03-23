import { IBoard } from '../contract/board';

export class Board implements IBoard {
  public id: number;

  constructor(
    public boardName: string, 
    public boardColor = "rgb(0, 121, 191)") { // set default color 
  }
}
