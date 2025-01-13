import { createSlice } from '@reduxjs/toolkit'

// createSlice는 반드시 name, initialState, (reducers-> stat값 변경하는 함수) 속성을 포함
let user = createSlice({
  name: 'user',
  initialState: {name: 'kim', age:20},
  // 1. state값 변경하는 함수
  reducers: {
    changeName(state){
      // state.name = 'park' // 직접적 수정 가능
      return {name: 'park', age:26}
    },
    increase(state, i){
      state.age +=i.payload // payload : action의 데이터 부분(화물)
    },
  },
})

// 2. state값 변경하는 함수를 export
export let { changeName, increase } = user.actions // actions : state 변경함수

export default user