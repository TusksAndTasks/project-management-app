export interface ITasksState {
  tasks: {
    [key: string]: IFullTask[];
  };
  loading: boolean;
  error: string;
}

export interface IDeleteReturn {
  taskId: string;
  columnId: string;
}

export interface IFullTask {
  id: string;
  title: string;
  done: boolean;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files: [
    {
      filename: string;
      fileSize: number;
    }
  ];
}

export interface IGetTasksData {
  token: string;
  boardId: string;
  columnId: string;
}

export interface ICreateTaskData {
  token: string;
  boardId: string;
  columnId: string;
  body: {
    title: string;
    description: string;
    userId: string;
  };
}

export interface IDeleteTaskData {
  boardId: string;
  columnId: string;
  taskId: string;
  token: string;
}
