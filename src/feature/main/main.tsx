import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useBoardsList } from '../../helpers/hooks/useBoardsList';
import { useAuthToken } from '../../helpers/hooks/useAuthToken';
import { BoardCreatorForm } from '../../components/boardCreatorForm.tsx/boardCreatorForm';
import { locales } from './locales';
import { useLocales } from '../../helpers/hooks/useLocales';

export default function Main() {
  const [boardsData, getBoardsList, createBoard, deleteBoard] = useBoardsList();
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
