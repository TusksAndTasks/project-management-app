import { Button, Form, Input, Modal, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { useAuthToken } from '../../helpers/hooks/useAuthToken';
import { useColumnList } from '../../helpers/hooks/useColumnList';
import { useLocales } from '../../helpers/hooks/useLocales';
import { getTasks } from '../../redux/slices/tasks/tasksSlice';
import { AppDispatch } from '../../redux/store';
import Column from '../../components/column/column';
import { locales } from './locales';
import './board.scss';
import { useBoardData } from '../../helpers/hooks/useBoardData';

export function Board() {
  const [boardsData] = useBoardData();
  const boardId = boardsData.currentBoard.id;
  const [columnsData, , createNewColumn] = useColumnList();
  const [language] = useLocales();
  const [authToken] = useAuthToken();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch() as AppDispatch;
  const [taskLoad, setTaskLoad] = useState(false);
  useEffect(() => {
    if (boardId) {
      setTaskLoad(true);
      columnsData.columns.forEach((column) => {
        dispatch(getTasks({ token: authToken, boardId, columnId: column.id }));
      });
      setTimeout(() => setTaskLoad(false), 1000);
    }
  }, [columnsData.columns]);

  useEffect(() => {
    if (columnsData.error && !columnsData.loading) {
      notification.open({
        message: 'Error!',
        description: columnsData.error,
      });
    }
  }, [columnsData.error, columnsData.loading]);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleClose = () => {
    setIsModalVisible(false);
  };

  function createColumn(data: { title: string }) {
    createNewColumn({
      token: authToken,
      boardId,
      title: data.title,
    });
    handleClose();
  }

  const columns = columnsData.columns.map((column) => (
    <Column key={column.id} column={column} boardId={boardId} />
  ));

  return columnsData.loading && taskLoad ? (
    <div>{locales[language].loading}</div>
  ) : (
    <div>
      <div className="board_header">
        <div className="board_info">
          <h3>{`${locales[language].boardTitle}:${boardsData.currentBoard.title}`}</h3>
          <p>{`${locales[language].boardDescription}:${boardsData.currentBoard.description}`}</p>
        </div>
        <button type="button" className="board_create-btn" onClick={showModal}>
          <PlusOutlined />
          {locales[language].createButton}
        </button>
      </div>
      <div className="fullBoard">
        {columns}
        <Modal
          title={locales[language].modal}
          visible={isModalVisible}
          onCancel={handleClose}
          footer={[]}
        >
          <Form
            name="boardCreator"
            initialValues={{ remember: true }}
            onFinish={(data) => {
              createColumn(data);
            }}
            autoComplete="off"
            labelAlign="left"
            wrapperCol={{ span: 40 }}
            labelCol={{ span: 40 }}
          >
            <Form.Item
              label={locales[language].modalTitle}
              name="title"
              rules={[
                {
                  required: true,
                  message: locales[language].titleRequired,
                },
              ]}
              key="title"
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 11 }}>
              <Button type="primary" htmlType="submit">
                {locales[language].createButton}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
