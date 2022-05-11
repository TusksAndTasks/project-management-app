import { Button, Form, Input } from 'antd';
import { IFormProps, ISignNames } from '../../feature/signUp/signUpFormTypes';
import { useLocales } from '../../helpers/hooks/useLocales';
import { ISignUpData } from '../../redux/slices/signUp/singUpTypes';
import { locales } from './locales';

export function AuthForm(props: IFormProps) {
  const { nameList, ruleList, hook } = props;
  const keys = Object.keys(nameList);
  const [language] = useLocales();

  const inputs = keys.map((key) => (
    <Form.Item
      label={(locales[language] as ISignNames)[key]}
      name={nameList[key]}
      rules={ruleList[key]}
      key={key}
    >
      <Input />
    </Form.Item>
  ));

  return (
    <Form
      name="authForm"
      initialValues={{ remember: true }}
      onFinish={(data: ISignUpData) => hook(data)}
      autoComplete="off"
      labelAlign="left"
      wrapperCol={{ span: 40 }}
      labelCol={{ span: 40 }}
    >
      {inputs}
      <Form.Item wrapperCol={{ offset: 10 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
