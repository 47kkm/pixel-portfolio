<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import SiteHeader from './components/SiteHeader.vue';
import SiteFooter from './components/SiteFooter.vue';

type Theme = 'light' | 'dark';
const STORAGE_KEY = 'pixel-theme';

function initialTheme(): Theme {
  // 확인용: ?theme=dark 로 열면 밤 화면
  const param = new URLSearchParams(location.search).get('theme');
  if (param === 'light' || param === 'dark') return param;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // 저장소를 못 쓰는 환경이면 시스템 설정을 따른다
  }
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const theme = ref<Theme>(initialTheme());
watchEffect(() => {
  document.documentElement.dataset.theme = theme.value;
});

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
  try {
    localStorage.setItem(STORAGE_KEY, theme.value);
  } catch {
    // 저장 못 해도 화면은 바뀐다
  }
}
</script>

<template>
  <SiteHeader :theme="theme" @toggle-theme="toggleTheme" />
  <RouterView />
  <SiteFooter />
</template>
