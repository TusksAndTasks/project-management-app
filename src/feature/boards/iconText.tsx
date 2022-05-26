import React from 'react';
import { Space } from 'antd';

export default function IconText({ icon, text }: { icon: React.FC; text: string }) {
  return (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
}
