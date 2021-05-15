import react from 'react';
import styled from 'styled-components';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import { Row, Button, Col, Badge } from 'antd';
import { Link } from 'react-router-dom';

const Content = styled.div``;
const Test = () => {
  return (
    <>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <Content>
          <Row
            gutter={[
              { xs: 12, sm: 16, md: 24, lg: 36 },
              { xs: 24, sm: 16, md: 24, lg: 36 },
            ]}
          >
            <Col xs={24} sm={24} md={12} lg={8} xxl={6} xxxl={6}></Col>
          </Row>
        </Content>
      </div>
    </>
  );
};

export default Test;
