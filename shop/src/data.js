// // 다른 파일로 저장된 데이터를 가져오기
// let a = 10;

// // 1. export로 데이터를 외부로 내보내기
// // export default a; // 변수 a를 외부로 내보내기
// export {a};

// // 1-1. 여러 데이터 내보내고 싶은 경우
// // export {a, b, c};

let data = [
    {
      id : 0,
      title : "White and Black",
      content : "Born in France",
      price : 120000
    },
  
    {
      id : 1,
      title : "Red Knit",
      content : "Born in Seoul",
      price : 110000
    },
  
    {
      id : 2,
      title : "Grey Yordan",
      content : "Born in the States",
      price : 130000
    } 
  ]

export default data; // 변수 data를 외부로 내보내기