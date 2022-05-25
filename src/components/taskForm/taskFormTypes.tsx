import { Rule } from 'antd/lib/form';

export interface IJtwToken {
  login: string;
  userId: string;
  iat: number;
}

export type ITaskNames = { [key: string]: string };
export type ITaskRules = { [key: string]: Rule[] };

export interface ITaskFormProps {
  nameList: ITaskNames;
  ruleList: ITaskRules;
  order: number;
  boardId: string;
  columnId: string;
  handleClose: () => void;
}
