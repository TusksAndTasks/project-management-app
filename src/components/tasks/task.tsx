import { useDispatch } from 'react-redux';
import { locales } from './locales';
import { useLocales } from '../../helpers/hooks/useLocales';
import { useAuthToken } from '../../helpers/hooks/useAuthToken';
import { deleteTask } from '../../redux/slices/tasks/tasksSlice';
import { AppDispatch } from '../../redux/store';
import './task.scss';
import { ITaskProps } from './taskTypes';

export default function Task({ task, ids }: ITaskProps) {
  const [language] = useLocales();
  const dispatch = useDispatch() as AppDispatch;
  const [authToken] = useAuthToken();
  const { boardId, columnId } = ids;

  const body = {
    token: authToken,
    boardId,
    columnId,
    taskId: task.id,
  };

  return (
    <div className="task">
      <div>{locales[language].title + task.title}</div>
      <div>{locales[language].description + task.description}</div>
      <div>{task.done ? locales[language].done : locales[language].undone}</div>
      <button type="button" onClick={() => dispatch(deleteTask(body))}>
        {locales[language].delete}
      </button>
    </div>
  );
}
