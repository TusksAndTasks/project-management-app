export interface ICurrentBoard {
  id: string;
  title: string;
  description: string;
  columns: Array<IColumn>;
}

export interface IColumn {
  id: string;
  title: string;
  order: number;
}

export interface IShowState {
  id: string;
  token: string;
}
export interface ICurrentBoardState {
  currentBoard: ICurrentBoard;
  error: string;
  loading: boolean;
}
