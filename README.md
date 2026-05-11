# GitHub Repository Search Board
## 깃허브 저장소 검색 보드

> 🤖 **"AI가 코드를 만들어도, 최종 판단은 개발자가 한다."**  
> 이 프로젝트는 AI와 함께 코드를 작성하고, 직접 검토·수정하며 완성한 결과물입니다.

---

## 📋 프로젝트 소개

GitHub REST API를 활용하여 저장소를 검색하고,  
결과를 **다크 모드 카드 UI**로 보여주는 웹 앱입니다.

- 검색어를 입력하면 ⭐ Star 수 기준 상위 **6개 저장소**를 표시합니다.
- 순수 **HTML / CSS / JavaScript**만 사용하여 구현했습니다. (외부 라이브러리 없음)
- AI 프롬프트 엔지니어링 실습 프로젝트로, 모든 코드는 AI와 대화하며 단계적으로 완성했습니다.

---

## 🎯 학습 목표

| 항목 | 내용 |
|---|---|
| API 통신 | `fetch()`, `async/await`로 GitHub REST API 호출 |
| DOM 조작 | `getElementById`, `createElement`, `innerHTML` |
| 함수 설계 | 역할별 함수 분리 (`fetchRepos`, `renderRepos`, `createRepoCard`) |
| CSS 설계 | CSS 변수(`:root`), Grid 레이아웃, 미디어 쿼리 |
| 에러 처리 | `try/catch`, `response.ok`, `throw new Error` |
| 프롬프트 엔지니어링 | AI에게 조건을 명확히 전달하고 결과를 검토·수정하는 방법 |

---

## 🛠 기술 스택

- **HTML5** — 시맨틱 구조 (`header`, `main`, `section`)
- **CSS3** — CSS 커스텀 속성(변수), Flexbox, CSS Grid, Media Query
- **JavaScript (ES2020)** — `async/await`, `??` nullish coalescing, `fetch API`
- **GitHub REST API** — `GET /search/repositories`

---

## 🚀 실행 방법

별도 설치 없이 브라우저에서 바로 실행할 수 있습니다.

```bash
# 1. 저장소 클론
git clone https://github.com/godlingto/wd03_01.git

# 2. 폴더로 이동
cd wd03_01

# 3. index.html을 브라우저에서 열기
open index.html
```

또는 `index.html` 파일을 더블클릭하여 브라우저로 열어도 됩니다.

---

## ⚙️ 주요 기능

| 기능 | 설명 |
|---|---|
| 🔍 저장소 검색 | 키워드 입력 후 검색 버튼 클릭 또는 Enter 키로 검색 |
| ⭐ Stars 정렬 | 별점 수 기준 내림차순으로 상위 6개 결과 표시 |
| 🃏 카드 UI | 저장소 이름, 설명, ⭐ Stars, 🍴 Forks, 🌐 언어 표시 |
| 🌙 다크 모드 | GitHub 다크 모드 색상 팔레트 적용 |
| 📱 반응형 | 모바일 1열 → 태블릿 2열 → 데스크톱 3열 그리드 |
| 🔒 중복 방지 | API 호출 중 버튼 비활성화로 중복 검색 방지 |
| ⚠️ 에러 처리 | 빈 검색어, API 오류, 결과 없음 상태 처리 |

---

## 📂 파일 구조

```
wd03_01/
├── index.html            # HTML 구조 (검색창, 버튼, 카드 영역)
├── style.css             # 다크 모드 스타일, 반응형 그리드
├── app.js                # API 호출, 카드 렌더링, 이벤트 처리
├── searchRepositories.js # buildSearchUrl() 함수 학습용 파일
├── PROMPT.md             # AI 프롬프트 진행 기록 (12개 프롬프트)
└── README.md             # 프로젝트 소개 (현재 파일)
```

---

## 💬 사용한 프롬프트 기록

총 **12개의 프롬프트**로 프로젝트를 완성했습니다.

| # | 프롬프트 주제 |
|---|---|
| 1 | GitHub API 검색 URL 구성 |
| 2 | template literal + encodeURIComponent 방식으로 재작성 |
| 3 | HTML 검색 화면 구현 |
| 4 | HTML/CSS/JS 파일 분리 구조 |
| 5 | id 네이밍 camelCase 통일 |
| 6 | 다크 모드 CSS 디자인 + 반응형 그리드 |
| 7 | 검색 결과 6개 초과 버그 수정 |
| 8 | 버튼 클릭 시 입력값 읽기 (기초 학습) |
| 9 | Enter 키 검색 실행 보완 |
| 10 | fetchRepos async/await 함수 작성 |
| 11 | API 응답 필드 정리 및 Fork 수 추가 |
| 12 | renderRepos 함수 분리 및 handleSearch 리팩토링 |

> 📄 전체 프롬프트 내용은 [PROMPT.md](./PROMPT.md)에서 확인할 수 있습니다.

---

## 🔍 AI 생성 결과 검토 기준

AI가 작성한 코드를 아래 기준으로 직접 검토했습니다.

| 검토 항목 | 확인 방법 |
|---|---|
| 기능 동작 여부 | 브라우저에서 직접 실행 후 검색 결과 확인 |
| 조건 충족 여부 | 요청한 조건(id명, 함수명, 정렬 기준 등) 하나씩 대조 |
| 버그 여부 | 여러 번 검색하거나 빠르게 Enter를 눌러 엣지 케이스 테스트 |
| 코드 가독성 | 주석이 충분한지, 함수 역할이 명확한지 확인 |
| 중복/불필요한 코드 | 동일한 로직이 여러 곳에 반복되는지 확인 |

---

## ✏️ 수정 요청 내용

AI 생성 코드에서 직접 발견하고 수정을 요청한 사항들입니다.

1. **id 네이밍 통일** — `search-input` → `searchInput` (kebab-case → camelCase)
2. **버그 수정** — Enter 키 중복 검색으로 6개 초과 결과 표시 문제 발견 및 수정
3. **함수 분리** — `handleSearch` 내 렌더링 로직을 `renderRepos`로 분리 요청
4. **Fork 수 추가** — API 응답에서 `forks_count` 필드를 카드에 추가
5. **async/await 리팩토링** — `.then()` 체인 방식을 `async/await`로 개선 요청

---

## 📚 배운 점

- **template literal**로 URL 문자열을 가독성 있게 조립하는 방법
- **`encodeURIComponent`**로 검색어를 URL 안전 형태로 변환하는 이유
- **`async/await`** + **`try/catch`**로 비동기 코드를 동기처럼 읽기 쉽게 작성하는 방법
- **CSS 변수(`:root`)** 로 색상 팔레트를 한 곳에서 관리하는 방법
- **CSS Grid + 미디어 쿼리**로 반응형 레이아웃을 구성하는 방법
- **`??` (nullish coalescing)** 연산자로 `null`/`undefined`를 간결하게 처리하는 방법
- AI 코드에도 **버그가 있을 수 있으며**, 개발자가 직접 검토해야 한다는 것

---

## 📝 3줄 보고서

1. GitHub REST API와 `fetch`/`async-await`를 사용하여 저장소 검색 기능을 구현했다.
2. AI와 12번의 프롬프트 대화를 통해 HTML 구조, CSS 디자인, JavaScript 로직을 단계적으로 완성했다.
3. AI가 생성한 코드에서 버그를 직접 발견하고 수정하면서, 코드 검토의 중요성을 체험했다.

---

## 🔮 향후 개선 사항

- [ ] **페이지네이션** — 6개 이상의 결과를 여러 페이지로 나누어 표시
- [ ] **검색 필터** — 언어별 필터링 기능 추가
- [ ] **로딩 스피너** — 텍스트 대신 애니메이션 로딩 표시
- [ ] **즐겨찾기** — `localStorage`를 활용한 저장소 북마크 기능
- [ ] **정렬 옵션** — Stars 외 Forks, Updated 기준 정렬 선택 기능
- [ ] **다크/라이트 모드 전환** — 토글 버튼으로 테마 전환

---

## 🔗 참고

- [GitHub REST API 공식 문서](https://docs.github.com/en/rest/search/search#search-repositories)
- [MDN fetch API](https://developer.mozilla.org/ko/docs/Web/API/Fetch_API)
- [MDN async/await](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Asynchronous/Promises)
