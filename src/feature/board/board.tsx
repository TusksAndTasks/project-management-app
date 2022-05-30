import { Button, Form, Input, Modal, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { FolderAddOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
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
  const [boardsData, getBoard] = useBoardData();
  const [columnsData, getColumnsList, createNewColumn] = useColumnList();
  const [language] = useLocales();
  const [authToken] = useAuthToken();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch() as AppDispatch;
  const [taskLoad, setTaskLoad] = useState(false);
  const location = useLocation();
  const boardId: string = location.pathname.split('/').pop() || '';
  const [isOnLoad, setIsOnLoad] = useState(true);
  useEffect(() => {
    getBoard({ id: boardId, token: authToken });
    if (boardsData.currentBoard.id) {
      setTaskLoad(true);
      if (columnsData.columns.length < 1) {
        setIsOnLoad(false);
      } else {
        setIsOnLoad(true);
      }
      columnsData.columns.forEach((column) => {
        dispatch(getTasks({ token: authToken, boardId, columnId: column.id }));
      });
      setTimeout(() => setTaskLoad(false), 1000);
    }
  }, [columnsData.columns]);

  useEffect(() => {
    getColumnsList({ boardId, token: authToken });
  }, []);

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

  const dataLoad = (
    <>
      <LoadingOutlined style={{ fontSize: '2em', color: '#8A4900', marginRight: '10px' }} />
      {locales[language].loading}
    </>
  );

  const dataError = (
    <>
      <FolderAddOutlined />
      {locales[language].dataError}
    </>
  );

  return columnsData.loading && taskLoad ? (
    <div>{isOnLoad ? dataLoad : dataError}</div>
  ) : (
    <div>
      <div className="board_header">
        <div className="board_info">
          <h3>{`${locales[language].boardTitle}: ${boardsData.currentBoard.title}`}</h3>
          <p>{`${locales[language].boardDescription}: ${boardsData.currentBoard.description}`}</p>
        </div>
        <button type="button" className="board_create-btn" onClick={showModal}>
          <PlusOutlined />
          {locales[language].createButton}
        </button>
      </div>
      <div className="fullBoard">
        {isOnLoad ? columns : dataError}
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
