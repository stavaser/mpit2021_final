import react from 'react';
import styled from 'styled-components';
import { Input, Button } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Search } = Input;

const StyledNavbar = styled.div`
  height: 80px;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0 50px;
  display: flex;
  align-items: center;
  align-content: center;

  justify-content: space-between;

  div {
    flex: 1;
  }
  .profile {
    display: flex;
    justify-content: flex-end;
  }
  .search {
    display: flex;
    justify-content: center;
  }
`;
const Navbar = () => {
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('isOrg');
  };
  const onSearch = (value) => console.log(value);

  return (
    <StyledNavbar>
      <div className="search">
        <Search
          style={{ width: '250px' }}
          placeholder="input search text"
          onSearch={onSearch}
          allowClear
          size="large"
          enterButton
        />
      </div>
      {localStorage.getItem('username') ? (
        <>
          <div className="profile">{localStorage.getItem('username')}</div>
          <Button onClick={() => logout()}>Выйти</Button>
        </>
      ) : (
        <Link to={{ pathname: '/login' }}>Войти</Link>
      )}
    </StyledNavbar>
  );
};

export default Navbar;
