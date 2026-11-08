<script setup lang="ts">
import { profile, relLink } from '@/data/portfolio';
import { textVersionUrl } from '@/data/site';
</script>

<template>
  <footer class="footer">
    <div class="wrap">
      <span class="label">LINKS</span>
      <p class="lead">더 자세한 내용은 텍스트 버전 포트폴리오와 저장소에서 볼 수 있어요.</p>
      <div class="actions">
        <a class="px-btn primary" :href="textVersionUrl" target="_blank" rel="noopener">텍스트 버전 보기 ↗</a>
        <a class="px-btn" :href="profile.github" target="_blank" rel="noopener">GitHub ↗</a>
      </div>
      <ul class="repos">
        <li v-for="link in relLink" :key="link.href">
          <a :href="link.href" target="_blank" rel="noopener">{{ link.text }}</a>
        </li>
      </ul>
      <p class="copy">© 2026 {{ profile.name }}</p>
    </div>
  </footer>
</template>

<style scoped>
.footer { margin-top: 80px; padding: 40px 0 32px; border-top: var(--bw) solid var(--line); background: var(--panel); }
.lead { margin: 6px 0 20px; color: var(--ink-2); font-size: 14px; }
.actions { display: flex; flex-wrap: wrap; gap: 14px 16px; margin-bottom: 24px; }
.repos { display: flex; flex-wrap: wrap; gap: 6px 20px; margin: 0; padding: 0; list-style: none; font-size: 13px; }
.copy { margin: 24px 0 0; font-size: 12px; color: var(--ink-2); }
</style>
