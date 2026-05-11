# PROMPT.md — 프롬프트 진행 기록

> **작업 일시:** 2026년 5월 11일  
> **작업 목적:** GitHub REST API를 사용해 저장소를 검색하는 URL 생성 및 HTML 인터페이스 구현  
> **생성 파일:** `searchRepositories.js`, `index.html`, `style.css`, `app.js`, `PROMPT.md`

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

## 📌 프롬프트 4 — HTML/CSS/JS 파일 분리 구조로 재작성

### 사용자 요청

> 순수 HTML/CSS/JavaScript로 GitHub Repository Search Board 앱의 기본 HTML 구조를 작성해 주세요.
>
> 조건:
> 1. 검색어 입력창이 있어야 합니다.
> 2. 검색 버튼이 있어야 합니다.
> 3. 상태 메시지 영역이 있어야 합니다.
> 4. 저장소 카드 목록을 보여줄 영역이 있어야 합니다.
> 5. JavaScript에서 선택하기 쉽도록 id를 명확히 붙여 주세요.
> 6. CSS는 style.css, JavaScript는 app.js로 분리해 주세요.

### 응답 요약

3개 파일로 역할을 분리하여 재구성함.

**파일 역할 분리:**

| 파일 | 역할 |
|---|---|
| `index.html` | HTML 구조 전담 — `style.css`, `app.js` 연결 |
| `style.css` | 모든 스타일 전담 |
| `app.js` | 모든 JavaScript 로직 전담 |

**`index.html` 주요 id 구성:**

| id | 요소 | 역할 |
|---|---|---|
| `search-input` | `<input>` | 검색어 입력창 |
| `search-btn` | `<button>` | 검색 버튼 |
| `status-message` | `<p>` | 로딩 / 에러 / 안내 메시지 |
| `repo-list` | `<div>` | 저장소 카드 목록 렌더링 영역 |

**`app.js` 주요 함수:**

| 함수 | 역할 |
|---|---|
| `buildSearchUrl(keyword)` | template literal로 API URL 생성 |
| `setStatus(message, type)` | 상태 메시지 표시 및 에러 색상 전환 |
| `createRepoCard(repo)` | 저장소 카드 DOM 생성 |
| `handleSearch()` | 검색 실행 (로딩 → fetch → 카드 렌더링) |

---

## 📌 프롬프트 5 — id 네이밍 통일 (camelCase)

### 사용자 요청

> 결과 목록 영역의 id를 repoList로 고정하고, 상태 메시지 영역의 id를 statusMessage로 고정해서 다시 작성해 주세요.
>
> 추가 조건:
> 1. 입력창 id는 searchInput으로 해 주세요.
> 2. 버튼 id는 searchButton으로 해 주세요.
> 3. JavaScript에서 선택하기 쉽게 구조를 단순하게 유지해 주세요.

### 응답 요약

`index.html`, `style.css`, `app.js` 3개 파일의 id를 kebab-case에서 camelCase로 통일함.

**변경된 id 목록:**

| 변경 전 | 변경 후 | 해당 요소 |
|---|---|---|
| `search-input` | `searchInput` | 검색어 입력창 |
| `search-btn` | `searchButton` | 검색 버튼 |
| `status-message` | `statusMessage` | 상태 메시지 영역 |
| `repo-list` | `repoList` | 카드 목록 영역 |

**수정된 파일:**
- `index.html` — `id` 속성값 4개 변경
- `style.css` — id 셀렉터(`#searchInput`, `#searchButton`, `#statusMessage`, `#repoList`) 변경
- `app.js` — `getElementById()` 인자 4개 변경

---

## 📌 프롬프트 6 — 다크 모드 CSS 디자인

### 사용자 요청

> GitHub Repository Search Board 앱의 CSS를 작성해 주세요.
>
> 조건:
> 1. Bootstrap 느낌의 흰색 프로필 UI로 만들지 않습니다.
> 2. 다크 모드 기반의 검색 보드 느낌으로 디자인합니다.
> 3. 검색창과 버튼은 상단에 배치합니다.
> 4. 저장소 카드는 그리드 형태로 배치합니다.
> 5. 모바일에서는 1열, 태블릿에서는 2열, 데스크톱에서는 3열로 보이게 합니다.
> 6. 초보자가 이해할 수 있도록 CSS 주석을 달아 주세요.

### 응답 요약

`style.css`를 GitHub 다크 모드 스타일로 전면 재작성함.

**색상 변수 (`:root`):**

| 변수 | 값 | 용도 |
|---|---|---|
| `--bg-page` | `#0d1117` | 페이지 배경 |
| `--bg-card` | `#161b22` | 카드 배경 |
| `--border` | `#30363d` | 테두리 |
| `--text-main` | `#e6edf3` | 기본 텍스트 |
| `--text-sub` | `#8b949e` | 보조 텍스트 |
| `--accent` | `#58a6ff` | 강조색 (링크, 포커스) |
| `--btn-bg` | `#238636` | 검색 버튼 배경 |

**반응형 그리드:**

| 화면 크기 | 열 수 | 미디어 쿼리 |
|---|---|---|
| 모바일 (기본) | 1열 | 기본값 |
| 태블릿 | 2열 | `@media (min-width: 600px)` |
| 데스크톱 | 3열 | `@media (min-width: 960px)` |

---

## 📌 프롬프트 7 — 검색 결과 6개 초과 버그 수정

### 사용자 요청

> 검색결과 6개 이상 출력이 되는데 확인해보세요.

### 원인 분석

`Enter` 키 이벤트 리스너가 버튼의 `disabled` 상태를 확인하지 않아 검색이 **중복 실행**되는 버그.

**버그 시나리오:**
1. Enter 키 → `handleSearch()` 실행 → `searchBtn.disabled = true`
2. API 응답 대기 중 Enter 키를 다시 누름
3. `disabled` 체크 없이 `handleSearch()` 재실행 → `repoList.innerHTML = ''` 후 두 번째 fetch 시작
4. 첫 번째 fetch 완료 → 6개 카드 추가
5. 두 번째 fetch 완료 → 6개 카드 추가 → **총 12개 표시**

### 수정 내용

`app.js` — Enter 키 이벤트에 `!searchBtn.disabled` 조건 추가

```javascript
// 수정 전
searchInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    handleSearch();
  }
});

// 수정 후
searchInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && !searchBtn.disabled) {  // ← disabled 체크 추가
    handleSearch();
  }
});
```

---

## 📌 프롬프트 8 — 버튼 클릭 시 입력값 읽기 (기초 학습)

### 사용자 요청

> 순수 JavaScript로 검색 버튼 클릭 시 입력창의 값을 읽는 코드를 작성해 주세요.
>
> 조건:
> 1. input의 id는 searchInput입니다.
> 2. button의 id는 searchButton입니다.
> 3. 상태 메시지 영역의 id는 statusMessage입니다.
> 4. 입력값 앞뒤 공백을 제거합니다.
> 5. 입력값이 비어 있으면 상태 메시지에 "검색어를 입력해 주세요."라고 표시합니다.
> 6. 입력값이 있으면 console.log로 검색어를 출력합니다.
> 7. 초보자가 이해할 수 있도록 주석을 달아 주세요.

### 응답 요약

현재 `app.js`의 `handleSearch()` 함수에 이미 동일한 로직이 포함되어 있음. 핵심 패턴을 분리하여 설명함.

**핵심 코드 패턴:**
```javascript
// ① 버튼과 입력창, 상태 메시지 요소를 id로 가져옵니다.
const searchButton  = document.getElementById('searchButton');
const searchInput   = document.getElementById('searchInput');
const statusMessage = document.getElementById('statusMessage');

// ② 버튼 클릭 이벤트를 등록합니다.
searchButton.addEventListener('click', function () {

  // ③ 입력창의 값을 읽고, 앞뒤 공백을 제거합니다.
  const keyword = searchInput.value.trim();

  // ④ 입력값이 비어 있는지 확인합니다.
  if (keyword === '') {
    statusMessage.textContent = '검색어를 입력해 주세요.';
  } else {
    statusMessage.textContent = '';
    console.log('검색어:', keyword);
  }
});
```

**포인트 정리:**

| 코드 | 역할 |
|---|---|
| `getElementById('id명')` | HTML 요소를 JavaScript로 가져오기 |
| `.value` | `<input>`에 입력된 텍스트 값 |
| `.trim()` | 문자열 앞뒤 공백 제거 |
| `.textContent` | 요소 안의 텍스트를 읽거나 변경 |
| `addEventListener('click', fn)` | 클릭 시 함수 실행 등록 |

---

## 📌 프롬프트 9 — Enter 키 검색 실행 보완

### 사용자 요청

> Enter 키를 눌렀을 때도 검색이 실행되도록 코드를 보완해 주세요.
>
> 조건:
> 1. 기존 검색 버튼 클릭 기능은 유지합니다.
> 2. 입력창에서 Enter 키를 누르면 같은 검색 함수가 실행되게 합니다.
> 3. 중복 코드를 줄이기 위해 handleSearch 함수를 분리해 주세요.
> 4. 초보자가 이해할 수 있도록 주석을 달아 주세요.

### 응답 요약

현재 `app.js`에 이미 모든 조건이 구현되어 있음을 확인함. 추가 수정 없음.

**조건 충족 확인:**

| 조건 | 코드 | 상태 |
|---|---|---|
| 버튼 클릭 기능 유지 | `searchBtn.addEventListener('click', handleSearch)` | ✅ |
| Enter 키로 같은 함수 실행 | `if (e.key === 'Enter' && !searchBtn.disabled) handleSearch()` | ✅ |
| `handleSearch` 함수 분리 | `function handleSearch() { ... }` 별도 선언 | ✅ |
| 초보자용 주석 | 각 블록에 한국어 주석 포함 | ✅ |

**관련 코드 (`app.js`):**
```javascript
// 공통 검색 함수 — 버튼 클릭과 Enter 키 모두 이 함수를 공유합니다.
function handleSearch() { ... }

// 버튼 클릭 이벤트
searchBtn.addEventListener('click', handleSearch);

// Enter 키 이벤트 — 검색 중(disabled)일 때는 중복 실행 방지
searchInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && !searchBtn.disabled) {
    handleSearch();
  }
});
```

---

## 📌 프롬프트 10 — fetchRepos async/await 함수 작성

### 사용자 요청

> GitHub Repository Search API를 호출하는 fetchRepos 함수를 작성해 주세요.
>
> 조건:
> 1. 함수 이름은 fetchRepos입니다.
> 2. keyword를 매개변수로 받습니다.
> 3. fetch와 async/await를 사용합니다.
> 4. 검색어는 encodeURIComponent로 처리합니다.
> 5. stars 기준 내림차순으로 정렬합니다.
> 6. 결과는 6개만 가져옵니다.
> 7. response.ok를 확인합니다.
> 8. 실패하면 throw new Error를 사용합니다.
> 9. JSON 데이터를 return합니다.
> 10. 초보자가 이해할 수 있도록 주석을 달아 주세요.

### 응답 요약

`app.js`에 `fetchRepos` 함수를 추가하고, `handleSearch`도 `async/await` 방식으로 교체함.

**`fetchRepos` 함수:**
```javascript
async function fetchRepos(keyword) {
  const encodedKeyword = encodeURIComponent(keyword);
  const url = `https://api.github.com/search/repositories?q=${encodedKeyword}&sort=stars&order=desc&per_page=6`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
```

**변경 전 vs 변경 후 비교:**

| 항목 | 변경 전 | 변경 후 |
|---|---|---|
| API 호출 방식 | `.then().catch()` 체인 | `async/await` + `try/catch` |
| fetch 로직 위치 | `handleSearch` 내부 | `fetchRepos` 함수로 분리 |
| 에러 처리 | `.catch(error => ...)` | `catch (error) { ... }` |

**포인트 정리:**

| 키워드 | 의미 |
|---|---|
| `async` | 이 함수는 비동기 함수 (Promise를 반환) |
| `await` | 비동기 작업이 완료될 때까지 기다림 |
| `response.ok` | HTTP 상태 코드 200~299이면 `true` |
| `throw new Error(...)` | 에러 객체를 생성하고 던짐 → `catch`로 잡힘 |
| `try / catch` | 에러가 발생할 수 있는 코드를 안전하게 감쌈 |

---

## 📌 프롬프트 11 — API 응답 필드 정리 및 카드에 Fork 수 추가

### 사용자 요청

> GitHub Repository Search API 응답의 items 배열에서 저장소 카드에 표시할 필드를 정리해 주세요.
> description, language가 null일 때 사용할 기본 문구도 제안해 주세요.

### 응답 요약

**카드 항목 ↔ JSON 필드 매핑:**

| 카드 표시 항목 | JSON 필드명 | null 가능 |
|---|---|---|
| 저장소 이름 | `full_name` | ❌ |
| 저장소 설명 | `description` | ✅ → `'설명이 없습니다.'` |
| 사용 언어 | `language` | ✅ → `'언어 정보 없음'` |
| ⭐ Star 수 | `stargazers_count` | ❌ |
| 🍴 Fork 수 | `forks_count` | ❌ |
| GitHub 링크 | `html_url` | ❌ |

**수정 내용 (`app.js` — `createRepoCard`):**
- `forks_count` 카드에 추가
- `??` (nullish coalescing) 연산자로 null 처리 방식 개선
- 변수로 분리하여 가독성 향상

```javascript
const description = repo.description ?? '설명이 없습니다.';
const language    = repo.language    ?? '언어 정보 없음';
const stars       = repo.stargazers_count.toLocaleString();
const forks       = repo.forks_count.toLocaleString();
```

---

## 📌 프롬프트 12 — renderRepos 함수 분리 및 handleSearch 리팩토링

### 사용자 요청

> handleSearch 함수에서 fetchRepos로 가져온 데이터의 items 배열을 renderRepos 함수에 전달하도록 코드를 수정해 주세요.
>
> 조건:
> 1. const data = await fetchRepos(keyword)를 사용합니다.
> 2. renderRepos(data.items)를 호출합니다.
> 3. 검색 결과가 있으면 카드 목록이 화면에 표시되어야 합니다.
> 4. 기존 입력값 검증 기능은 유지합니다.
> 5. 오류 처리는 console.error로 유지합니다.

### 응답 요약

`renderRepos(items)` 함수를 신규 추가하고 `handleSearch`에서 호출하도록 수정함.

**추가된 함수:**
```javascript
function renderRepos(items) {
  items.forEach(repo => {
    repoList.appendChild(createRepoCard(repo));
  });
}
```

**변경된 handleSearch 핵심 흐름:**
```javascript
const data = await fetchRepos(keyword);  // API 호출
renderRepos(data.items);                 // items 배열 렌더링
```

**함수 역할 분리:**

| 함수 | 역할 |
|---|---|
| `fetchRepos(keyword)` | API 호출 → JSON 반환 |
| `renderRepos(items)` | items 배열 → 카드 DOM 렌더링 |
| `createRepoCard(repo)` | 개별 repo → 카드 DOM 생성 |
| `handleSearch()` | 흐름 제어 (검증 → fetch → render) |

---

## 📁 생성된 파일 목록

| 파일명 | 설명 |
|---|---|
| `searchRepositories.js` | `buildSearchUrl()` 함수 및 fetch 사용 예시 |
| `index.html` | HTML 구조 (검색 입력창, 버튼, 상태 메시지, 카드 목록 영역) |
| `style.css` | 레이아웃, 카드 디자인, 반응형 스타일 |
| `app.js` | URL 생성, fetch 호출, 카드 렌더링, 이벤트 리스너 |
| `PROMPT.md` | 프롬프트 진행 내용 기록 (현재 파일) |

---

## 🔗 참고

- GitHub REST API 공식 문서: https://docs.github.com/en/rest/search/search#search-repositories
- 검색 엔드포인트: `GET https://api.github.com/search/repositories`
