import { IUsersState } from '../../redux/slices/users/usersTypes';

export function getUserNames(taskUser: string, usersData: IUsersState) {
  let taskUserName = '' as string | undefined;
  if (!usersData.loading && usersData.users) {
    taskUserName = usersData.users.find((user) => user.id === taskUser)?.name;
  }
  return taskUserName;
}
