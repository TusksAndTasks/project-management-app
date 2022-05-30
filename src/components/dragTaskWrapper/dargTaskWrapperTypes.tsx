import { ReactNode } from 'react';

export interface IDragTask {
  taskData: {
    id: string;
    columnId: string;
    order: number;
    token: string;
    boardId: string;
  };
  isDragging: boolean;
  children?: ReactNode;
}
