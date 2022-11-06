# 원티드 프리온보딩 2-2 4팀

## 배포 링크

[어플리케이션 바로가기](https://pre-onboarding-7th-2-2-4-vv9dr45j2-wanted-4th.vercel.app/)

# 팀 소개

| 이름         | github                                                  |
| ------------ | ------------------------------------------------------- |
| 임거정(팀장) | https://github.com/dgd03146/pre-onboarding-7th-2-2-4    |
| 고현수       | https://github.com/rieulp/madupXwanted/deployments      |
| 김하영       | https://github.com/Fibo4487/pre-onboarding-7th-2-2-4    |
| 박라영       | https://github.com/rieulp/madupXwanted                  |
| 박호준       | https://github.com/ohtmm/pre-onboarding-7th-2-2-4       |
| 이슬         | https://github.com/seul-dev?tab=repositories            |
| 조윤정       | https://github.com/yunjjeongjo/pre-onboarding-7th-2-2-4 |
| 최지영       | https://github.com/ohtmm/pre-onboarding-7th-2-2-4       |

# 환경 설정 및 실행 방법

## 환경설정

1. NodeJS 16.14.2에서 실행하는 것을 권장합니다.

## 설치

```
npm ci
```

## 실행

```
npm start
```

# 디렉토리 구조

```jsx
📦src
 ┣ 📂Components
 ┃ ┣ 📂Button
 ┃ ┣ 📂ComboBox
 ┃ ┣ 📂ContentHeader
 ┃ ┣ 📂Header
 ┃ ┣ 📂Layout
 ┃ ┣ 📂Main
 ┃ ┣ 📂SelectButton
 ┃ ┣ 📂Svg
 ┃ ┗ 📂assets
 ┣ 📂Pages
 ┃ ┣ 📂AdManagement
 ┃ ┃ ┣ 📂hooks
 ┃ ┗ 📂DashBoard
 ┃ ┃ ┣ 📂hooks
 ┣ 📂Routes
 ┣ 📂lib
 ┃ ┣ 📂api
 ┃ ┣ 📂constant
 ┃ ┣ 📂state
 ┃ ┣ 📂style
 ┃ ┗ 📂utils
 ┣ 📜App.tsx
 ┣ 📜index.tsx
 ┣ 📜logo.svg
 ┗ 📜react-app-env.d.ts
```

# 트러블 슈팅

## 1. 이름이 중요한 이유 ㅋㅋ😂

- 저희 팀은 CRA 환경에서 개발을 했는데요. CRA 프로젝트 이름은 default-tyescript-cra 였습니다. 그런데 팀원분 중 한 분이 default-typescript-vite로 리액트 레포지 토리를 만드셨습니다. 그런데 몇몇 분들이 default-typescript 까지 보고 프로젝트를 진행했습니다. 초반에 Vite 로고가 떴을 때 조금 당황했지만 ‘뭐 별거 있겠어?’하고 프로젝트를 진행했습니다. 하지만 Vite 환경은 CRA 환경과 미세한 부분에서 동작이 조금 달랐습니다. 덕분에 프로젝트를 조금 진행하다가 급하게 CRA로 바꾸는 헤프닝이 있었습니다. 클린 코드에서 이름의 중요성을 말하는 대목이 있습니다. 비슷한 이름이 반복되면 프로젝트가 진행될 수록 어려움을 느낀다는 것도요. 비슷한 이름으로 겪은 헤프닝이었지만 변수나 함수 이름을 정할 때 그만큼 고민이 필요하다는 교훈을 얻을 수 있었습니다.

## 2. 의존성에 대한 고민

- 이번에 저희 조의 팀 원은 토요일 강의를 바탕으로 의존성 역전, 의존성 주입 등을 고민하고 프로젝트 설계를 진행했습니다. 의존성을 고민하고 코드를 만드는게 생각보다 많은 어려움이라고 느꼈습니다. 그래서 프로젝트의 일부분에 적용을 해보았습니다. 컴포넌트를 설계할 때, 그리고 커스텀 훅을 만들 때, 어떻게 하면 약한 결합으로 설계할 수 있을지 많은 고민이 있었습니다.

## 3. 중복되는 컴포넌트를 줄이고 렌더링 최적화에 대한 고민

- 광고 관리 페이지의 경우 수정 시 input으로 바뀌는 컴포넌트가 많아 jsx 리턴부분에서 가독성을 높이고 input 컴포넌트에 대한 렌더링 리소스를 아끼는 방법에 대해 고민하였습니다.
- 커스텀 훅안에서 input ↔ span 으로 각각 바뀌는 컴포넌트를 함수로 묶어 useCallback으로 렌더링 함수를 memoization하여 Edit할 때마다 함수를 새로 만들지 않고 렌더링 할수 있도록 하였습니다.

## 4. recoil을 통한 전역 상태 관리와 데이터 유지

- 메인페이지의 대시보드와 그래프를 구현하기 위해서 date picker에서 선택한 startDate와 endDate를 전역 상태로 관리했습니다.
- 이번 과제의 대시 보드는 날짜 값에 따라 고객에게 데이터를 보여주기 때문에 날짜 상태가 매우 중요했습니다. 날짜는 페이지를 벗어났다가 다시 돌아와도 유지가 되어야했습니다. 그래서 저희는 전역 상태 관리 도구인 Recoil을 사용하여 컴포넌트가 언마운트 되었을 때도 날짜 상태가 고객이 선택한 날짜를 계속 유지하도록 하였습니다.

# 사용 라이브러리

- styled-components
  - 팀 원 모두가 JS-Style로 사용하기로 하여 라이브러리 통일을 위해 사용하였습니다.
- recoil
  - 전역상태 관리 도구로써 atom을 만들어서 손쉽게 전역 상태를 관리 할 수 있습니다.
- apexcharts
  - APEXCHART는 데이터를 시각화 해주는 차트 라이브러리이고 선 그래프, 거품형, 타임라인, 히트맵까지 다양한 스타일들이 있고, 반응형에 커스텀 기능까지 구현되어 있어서 사용하였습니다.
- react-datepicker
  - 손쉽게 날짜의 범위를 정해 값을 가져오기 위해서 사용하였습니다.
- dayjs
  - 작은 사이즈를 가진 날짜 관리 라이브러리를 사용하였습니다.
