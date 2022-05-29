import { Divider, Image } from 'antd';
import './footerBottom.scss';
import { GithubOutlined } from '@ant-design/icons';
import schoolLogo from '../../assets/img/rs_school_js.svg';

export default function FooterBottom() {
  return (
    <>
      <div>
        Team44@Rolling-Scopes-School
        <Divider type="vertical" />
        2022
      </div>
      <div>
        <a href="https://github.com/OVasilena" target="_blank" rel="noreferrer">
          <GithubOutlined />
          OVasilena
        </a>
      </div>
      <div>
        <a href="https://github.com/TusksAndTasks" target="_blank" rel="noreferrer">
          <GithubOutlined />
          TusksAndTasks
        </a>
      </div>
      <a href="https://rs.school/react/" target="_blank" rel="noreferrer">
        <Image src={schoolLogo} width={50} preview={false} alt="Rolling-Scopes-School" />
      </a>
    </>
  );
}
