import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import Cards from '../components/cards';
import { Row } from 'antd';
const Content = styled.div`
  width: 100%;
  padding: 0 5%;
  margin-top: 20px;
`;
const MainTitle = styled.h1``;

const Main = () => {
  const [data, setData] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTagName = (id) => {
    {
      return tags.filter((x) => x.id === id).map((x) => x.name);
    }
  };
  return (
    <>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <Content>
          <MainTitle>Каталог тестов</MainTitle>
          <Row
            gutter={[
              { xs: 12, sm: 16, md: 24, lg: 36 },
              { xs: 24, sm: 16, md: 24, lg: 36 },
            ]}
          >
            {/* {data.map((item) => { */}
            {/* return ( */}
            <Cards
              id={1}
              title={'dfsfsdfs'}
              org={'dfsfsdfs'}
              skill={'dfsfsdfs'}
            />
            {/* );
      })} */}
          </Row>
        </Content>
      </div>
    </>
  );
};

export default Main;
