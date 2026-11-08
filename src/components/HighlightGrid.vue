<script setup lang="ts">
import { highlights } from '@/data/portfolio';
import { vReveal } from '@/lib/reveal';
</script>

<template>
  <!-- 상자 없이 큰 키워드를 한 줄로. 누르면 그 성과가 나온 프로젝트로 간다. -->
  <ul class="strip">
    <li v-for="h in highlights" :key="h.value + h.no" v-reveal>
      <RouterLink class="item" :to="`/projects/${h.no}`">
        <strong>{{ h.value }}</strong>
        <span class="desc">{{ h.label }}</span>
        <span class="more" aria-hidden="true">프로젝트 보기 →</span>
      </RouterLink>
    </li>
  </ul>
</template>

<style scoped>
.strip { display: grid; grid-template-columns: repeat(4, 1fr); margin: 0; padding: 0; list-style: none; }
.strip li + li { box-shadow: inset 2px 0 0 var(--line-soft); }
.item { display: flex; flex-direction: column; height: 100%; padding: 4px 22px 6px; text-decoration: none; }
.strip li:first-child .item { padding-left: 0; }
strong { font-size: 26px; font-weight: 800; line-height: 1.3; letter-spacing: -.02em; word-break: keep-all; }
.desc { margin-top: 6px; font-size: 14px; line-height: 1.55; color: var(--ink-2); word-break: keep-all; }
/* 누를 수 있다는 표시는 항상 보이게(터치 화면엔 마우스 올리기가 없다) */
.more { margin-top: auto; padding-top: 10px; font-size: 12px; font-weight: 700; color: var(--ink-2); }
.item:hover strong, .item:hover .more, .item:focus-visible .more { color: var(--accent); }

@media (max-width: 860px) {
  .strip { grid-template-columns: repeat(2, 1fr); row-gap: 22px; }
  .strip li:nth-child(3) { box-shadow: none; }
  .strip li:nth-child(3) .item { padding-left: 0; }
}
@media (max-width: 480px) {
  .strip { grid-template-columns: 1fr; row-gap: 0; }
  .strip li + li, .strip li:nth-child(3) { box-shadow: inset 0 2px 0 var(--line-soft); }
  .item, .strip li:first-child .item, .strip li:nth-child(3) .item { padding: 14px 0; }
  .strip li:first-child .item { padding-top: 0; }
  strong { font-size: 22px; }
  .more { padding-top: 6px; }
}
</style>
