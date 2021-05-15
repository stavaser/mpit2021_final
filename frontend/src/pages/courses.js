import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import CourseCards from '../components/courseCards';
import requests from '../axios/requests';
import { Row } from 'antd';
const Content = styled.div`
  width: 100%;
  padding: 0 5%;
  margin-top: 20px;
`;
const MainTitle = styled.h1``;

const Courses = () => {
  const [data, setData] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    requests.materials
      .get_courses({ s: 's' })
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
          <MainTitle>Все курсы</MainTitle>
          <Row
            gutter={[
              { xs: 12, sm: 16, md: 24, lg: 36 },
              { xs: 24, sm: 16, md: 24, lg: 36 },
            ]}
          >
            {data &&
              data.map((item) => {
                return (
                  <CourseCards
                    id={item.id}
                    title={item.title}
                    desc={item.description}
                    org={item.organization}
                    reqs={item.reqs}
                    finished={item.finished}
                  />
                );
              })}
          </Row>
        </Content>
      </div>
    </>
  );
};

export default Courses;
