import { useState,useTransition, useDeferredValue } from "react";

let a = new Array(500).fill(0)

function  Practice() {
  let [name, setName] = useState('');
  let [ isPending, startTransition] = useTransition()
  // 파라미터 name은 나중에 실행... 느린 컴포넌트 성능 향상
  let state = useDeferredValue(name);
  
  return (
    <div>
      <input onChange={(e)=>{
        // startTransition()안에 있는 코드를 나중에 실행 -> 실행 시점 조절로 성능향상
        startTransition(() => {
          setName(e.target.value)
        })
      }}></input>
      <h3>{name}</h3>
      {
        isPending ? '로딩중' :
        a.map(()=>{
          return <div>{state}</div>
        })
      }
    </div>
  );
}

export default Practice;