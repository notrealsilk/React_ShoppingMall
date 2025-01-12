import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

// styled-components : JS파일 안에 스타일 적용
// import styled from 'styled-components'

// let YellowBtn = styled.button`
//   // props로 재활용가능
//   background : ${props => props.bg};
//   color : ${props => props.bg == 'black' ? 'yellow' : 'black'};
//   padding : 10px;
// `;

// styled.button(YellowBtn) : styled-components로 버튼 스타일 적용


function Detail(props) {

  //useEffect : 컴포넌트가 mount될 때, update될 때 실행
  // html 렌더링 후, useEffect안 코드 실행 됨
  // useEffect안 코드 : 어려운 연산, 서버에서 데이터 가져오는 작업, 타이머 등
  useEffect(() => {
    console.log('mount될 때 실행');
  });

  setTimeout(() => {
    console.log('2초 뒤 실행');
  }, 2000);

  let [count, setCount] = useState(0);
  let [alert, setAlert] = useState(true);
  let [num, setNum] = useState('');

  useEffect(() => {
    let timer = setTimeout(() => {setAlert(false);}, 2000);
    return () => { 
      clearTimeout(timer) 
    } // useEffect() 실행 전, 기존 타이머 제거
  },[])

  // 잘못된 값(not 문자열) 입력하면 경고창
  const showAlert = useCallback(() => {
    alert('그러지마세요');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    if (isNaN(num) === true) {
      showAlert();
    }
  }, [num, showAlert]);

  let { id } = useParams(); // URL 파라미터 가져오기
  let shoes = props.shoes.find(function(x) {
    return x.id === parseInt(id); // 문자열을 숫자로 변환하여 비교
  });

  return (
    <div>
      <div className="container">
        {
          alert === true
          ? <div className="alert alert-warning">
              2초이내 구매시 할인
            </div>
          : null
        }
        {count}
        <button onClick={()=>{ setCount(count+1) }}>버튼</button>
        <div className="row">
          <div className="col-md-6">
            <img src={`https://codingapple1.github.io/shop/shoes${shoes.id}.jpg`} width="100%" alt="shoes"/>
          </div>
          <div className="col-md-6 mt-4">
          <input onChange={ (e) => { setNum(e.target.value) } } />
            <h4 className="pt-5">{shoes.title}</h4>
            <p>{shoes.content}</p>
            <p>{shoes.price}원</p>
            <button className="btn btn-danger">주문하기</button>
          </div>
        </div> 
      </div>
    </div>
  );
}

export default Detail;