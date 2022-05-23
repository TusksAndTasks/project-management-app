export interface ICurrentBoard {
  id: string;
  title: string;
  description: string;
  columns: Array<IColumn>;
}

export interface ITask {
  id: string;
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string;
  files: [
    {
      filename: string;
      fileSize: number;
    }
  ];
}

export interface IColumn {
  id: string;
  title: string;
  order: number;
  tasks: Array<ITask>;
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
