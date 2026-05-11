// ============================================================
// app.js — GitHub Repository Search Board
// ============================================================

// ① DOM 요소를 id로 가져오기
const searchInput   = document.getElementById('searchInput');   // 검색어 입력창
const searchBtn     = document.getElementById('searchButton');  // 검색 버튼
const statusMessage = document.getElementById('statusMessage'); // 상태 메시지 영역
const repoList      = document.getElementById('repoList');      // 카드 목록 영역


// ② GitHub 저장소를 검색하고 결과 데이터를 반환하는 비동기 함수
async function fetchRepos(keyword) {

  // 검색어를 URL에서 안전하게 사용할 수 있도록 인코딩합니다.
  const encodedKeyword = encodeURIComponent(keyword);

  // GitHub 저장소 검색 URL 조립
  const url = `https://api.github.com/search/repositories?q=${encodedKeyword}&sort=stars&order=desc&per_page=6`;

  // await : fetch가 완료될 때까지 기다립니다.
  const response = await fetch(url);

  // response.ok가 false면 에러를 발생시킵니다.
  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }

  // JSON으로 변환 후 반환
  const data = await response.json();
  return data;
}


// ③ 상태 메시지를 업데이트하는 함수
function setStatus(message, type = 'normal') {
  statusMessage.textContent = message;

  if (type === 'error') {
    statusMessage.classList.add('error');
  } else {
    statusMessage.classList.remove('error');
  }
}


// ④ 저장소 카드 하나를 만들어 반환하는 함수
function createRepoCard(repo) {
  const card = document.createElement('div');
  card.className = 'repo-card';

  // null 처리: ?? 연산자 — 값이 null/undefined일 때 오른쪽 기본값 사용
  const description = repo.description ?? '설명이 없습니다.';
  const language    = repo.language    ?? '언어 정보 없음';
  const stars       = repo.stargazers_count.toLocaleString();
  const forks       = repo.forks_count.toLocaleString();

  card.innerHTML = `
    <div class="card-title">
      <a href="${repo.html_url}" target="_blank">${repo.full_name}</a>
    </div>
    <p class="card-description">${description}</p>
    <div class="card-meta">
      <span>⭐ ${stars}</span>
      <span>🍴 ${forks}</span>
      <span>🌐 ${language}</span>
    </div>
  `;

  return card;
}


// ⑤ items 배열을 받아 카드 목록을 화면에 렌더링하는 함수
// fetchRepos에서 받은 data.items를 이 함수에 전달합니다.
function renderRepos(items) {
  // items 배열을 순회하며 카드를 만들어 repoList에 추가합니다.
  items.forEach(repo => {
    repoList.appendChild(createRepoCard(repo));
  });
}


// ⑥ 검색 실행 함수 — 흐름 제어 (검증 → fetch → render)
async function handleSearch() {
  // 입력창의 값을 가져와 앞뒤 공백 제거
  const keyword = searchInput.value.trim();

  // 검색어가 없으면 안내 메시지 표시 후 종료
  if (!keyword) {
    setStatus('검색어를 입력해 주세요!', 'error');
    return;
  }

  // UI 초기화
  repoList.innerHTML = '';     // 이전 결과 지우기
  setStatus('⏳ 검색 중...');  // 로딩 메시지
  searchBtn.disabled = true;   // 중복 클릭 방지

  try {
    // fetchRepos로 API를 호출하고 결과를 기다립니다.
    const data = await fetchRepos(keyword);

    searchBtn.disabled = false;

    if (data.items.length === 0) {
      setStatus('검색 결과가 없습니다.', 'error');
      return;
    }

    // 결과 카드 렌더링 — renderRepos에 items 배열을 전달합니다.
    setStatus(`"${keyword}" 검색 결과: ${data.items.length}개`);
    renderRepos(data.items);

  } catch (error) {
    // 오류는 console.error로 출력하고, 화면에도 메시지를 표시합니다.
    searchBtn.disabled = false;
    console.error(error);
    setStatus(`오류가 발생했습니다: ${error.message}`, 'error');
  }
}


// ⑦ 이벤트 리스너 등록
// 검색 버튼 클릭 시 검색 실행
searchBtn.addEventListener('click', handleSearch);

// Enter 키를 눌러도 검색 실행 (검색 중일 때는 중복 실행 방지)
searchInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && !searchBtn.disabled) {
    handleSearch();
  }
});
