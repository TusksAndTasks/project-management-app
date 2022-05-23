import { Button, Form, Input } from 'antd';
import { boardCreationHelp } from '../../helpers/helperFunctions/boardHelper';
import { useLocales } from '../../helpers/hooks/useLocales';
import { IBoardCreatorProps } from './boardCreatorTypes';
import { locales } from './locales';

export function BoardCreatorForm({ createBoard, authToken, handleOk }: IBoardCreatorProps) {
  const [language] = useLocales();
  function createNewBoard(data: { title: string; description: string }) {
    createBoard({ ...data, token: authToken });
    handleOk();
  }
  const getDataSet = boardCreationHelp();

  const dataList = getDataSet(language);
  const inputs = dataList.map((data) => (
    <Form.Item label={data.label} name={data.name} rules={data.rules} key={data.name}>
      <Input />
    </Form.Item>
  ));

  return (
    <Form
      name="boardCreator"
      initialValues={{ remember: true }}
      onFinish={(data) => createNewBoard(data)}
      autoComplete="off"
      labelAlign="left"
      wrapperCol={{ span: 40 }}
      labelCol={{ span: 40 }}
    >
      {inputs}
      <Form.Item wrapperCol={{ offset: 11 }}>
        <Button type="primary" htmlType="submit">
          {locales[language].createButton}
        </Button>
      </Form.Item>
    </Form>
  );
}
