import { useNavigate } from 'react-router-dom';
import { Row, Col, Avatar, List, Card, Image } from 'antd';
import { PlusCircleFilled, UserOutlined } from '@ant-design/icons';
import { locales } from './locales';
import { useLocales } from '../../helpers/hooks/useLocales';

import frontPageImage from '../../assets/img/business-people.jpg';
import './welcome.scss';

export default function Welcome() {
  const [language] = useLocales();
  const navigate = useNavigate();

  const profileDev = [
    {
      name: 'OVasilena',
      gitHub: 'https://github.com/OVasilena',
      img: 'https://avatars.githubusercontent.com/u/23345740',
    },
    {
      name: 'TusksAndTasks',
      gitHub: 'https://github.com/TusksAndTasks',
      img: 'https://avatars.githubusercontent.com/u/86926386',
    },
  ];

  return (
    <Row>
      <Col flex={3}>
        <h1 className="title">{locales[language].title}</h1>
        <h3 className="title">{locales[language].text}</h3>
        <div className="title">{locales[language].decription}</div>
        <List
          grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}
          dataSource={profileDev}
          renderItem={(profile) => (
            <List.Item>
              <Card title={profile.name}>
                <Avatar src={profile.img} />
                <a href={profile.gitHub}>{profile.name}</a>
              </Card>
            </List.Item>
          )}
        />
        <Card className="card-none-profile" onClick={() => navigate('/SignUp')}>
          <Avatar className="none-avatar" icon={<UserOutlined />} />
          <div className="none-profile-text">
            <PlusCircleFilled />
            <span>{locales[language].joinUs}</span>
          </div>
        </Card>
      </Col>
      <Col flex={2}>
        <Image
          width={500}
          className="frontpage-image"
          src={frontPageImage}
          alt="frontPageImage"
          preview={false}
        />
      </Col>
    </Row>
  );
}
