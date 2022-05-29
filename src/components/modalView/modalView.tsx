import { Modal } from 'antd';
import React from 'react';
import { IModalViewProps } from './modalViewTypes';

export default function ModalView({ title, isVisible, onCancel }: IModalViewProps) {
  return <Modal title={title} visible={isVisible} onCancel={onCancel} footer={[]} />;
}
