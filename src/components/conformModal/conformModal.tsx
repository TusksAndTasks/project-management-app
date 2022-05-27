import React from 'react';
import { Button } from 'antd';
import { useLocales } from '../../helpers/hooks/useLocales';
import { locales } from './locales';
import { IConformModalProps } from './conformModalTypes';
import './conformModal.scss';

export default function ConformModal({
  deleteItem,
  authToken,
  handleOk,
  itemToDel,
}: IConformModalProps) {
  const [language] = useLocales();

  const deleteElement = () => {
    deleteItem({ id: itemToDel.id, token: authToken });
    handleOk();
  };

  return (
    <>
      <div className="conform-modal">
        <h3>{locales[language].text}</h3>
        <span>{itemToDel.name}</span>
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
