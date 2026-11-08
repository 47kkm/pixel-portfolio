// 이 사이트에만 쓰는 문구. 경력·프로젝트 같은 사실은 portfolio.ts(기존 포트폴리오)에서 온다.
import type { Category } from './portfolio';

// 프로젝트 분류별 색(main.css의 .tag.tone-*)
export const categoryTone: Record<Category, string> = {
  서비스: 'blue',
  프로모션: 'violet',
  '사내 도구': 'teal',
  '개인 프로젝트': 'slate',
};

export const textVersionUrl = 'https://47kkm.github.io/portfolio/';

export const profileRows = [
  { term: '경로', desc: '영어교육 전공 → UI 개발자 → 프론트엔드' },
  { term: '주력', desc: 'Vue · Nuxt · TypeScript' },
  { term: '수련 중', desc: 'React · Spring Boot · JPA' },
  { term: '자격', desc: '정보보안기사' },
];

// 자기소개 대화창: 인사 + 기존 포트폴리오 소개 문장 + 맺음말 순서로 한 줄씩 쌓인다.
export const introGreeting = (name: string, year: number) =>
  `안녕하세요! 영어교육을 전공한 ${year}년 차 프론트엔드 개발자 ${name}입니다.`;
export const introClosing = '아래에서 경력과 프로젝트를 볼 수 있어요.';

// 첫 화면 모니터에 한 줄씩 쳐지는 문구
export const screenLines = ["console.log('반가워요')", 'npm run dev', '// 컴포넌트 설계 중', "git commit -m '오늘도'"];

// 기술 칸 아이콘 글자와 설명. 이름은 기존 포트폴리오의 techStack과 맞춘다.
export const skillNotes: Record<string, { mono: string; desc: string }> = {
  HTML: { mono: 'HT', desc: 'UI 개발자로 시작할 때부터 쓴 첫 장비. 마크업은 지금도 직접 합니다.' },
  CSS: { mono: 'CS', desc: '사내 레이아웃 가이드를 보일러플레이트 기본 설정으로 담았습니다.' },
  SCSS: { mono: 'SC', desc: '사내 SCSS 가이드를 정리해 보일러플레이트에 넣었습니다.' },
  JavaScript: { mono: 'JS', desc: 'Useragent 모듈을 바닐라 스크립트와 class로 만들었습니다.' },
  TypeScript: { mono: 'TS', desc: '카카오 karlo 프로모션과 AI 비서 확장 프로그램에서 사용했습니다.' },
  Vue: { mono: 'Vu', desc: '2020년부터 주력으로 쓰는 프레임워크입니다.' },
  Nuxt: { mono: 'Nx', desc: 'Nuxt2부터 팀의 첫 Nuxt3 도입, ifkakao 도메인 통합 마이그레이션까지 맡았습니다.' },
  VuePress: { mono: 'VP', desc: '카카오모빌리티 디벨로퍼스와 이 포트폴리오의 텍스트 버전을 만들었습니다.' },
  Vuex: { mono: 'Vx', desc: 'Nuxt2 프로젝트의 상태 관리에 사용했습니다.' },
  Pinia: { mono: 'Pi', desc: 'Nuxt3 프로젝트의 상태 관리에 사용했습니다.' },
  WXT: { mono: 'WX', desc: '브라우저 확장 프로그램과 Vue·React 템플릿을 만들었습니다.' },
  Jest: { mono: 'Je', desc: 'ifkakao 프로젝트의 테스트에 사용했습니다.' },
  MSW: { mono: 'MS', desc: '전지적친구시점에서 API 개발을 기다리지 않고 화면을 병행 개발했습니다.' },
  Docker: { mono: 'Dk', desc: '보일러플레이트에 자동 배포를 위한 Docker 설정을 넣었습니다.' },
};

export const learningSkills = [
  { name: 'React', mono: 'Re', desc: 'MOA 프론트엔드와 확장 프로그램 React 템플릿을 만들며 익히고 있습니다.' },
  { name: 'Java', mono: 'Jv', desc: 'MOA 백엔드를 Java 17로 만들며 익히고 있습니다.' },
  { name: 'Spring Boot', mono: 'SB', desc: 'MOA 백엔드를 Spring Boot 3로 설계하고 테스트하며 익히고 있습니다.' },
  { name: 'JPA', mono: 'JP', desc: 'MOA에서 Spring Data JPA로 데이터 접근 계층을 만들고 있습니다.' },
  { name: 'MySQL', mono: 'SQ', desc: 'MOA의 데이터베이스로 MySQL 8을 쓰며 SQL을 익히고 있습니다.' },
];

