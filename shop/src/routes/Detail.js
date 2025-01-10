import { useParams } from "react-router-dom";

function Detail(props) {

  let { id } = useParams(); // URL 파라미터 가져오기
  let shoes = props.shoes.find(function(x) {
    return x.id === parseInt(id); // 문자열을 숫자로 변환하여 비교
  });

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img src={`https://codingapple1.github.io/shop/shoes${shoes.id}.jpg`} width="100%" alt="shoes"/>
          </div>
          <div className="col-md-6 mt-4">
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