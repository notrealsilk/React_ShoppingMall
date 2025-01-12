import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Nav } from 'react-bootstrap';

import { Context1 } from '../App'; // 재고 저장된 보관함 가져오기

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
  // useContext() : 보관함 해체
  let {stock} = useContext(Context1); // Context API 사용

  // useEffect : 컴포넌트가 mount될 때, update될 때 실행
  // html 렌더링 후, useEffect안 코드 실행 됨
  // useEffect안 코드 : 어려운 연산, 서버에서 데이터 가져오는 작업, 타이머 등
  useEffect(() => {
    console.log('mount될 때 실행');
    console.log('재고:', stock); // stock 값을 출력하여 사용
  }, [stock]);  // 의존성 배열에 stock 추가하여 경고 해결

  // 2초 뒤 실행
  useEffect(() => {
    setTimeout(() => {
      console.log('2초 뒤 실행');
    }, 2000);
  }, []);

  // 컴포넌트 로드시, 투명도 0 -> 1로 변경
  let [fade2, setFade2] = useState('')

  useEffect(()=>{
    setFade2('end')
    return ()=>{
      setFade2('')
    }
  },[])

  // 상태 변수 정의
  let [count, setCount] = useState(0);       // 버튼 클릭 카운트 상태
  let [showAlert, setShowAlert] = useState(true);  // 경고창 표시 여부 상태
  let [inputValue, setInputValue] = useState('');  // 입력값 상태
  let [tab, setTab] = useState(0);           // 탭 상태 (현재 활성화된 탭)

  // 2초 후 경고창을 숨기기 위한 타이머 설정
  useEffect(() => {
    let timer = setTimeout(() => {
      setShowAlert(false);
    }, 2000);

    // useEffect cleanup 함수: 타이머를 제거하여 메모리 누수를 방지
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // 잘못된 값 (숫자가 아닌 값) 입력 시 경고창 띄우기
  useEffect(() => {
    if (isNaN(inputValue)) {
      alert('그러지마세요');  // 브라우저 내장 함수 alert 호출
    }
  }, [inputValue]);  // inputValue 상태가 변경될 때마다 실행

  // URL 파라미터 가져오기
  let { id } = useParams();  // URL에서 id 값 추출
  let shoes = props.shoes.find(function (x) {
    return x.id === parseInt(id);  // 문자열을 숫자로 변환하여 비교
  });

  // 컴포넌트 렌더링
  return (
    <div>
      <div className={'container start ' + fade2}>
        {/* 경고창 표시 */}
        {showAlert && (
          <div className="alert alert-warning">
            2초 이내 구매 시 할인
          </div>
        )}
        {/* 카운터 버튼 */}
        {count}
        <button onClick={() => { setCount(count + 1); }}>버튼</button>

        {/* 상품 정보 */}
        <div className="row">
          <div className="col-md-6">
            <img src={`https://codingapple1.github.io/shop/shoes${shoes.id}.jpg`} width="100%" alt="shoes" />
          </div>
          <div className="col-md-6 mt-4">
            <input onChange={(e) => { setInputValue(e.target.value); }} />
            <h4 className="pt-5">{shoes.title}</h4>
            <p>{shoes.content}</p>
            <p>{shoes.price}원</p>
            <button className="btn btn-danger">주문하기</button>
          </div>
        </div>

        {/* 탭 버튼 */}
        <Nav variant="tabs" defaultActiveKey="link0">
          <Nav.Item>
            <Nav.Link onClick={() => { setTab(0); }} eventKey="link0">버튼0</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => { setTab(1); }} eventKey="link1">버튼1</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => { setTab(2); }} eventKey="link2">버튼2</Nav.Link>
          </Nav.Item>
        </Nav>

        {/* 탭 콘텐츠 */}
        <TabContent shoes={props.shoes} tab={tab} />
      </div>
    </div>
  );
}

// 탭 상태에 따라 내용 변경 (조건문은 태그 안에서 사용불가.. so 밖에서 정의)
function TabContent({ tab, shoes }) {
  let [fade, setFade] = useState('');
  let {stock} = useContext(Context1) // context API로 재고값 받아오기

  // 리액트18은 state가 다 변경되면 렌더링
  useEffect(() => {
    setTimeout(() => {setFade('end')}, 100); // 0.1초 뒤에 실행
    return () => {
      setFade('')
    }
  }, [tab]);

  return (
    <div className={`start` + fade}>
      { [<div>{stock}</div>, <div>{shoes[0].title}</div>, <div>내용2</div>][tab] }
    </div>
  )
}

export default Detail;
