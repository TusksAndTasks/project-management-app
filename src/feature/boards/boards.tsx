import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { List, Modal } from 'antd';
import { FileImageOutlined, PlusCircleFilled, SnippetsOutlined } from '@ant-design/icons';
import { useBoardsList } from '../../helpers/hooks/useBoardsList';
import { useAuthToken } from '../../helpers/hooks/useAuthToken';
import { useLocales } from '../../helpers/hooks/useLocales';
import { useBoardData } from '../../helpers/hooks/useBoardData';
import { useColumnList } from '../../helpers/hooks/useColumnList';
import IconText from './iconText';
import { locales } from './locales';
import './boards.scss';
import { BoardCreatorForm } from '../../components/boardCreatorForm.tsx/boardCreatorForm';

export default function Boards() {
  const [boardsData, getBoardsList, createBoard, deleteBoard] = useBoardsList();
  const [, getColumnsList] = useColumnList();
  const [, showBoard] = useBoardData();
  const [authToken] = useAuthToken();
  const [language] = useLocales();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isToDel, setIsToDel] = useState(false);

  const showModal = (value: string) => {
    setIsModalVisible(true);
    if (value === 'del') setIsToDel(true);
    if (value === 'new') setIsToDel(false);
  };
  const handleClose = () => {
    setIsModalVisible(false);
  };

  const handleToDel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    deleteBoard({ id: (e.target as HTMLElement).id, token: authToken });
    handleClose();
  };

  useEffect(() => {
    getBoardsList(authToken);
  }, []);

  function getBoardsData(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    showBoard({ id: (e.target as HTMLElement).id, token: authToken });
    getColumnsList({ boardId: (e.target as HTMLElement).id, token: authToken });
  }

  return (
    <>
      <button className="btn btn-create" type="button" onClick={() => showModal('new')}>
        <PlusCircleFilled />
        {locales[language].createButton}
      </button>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 3,
        }}
        dataSource={boardsData.boards}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <IconText icon={SnippetsOutlined} text="?" key="list-vertical-star-o" />,
              <IconText icon={FileImageOutlined} text="2" key="list-vertical-message" />,
            ]}
            extra={
              <>
                <Link
                  className="btn btn-primary"
                  to="/Board"
                  type="button"
                  id={item.id}
                  onClick={(e) => getBoardsData(e)}
                >
                  {locales[language].showBoard}
                </Link>
                <button
                  className="btn btn-primary btn-delete"
                  type="button"
                  id={item.id}
                  onClick={() => showModal('del')}
                >
                  {locales[language].deleteButton}
                </button>
              </>
            }
          >
            <List.Item.Meta
              title={
                <Link to="/Board" id={item.id} onClick={(e) => getBoardsData(e)}>
                  {item.title}
                </Link>
              }
              description={item.description}
            />
            <Modal
              title={isToDel ? locales[language].deleteTitle : locales[language].creatorTitle}
              visible={isModalVisible}
              onCancel={handleClose}
              footer={[]}
            >
              {isToDel ? (
                <>
                  <div>
                    {locales[language].deleteText}
                    <span>{item.title}</span>
                  </div>
                  <button type="button" id={item.id} onClick={(e) => handleToDel(e)}>
                    {locales[language].deleteButton}
                  </button>
                </>
              ) : (
                <BoardCreatorForm
                  createBoard={createBoard}
                  authToken={authToken}
                  handleOk={handleClose}
                />
              )}
            </Modal>
          </List.Item>
        )}
      />
    </>
  );
}
