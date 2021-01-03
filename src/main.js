// 6. loadItems function 만들기
// Fetch the items from the JSON file
function loadItems() {
  // data를 받아올 간단한 방법은 fetch를 활용
  return (
    fetch("data/data.json") // fetch가 성공적으로 데이터를 가져오면 response라는 object를 전달한다.
      // response.json() => data.json에서 받아온 response object이 있는 json이라는 api를 활용하여 response body를 json의 object로 변환 (쉽게 말해 response를 JSON으로 변환)
      .then((response) => response.json())
      // json안에 있는 items로 최종변화값 불러오는것으로 마무리!
      .then((json) => json.items)
  );
}

// 함수는 items라는 인자를 받아와서 html요소로 변환해서 페이지에 표기가 되게 만들면 된다.
// Update the list with the given items
function displayItems(items) {
  // 부모 컨테이너안에 데이터를 추가해야한다. 컨테이너 요소 먼저 정의
  const container = document.querySelector(".items");

  // 위의 querySelector로 받아온 items data 배열을 map을 이용해 html요소로 변환 (html li tag로 변환)
  // 문자열의 배열을 한가지의 문자열로 병합하기위해 쓸 수 있는것은 join이라는 api
  container.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

// string template (``)을 활용해서 문자열을 활용 => 이미지나, 타입등을 ${}사용해서 활용하기 좋다.
// Create HTML list item from the given data item
function createHTMLString(item) {
  return `
  <li class="item">
    <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
    <span class="item__description">${item.gender}, ${item.size}</span>
  </li>
  `;
}

// 0. 이런식으로 크게 전략을 설정해두고 시작해야한다.
// 1. data.json에 있는 데이터를 읽어와서 아이템을 전달할 함수를 만들고
// data.json을 불러올때 시간이 걸리니깐 promise를 활용

// Main
loadItems()
  // 2. data.json을 성공적으로 받아오면
  .then((items) => {
    console.log(items);
    // 4. displayItems라는 함수를 이용해서 items를 web items창에 보여줄 함수를 만들고
    displayItems(items);
    //5. items를 받아왔을때 버튼을 클릭할 경우 filtering을 할때 사용할 함수를 만들어놓고
    setEventListenrs(items);
  })
  // 3. data.json을 못가져오는 경우
  .catch(console.log);
