import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice'

// createSlice는 반드시 name, initialState, (reducers-> stat값 변경하는 함수) 속성을 포함

let cart = createSlice({
    name: 'stock',
    initialState: [
      { id: 0, name: 'White and Black', count: 2 },
      { id: 2, name: 'Grey Yordan', count: 1 },
    ],
    reducers : {
      addCount(state,actions){
        // state[actions.payload].count++
        let num =  state.findIndex((a)=>{ return a.id === actions.payload })
        state[num].count++
      },
      addItem(state,actions){
        state.push(actions.payload)
    }}
}) 

export let { addCount,addItem } = cart.actions


export default configureStore({
  reducer: {
    user: user.reducer,
    // 작명 : store의 변수이름.reducer
    cart: cart.reducer
   }
}) 