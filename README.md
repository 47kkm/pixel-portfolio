# pixel-portfolio

김경미 포트폴리오의 도트 감성 버전. Vue 3 + Vite + TypeScript.

## 실행

```bash
npm install
npm run dev      # 개발 서버
npm run build    # 타입 검사 + dist 빌드
npm run preview  # 빌드 결과 확인
```

## 배포

기존 포트폴리오와 같은 방식으로, 빌드한 `dist`를 GitHub Pages(`gh-pages` 브랜치)에 올린다.

```bash
sh deploy.sh
```

- 배포 주소는 `.env`의 `VITE_SITE_URL`(지금은 `https://47kkm.github.io/pixel-portfolio/`). 링크 미리보기의 주소와 이미지에 쓰인다.
- 미리보기 이미지는 `public/og.png`(1200×630)다. 바꾸면 `index.html`의 `og.png?v=` 숫자를 올린다. 카카오톡이 이미지를 주소 기준으로 오래 기억해서, 주소가 같으면 예전 이미지가 계속 나온다.

## 내용은 어디서 오나

경력, 프로젝트, 기술 스택은 기존 VuePress 포트폴리오에서 읽는다. 문구를 고칠 때는 그쪽 파일을 고친다.

| 내용 | 파일 |
|---|---|
| 프로필, 하이라이트, 기술, 경력, 학력·자격, 링크 | `../portfolio/docs/.vuepress/data/main.js` |
| 프로젝트 목록과 상세 | `../portfolio/docs/projects/project*.md` |

기존 포트폴리오가 다른 위치에 있으면 `PORTFOLIO_DOCS=/경로/portfolio/docs npm run dev`처럼 실행한다.

이 사이트에만 쓰는 문구(프로필 표, 말풍선, 기술 칸 설명, 수련 중 목록)는 `src/data/site.ts`에 있다. 도트 그림은 `src/lib/sprites.ts`에서 문자열로 그린다.
