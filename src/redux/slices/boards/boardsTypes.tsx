export interface IBoard {
  id: string;
  title: string;
  description: string;
}

export interface IBoardState {
  boards: IBoard[];
  error: string;
  loading: boolean;
}

export interface ICreateState {
  title: string;
  description: string;
  token: string;
}

export interface IDeleteState {
  id: string;
  token: string;
}
