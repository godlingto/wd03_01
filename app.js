// ============================================================
// app.js — GitHub Repository Search Board
// ============================================================

// ① DOM 요소를 id로 가져오기
const searchInput   = document.getElementById('searchInput');   // 검색어 입력창
const searchBtn     = document.getElementById('searchButton');  // 검색 버튼
const statusMessage = document.getElementById('statusMessage'); // 상태 메시지 영역
const repoList      = document.getElementById('repoList');      // 카드 목록 영역


// ② GitHub 저장소를 검색하고 결과 데이터를 반환하는 비동기 함수
// async 키워드 : 이 함수는 비동기 함수입니다. (결과를 기다려야 합니다)
async function fetchRepos(keyword) {

  // 검색어를 URL에서 안전하게 사용할 수 있도록 인코딩합니다.
  // 예) "hello world" → "hello%20world"
  const encodedKeyword = encodeURIComponent(keyword);

  // GitHub 저장소 검색 URL을 template literal로 조립합니다.
  // q        : 검색어
  // sort     : 정렬 기준 (stars = 별점 수)
  // order    : 정렬 방향 (desc = 내림차순)
  // per_page : 결과 개수 (6개로 제한)
  const url = `https://api.github.com/search/repositories?q=${encodedKeyword}&sort=stars&order=desc&per_page=6`;

  // await : fetch가 완료될 때까지 기다립니다.
  const response = await fetch(url);

  // response.ok : HTTP 상태 코드가 200~299 사이면 true
  // 실패한 경우 (404, 500 등) 에러를 발생시킵니다.
  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }

  // 응답 본문을 JSON 형식으로 변환하고 반환합니다.
  const data = await response.json();
  return data;
}


// ③ 상태 메시지를 업데이트하는 함수
// type: 'normal' | 'error'
function setStatus(message, type = 'normal') {
  statusMessage.textContent = message;

  if (type === 'error') {
    statusMessage.classList.add('error');    // 에러 색상 적용
  } else {
    statusMessage.classList.remove('error'); // 기본 색상으로 복원
  }
}


// ④ 저장소 카드 하나를 만들어 반환하는 함수
function createRepoCard(repo) {
  // 카드 컨테이너 생성
  const card = document.createElement('div');
  card.className = 'repo-card';

  // 카드 내부 HTML 구성
  card.innerHTML = `
    <div class="card-title">
      <a href="${repo.html_url}" target="_blank">${repo.full_name}</a>
    </div>
    <p class="card-description">
      ${repo.description ? repo.description : '설명이 없습니다.'}
    </p>
    <div class="card-meta">
      <span>⭐ ${repo.stargazers_count.toLocaleString()}</span>
      <span>🌐 ${repo.language ? repo.language : '알 수 없음'}</span>
    </div>
  `;

  return card;
}


// ⑤ 검색 실행 함수 (async/await 방식으로 fetchRepos 호출)
async function handleSearch() {
  // 입력창의 값을 가져와 앞뒤 공백 제거
  const keyword = searchInput.value.trim();

  // 검색어가 없으면 안내 메시지 표시 후 종료
  if (!keyword) {
    setStatus('검색어를 입력해 주세요!', 'error');
    return;
  }

  // UI 초기화
  repoList.innerHTML = '';              // 이전 결과 지우기
  setStatus('⏳ 검색 중...');           // 로딩 메시지
  searchBtn.disabled = true;            // 중복 클릭 방지

  // try : 정상 실행 시도
  // catch : 오류 발생 시 처리
  try {
    // fetchRepos를 호출하고 결과가 올 때까지 기다립니다.
    const data = await fetchRepos(keyword);

    searchBtn.disabled = false; // 버튼 다시 활성화

    if (data.items.length === 0) {
      setStatus('검색 결과가 없습니다.', 'error');
      return;
    }

    // 결과 카드 렌더링
    setStatus(`"${keyword}" 검색 결과: ${data.items.length}개`);
    data.items.forEach(repo => {
      repoList.appendChild(createRepoCard(repo));
    });

  } catch (error) {
    // 네트워크 오류 또는 API 오류 처리
    searchBtn.disabled = false;
    setStatus(`오류가 발생했습니다: ${error.message}`, 'error');
  }
}


// ⑥ 이벤트 리스너 등록
// 검색 버튼 클릭 시 검색 실행
searchBtn.addEventListener('click', handleSearch);

// Enter 키를 눌러도 검색 실행
// searchBtn.disabled가 true(검색 중)일 때는 실행하지 않아 중복 검색을 방지합니다.
searchInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && !searchBtn.disabled) {
    handleSearch();
  }
});
