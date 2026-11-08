<script setup lang="ts">
import PixelSprite from './PixelSprite.vue';
import { timeline } from '@/data/portfolio';
import { vReveal } from '@/lib/reveal';
</script>

<template>
  <!-- 세로 타임라인: 날짜 | 선과 점 | 내용. 지금 하는 일은 점 대신 러버덕이 앉아 있다. -->
  <ol class="timeline">
    <li v-for="item in timeline" :key="item.period + item.text" v-reveal class="item" :class="{ now: item.now }">
      <div class="date">
        <span class="period">{{ item.period }}</span>
        <span v-if="item.now" class="badge">NOW</span>
      </div>
      <div class="rail" aria-hidden="true">
        <PixelSprite v-if="item.now" class="duck" name="duck" :scale="2" />
        <i v-else class="dot" />
      </div>
      <div class="body">
        <p class="text">{{ item.text }}</p>
        <span class="org">{{ item.org }}</span>
      </div>
    </li>
  </ol>
</template>

<style scoped>
.timeline { max-width: 820px; margin: 0; padding: 0; list-style: none; }
.item {
  display: grid;
  grid-template-columns: 168px 40px 1fr;
  grid-template-areas: 'date rail body';
}
.date, .body { padding-top: 6px; margin-bottom: 22px; }
.date {
  grid-area: date;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  text-align: right;
}
.period { font-size: 13px; font-weight: 700; line-height: 22px; color: var(--accent); }
.badge {
  padding: 0 6px;
  font-size: 11px;
  font-weight: 800;
  line-height: 1.7;
  letter-spacing: .08em;
  color: var(--on-accent);
  background: var(--accent);
}

/* 선: 첫 줄은 점에서 시작하고 마지막 줄은 점에서 끝난다 */
.rail { grid-area: rail; position: relative; }
.rail::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: calc(50% - 1.5px);
  width: 3px;
  background: var(--ink-2);
}
.item:first-child .rail::before { top: 16px; }
.item:last-child .rail::before { bottom: auto; height: 16px; }
.dot {
  position: absolute;
  top: 11px;
  left: calc(50% - 6px);
  width: 12px;
  height: 12px;
  background: var(--panel);
  box-shadow: 0 0 0 3px var(--ink-2);
}
.duck { position: absolute; top: 0; left: calc(50% - 16px); z-index: 1; }
.duck :deep(svg) { animation: bob 1.2s steps(2) infinite; }

.body { grid-area: body; padding-left: 8px; }
.text { margin: 0; font-size: 15px; font-weight: 700; line-height: 22px; word-break: keep-all; }
.org { display: block; margin-top: 3px; font-size: 13px; color: var(--ink-2); }
.now .body { padding: 6px 14px 10px; margin-left: 8px; background: var(--accent-soft); box-shadow: inset 3px 0 0 var(--accent); }

@media (max-width: 640px) {
  .item {
    grid-template-columns: 32px 1fr;
    grid-template-areas: 'rail date' 'rail body';
  }
  .date { flex-direction: row; align-items: center; gap: 8px; margin-bottom: 2px; padding-left: 8px; text-align: left; }
  .body { padding-top: 0; }
  .now .body { padding-top: 8px; }
}
</style>
