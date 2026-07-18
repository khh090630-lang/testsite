// 웹페이지의 모든 요소가 다 로드된 후 실행
document.addEventListener("DOMContentLoaded", () => {
    
    // index.html에서 단백질을 그릴 영역을 가져옴
    const viewerElement = document.getElementById('protein_viewer_container');

    // 1. 같은 폴더에 있는 'target.cif' 파일을 인터넷 통신으로 읽어옴 (Fetch API)
    // 중요: 로컬 컴퓨터에서는 보안 상 작동하지 않으며, 깃허브 배포 시 작동함.
    fetch('target.cif')
        .then(response => {
            if (!response.ok) {
                // 파일을 못 찾거나 에러가 났을 때
                throw new Error('target.cif 파일을 가져오지 못했습니다. 파일명과 위치를 확인하세요.');
            }
            // 파일 내용을 텍스트 형식으로 변환
            return response.text();
        })
        .then(cifData => {
            // 로딩 메시지 삭제
            viewerElement.innerHTML = '';

            // 2. 3Dmol 뷰어 인스턴스 생성 및 컨테이너에 연결
            const viewer = $3Dmol.createViewer(viewerElement, {
                backgroundColor: '#121212' // CSS 배경색과 맞춤
            });

            // 3. CIF 데이터를 뷰어에 추가 (포맷은 "cif"로 지정)
            viewer.addModel(cifData, "cif");

            // 4. 단백질 시각화 스타일 설정 (Cartoon 스타일, 무지개 색상)
            // 가장 대중적이고 구조를 보기 편한 스타일
            viewer.setStyle({}, {
                cartoon: { color: 'spectrum' }
            });

            // 5. 화면 중앙에 맞추고 렌더링(그리기)
            viewer.zoomTo(); // 모델이 화면 중앙에 꽉 차게 줌
            viewer.render();  // 실제로 그리기
        })
        .catch(error => {
            // 에러 발생 시 화면에 메시지 표시
            console.error("에러 발생:", error);
            viewerElement.innerHTML = `
                <div style="color: #feb2b2; text-align:center; padding-top: 50px;">
                    <h3>에러가 발생했습니다.</h3>
                    <p>${error.message}</p>
                    <p style="font-size:0.8rem; color:#718096;">참고: 로컬 컴퓨터에서는 작동하지 않습니다. 깃허브에 배포하여 테스트하세요.</p>
                </div>
            `;
        });
});
