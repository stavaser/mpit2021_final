// import React, { useState, useRef, useCallback, useEffect } from 'react';
// import styled from 'styled-components';
// import requests from '../axios/requests';
// import {
//   Steps,
//   message,
//   Popover,
//   Radio,
//   Row,
//   Col,
//   Button,
//   Progress,
//   Result,
//   Collapse,
// } from 'antd';
// const { Step } = Steps;

// const { Panel } = Collapse;

// const radioStyle = {
//   display: 'block',
//   height: '30px',
//   lineHeight: '30px',
// };
// const StyledSteps = styled.div`
//   padding: 20px 0;
//   display: flex;
//   /* .ant-steps-item-finish
//         > .ant-steps-item-container
//         > .ant-steps-item-content
//         > .ant-steps-item-title::after {
//         background-color: #bb7cf5;
//     }
//     .ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-icon {
//         background: #bb7cf5;
//     }
//     .ant-steps-item-process .ant-steps-item-icon {
//         background-color: #fff;
//         border-color: #bb7cf5;
//     }

//     .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
//         color: #bb7cf5;
//     }
//     .ant-steps-item-finish .ant-steps-item-icon {
//         background-color: #fff;
//         border-color: #bb7cf5;
//     } */
// `;
// const Choices = styled.ul`
//   list-style: none;
//   margin: 0;
//   padding: 0;
//   margin: 20px 0;
//   li:last-child {
//     border-bottom: 1px solid rgba(0, 0, 0, 0.2);
//     margin-bottom: 100px;
//   }
// `;

// const MainTitle = styled.h1``;
// const SecondaryTitle = styled.h3``;
// // const Button = styled.button`
// //     border: none;
// //     background: ${(props) => (props.primary ? '#bb7cf5' : 'white')};
// //     border-radius: 13px;
// //     border: 2px solid #bb7cf5;
// //     color: ${(props) => (props.primary ? 'white' : '#bb7cf5')};
// //     padding: 12px 40px;
// //     font-weight: bold;
// //     outline: none;
// //     cursor: pointer;
// //     float: right;
// //     transition: 200ms linear;
// //     :hover {
// //         background: ${(props) => (props.primary ? 'white' : '#bb7cf5')};
// //         color: ${(props) => (props.primary ? '#bb7cf5' : 'white')};
// //     }
// // `;
// const RadioGroup = styled.div`
//   .ant-radio-button-wrapper:first-child:last-child {
//     border-radius: 50px;
//   }
//   .ant-col-24 {
//     border-bottom: 1px solid rgba(0, 0, 0, 0.1);
//     width: 700px;
//     padding-bottom: 20px;
//   }

//   h3.quiz-option {
//     width: 700px;
//     position: absolute;
//     top: 0;
//     left: 60px;
//     font-weight: 400;
//   }
// `;

// const Test = (params) => {
//   const { questions, title, stage_theory_id } = params;
//   //  const questions = theory_info.questions;
//   //  const title = theory_info.title;
//   console.log(stage_theory_id);
//   //  console.log(theory_info.questions[0]);
//   const [current, setCurrent] = useState(0);
//   const [currentQuestion, setCurrentQuestion] = useState([]);
//   const [quesionId, setQuesionId] = useState(0);
//   const [answerId, setAnswerId] = useState(null);
//   const [last, setLast] = useState(false);
//   const [result, setResult] = useState(false);
//   const [active, setActive] = useState(0);
//   const [answers, setAnswers] = useState([]);

//   const [answered, setAnswered] = useState(false);
//   const [checked, setChecked] = useState(false);
//   const [primary, setPrimary] = useState(false);
//   const [data, setData] = useState([]);

//   const [correctCount, setCorrectCount] = useState(0);
//   const [incorrect, setIncorrect] = useState(false);
//   //  const ref = useRef();

//   // const forceUpdate = useForceUpdate();
//   useEffect(() => {
//     //   requests.stages
//     //    .get_stage_theories_info({
//     //     stage_theory_id,
//     //    })
//     //    .then((response) => {
//     //     console.log("DATA", response.data, "id", stage_theory_id);
//     //     setData(response.data);
//     //     setQuestions(response.data.questions);
//     //     setCurrentQuestion(response.data.questions[0]);
//     //    })
//     //    .catch((error) => {
//     //     console.log(error.response);
//     //    });
//   }, []);

//   const next = () => {
//     setAnswered(false);
//     const myAnswer = questions[active].answers.find((x) => x.id === answerId);
//     console.log('myans', myAnswer);
//     answers.push({
//       answer_id: myAnswer.id,
//       correct: myAnswer.correct,
//       text: myAnswer.text,
//     });
//     setAnswers(answers);
//     setActive(active + 1);
//     if (active == questions.length - 1) {
//       finish();
//     }
//   };

//   const finish = () => {
//     setLast(true);
//     console.log('answers', answers);
//     message.success('все!');
//     requests.stages
//       .post_quizresult({
//         answers: answers,
//         stage_theory_id: stage_theory_id,
//       })
//       .then((response) => {
//         console.log('DATA', response);
//         setResult(response.data);
//       })
//       .catch((error) => {
//         console.log(error.response);
//       });
//   };

//   const reset = () => {
//     setLast(false);
//     setAnswers([]);
//     setActive(0);
//     setCorrectCount(0);
//   };

//   const answer = () => {
//     setAnswered(true);
//   };

//   const results = (
//     <>
//       <Result
//         icon={
//           <Progress
//             type="circle"
//             strokeColor={{
//               '0%': '#108ee9',
//               '100%': '#87d068',
//             }}
//             percent={Math.round(result.quiz_result)}
//           />
//         }
//         status="success"
//         title={`${result.count_right} правильных ответов из ${questions.length}!`}
//         extra={[
//           <Button key="restart" onClick={() => reset()}>
//             Заново
//           </Button>,
//         ]}
//       />
//       <h1>Ответы:</h1>
//       <Collapse>
//         {questions.map((quesion) => {
//           return (
//             <Panel header={quesion.title} key={quesion.title}>
//               <span>
//                 {quesion.answers.find((x) => x.correct === true).text}
//               </span>
//               {/* <p>{answers.find((x) => x.answer_id === quesion.answers.id)}</p> */}
//             </Panel>
//           );
//         })}
//       </Collapse>
//     </>
//   );
//   const labels = ['A', 'B', 'C', 'D', 'E'];
//   return (
//     <React.Fragment>
//       <MainTitle>{title}</MainTitle>

//       <>
//         <div className="steps-content">
//           {last ? (
//             results
//           ) : (
//             <>
//               <SecondaryTitle>{questions[active].title}</SecondaryTitle>
//               <Choices>
//                 <RadioGroup>
//                   <Radio.Group
//                     onChange={answer}
//                     size="large"
//                     buttonStyle="solid"
//                     optionType="button"
//                   >
//                     <Row gutter={[16, 16]}>
//                       {questions[active].answers.map((item) => (
//                         <Col span={24}>
//                           <Radio.Button
//                             value={item.id}
//                             onClick={() => setAnswerId(item.id)}
//                           >
//                             {
//                               labels[
//                                 questions[active].answers
//                                   .map((e) => e.id)
//                                   .indexOf(item.id)
//                               ]
//                             }
//                             <h3 className="quiz-option">{item.text}</h3>
//                           </Radio.Button>
//                         </Col>
//                       ))}
//                     </Row>
//                   </Radio.Group>
//                 </RadioGroup>
//               </Choices>
//             </>
//           )}
//         </div>
//       </>

//       <StyledSteps>
//         <Steps
//           style={{ alignSelf: 'center', marginRight: '20px' }}
//           current={active}
//         >
//           {questions.map((quesion, index) => (
//             <Step key={index} />
//           ))}
//         </Steps>
//         <div className="steps-action">
//           <Popover
//             title="Не правильно"
//             content="Нужна помощь?"
//             trigger="click"
//             visible={incorrect}
//           >
//             <Button
//               type="primary"
//               disabled={!answered}
//               size="large"
//               onClick={() => next()}
//             >
//               {last ? 'Дальше' : 'Ответить'}
//             </Button>
//           </Popover>
//         </div>
//       </StyledSteps>
//     </React.Fragment>
//   );
// };

// export default Test;
