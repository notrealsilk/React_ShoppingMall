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

function App() {

  // 상품 데이터 저장 : 서버에서 가져온 데이터를 state에 저장
  let [shoes] = useState(data)
  console.log(shoes[0].title);
 
  return (
    <div className="App">
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

      {/* 화면 3등분 */}
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            {/* codingapple.com/어쩌구/ 경로에 배포가능 */}
          {/* <img src={process.env.PUBLIC_URL + '/logo192.png'} />  */}
            <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="80%" alt='shoes1'/>
            <h4>{shoes[0].title}</h4>
            <p>{shoes[0].price}</p>
          </div>
          <div className="col-md-4">
          <img src="https://codingapple1.github.io/shop/shoes2.jpg" width="80%" alt='shoes2'/>
            <h4>상품명</h4>
            <p>상품소개</p>
          </div>
          <div className="col-md-4">
          <img src="https://codingapple1.github.io/shop/shoes3.jpg" width="80%" alt='shoes3'/>
            <h4>상품명</h4>
            <p>상품소개</p>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default App;
