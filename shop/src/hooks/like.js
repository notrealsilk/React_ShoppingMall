import { useState } from 'react';

// 커스텀 훅은 use로 시작
export function useLike(){
  let [like, setLike] = useState(0);
  function addLike(){
    setLike(a=>a+1);
  }
  // useLike() 안에 있는 변수 반환해야 함수바깥에서도 변수 사용가능
  return [like, addLike];
}