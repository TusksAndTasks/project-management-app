import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { List, Modal, notification } from 'antd';
import {
  FileImageOutlined,
  LoadingOutlined,
  PlusCircleFilled,
  SnippetsOutlined,
} from '@ant-design/icons';
import { useBoardsList } from '../../helpers/hooks/useBoardsList';
import { useAuthToken } from '../../helpers/hooks/useAuthToken';
import { useLocales } from '../../helpers/hooks/useLocales';
import { useBoardData } from '../../helpers/hooks/useBoardData';
import { useColumnList } from '../../helpers/hooks/useColumnList';
import IconText from './iconText';
import { locales } from './locales';
import './boards.scss';
import { BoardCreatorForm } from '../../components/boardCreatorForm.tsx/boardCreatorForm';
import ConformModal from '../../components/conformModal/conformModal';

export default function Boards() {
  const [boardsData, getBoardsList, createBoard, deleteBoard] = useBoardsList();
  const [, getColumnsList] = useColumnList();
  const [, showBoard] = useBoardData();
  const [authToken] = useAuthToken();
  const [language] = useLocales();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isToDel, setIsToDel] = useState(false);
  const [currentItem, setCurrentItem] = useState({ id: '', title: '' });

  const showModal = (value: string) => {
    setIsModalVisible(true);
    if (value === 'del') setIsToDel(true);
    if (value === 'new') setIsToDel(false);
  };
  const handleClose = () => {
    setIsModalVisible(false);
  };

  const handleToDel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    showModal('del');
    const currentTitle = boardsData.boards.filter((element) => element.id === e.currentTarget.id)[0]
      .title;

    setCurrentItem({
      id: e.currentTarget.id,
      title: currentTitle,
    });
  };

  useEffect(() => {
    getBoardsList(authToken);
  }, []);

  useEffect(() => {
    if (boardsData.error && !boardsData.loading) {
      notification.open({
        message: 'Error!',
        description: boardsData.error,
      });
    }
  }, [boardsData.error, boardsData.loading]);

  function getBoardsData(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    showBoard({ id: (e.target as HTMLElement).id, token: authToken });
    getColumnsList({ boardId: (e.target as HTMLElement).id, token: authToken });
  }

  return (
    <div>
      <h1>{locales[language].title}</h1>
      {boardsData.loading ? (
        <>
          <LoadingOutlined style={{ fontSize: '2em', color: '#8A4900', marginRight: '10px' }} />
          {locales[language].loading}
        </>
      ) : (
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
                      onClick={(e) => handleToDel(e)}
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
                    <ConformModal
                      deleteItem={deleteBoard}
                      authToken={authToken}
                      handleOk={handleClose}
                      itemToDel={{ id: currentItem.id }}
                      name={currentItem.title}
                    />
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
      )}
    </div>
  );
}
