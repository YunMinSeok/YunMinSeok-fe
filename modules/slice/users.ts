import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserInfo {
  userData: {
    ID: string | null;
    NAME: string | null;
  };
}

const initialState: UserInfo = {
  userData: {
    ID: null,
    NAME: null,
  },
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInfo['userData']>) => {
      const { ID, NAME } = action.payload;
      state.userData = { ID: ID, NAME: NAME };
    },
  },
});

const { actions, reducer } = usersSlice;
export const { setUser } = actions;

export default reducer;
