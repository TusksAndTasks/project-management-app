import { WritableDraft } from 'immer/dist/internal';
import { IColumn } from '../../redux/slices/board/boardTypes';
import { IFullTask } from '../../redux/slices/tasks/tasksTypes';

export function determineDirection(
  order: number,
  id: string,
  objects: WritableDraft<IColumn>[] | WritableDraft<IFullTask[]>,
  hint: string
) {
  let direction = hint === 'task' ? 'new' : '';
  if (!objects) {
    return 'new';
  }
  objects.map((obj) => {
    if (obj.id === id) {
      direction = obj.order > order ? 'up' : 'down';
      if (obj.order === order && hint === 'task') {
        direction = 'none';
      }
    }
    return obj;
  });
  return direction;
}
