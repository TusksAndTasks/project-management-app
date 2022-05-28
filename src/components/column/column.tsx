import { useSelector } from 'react-redux';
import { Button, Input, Modal } from 'antd';
import { useState } from 'react';
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

export default function Column({ column, boardId }: { column: IColumn; boardId: string }) {
  const [, , , deleteColumn, updateColumn] = useColumnList();
  const [authToken] = useAuthToken();
  const [language] = useLocales();
  const { tasks } = useSelector((state: IState) => state.tasks);
  const ids = { boardId, columnId: column.id };
  const getLists = taskHelp();
  const { nameList, ruleList } = getLists(language);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleClose = () => {
    setIsModalVisible(false);
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

  return (
    <div key={column.id} className="column">
      {isColumDataChanging ? (
        <Input.Group compact>
          <Input
            style={{ width: 'calc(100% - 200px)' }}
            defaultValue={column.title}
            onChange={(e) => setColumnTitle(e.target.value)}
          />
          <Button type="primary" onClick={() => updateColumnTitle()}>
            Submit
          </Button>
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
      {tasks[column.id] && tasks[column.id].length > 0
        ? tasks[column.id].map((task) => <Task key={task.id} task={task} ids={ids} />)
        : locales[language].noTasksFound}
      <button type="button" onClick={showModal}>
        {locales[language].createTask}
      </button>
      <button
        type="button"
        onClick={() => {
          deleteColumn({ token: authToken, boardId, columnId: column.id });
        }}
      >
        {locales[language].deleteColumn}
      </button>
      <Modal
        title={locales[language].creatorTitle}
        visible={isModalVisible}
        onCancel={handleClose}
        footer={[]}
      >
        <TaskForm
          nameList={nameList}
          ruleList={ruleList}
          boardId={boardId}
          columnId={column.id}
          handleClose={handleClose}
        />
      </Modal>
    </div>
  );
}
