import Link from 'next/link';
import type { NextPage } from 'next';
import React, { useState } from 'react';
import styled from 'styled-components';

const LoginPage: NextPage = () => {
  //아이디 , 비밀번호 state
  const [idValue, setIdValue] = useState<string>('');
  const [pwdValue, setPwdValue] = useState<string>('');
  return (
    <>
      <Form>
        <div>아이디</div>
        <TextInput type='text' />
        <div>비밀번호</div>
        <TextInput type='password' />
        <LoginButton disabled>로그인</LoginButton>
      </Form>
    </>
  );
};

export default LoginPage;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding: 0 20px 40px;
`;

const TextInput = styled.input`
  border: 1px solid #000;
`;

const LoginButton = styled.button`
  margin-top: 40px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;

  &:disabled {
    background-color: #e2e2ea;
  }
`;
