// ============================================================
// app.js — GitHub Repository Search Board
// ============================================================

// ① DOM 요소를 id로 가져오기
const searchInput   = document.getElementById('searchInput');   // 검색어 입력창
const searchBtn     = document.getElementById('searchButton');  // 검색 버튼
const statusMessage = document.getElementById('statusMessage'); // 상태 메시지 영역
const repoList      = document.getElementById('repoList');      // 카드 목록 영역


// ② GitHub 저장소 검색 URL을 만드는 함수
function buildSearchUrl(keyword) {
  // encodeURIComponent: 공백이나 특수문자를 URL에서 사용할 수 있는 형태로 변환
  const encodedKeyword = encodeURIComponent(keyword);

  // template literal로 URL 문자열 조립
  // q        : 검색어
  // sort     : 정렬 기준 (stars = 별점 수)
  // order    : 정렬 방향 (desc = 내림차순)
  // per_page : 결과 개수 (6개로 제한)
  return `https://api.github.com/search/repositories?q=${encodedKeyword}&sort=stars&order=desc&per_page=6`;
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


// ⑤ 검색 실행 함수
function handleSearch() {
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

  // GitHub API 호출
  const url = buildSearchUrl(keyword);

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`API 오류: ${response.status}`);
      }
      return response.json(); // 응답을 JSON으로 변환
    })
    .then(data => {
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
    })
    .catch(error => {
      // 네트워크 오류 또는 API 오류 처리
      searchBtn.disabled = false;
      setStatus(`오류가 발생했습니다: ${error.message}`, 'error');
    });
}


// ⑥ 이벤트 리스너 등록
// 검색 버튼 클릭 시 검색 실행
searchBtn.addEventListener('click', handleSearch);

// Enter 키를 눌러도 검색 실행
searchInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    handleSearch();
  }
});
