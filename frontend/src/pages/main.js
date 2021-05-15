import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import Cards from '../components/cards';
import requests from '../axios/requests';
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
  useEffect(() => {
    requests.materials
      .get_vacancies({ s: 's' })
      .then(({ data }) => {
        console.log(data);
        setData(data.result);
      })
      .catch((e) => console.log(e));
  }, []);
  console.log(data);
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
          <MainTitle>Все вакансии</MainTitle>
          <Row
            gutter={[
              { xs: 12, sm: 16, md: 24, lg: 36 },
              { xs: 24, sm: 16, md: 24, lg: 36 },
            ]}
          >
            {data &&
              data.map((item) => {
                return (
                  <Cards
                    id={item.id}
                    title={item.title}
                    desc={item.description}
                    org={item.organization}
                    reqs={item.reqs}
                    job_info={item.job_info}
                  />
                );
              })}
          </Row>
        </Content>
      </div>
    </>
  );
};

export default Main;
