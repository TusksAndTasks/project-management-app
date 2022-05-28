const URLBase = 'https://protected-plains-28211.herokuapp.com';

export const URLs = {
  signUp: `${URLBase}/signup`,
  logIn: `${URLBase}/signin`,
  boards: (id?: string) => {
    const url = id ? `${URLBase}/boards/${id}` : `${URLBase}/boards`;
    return url;
  },
  columns: (boardId: string, columnId?: string) => {
    if (!columnId) {
      return `${URLBase}/boards/${boardId}/columns`;
    }
    return `${URLBase}/boards/${boardId}/columns/${columnId}`;
  },
  tasks: (boardId: string, columnId: string, taskId?: string) => {
    if (!taskId) {
      return `${URLBase}/boards/${boardId}/columns/${columnId}/tasks`;
    }
    return `${URLBase}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`;
  },
  users: (id?: string) => (id ? `${URLBase}/users/${id}` : `${URLBase}/users`),
};
