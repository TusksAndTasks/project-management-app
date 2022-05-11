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

/* Более специфические типы приведут к проблеме при использовании authForm для логина.
иного решения проблемы передачи в authForm двух разных наборов пропсов я не нашел.
если создавать разные специфические типы для nameList и ruleList для авторизации и
регистрации, то будет ошибка индексирования, даже если прописать два разных енума
для ключей. (nameList: ISignNames|ILogNames)[KeysEnum1 | KeysEnum2] выдаст ошибку индексации,
даже если создать два разных передаваемых IFormProps. Более элегантного решения, чем
то, которое выше я не нашел, хотя перепробовал +- все. Насколько я понимаю,
либо прописывать для авторизации и регистрации отдельные формы, либо так это все писать.
Не уверен правда, что с хуком делать. Пока только придумал сделать name необязательным в
ISignData. Но все эти костыли кажутся не очень правильными */
