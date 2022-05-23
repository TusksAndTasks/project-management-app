import { Button, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import { useAuthToken } from '../../helpers/hooks/useAuthToken';
import { useColumnList } from '../../helpers/hooks/useColumnList';
import { useLocales } from '../../helpers/hooks/useLocales';
import { locales } from './locales';

export function Columns({ boardId }: { boardId: string }) {
  const [columnsData, , createNewColumn, deleteOldColumn] = useColumnList();
  const [language] = useLocales();
  const [authToken] = useAuthToken();
  const [isModalVisible, setIsModalVisible] = useState(false);
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
      order: columnsData.columns.length + 1,
      title: data.title,
    });
    handleClose();
  }

  const columns = columnsData.columns.map((column) => (
    <div key={column.id}>
      <div>{`${locales[language].title}:${column.title}`}</div>
      {/* {column.tasks.map((task) => (
          <div>{task.title}</div>
        ))} тут будет компонент тасков, но пока оставлю комментарий, чтобы не напутать */}
      <button
        type="button"
        onClick={() => deleteOldColumn({ token: authToken, boardId, columnId: column.id })}
      >
        {locales[language].deleteButton}
      </button>
    </div>
  ));

  /* решил оставить форму модалки тут, потому что в ней всего один инпут. */

  return (
    <div>
      {columns}
      <button type="button" onClick={showModal}>
        {locales[language].createButton}
      </button>
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
  );
}
