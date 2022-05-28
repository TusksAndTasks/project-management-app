import React from 'react';
import { MenuProps } from 'antd/es/menu';

export type MenuItem = Required<MenuProps>['items'][number];

export default function getItem(
  label: string,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
