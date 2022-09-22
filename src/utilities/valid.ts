export function idValid(idValue: string) {
  const regId = /^[A-Za-z0-9]{5,30}$/;

  return regId.test(idValue);
}

export function pwdValid(pwdValue: string) {
  const regPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{8,30}$/g;

  return regPwd.test(pwdValue);
}
