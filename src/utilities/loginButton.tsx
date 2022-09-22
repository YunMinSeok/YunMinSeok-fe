import { LoginInputType } from '../types/login';

export const toggleLoginButton = (
  type: string,
  validResult: boolean,
  isError: LoginInputType[]
) => {
  //버튼
  isError.filter((errorState) => {
    if (errorState['type'] === type) {
      errorState['value'] = !validResult;
    }
  });
  //버튼 on/off 로직
  const isButtonAble = isError.every((errorObj) => {
    if (errorObj['value'] === false) {
      return true;
    }
  });
  return isButtonAble;
};
