export const URLs = {
  signUp: 'https://cors-anywhere.herokuapp.com/http://88.99.225.196:4000/signup',
  logIn: 'https://cors-anywhere.herokuapp.com/http://88.99.225.196:4000/signin',
  boards: (id?: string) => {
    const url = id
      ? `https://cors-anywhere.herokuapp.com/http://88.99.225.196:4000/boards/${id}`
      : 'https://cors-anywhere.herokuapp.com/http://88.99.225.196:4000/boards';
    return url;
  },
};
