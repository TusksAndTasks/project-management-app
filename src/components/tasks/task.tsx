import { useDispatch } from 'react-redux';
import { Button, Input, Modal } from 'antd';
import { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { useDrag } from 'react-dnd';
import { locales } from './locales';
import { useLocales } from '../../helpers/hooks/useLocales';
import { useAuthToken } from '../../helpers/hooks/useAuthToken';
import { deleteTask, updateTask } from '../../redux/slices/tasks/tasksSlice';
import { AppDispatch } from '../../redux/store';
import './task.scss';
import { ITaskProps } from './taskTypes';
import DragTaskWrapper from '../dragTaskWrapper/dragTaskWrapper';

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

  const [{ isDragging }, drag] = useDrag({
    type: 'task',
    item: { ...task },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const taskData = {
    id: task.id,
    columnId: task.columnId,
    order: task.order,
    token: authToken,
    boardId,
  };

  return (
    <DragTaskWrapper taskData={taskData} isDragging={isDragging}>
      <div className="task" ref={drag}>
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
                onChange={(e) => {
                  const inputValue = e.target.value;
                  return setUpdateTaskData((state) => ({ ...state, title: inputValue }));
                }}
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
    </DragTaskWrapper>
  );
}
