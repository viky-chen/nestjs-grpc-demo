import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
interface InitialState {
  count: number;
}

const initialState: InitialState = {
  count: 0,
};

interface PromiseNum {
  number: number;
}

const promise_one: Promise<PromiseNum> = new Promise((res, rej) => {
  setTimeout(() => {
    res({ number: 10 });
  }, 3000);
});

// 异步Action
export const getAsyncInfo = createAsyncThunk("getAsyncInfo", async () => {
  const data = await promise_one;
  return data;
});

export const companySlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    add: (state) => {
      state.count += 1;
    },
    minus: (state) => {
      state.count -= 1;
    },
  },
  extraReducers: (builder) => {
    // 进行请求阶段的一些操作
    builder.addCase(getAsyncInfo.pending, () => {
      console.log("进行中");
    });
    builder.addCase(getAsyncInfo.fulfilled, (state, action) => {
      //   console.log("action.payload: ", action.payload); //{number:"10"}
      //   console.log("state: ", state.text); //我是文字
      //   state.count += action.payload.number;
      //   console.log("成功");
    });
    builder.addCase(getAsyncInfo.rejected, () => {
      console.log("失败");
    });
  },
});

export const { add, minus } = companySlice.actions;
export default companySlice.reducer;
