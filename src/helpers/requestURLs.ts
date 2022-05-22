export const URLs = {
  signUp: 'http://88.99.225.196:4000/signup',
  logIn: 'http://88.99.225.196:4000/signin',
  boards: (id?: string) => {
    const url = id ? `http://88.99.225.196:4000/boards/${id}` : 'http://88.99.225.196:4000/boards';
    return url;
  },
  columns: (boardId: string, columnId?: string) => {
    if (!columnId) {
      return `http://88.99.225.196:4000/boards/${boardId}/columns`;
    }
    return `http://88.99.225.196:4000/boards/${boardId}/columns/${columnId}`;
  },
};
