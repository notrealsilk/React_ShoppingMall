import { Table } from "react-bootstrap";
import { useSelector,useDispatch } from "react-redux";
import { increase } from "../store/userSlice";
import { addCount } from "../store";
import { useState,memo } from "react";

// 자식 컴포넌트 재렌더링 막기 : React.memo
// props가 변할 때만 재렌더링
// useMemo : 컴포넌트 렌더링시 1회만 실행해줌
let Child = memo(function() {
  console.log("Child 컴포넌트 렌더링됨");
  return <div>자식</div>;
})

function Cart() {
  // redux 사용
  let state = useSelector((state) => state); // redux의 state.stock을 가져옴
  let dispatch = useDispatch(); // redux의 dispatch를 가져옴
  let [count, setCount] = useState(0);

  return (
    <div>
      {/* 자식 컴포넌트에 count 상태 전달 */}
      <Child count={count}></Child>

      {/* 버튼 누르면 재렌더링 */}
      <button onClick={() => setCount(count + 1)}>재렌더링</button>

      <h4>
        {state.user.name} {state.user.age}장바구니
      </h4>
      <button onClick={() => dispatch(increase(10))}>+</button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        {/* map : 장바구니 목록 갯수에 맞게 태그들 생성 */}
        <tbody>
          {state.cart.map((a, i) => {
            return (
              <tr key={i}>
                <td>1</td>
                <td>{state.cart[i].name}</td>
                <td>{state.cart[i].count}</td>
                <td>
                  <button
                    onClick={() => {
                      // dispatch : action을 실행시키는 함수 (store.js에게 메세지 보냄.. 여기서 함수 실행 x)
                      dispatch(addCount(state.cart[i].id));
                    }}
                  >
                    +
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;