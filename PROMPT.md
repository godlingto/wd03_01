# PROMPT.md — 프롬프트 진행 기록

> **작업 일시:** 2026년 5월 11일  
> **작업 목적:** GitHub REST API를 사용해 저장소를 검색하는 URL 생성 및 HTML 인터페이스 구현  
> **생성 파일:** `searchRepositories.js`, `index.html`

---

## 프로젝트 개요

GitHub REST API의 저장소 검색 엔드포인트를 활용하여:
1. 검색 URL을 올바르게 구성하는 방법을 학습
2. JavaScript `fetch()`로 API를 호출하는 코드 작성
3. 결과를 브라우저에서 확인할 수 있는 HTML 화면 구현

---

## 📌 프롬프트 1 — GitHub API 검색 URL 구성

### 사용자 요청

> GitHub REST API에서 저장소를 검색하는 요청 URL을 만들고 싶습니다.
>
> 조건:
> 1. 검색어는 사용자가 입력한 keyword를 사용합니다.
> 2. 저장소 검색 API를 사용합니다.
> 3. stars 기준으로 정렬합니다.
> 4. 내림차순으로 정렬합니다.
> 5. 결과는 6개만 가져옵니다.
> 6. fetch에서 사용할 수 있는 URL 문자열 예시를 보여주세요.

### 응답 요약

GitHub 저장소 검색 API URL 구조를 다음과 같이 안내함:

```
https://api.github.com/search/repositories?q={keyword}&sort=stars&order=desc&per_page=6
```

**파라미터 설명:**

| 파라미터 | 값 | 설명 |
|---|---|---|
| `q` | `{keyword}` | 사용자가 입력한 검색어 |
| `sort` | `stars` | stars 기준으로 정렬 |
| `order` | `desc` | 내림차순 정렬 |
| `per_page` | `6` | 결과 6개만 반환 |

**fetch 기본 사용 예시:**
```javascript
const keyword = "react";
const url = `https://api.github.com/search/repositories?q=${keyword}&sort=stars&order=desc&per_page=6`;

fetch(url)
  .then(response => response.json())
  .then(data => console.log(data));
```

---

## 📌 프롬프트 2 — Template Literal 방식으로 재작성

### 사용자 요청

> URL을 JavaScript 함수 안에서 사용할 수 있도록 template literal 방식으로 다시 작성해 주세요.
>
> 조건:
> 1. 검색어 변수 이름은 keyword로 고정해 주세요.
> 2. 검색어는 encodeURIComponent로 처리해 주세요.
> 3. 결과 개수는 6개로 제한해 주세요.
> 4. 초보자가 이해할 수 있도록 각 부분에 주석을 달아 주세요.

### 응답 요약

`buildSearchUrl(keyword)` 함수를 작성하고 `searchRepositories.js` 파일로 저장함.

**핵심 코드:**
```javascript
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
```

**코드 흐름:**
```
사용자 입력 (keyword)
    ↓
encodeURIComponent(keyword)  →  URL에 안전한 형태로 변환
    ↓
template literal로 URL 조립
    ↓
fetch(url)로 API 요청
    ↓
결과 데이터 (최대 6개의 저장소 정보)
```

> 💡 **template literal이란?**  
> 백틱(`` ` ``)으로 감싼 문자열로, `${변수명}` 형태를 사용하면 문자열 안에 변수를 바로 넣을 수 있습니다.

---

## 📌 프롬프트 3 — HTML 검색 화면 구현

### 사용자 요청

> 확인해 볼 수 있는 HTML 화면을 만들어 주세요.

### 응답 요약

`index.html` 파일을 생성하여 브라우저에서 바로 테스트할 수 있는 검색 UI를 구현함.

**구현된 화면 구성:**

| 요소 | 설명 |
|---|---|
| 검색 입력창 | 키워드를 입력하는 `<input>` 필드 |
| 검색 버튼 | 클릭 또는 Enter 키로 검색 실행 |
| 로딩 표시 | API 호출 중 `⏳ 검색 중...` 메시지 표시 |
| 에러 메시지 | 오류 발생 시 빨간 텍스트로 안내 |
| 결과 카드 | 저장소 이름(링크), 설명, ⭐ star 수, 언어 정보 |

**주요 JavaScript 로직:**
```javascript
function handleSearch() {
  const keyword = document.getElementById('keyword-input').value.trim();
  const url = buildSearchUrl(keyword);

  fetch(url)
    .then(response => response.json())
    .then(data => {
      data.items.forEach(repo => {
        // 카드 DOM 생성 및 화면에 추가
      });
    })
    .catch(error => {
      // 에러 메시지 표시
    });
}
```

---

## 📁 생성된 파일 목록

| 파일명 | 설명 |
|---|---|
| `searchRepositories.js` | `buildSearchUrl()` 함수 및 fetch 사용 예시 |
| `index.html` | GitHub 저장소 검색 UI (입력 → API 호출 → 카드 렌더링) |
| `PROMPT.md` | 프롬프트 진행 내용 기록 (현재 파일) |

---

## 🔗 참고

- GitHub REST API 공식 문서: https://docs.github.com/en/rest/search/search#search-repositories
- 검색 엔드포인트: `GET https://api.github.com/search/repositories`
