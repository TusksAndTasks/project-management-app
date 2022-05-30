import React, { useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { List } from 'antd';
import { locales } from './locales';
import { useLocales } from '../../helpers/hooks/useLocales';
import { useAuthToken } from '../../helpers/hooks/useAuthToken';
import { useUsersData } from '../../helpers/hooks/useUsersData';

export default function Team() {
  const [authToken] = useAuthToken();
  const [language] = useLocales();
  const [usersData, getUsersList] = useUsersData();
  useEffect(() => {
    getUsersList(authToken);
  }, []);

  return (
    <div>
      <h1>{locales[language].title}</h1>
      {usersData.loading ? (
        <>
          <LoadingOutlined style={{ fontSize: '2em', color: '#8A4900', marginRight: '10px' }} />
          {locales[language].loading}
        </>
      ) : (
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            pageSize: 6,
          }}
          dataSource={usersData.users}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <List.Item.Meta title={item.name} description={item.login} />
            </List.Item>
          )}
        />
      )}
    </div>
  );
}
