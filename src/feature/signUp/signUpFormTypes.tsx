import { Rule } from 'antd/lib/form';
import { ISignUpData } from '../../redux/slices/signUp/singUpTypes';

export type ISignNames = { [key: string]: string };
export type ISignRules = { [key: string]: Rule[] };
export type ISignHook = (data: ISignUpData) => void;

export interface IFormProps {
  nameList: ISignNames;
  ruleList: ISignRules;
  hook: ISignHook;
}
