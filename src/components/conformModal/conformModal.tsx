import { Button } from 'antd';
import { useLocales } from '../../helpers/hooks/useLocales';
import { locales } from './locales';
import { ComplexDeleteData, IConformModalProps } from './conformModalTypes';
import './conformModal.scss';

export default function ConformModal({
  deleteItem,
  authToken,
  handleOk,
  itemToDel,
  name,
}: IConformModalProps) {
  const [language] = useLocales();

  const deleteElement = () => {
    const deleteData = { ...itemToDel, token: authToken } as ComplexDeleteData;
    deleteItem(deleteData);
    handleOk();
  };

  return (
    <>
      <div className="conform-modal">
        <h3>{locales[language].text}</h3>
        <span>{name}</span>
      </div>
      <Button
        type="primary"
        className="btn btn-primary btn-delete"
        htmlType="submit"
        onClick={deleteElement}
      >
        {locales[language].button}
      </Button>
    </>
  );
}
