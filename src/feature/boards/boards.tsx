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
import { locales } from '../main/locales';
import './boards.scss';
import { BoardCreatorForm } from '../../components/boardCreatorForm.tsx/boardCreatorForm';

export default function Boards() {
  const [boardsData, getBoardsList, createBoard, deleteBoard] = useBoardsList();
  const [, getColumnsList] = useColumnList();
  const [, showBoard] = useBoardData();
  const [authToken] = useAuthToken();
  const [language] = useLocales();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleClose = () => {
    setIsModalVisible(false);
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
      <button className="btn btn-create" type="button" onClick={showModal}>
        <PlusCircleFilled />
        {locales[language].createButton}
      </button>
      <Modal
        title={locales[language].creatorTitle}
        visible={isModalVisible}
        onCancel={handleClose}
        footer={[]}
      >
        <BoardCreatorForm createBoard={createBoard} authToken={authToken} handleOk={handleClose} />
      </Modal>

      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={boardsData.boards}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <IconText icon={SnippetsOutlined} text="10" key="list-vertical-star-o" />,
              <IconText icon={FileImageOutlined} text="2" key="list-vertical-message" />,
            ]}
            extra={(
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
                  onClick={(e) => deleteBoard({ id: (e.target as HTMLElement).id, token: authToken })}
                >
                  {locales[language].deleteButton}
                </button>
              </>
            )}
          >
            <List.Item.Meta
              title={(
                <Link to="/Board" id={item.id} onClick={(e) => getBoardsData(e)}>
                  {item.title}
                </Link>
              )}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </>
  );
}
