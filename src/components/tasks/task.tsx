import { useDispatch } from 'react-redux';
import { Button, Input, Modal } from 'antd';
import { useRef, useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { useDrag, useDrop } from 'react-dnd';
import { locales } from './locales';
import { useLocales } from '../../helpers/hooks/useLocales';
import { useAuthToken } from '../../helpers/hooks/useAuthToken';
import { deleteTask, removeTask, updateTask } from '../../redux/slices/tasks/tasksSlice';
import { AppDispatch } from '../../redux/store';
import './task.scss';
import { ITaskProps } from './taskTypes';
import { IFullTask, IUpdateTaskData } from '../../redux/slices/tasks/tasksTypes';

export default function Task({ task, ids }: ITaskProps) {
  const [language] = useLocales();
  const dispatch = useDispatch() as AppDispatch;
  const [authToken] = useAuthToken();
  const { boardId, columnId } = ids;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleClose = () => {
    setIsModalVisible(false);
  };
  const [isTaskUpdates, setIsTaskUpdates] = useState(false);
  const [updateTaskData, setUpdateTaskData] = useState({
    title: task.title,
    description: task.description,
  });

  const pathTaskData = {
    token: authToken,
    boardId,
    columnId,
    taskId: task.id,
    newColumn: columnId,
  };

  function changeTaskData() {
    const body = {
      ...updateTaskData,
      order: task.order,
      userId: task.userId,
    };
    dispatch(updateTask({ ...pathTaskData, body }));
    setIsTaskUpdates(false);
  }

  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'task',
    item: { ...task },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'task',
    drop(item: IFullTask) {
      if (item.id === task.id) {
        return;
      }
      const data = {
        body: {
          description: item.description,
          title: item.title,
          order: task.order,
          userId: item.userId,
        },
        token: authToken,
        boardId,
        columnId: item.columnId,
        taskId: item.id,
        newColumn: task.columnId,
      } as IUpdateTaskData;
      dispatch(updateTask(data));
      if (item.columnId !== task.columnId) {
        dispatch(removeTask({ columnId: item.columnId, taskId: item.id }));
      }
    },
  });

  drop(drag(ref));

  return (
    <div className={isDragging ? 'task__dragged' : 'task'} ref={ref}>
      <div>{locales[language].title + task.title}</div>
      <button type="button" onClick={showModal}>
        {locales[language].showButton}
      </button>
      <button type="button" onClick={() => dispatch(deleteTask(pathTaskData))}>
        {locales[language].delete}
      </button>
      <Modal
        title={locales[language].modalTitle}
        visible={isModalVisible}
        onCancel={handleClose}
        footer={[]}
      >
        {isTaskUpdates ? (
          <Input.Group compact>
            <Input
              style={{ width: 'calc(100% - 200px)' }}
              value={updateTaskData.title}
              onChange={(e) => setUpdateTaskData((state) => ({ ...state, title: e.target.value }))}
            />
            <Input
              style={{ width: 'calc(100% - 200px)' }}
              value={updateTaskData.description}
              onChange={(e) => {
                const inputValue = e.target.value;
                return setUpdateTaskData((state) => ({ ...state, description: inputValue }));
              }}
            />
            <Button type="primary" onClick={() => changeTaskData()}>
              {locales[language].update}
            </Button>
          </Input.Group>
        ) : (
          <>
            <div>{locales[language].title + task.title}</div>
            <div>{locales[language].description + task.description}</div>
            <Button onClick={() => setIsTaskUpdates(true)}>
              {locales[language].changeData}
              <EditOutlined />
            </Button>
          </>
        )}
      </Modal>
    </div>
  );
}
