import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap'
// div 내부 스타일에 이미지를 넣는 방법
// import bg from './main.jpg'

// // 외부 파일에서 데이터 가져오기
import data from './data.js'; // 상품 데이터 가져오기 / .js는 생략가능
// import 커스텀이름 from '파일경로'
// import {data} from './data.js'; // 변수 data를 가져오기

// 라우팅
import {Link, Route, Routes} from 'react-router-dom';

function App() {

  // 상품 데이터 저장 : 서버에서 가져온 데이터를 state에 저장
  let [shoes] = useState(data)
  // console.log(shoes[0].title);
 
  return (
    <div className="App">
        {/* 상단바 */}
        {/* <div className="main-bg" style={{ backgroundImage : 'url(' + bg + ')' }}></div> */}
        <div className="main-bg">
        <Navbar bg="dark" variant="dark">
          <Container>
          <Navbar.Brand href="#home">SweatHouse</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          </Container>
        </Navbar>
      </div>

      {/* 페이지 이동 */}
      <Link to='/'>홈</Link>
      <Link to='/detail'>상세페이지</Link>

      <Routes>
        <Route path="/" element={

          /* 화면 3등분.. HOME에서만 뜨게하려면 route안에 해당 태그 넣기기 */
          <div className="container">
            <div className="row">
              {/* 카드 컴포넌트 반복  */}
              {/* 배열.map((요소(like 임시변수), 인덱스) */}
              {
                shoes.map((a,i)=>{
                  return (
                  /* App(부모) -> Card(자식) 이렇게 props 전송 */
                  <Card shoes={shoes[i]} i={i+1}></Card>
                )
                })
              }
            </div>
          </div> 
          } />

        <Route path="/detail" element={
          <h1>Detail</h1>
        } />
      </Routes>
    </div>
  );
}

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
