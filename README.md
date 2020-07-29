# MiniProject
채팅 + 파일 매니저 + 회원 시스템 구현 풀스택 프로젝트

### 템플릿 실행

- 실행 전 작업
  - DB 설치
    - `cd scripts && ./installDb.sh` 명령어로 Mongodb, Redis를 설치합니다.
  - npm package 설치
    - `npm install` 명령어로 npm package를 설치합니다.

- 실행
  - DB 실행
    - `./scripts/startDb.sh` 명령어로 Mongodb, Redis를 시작합니다.
  - App Build
    - `npm run build:prd`로 Production 모드로 빌드합니다.
    - 또는 `npm run build:dev`로 Development 모드로 빌드합니다.
  - App Start
    - `npm run start:prd`로 Production 모드로 실행합니다.
    - 또는 `npm run start:dev`로 Development 모드로 실행합니다.

- 실행 결과 확인
  - 상단 메뉴 [프로젝트] -> [실행 URL과 포트]에서 실행되고 있는 Port(기본 포트는 3000)와 관련된 URL를 브라우저 검색창에 입력하면 실행 결과를 확인할 수 있습니다.