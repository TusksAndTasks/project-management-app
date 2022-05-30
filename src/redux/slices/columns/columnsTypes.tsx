import { IColumn } from '../board/boardTypes';

export interface IColumnState {
  columns: Array<IColumn>;
  loading: boolean;
  error: string;
}

export interface IGetColumnData {
  token: string;
  boardId: string;
}

export interface ICreateColumnData {
  title: string;
  token: string;
  boardId: string;
}

export interface IDeleteColumnData {
  boardId: string;
  columnId: string;
  token: string;
}

export interface IUpdateColumnData {
  boardId: string;
  columnId: string;
  token: string;
  title: string;
  order: number;
}
