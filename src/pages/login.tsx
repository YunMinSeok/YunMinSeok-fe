import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import React, { useState } from 'react';
import styled from 'styled-components';
//util
import { idValid, pwdValid } from '../utilities/valid';
import { setUser } from '../../modules/slice/users';
import { getCookie, setCookie } from '../utilities/cookies';
import { toggleLoginButton } from '../utilities/loginButton';
import { LoginInputType } from '../types/login';
//api
import { apiEmailLogin } from '../lib/user/user';
import { useDispatch } from 'react-redux';

const LoginPage: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isError, setIsError] = useState<LoginInputType[]>([
    { type: 'id', value: null },
    { type: 'pwd', value: null },
  ]);

  //아이디 , 비밀번호 state
  const [idValue, setIdValue] = useState<string>('');
  const [pwdValue, setPwdValue] = useState<string>('');
  //로그인 버튼 state
  const [isLoginAble, setIsLoginAble] = useState<boolean>(false);

  //로그인 로직 && loading
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>();
  const handleLogin = async () => {
    try {
      if (isLoginLoading) {
        return;
      }
      if (getCookie('userId')) {
        alert('로그아웃 후 진행해 주세요.');
        return;
      }
      setIsLoginLoading(true);
      const loginResult = await apiEmailLogin(idValue, pwdValue);
      if (loginResult) {
        dispatch(setUser(loginResult.user));
        setCookie('acessToken', loginResult.acessToken);
        setCookie('userId', loginResult.user.ID);
        router.push('/');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoginLoading(false);
    }
  };

  return (
    <>
      <Form>
        <FormWrap>
          <FormTitle>아이디</FormTitle>
          <TextInput
            data-testid={'loginId'}
            type='text'
            error={isError[0]['value'] === null ? false : isError[0]['value']}
            value={idValue}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setIdValue(e.currentTarget.value);
              if (e.currentTarget.value.length > 0) {
                const validResult = idValid(e.currentTarget.value);
                const isButton = toggleLoginButton('id', validResult, isError);
                setIsLoginAble(isButton);
              }
            }}
          />
          {isError[0]['value'] === true && (
            <ErrorMessage>올바른 아이디 형식으로 입력해주세요.</ErrorMessage>
          )}
        </FormWrap>
        <FormWrap>
          <FormTitle>비밀번호</FormTitle>
          <TextInput
            data-testid={'loginPw'}
            type='password'
            error={isError[1]['value'] === null ? false : isError[1]['value']}
            value={pwdValue}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setPwdValue(e.currentTarget.value);
              if (e.currentTarget.value.length > 0) {
                const validResult = pwdValid(e.currentTarget.value);
                const isButton = toggleLoginButton('pwd', validResult, isError);
                setIsLoginAble(isButton);
              }
            }}
          />
          {isError[1]['value'] === true && (
            <ErrorMessage>올바른 비밀번호 형식으로 입력해주세요.</ErrorMessage>
          )}
        </FormWrap>
        <LoginButton disabled={!isLoginAble} onClick={handleLogin}>
          로그인
        </LoginButton>
      </Form>
    </>
  );
};

export default LoginPage;

const Form = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding: 0 20px 40px;
`;

const FormWrap = styled.div`
  margin: 8px 0;
`;

const FormTitle = styled.div`
  font-weight: 700;
  font-size: 13px;
  color: #6c6c7d;
`;

type TextInputType = {
  error: boolean;
};

const TextInput = styled.input<TextInputType>`
  width: 100%;
  margin-top: 8px;
  padding: 16px;
  background: ${({ error }) => (error ? '#FDEDEE' : `#F7F7FA`)};
  border-radius: 12px;
`;

const ErrorMessage = styled.div`
  margin-top: 8px;
  font-weight: 400;
  font-size: 13px;
  color: #ed4e5c;
`;

const LoginButton = styled.button`
  margin-top: 40px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;
  cursor: pointer;
  &:disabled {
    background-color: #e2e2ea;
  }
`;
