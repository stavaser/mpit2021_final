import react, { useState } from 'react';
import styled from 'styled-components';
import { Menu, Button } from 'antd';
import logoS from '../images/IT.png';
import logoXL from '../images/connectIT.png';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { SubMenu } = Menu;
const Container = styled.div`
  .ant-menu-inline {
    width: 256px;
  }
`;
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div style={{ marginRight: '100px', zIndex: 5 }}>
      <Container style={{ height: '100vh' }}>
        <Menu
          mode="inline"
          subMenuCloseDelay={0}
          inlineCollapsed={collapsed}
          style={{
            height: '100vh',
            position: 'absolute',
            top: '0',
          }}
        >
          <Menu.Item
            style={{ backgroundColor: 'white', margin: '30px 0' }}
            icon={
              collapsed ? (
                <img
                  style={{ width: '40px', marginLeft: '-10px' }}
                  src={logoS}
                />
              ) : (
                <img style={{ width: '180px' }} src={logoXL} />
              )
            }
          ></Menu.Item>
          <Menu.Item
            onClick={toggleCollapsed}
            style={{ marginBottom: 16 }}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            style={{ backgroundColor: 'white' }}
          ></Menu.Item>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
            <Link to={{ pathname: '/main' }}>Вакансии</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<PieChartOutlined />}>
            <Link to={{ pathname: '/courses' }}>Курсы</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<AppstoreOutlined />}>
            <Link to={{ pathname: '/profile' }}>Профиль</Link>
          </Menu.Item>
        </Menu>
      </Container>
    </div>
  );
};

export default Sidebar;
