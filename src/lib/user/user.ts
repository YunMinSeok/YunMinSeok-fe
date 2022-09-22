import { customAxios } from '../serverController';

//이메일 로그인 api
export const apiEmailLogin = async (userId: string, userPw: string) => {
  try {
    const loginResult = await customAxios.post('login', { id: userId, password: userPw });

    if (loginResult.status !== 200) {
      return;
    }

    if (!loginResult.data.data) {
      return;
    }

    return loginResult.data.data;
  } catch (e) {
    console.error(e);
  }
};

export const apiGetUserInfo = async (userId: string) => {
  try {
    const userResult = await customAxios.get(`users/${userId}`);
    if (userResult.status !== 200) {
      return;
    }

    if (!userResult.data.data) {
      return;
    }

    return userResult.data.data;
  } catch (e) {
    console.error(e);
  }
};
