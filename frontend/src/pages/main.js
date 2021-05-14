import react from 'react';
import styled from 'styled-components';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';

const Content = styled.div``;
const Main = () => {
  return (
    <>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <Content>adqwdqwd qwdqw dqw</Content>
      </div>
    </>
  );
};

export default Main;
