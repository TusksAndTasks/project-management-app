import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { useAuthToken } from '../../helpers/hooks/useAuthToken';
import { useLocales } from '../../helpers/hooks/useLocales';
import { createTask } from '../../redux/slices/tasks/tasksSlice';
import { AppDispatch } from '../../redux/store';
import { locales } from './locales';
import { IJtwToken, ITaskFormProps, ITaskNames } from './taskFormTypes';

export function TaskForm({ nameList, ruleList, boardId, columnId, handleClose }: ITaskFormProps) {
  const keys = Object.keys(nameList);
  const [language] = useLocales();
  const dispatch = useDispatch() as AppDispatch;
  const [authToken] = useAuthToken();
  const decodedToken = (jwt_decode(authToken) as IJtwToken).userId;
  function submitTaskForm(data: { title: string; description: string }) {
    const body = {
      ...data,
      userId: decodedToken,
    };
    dispatch(createTask({ token: authToken, boardId, columnId, body }));
    handleClose();
  }

  const inputs = keys.map((key) => (
    <Form.Item
      label={(locales[language] as ITaskNames)[key]}
      name={nameList[key]}
      rules={ruleList[key]}
      key={key}
    >
      <Input />
    </Form.Item>
  ));

  return (
    <Form
      name="taskForm"
      initialValues={{ remember: true }}
      onFinish={(data) => submitTaskForm(data)}
      autoComplete="off"
      labelAlign="left"
      wrapperCol={{ span: 40 }}
      labelCol={{ span: 40 }}
    >
      {inputs}
      <Form.Item wrapperCol={{ offset: 11 }}>
        <Button type="primary" htmlType="submit">
          {locales[language].submit}
        </Button>
      </Form.Item>
    </Form>
  );
}
