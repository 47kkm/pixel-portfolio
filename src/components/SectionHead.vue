<script setup lang="ts">
import PixelSprite from './PixelSprite.vue';
import type { SpriteName } from '@/lib/sprites';
import { vReveal } from '@/lib/reveal';

defineProps<{ icon: SpriteName; label: string; title: string; id: string; sub?: string }>();
</script>

<template>
  <div v-reveal class="head">
    <PixelSprite :name="icon" :scale="4" class="icon" />
    <div>
      <span class="label">{{ label }}</span>
      <h2 :id="id">{{ title }}</h2>
    </div>
    <p v-if="sub" class="sub">{{ sub }}</p>
  </div>
</template>

<style scoped>
/* 섹션 제목: 페이지를 나누는 구분선 역할이라 크게, 아래에 굵은 선을 둔다 */
.head {
  position: relative;
  display: flex;
  align-items: flex-end;
  gap: 14px;
  margin-bottom: 30px;
  padding-bottom: 14px;
  border-bottom: var(--bw) solid var(--line);
}
.head::after { content: ''; position: absolute; left: 0; bottom: calc(var(--bw) * -1); width: 64px; height: var(--bw); background: var(--accent); }
.icon { margin-bottom: 4px; }
h2 { margin: 2px 0 0; font-family: var(--px); font-size: 30px; font-weight: 400; line-height: 1.15; }
.sub { margin: 0 0 2px auto; font-size: 13px; color: var(--ink-2); }
@media (max-width: 640px) {
  .head { flex-wrap: wrap; }
  h2 { font-size: 26px; }
  .sub { width: 100%; margin-left: 0; }
}
</style>
