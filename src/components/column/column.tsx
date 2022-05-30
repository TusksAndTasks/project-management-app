import { useSelector } from 'react-redux';
import { Button, Input, Modal } from 'antd';
import { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { useAuthToken } from '../../helpers/hooks/useAuthToken';
import { useColumnList } from '../../helpers/hooks/useColumnList';
import { IColumn } from '../../redux/slices/board/boardTypes';
import Task from '../tasks/task';
import './column.scss';
import { TaskForm } from '../taskForm/taskForm';
import { taskHelp } from '../../helpers/helperFunctions/taskHelper';
import { useLocales } from '../../helpers/hooks/useLocales';
import { locales } from './locales';
import { IState } from '../../redux/store';
import DragTaskWrapper from '../dragTaskWrapper/dragTaskWrapper';
import ConformModal from '../conformModal/conformModal';

export default function Column({ column, boardId }: { column: IColumn; boardId: string }) {
  const [, , , deleteColumn, updateColumn] = useColumnList();
  const [authToken] = useAuthToken();
  const [language] = useLocales();
  const { tasks } = useSelector((state: IState) => state.tasks);
  const ids = { boardId, columnId: column.id };
  const getLists = taskHelp();
  const { nameList, ruleList } = getLists(language);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isToDel, setIsToDel] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleClose = () => {
    setIsModalVisible(false);
    setIsToDel(false);
  };
  const [isColumDataChanging, setIsColumnDataChanging] = useState(false);
  const [newColumnTitle, setColumnTitle] = useState(column.title);
  function updateColumnTitle() {
    updateColumn({
      token: authToken,
      boardId,
      columnId: column.id,
      title: newColumnTitle,
      order: column.order,
    });
    setIsColumnDataChanging(false);
  }
  function handleDelete() {
    setIsToDel(true);
    showModal();
  }

  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'column',
    item: { ...column },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'column',
    drop(item: IColumn) {
      if (item.id === column.id) {
        return;
      }
      updateColumn({
        token: authToken,
        boardId,
        columnId: item.id,
        title: item.title,
        order: column.order,
      });
    },
  });

  const taskData = {
    id: '',
    columnId: column.id,
    token: authToken,
    boardId,
  };

  drop(drag(ref));

  return (
    <div key={column.id} className={isDragging ? 'column__dragged' : 'column'} ref={ref}>
      {isColumDataChanging ? (
        <Input.Group compact className="column_edit">
          <Input
            style={{ width: '40%' }}
            defaultValue={column.title}
            onChange={(e) => setColumnTitle(e.target.value)}
            className="column_edit-input"
          />
          <Button className="column_edit-btn" type="primary" onClick={() => updateColumnTitle()}>
            {locales[language].updateColumn}
          </Button>
          <button
            className="column_edit-close"
            type="button"
            onClick={() => setIsColumnDataChanging(false)}
          >
            <CloseOutlined className="test" />
          </button>
        </Input.Group>
      ) : (
        <button
          className="column_title"
          type="button"
          onClick={() => setIsColumnDataChanging(true)}
        >
          {`${column.title}`}
        </button>
      )}
      <div className="column_task-wrapper">
        {tasks[column.id] && tasks[column.id].length > 0
          ? tasks[column.id].map((task) => <Task key={task.id} task={task} ids={ids} />)
          : locales[language].noTasksFound}
        <DragTaskWrapper
          taskData={{
            ...taskData,
            order:
              tasks[column.id] && tasks[column.id].length > 0 ? tasks[column.id].length + 1 : 1,
          }}
          isDragging={isDragging}
        />
      </div>
      <button type="button" className="column_create-btn" onClick={showModal}>
        <PlusOutlined />
        {locales[language].createTask}
      </button>
      <button type="button" className="column_delete-btn" onClick={handleDelete}>
        {locales[language].deleteColumn}
      </button>
      <Modal
        title={locales[language].creatorTitle}
        visible={isModalVisible}
        onCancel={handleClose}
        footer={[]}
      >
        {isToDel ? (
          <ConformModal
            deleteItem={deleteColumn}
            authToken={authToken}
            handleOk={handleClose}
            itemToDel={{ boardId, columnId: column.id }}
            name={column.title}
          />
        ) : (
          <TaskForm
            nameList={nameList}
            ruleList={ruleList}
            boardId={boardId}
            columnId={column.id}
            handleClose={handleClose}
          />
        )}
      </Modal>
    </div>
  );
}
