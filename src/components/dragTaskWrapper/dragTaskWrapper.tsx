import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { updateTask, removeTask } from '../../redux/slices/tasks/tasksSlice';
import { IFullTask, IUpdateTaskData } from '../../redux/slices/tasks/tasksTypes';
import { AppDispatch } from '../../redux/store';
import { IDragTask } from './dargTaskWrapperTypes';

export default function DragTaskWrapper(props: IDragTask) {
  const { taskData, isDragging, children, decodedToken } = props;
  const { id, columnId, order, token, boardId } = taskData;
  const dispatch = useDispatch() as AppDispatch;

  const [{ isOver }, drop] = useDrop({
    accept: 'task',
    drop(item: IFullTask) {
      if (item.id === id) {
        return;
      }

      if (!children && item.id === id + 1) {
        return;
      }

      const data = {
        body: {
          description: item.description,
          title: item.title,
          order,
          userId: decodedToken,
        },
        token,
        boardId,
        columnId: item.columnId,
        taskId: item.id,
        newColumn: columnId,
      } as IUpdateTaskData;
      dispatch(updateTask(data));
      if (item.columnId !== columnId) {
        dispatch(removeTask({ columnId: item.columnId, taskId: item.id }));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      className={`task-wrap ${isDragging ? 'task-wrap__dragged' : 'task-wrap__default'} ${
        isOver ? 'task-wrap__over' : ''
      }`}
      ref={drop}
    >
      {children || null}
    </div>
  );
}

DragTaskWrapper.defaultProps = {
  children: null,
};
