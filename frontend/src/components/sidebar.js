import react, { useState } from 'react';
import styled from 'styled-components';
import { Menu, Button } from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';

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
    <div style={{ marginRight: '100px', zIndex: 9999 }}>
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
                  src="./images/IT.png"
                />
              ) : (
                <img style={{ width: '180px' }} src="./images/connectIT.png" />
              )
            }
          ></Menu.Item>
          <Menu.Item
            onClick={toggleCollapsed}
            style={{ marginBottom: 16 }}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            style={{ backgroundColor: 'white' }}
          ></Menu.Item>
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
            Option 3
          </Menu.Item>
          <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            icon={<AppstoreOutlined />}
            title="Navigation Two"
          >
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </Container>
    </div>
  );
};

export default Sidebar;
