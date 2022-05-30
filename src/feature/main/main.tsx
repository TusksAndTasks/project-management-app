import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { NavLink } from 'react-router-dom';
import { useBoardsList } from '../../helpers/hooks/useBoardsList';
import { useAuthToken } from '../../helpers/hooks/useAuthToken';
import { BoardCreatorForm } from '../../components/boardCreatorForm.tsx/boardCreatorForm';
import { locales } from './locales';
import { useLocales } from '../../helpers/hooks/useLocales';
import { useBoardData } from '../../helpers/hooks/useBoardData';
import { useColumnList } from '../../helpers/hooks/useColumnList';

export default function Main() {
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

  const boardsList = boardsData.boards.map((board) => (
    <div key={board.id}>
      <div>
        {locales[language].boardTitle}
        {board.title}
      </div>
      <div>
        {locales[language].boardDescription}
        {board.description}
      </div>
      <NavLink to="/Board" type="button" id={board.id} onClick={(e) => getBoardsData(e)}>
        {locales[language].showBoard}
      </NavLink>
      <button
        type="button"
        id={board.id}
        onClick={(e) => deleteBoard({ id: (e.target as HTMLElement).id, token: authToken })}
      >
        {locales[language].deleteButton}
      </button>
    </div>
  ));

  return (
    <div>
      <button type="button" onClick={showModal}>
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
      {boardsList}
    </div>
  );
}
