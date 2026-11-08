<script setup lang="ts">
import PixelSprite from './PixelSprite.vue';
import { INK, logoBlankRows } from '@/lib/sprites';
import { profile } from '@/data/portfolio';
import { textVersionUrl } from '@/data/site';

defineProps<{ theme: 'light' | 'dark' }>();
defineEmits<{ toggleTheme: [] }>();

const sections = [
  { hash: '#career', text: '경력' },
  { hash: '#projects', text: '프로젝트' },
  { hash: '#skills', text: '기술' },
];
</script>

<template>
  <header class="header">
    <div class="wrap header-in">
      <RouterLink class="logo" to="/">
        <span class="logo-mark"><PixelSprite name="logo" :scale="2" :rows="logoBlankRows" /></span>
        <span class="logo-name">{{ profile.name }}</span>
      </RouterLink>
      <nav class="nav" aria-label="섹션">
        <RouterLink v-for="s in sections" :key="s.hash" :to="{ path: '/', hash: s.hash }">{{ s.text }}</RouterLink>
        <a class="ext" :href="textVersionUrl" target="_blank" rel="noopener">텍스트 버전 ↗</a>
      </nav>
      <button
        class="px-btn theme-btn"
        type="button"
        :aria-label="theme === 'dark' ? '낮 화면으로 바꾸기' : '밤 화면으로 바꾸기'"
        @click="$emit('toggleTheme')"
      >
        <PixelSprite :name="theme === 'dark' ? 'sun' : 'moon'" :scale="2" :pal="theme === 'dark' ? undefined : { m: INK }" />
      </button>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: var(--bg);
  border-bottom: var(--bw) solid var(--line);
}
.header-in { display: flex; align-items: center; gap: 20px; height: 56px; }
.logo { display: flex; align-items: center; gap: 8px; font-family: var(--px); font-size: 16px; text-decoration: none; }
/* 모니터 로고: 화면의 '_' 커서만 따로 깜빡인다(그림의 7열·7행, 3칸 × 2배) */
.logo-mark { position: relative; display: inline-flex; }
.logo-mark::after {
  content: '';
  position: absolute;
  left: 14px;
  top: 14px;
  width: 6px;
  height: 2px;
  background: #7c97ff;
  animation: blink 1s steps(2) infinite;
}
.nav { display: flex; gap: 20px; margin-left: auto; font-size: 14px; font-weight: 600; }
.nav a { text-decoration: none; padding: 4px 0; }
.nav a:hover { color: var(--accent); }
.theme-btn { width: 32px; height: 32px; padding: 0; justify-content: center; }
/* 모바일: 메뉴가 셋뿐이라 햄버거로 숨기지 않고 한 줄에 그대로 둔다.
   텍스트 버전 링크는 푸터에도 있어서 좁은 화면의 헤더에서만 뺀다. */
@media (max-width: 640px) {
  .header-in { gap: 14px; }
  .nav { gap: 16px; }
  .nav .ext { display: none; }
}
@media (max-width: 359px) {
  .logo-name { display: none; }
}
</style>
