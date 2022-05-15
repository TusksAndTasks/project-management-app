import { Button, Form, Input } from 'antd';
import { useLocales } from '../../helpers/hooks/useLocales';
import { IBoardCreatorProps } from './boardCreatorTypes';
import { locales } from './locales';

export function BoardCreatorForm({ createBoard, authToken, handleOk }: IBoardCreatorProps) {
  const [language] = useLocales();
  return (
    <Form
      name="boardCreator"
      initialValues={{ remember: true }}
      onFinish={(data) => {
        createBoard({ ...data, token: authToken });
        handleOk();
      }}
      autoComplete="off"
      labelAlign="left"
      wrapperCol={{ span: 40 }}
      labelCol={{ span: 40 }}
    >
      <Form.Item
        label={locales[language].title}
        name="title"
        rules={[
          {
            required: true,
            message: locales[language].titleRequired,
          },
        ]}
        key={1}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={locales[language].description}
        name="description"
        rules={[
          {
            required: true,
            message: locales[language].descriptionRequired,
          },
        ]}
        key={2}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 11 }}>
        <Button type="primary" htmlType="submit">
          {locales[language].createButton}
        </Button>
      </Form.Item>
    </Form>
  );
}
