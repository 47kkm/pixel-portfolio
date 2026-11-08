#!/usr/bin/env sh
# 기존 포트폴리오(deploy.sh)와 같은 방식: 빌드한 dist를 gh-pages 브랜치로 올린다.
# 내용은 옆 폴더의 기존 포트폴리오(../portfolio/docs)를 빌드할 때 읽으므로,
# 그쪽 글을 고쳤다면 저장해 둔 상태에서 실행한다.

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

git init
git add -A
git commit --allow-empty -m 'deploy'

git push -f https://github.com/47kkm/pixel-portfolio.git HEAD:gh-pages

cd -
