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
