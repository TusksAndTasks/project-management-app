const URLBase = 'https://cors-anywhere.herokuapp.com/http://88.99.225.196:4000';

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
  users: (id?: string) => (id ? `${URLBase}/users/${id}` : `${URLBase}/users`),
};
