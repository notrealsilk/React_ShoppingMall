import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap'
import { useNavigate, Outlet, Link } from 'react-router-dom';
// div 내부 스타일에 이미지를 넣는 방법
// import bg from './main.jpg'

// // 외부 파일에서 데이터 가져오기
import data from './data.js'; // 상품 데이터 가져오기 / .js는 생략가능
// import 커스텀이름 from '파일경로'
// import {data} from './data.js'; // 변수 data를 가져오기

// 라우팅
import {Route, Routes} from 'react-router-dom';

import Detail from './routes/Detail.js';

function App() {

  // 상품 데이터 저장 : 서버에서 가져온 데이터를 state에 저장
  let [shoes] = useState(data)
  // console.log(shoes[0].title);

  // 라우터 : 페이지 이동
  let navigate = useNavigate();
 
  return (
    <div className="App">
      {/* 상단바 */}
      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="/">SweatHouse</Navbar.Brand>
          <Nav className="me-auto">
            {/* { navigate('-1') : 뒤로가기*/}
            <Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/detail') }}>Detail</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/about') }}>About</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/event') }}>Evnet</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* 페이지 이동
      <Link to='/'>홈</Link>
      <Link to='/detail'>상세페이지</Link> */}

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
                  /* App(부모) -> Card(자식) 이렇게 props 전송 */
                  <Card shoes={shoes[i]} i={i + 1} key={i}></Card>
                );
              })}
            </div>
          </div>
        </>
      } />
        {/* 상세페이지 -> shoes 데이터 props */}
        {/* url 파라미터 ":id" : 페이지 여러개 만들기*/}
        <Route path="/detail/:id" element={<Detail shoes={shoes}/>} />
        <Route path="/about" element={<About/>} >
        {/* Nested routes : 라우터 안의 라우터 */}
          <Route path="member" element={<div>멤버</div>} />
          <Route path="location" element={<div>위치</div>} />
        </Route>
        <Route path="/event" element={<Event/>}>
          <Route path="one" element={<p>첫 주문시 양배추즙 제공</p>} />
          <Route path="two" element={<p>생일기념 쿠폰받기</p>} />
        </Route>
        <Route path="*" element={<div>앗! 페이지가 없어요</div>} />
      </Routes>
    </div>
  );
}

function About(){
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
)
}

function Event(){
  return (
      <div>
        <h4>오늘의 이벤트</h4>
        <div>
          <Link to='/event/one'>첫 주문 이벤트</Link> | 
          <Link to='/event/two'>생일 이벤트</Link>
        </div>
        <Outlet></Outlet>
      </div>
  )}

// 카드 컴포넌트 만들기
function Card(props){
  return(
  <div className="col-md-4">
  {/* codingapple.com/어쩌구/ 경로에 배포가능 */}
  {/* <img src={process.env.PUBLIC_URL + '/logo192.png'} />  */}
  <img src={'https://codingapple1.github.io/shop/shoes' + props.i + '.jpg'} width="80%" alt='shoes'/>
  {/* props.shoes로 데이터 받기 */}
  <h4>{props.shoes.title}</h4>
  <p>{props.shoes.price}</p>
</div>
  )
}

export default App;
