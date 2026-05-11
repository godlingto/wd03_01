// GitHub 저장소를 검색하는 URL을 만드는 함수
function buildSearchUrl(keyword) {

  // encodeURIComponent: 검색어에 특수문자나 공백이 있어도 URL에서 안전하게 사용할 수 있도록 변환
  // 예) "hello world" → "hello%20world"
  const encodedKeyword = encodeURIComponent(keyword);

  // template literal(``)을 사용해 변수를 URL 문자열에 삽입
  // q         : 검색어
  // sort      : 정렬 기준 (stars = 별점 수)
  // order     : 정렬 방향 (desc = 내림차순, 높은 것부터)
  // per_page  : 한 번에 가져올 결과 개수 (6개로 제한)
  const url = `https://api.github.com/search/repositories?q=${encodedKeyword}&sort=stars&order=desc&per_page=6`;

  return url;
}

// 함수 사용 예시
const keyword = "react"; // 사용자가 입력한 검색어
const searchUrl = buildSearchUrl(keyword);

console.log(searchUrl);
// 출력 예시:
// https://api.github.com/search/repositories?q=react&sort=stars&order=desc&per_page=6

// fetch를 사용해 실제 API 요청하기
fetch(searchUrl)
  .then(response => response.json()) // 응답을 JSON 형식으로 변환
  .then(data => console.log(data));  // 변환된 데이터를 콘솔에 출력
