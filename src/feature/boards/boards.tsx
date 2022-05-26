import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { List } from 'antd';
import { FileImageOutlined, SnippetsOutlined } from '@ant-design/icons';
import { useBoardsList } from '../../helpers/hooks/useBoardsList';
import { useAuthToken } from '../../helpers/hooks/useAuthToken';
import { useLocales } from '../../helpers/hooks/useLocales';
import { useBoardData } from '../../helpers/hooks/useBoardData';
import { useColumnList } from '../../helpers/hooks/useColumnList';
import IconText from './iconText';
import { locales } from '../main/locales';

export default function Boards() {
  const [boardsData, getBoardsList, , deleteBoard] = useBoardsList();
  const [, getColumnsList] = useColumnList();
  const [, showBoard] = useBoardData();
  const [authToken] = useAuthToken();
  const [language] = useLocales();

  useEffect(() => {
    getBoardsList(authToken);
  }, []);

  function getBoardsData(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    showBoard({ id: (e.target as HTMLElement).id, token: authToken });
    getColumnsList({ boardId: (e.target as HTMLElement).id, token: authToken });
  }

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 3,
      }}
      dataSource={boardsData.boards}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          actions={[
            <IconText icon={SnippetsOutlined} text="10" key="list-vertical-star-o" />,
            <IconText icon={FileImageOutlined} text="2" key="list-vertical-message" />,
          ]}
        >
          <List.Item.Meta
            title={(
              <Link to="/Board" id={item.id} onClick={(e) => getBoardsData(e)}>
                {item.title}
              </Link>
            )}
            description={item.description}
          />
          <button
            type="button"
            id={item.id}
            onClick={(e) => deleteBoard({ id: (e.target as HTMLElement).id, token: authToken })}
          >
            {locales[language].deleteButton}
          </button>
        </List.Item>
      )}
    />
  );
}
