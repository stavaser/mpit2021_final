import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import Cards from './cards';
import CourseCards from './courseCards';
import {
  Row,
  Col,
  Modal,
  Checkbox,
  Form,
  Input,
  Select,
  Result,
  Button,
  Radio,
  InputNumber,
  Divider,
} from 'antd';
import {
  PlusCircleOutlined,
  SmileOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import requests from '../../axios/requests';
import TextArea from 'antd/lib/input/TextArea';
import { useHistory } from 'react-router';
const { Option } = Select;

const Content = styled.div`
  width: 100%;
  padding: 0 5%;
  margin-top: 20px;
  margin-bottom: 50px;
`;
const MainTitle = styled.h1``;

const Main = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultVisible, setResultVisible] = useState(false);

  const [visible, setVisible] = useState(false);
  const [visible_course, setVisibleCourse] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const [profile, setProfile] = useState([]);

  const getTagName = (id) => {
    {
      return tags.filter((x) => x.id === id).map((x) => x.name);
    }
  };
  const showModal = () => {
    setVisible(true);
  };

  const onFinish = (values) => {
    if (visible) {
      console.log(values);
      requests.organization
        .post_vacancy({ ...values })
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            setResultVisible(true);
          }
        })
        .catch((e) => {
          console.log(e.message);
        });
    } else {
      console.log(values);
      requests.organization
        .post_course({ ...values })
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            setResultVisible(true);
          }
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };
  useEffect(() => {
    requests.organization
      .get_org_vacancies({})
      .then(({ data }) => {
        console.log(data);
        setData(data.result);
      })
      .catch((e) => console.log(e));
    requests.organization
      .get_org_courses({})
      .then(({ data }) => {
        console.log(data);
        setCourses(data.result);
      })
      .catch((e) => console.log(e));
  }, []);
  console.log(data);
  console.log(localStorage.getItem('username'));
  console.log(localStorage.getItem('token'));
  return (
    <>
      <Modal
        title="Создать новую вакансию"
        onCancel={handleCancel}
        visible={visible}
        footer={!resultVisible && null}
        width="1200px"
      >
        {resultVisible ? (
          <Result
            icon={<SmileOutlined />}
            title="Вакансия успешно создана!"
            extra={
              <Button onClick={() => window.location.reload(false)}>Ок</Button>
            }
          />
        ) : (
          <Form size="large" name="video" layout="vertical" onFinish={onFinish}>
            <Row
              gutter={[
                { xs: 12, sm: 16, md: 24, lg: 36 },
                { xs: 24, sm: 16, md: 24, lg: 36 },
              ]}
            >
              <Col span={12}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: 'Данное поле не может быть пустым',
                    },
                  ]}
                  label="Название"
                  name="title"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: 'Данное поле не может быть пустым',
                    },
                  ]}
                  label="Описание"
                  name="description"
                >
                  <TextArea />
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: 'Данное поле не может быть пустым',
                    },
                  ]}
                  label="Адрес"
                  name="address"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: 'Данное поле не может быть пустым',
                    },
                  ]}
                  label="Зарплата"
                  name="salary"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: 'Данное поле не может быть пустым',
                    },
                  ]}
                  label="График работы"
                  name="schedule"
                >
                  <Input />
                </Form.Item>

                <Form.List
                  name="reqs_list"
                  rules={[
                    {
                      validator: async (_, reqs_list) => {
                        if (!reqs_list || reqs_list.length == 0) {
                          return Promise.reject(
                            new Error('Добавьте хотя-бы один материал')
                          );
                        }
                      },
                    },
                  ]}
                >
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      {fields.map(({ key, name, fieldKey, ...restField }) => (
                        <Form.Item label={'Навык ' + (key + 1)}>
                          <div
                            key={key}
                            style={{ display: 'flex', alignItems: 'baseline' }}
                          >
                            <Form.Item
                              {...restField}
                              name={[name, 'skill']}
                              fieldKey={[fieldKey, 'skill']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Данное поле не может быть пустым',
                                },
                              ]}
                              style={{ width: '100%', marginRight: '10px' }}
                            >
                              <Input placeholder="Навык" />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, 'description']}
                              fieldKey={[fieldKey, 'description']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Данное поле не может быть пустым',
                                },
                              ]}
                              style={{ width: '100%', marginRight: '10px' }}
                            >
                              <Input placeholder="Описание" />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </div>
                        </Form.Item>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Добавить необходимые навыки
                        </Button>
                      </Form.Item>
                      <Form.ErrorList errors={errors} />
                    </>
                  )}
                </Form.List>
              </Col>
              <Col span={12}>
                <h3>Детали</h3>
                <Form.List
                  name="description_list_1"
                  rules={[
                    {
                      validator: async (_, description_list_1) => {
                        if (
                          !description_list_1 ||
                          description_list_1.length == 0
                        ) {
                          return Promise.reject(
                            new Error('Добавьте хотя-бы один материал')
                          );
                        }
                      },
                    },
                  ]}
                >
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      {fields.map(({ key, name, fieldKey, ...restField }) => (
                        <Form.Item label={'Обязанность ' + (key + 1)}>
                          <div
                            key={key}
                            style={{ display: 'flex', alignItems: 'baseline' }}
                          >
                            <Form.Item
                              {...restField}
                              name={[name, 'text']}
                              fieldKey={[fieldKey, 'text']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Данное поле не может быть пустым',
                                },
                              ]}
                              style={{ width: '100%', marginRight: '10px' }}
                            >
                              <Input placeholder="Обязанность" />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </div>
                        </Form.Item>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Добавить обязанности
                        </Button>
                      </Form.Item>
                      <Form.ErrorList errors={errors} />
                    </>
                  )}
                </Form.List>
                <Form.List
                  name="description_list_2"
                  rules={[
                    {
                      validator: async (_, description_list_2) => {
                        if (
                          !description_list_2 ||
                          description_list_2.length == 0
                        ) {
                          return Promise.reject(
                            new Error('Добавьте хотя-бы один материал')
                          );
                        }
                      },
                    },
                  ]}
                >
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      {fields.map(({ key, name, fieldKey, ...restField }) => (
                        <Form.Item label={'Требование ' + (key + 1)}>
                          <div
                            key={key}
                            style={{ display: 'flex', alignItems: 'baseline' }}
                          >
                            <Form.Item
                              {...restField}
                              name={[name, 'text']}
                              fieldKey={[fieldKey, 'text']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Данное поле не может быть пустым',
                                },
                              ]}
                              style={{ width: '100%', marginRight: '10px' }}
                            >
                              <Input placeholder="Требование" />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </div>
                        </Form.Item>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Добавить требования
                        </Button>
                      </Form.Item>
                      <Form.ErrorList errors={errors} />
                    </>
                  )}
                </Form.List>
                <Form.List
                  name="description_list_3"
                  rules={[
                    {
                      validator: async (_, description_list_3) => {
                        if (
                          !description_list_3 ||
                          description_list_3.length == 0
                        ) {
                          return Promise.reject(
                            new Error('Добавьте хотя-бы один материал')
                          );
                        }
                      },
                    },
                  ]}
                >
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      {fields.map(({ key, name, fieldKey, ...restField }) => (
                        <Form.Item label={'Условие ' + (key + 1)}>
                          <div
                            key={key}
                            style={{ display: 'flex', alignItems: 'baseline' }}
                          >
                            <Form.Item
                              {...restField}
                              name={[name, 'text']}
                              fieldKey={[fieldKey, 'text']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Данное поле не может быть пустым',
                                },
                              ]}
                              style={{ width: '100%', marginRight: '10px' }}
                            >
                              <Input placeholder="Условие" />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </div>
                        </Form.Item>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Добавить условия
                        </Button>
                      </Form.Item>
                      <Form.ErrorList errors={errors} />
                    </>
                  )}
                </Form.List>

                <Form.Item name="is_active" valuePropName="checked">
                  <Checkbox>Активное</Checkbox>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Отправить
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
      </Modal>
      <Modal
        title="Создать новый курс"
        onCancel={() => setVisibleCourse(false)}
        visible={visible_course}
        footer={!resultVisible && null}
        width="800px"
      >
        {resultVisible ? (
          <Result
            icon={<SmileOutlined />}
            title="Курс успешно создан!"
            extra={
              <Button onClick={() => window.location.reload(false)}>Ок</Button>
            }
          />
        ) : (
          <Form size="large" name="video" layout="vertical" onFinish={onFinish}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Данное поле не может быть пустым',
                },
              ]}
              label="Название"
              name="title"
            >
              <Input />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Данное поле не может быть пустым',
                },
              ]}
              label="Описание"
              name="description"
            >
              <TextArea />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Данное поле не может быть пустым',
                },
              ]}
              label="Ключевые навыки"
              name="skills"
            >
              <Select
                mode="tags"
                style={{ width: '100%' }}
                placeholder="Скилл"
              ></Select>
            </Form.Item>
            <Form.List
              name="media_list"
              rules={[
                {
                  validator: async (_, media_list) => {
                    if (!media_list || media_list.length == 0) {
                      return Promise.reject(
                        new Error('Добавьте хотя-бы один материал')
                      );
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Form.Item label={'Видео ' + (key + 1)}>
                      <div
                        key={key}
                        style={{ display: 'flex', alignItems: 'baseline' }}
                      >
                        <Form.Item
                          {...restField}
                          name={[name, 'title']}
                          fieldKey={[fieldKey, 'title']}
                          rules={[
                            {
                              required: true,
                              message: 'Данное поле не может быть пустым',
                            },
                          ]}
                          style={{ width: '100%', marginRight: '10px' }}
                        >
                          <Input placeholder="Название" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'video']}
                          fieldKey={[fieldKey, 'video']}
                          rules={[
                            {
                              required: true,
                              message: 'Данное поле не может быть пустым',
                            },
                          ]}
                          style={{ width: '100%', marginRight: '10px' }}
                        >
                          <Input placeholder="Видео" />
                        </Form.Item>

                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </div>
                      <Form.Item
                        {...restField}
                        name={[name, 'description']}
                        fieldKey={[fieldKey, 'description']}
                        rules={[
                          {
                            required: true,
                            message: 'Данное поле не может быть пустым',
                          },
                        ]}
                        style={{ width: '100%', marginRight: '10px' }}
                      >
                        <TextArea placeholder="Описание" rows={4} />
                      </Form.Item>
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Добавить материал
                    </Button>
                  </Form.Item>
                  <Form.ErrorList errors={errors} />
                </>
              )}
            </Form.List>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Отправить
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>

      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <Content>
          <MainTitle>Ваши вакансии</MainTitle>
          <Row
            gutter={[
              { xs: 12, sm: 16, md: 24, lg: 36 },
              { xs: 24, sm: 16, md: 24, lg: 36 },
            ]}
          >
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={8}
              xxl={6}
              xxxl={6}
              style={{ width: '100%' }}
            >
              <Button
                onClick={showModal}
                type="dashed"
                block
                style={{ minHeight: '300px', maxHeight: '100%' }}
              >
                <PlusCircleOutlined style={{ fontSize: '50px' }} />
                <p style={{ fontSize: '20px' }}>Добавить новую вакансию</p>
              </Button>
            </Col>
            {data &&
              data.map((item) => {
                return (
                  <Cards
                    id={item.id}
                    title={item.title}
                    desc={item.description}
                    org={item.organization}
                    reqs={item.reqs}
                  />
                );
              })}
          </Row>
          <Divider />
          <MainTitle>Ваши курсы</MainTitle>
          <Row
            gutter={[
              { xs: 12, sm: 16, md: 24, lg: 36 },
              { xs: 24, sm: 16, md: 24, lg: 36 },
            ]}
          >
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={8}
              xxl={6}
              xxxl={6}
              style={{ width: '100%' }}
            >
              <Button
                onClick={() => setVisibleCourse(true)}
                type="dashed"
                block
                style={{ minHeight: '300px', maxHeight: '100%' }}
              >
                <PlusCircleOutlined style={{ fontSize: '50px' }} />
                <p style={{ fontSize: '20px' }}>Добавить новый курс</p>
              </Button>
            </Col>
            {courses &&
              courses.map((item) => {
                return (
                  <CourseCards
                    id={item.id}
                    title={item.title}
                    desc={item.description}
                    org={item.organization}
                    reqs={item.reqs}
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
