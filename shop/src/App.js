import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
// div 내부 스타일에 이미지를 넣는 방법
// import bg from './main.jpg'

// 외부 파일에서 데이터 가져오기
// import 커스텀이름 from '파일경로'
import data from './data.js'; // 상품 데이터 가져오기 / .js는 생략가능

// 라우팅
import { Route, Routes } from 'react-router-dom';

// 컴포넌트 import
import Detail from './routes/Detail.js';

// 서버에서 데이터 가져오기(새로고침 없이 가져오기 가능)
import axios from 'axios';

// 장바구니
import Cart from './routes/Cart.js';

import { useEffect } from 'react'; // useEffect : 컴포넌트가 mount될 때, update될 때 실행

// Context API 사용
import React from 'react';
export let Context1 = React.createContext(); // state 보관함

function App() {

  // 로컬 스토리지에 객체 자료 저장
  // let obj = { name: '홍길동', age: 25 };
  // localStorage.setItem('obj', JSON.stringify(obj)); // JSON.stringify() : 객체를 문자열로 변환
  // let obj2 = JSON.parse(localStorage.getItem('obj')); // JSON.parse() : 문자열을 객체로 변환
  // console.log(obj2);

  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify([])); // 로컬스토리지에 watched라는 이름으로 빈 배열 저장  
  }, []);

  // 상품 데이터 저장 : 서버에서 가져온 데이터를 state에 저장
  // 상품 데이터 추가 저장 : setShoes로 추가
  let [shoes, setShoes] = useState(data);

  // 라우터 : 페이지 이동
  let navigate = useNavigate();

  // Context API 사용 - 재고 데이터 저장
  let [stock, setStock] = useState([10, 11, 12]);

  // 서버에서 데이터 가져오기
  // axios.get('https://codingapple1.github.io/userdata.json').then((result) => {
  //   console.log(result.data);
  // });

  // react-query로 유저정보 가져오기
  let result = useQuery('작명', () =>
    axios.get('https://codingapple1.github.io/userdata.json').then((res) =>{
      return res.data;
  })
  );

  return (
    <div className="App">
      {/* 상단바 */}
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">SweatHouse</Navbar.Brand>
          <Nav className="me-auto">
            { result.isLoading ? <div>로딩중...</div> : <div>{result.data.name}</div> }
            { result.error && '에러남' }
            { result.data && result.data.name }
            {/* navigate('-1') : 뒤로가기 */}
            <Nav.Link onClick={() => { navigate('/'); }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/cart'); }}>Cart</Nav.Link>
            <Nav.Link onClick={() => { navigate('/about'); }}>About</Nav.Link>
            <Nav.Link onClick={() => { navigate('/event'); }}>Event</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* 페이지 이동 */}
      {/* <Link to='/'>홈</Link> */}
      {/* <Link to='/detail'>상세페이지</Link> */}

      <Routes>
        <Route path="/" element={
          <>
            {/* 메인 배경 */}
            <div className="main-bg"></div>

            {/* 화면 3등분.. HOME에서만 뜨게 하려면 Route 안에 해당 태그 넣기 */}
            <div className="container">
              <div className="row">
                {/* 카드 컴포넌트 반복 */}
                {shoes.map((a, i) => {
                  return (
                    // App(부모) -> Card(자식) 이렇게 props 전송
                    <Card shoes={shoes[i]} i={i + 1} key={i}></Card>
                  );
                })}
              </div>
            </div>
            <button onClick={() => {
              // 서버에서 데이터 가져오기 (GET 요청)
              axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((data) => {
                  console.log(data);
                  let copy = [...shoes, ...data.data]; // 기존 데이터에 추가로 서버에서 가져온 데이터 추가
                  setShoes(copy);
                })
                .catch(() => {
                  console.log('데이터 로드 실패');
                });

              // axios.post() - POST 요청 예시
            }}>더보기</button>
          </>
        } />
        {/* 상세페이지 -> shoes 데이터 props 전달 */}
        {/* url 파라미터 ":id" : 페이지 여러 개 만들기 */}
        <Route path="/detail/:id" element={
          <Context1.Provider value={{ stock, setStock }}>
            <Detail shoes={shoes} />
          </Context1.Provider>
        } />
        <Route path="/about" element={<About />} >
          {/* Nested routes : 라우터 안의 라우터 */}
          <Route path="member" element={<div>멤버</div>} />
          <Route path="location" element={<div>위치</div>} />
        </Route>
        <Route path="/event" element={<Event />}>
          <Route path="one" element={<p>첫 주문 시 양배추즙 제공</p>} />
          <Route path="two" element={<p>생일 기념 쿠폰 받기</p>} />
        </Route>
        <Route path="*" element={<div>앗! 페이지가 없어요</div>} />
        {/* 장바구니 : redux */}
        <Route path="/cart" element={<Cart />} />
      </Routes>
      
    </div>
  );
}

// 어바웃 페이지
function About() {
  return (
    <div>
      <h4>어바웃 페이지</h4>
      <div>
        <Link to='/about/member'>회사 멤버</Link> |
        <Link to='/about/location'>회사 위치</Link>
      </div>
      {/* Outlet: Nested routes를 화면에 보여주는 위치 */}
      <Outlet></Outlet>
    </div>
  );
}

// 이벤트 페이지
function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <div>
        <Link to='/event/one'>첫 주문 이벤트</Link> |
        <Link to='/event/two'>생일 이벤트</Link>
      </div>
      <Outlet></Outlet>
    </div>
  );
}

// 카드 컴포넌트 만들기
function Card(props) {
  return (
    <div className="col-md-4">
      {/* 이미지 경로를 process.env.PUBLIC_URL로 설정하면 배포 시에도 이미지가 제대로 나옵니다 */}
      {/* <img src={process.env.PUBLIC_URL + '/logo192.png'} /> */}
      <img src={'https://codingapple1.github.io/shop/shoes' + props.i + '.jpg'} width="80%" alt='shoes' />
      {/* props.shoes로 데이터 받기 */}
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  );
}

export default App;
