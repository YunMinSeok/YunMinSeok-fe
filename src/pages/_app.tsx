import type { AppProps, AppContext as NextAppContext } from 'next/app';
import { Provider } from 'react-redux';
import store from '../../modules/store';
import styled from 'styled-components';

import setupMSW from '../api/setup';
import GlobalStyle from '../styles/GlobalStyle';
import Layout from '../components/Layout';
import cookies from 'next-cookies';
import { apiGetUserInfo } from '../lib/user/user';
setupMSW();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Background />
      <Content>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </Content>
    </Provider>
  );
}

MyApp.getInitialProps = async (context: NextAppContext) => {
  const { ctx, Component } = context;
  const { userId } = cookies(ctx);
  const userInfo = { ID: null, NAME: null };

  if (userId) {
    const getUserInfo = await apiGetUserInfo(userId);
    userInfo.ID = getUserInfo?.user.ID;
    userInfo.NAME = getUserInfo?.user.NAME;
  }

  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  pageProps = { ...pageProps, userInfo };

  return {
    pageProps,
  };
};

export default MyApp;

const Background = styled.div`
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: #f0f0f5;
`;

const Content = styled.div`
  width: 420px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #fff;
`;
