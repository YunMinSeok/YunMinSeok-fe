//쿠키 관련 함수
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

//쿠키 세팅
export const setCookie = (name: string, value: string, option?: object) => {
  return cookies.set(name, value, { ...option });
};

//쿠키 가져오기
export const getCookie = (name: string) => {
  return cookies.get(name);
};

//쿠키 삭제
export const removeCookie = (name: string) => {
  return cookies.remove(name);
};
