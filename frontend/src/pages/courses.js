import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import CourseCards from '../components/courseCards';
import requests from '../axios/requests';
import { Row, Select, Form, Button } from 'antd';

const { Option } = Select;
const Content = styled.div`
  width: 100%;
  padding: 0 5%;
  margin-top: 20px;
`;
const MainTitle = styled.h1``;

const Courses = (props) => {
  const find_skill = props.match.params.skill;

  const [data, setData] = useState([]);
  const [tags, setTags] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const getAllCourses = () => {
    requests.materials
      .get_courses({ s: 's' })
      .then(({ data }) => {
        console.log(data);
        setData(data.result);
      })
      .catch((e) => console.log(e));
  };

  const getCoursesBySkill = (values) => {
    requests.materials
      .get_courses_by_skill(values)
      .then(({ data }) => {
        console.log(data);
        setData(data.result);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    if (find_skill) {
      getCoursesBySkill(find_skill);
    } else {
      getAllCourses();
    }
    requests.materials
      .get_course_skills({})
      .then(({ data }) => setSkills(data.result))
      .catch((e) => console.log(e));
  }, []);
  console.log(data);

  const onFinish = (values) => {
    console.log(values);

    getCoursesBySkill(values);
  };
  console.log(skills);
  return (
    <>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <Content>
          <MainTitle>Все курсы</MainTitle>
          <Form size={'large'} layout="vertical" onFinish={onFinish}>
            <div style={{ display: 'flex' }}>
              <Form.Item name="skills" style={{ flex: 1 }}>
                <Select
                  allowClear
                  onClear={() => getAllCourses()}
                  mode="tags"
                  placeholder="Найти курсы по скиллам"
                >
                  {skills.map((item) => {
                    return <Option value={item}>{item}</Option>;
                  })}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Найти
                </Button>
              </Form.Item>
            </div>
          </Form>

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
                    skills={item.skills}
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
