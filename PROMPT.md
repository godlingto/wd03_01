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
