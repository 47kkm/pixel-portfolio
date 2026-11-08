<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { profile, careerYear } from '@/data/portfolio';
import { introGreeting, introClosing } from '@/data/site';

// 기존 포트폴리오 소개 문단을 문장 단위로 나눈다.
const sentences = profile.intro.flatMap((p) => p.split(/(?<=[.!?])\s+/));
const lines = [introGreeting(profile.name, careerYear), ...sentences, introClosing];
const STEP = 2; // 처음에 2줄, 더보기를 누를 때마다 2줄씩

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealed = ref(Math.min(STEP, lines.length)); // 지금까지 열린 줄 수
const lineIndex = ref(0); // 찍고 있는 줄
const charIndex = ref(0); // 그 줄에서 찍은 글자 수
const typing = computed(() => lineIndex.value < revealed.value);
const hasMore = computed(() => revealed.value < lines.length);
let timer = 0;

// 한 글자씩 찍고, 한 줄이 끝나면 잠깐 쉬었다가 아랫줄을 찍는다. 열린 줄까지만 찍는다.
function tick() {
  if (!typing.value) return;
  if (charIndex.value < lines[lineIndex.value].length) {
    charIndex.value++;
    timer = window.setTimeout(tick, 22);
  } else {
    lineIndex.value++;
    charIndex.value = 0;
    timer = window.setTimeout(tick, 300);
  }
}

function start(delay: number) {
  window.clearTimeout(timer);
  if (reduced) {
    lineIndex.value = revealed.value;
    return;
  }
  timer = window.setTimeout(tick, delay);
}

// 찍는 중이면 지금 열린 줄까지 바로 보여 준다.
function skipTyping() {
  if (!typing.value) return;
  window.clearTimeout(timer);
  lineIndex.value = revealed.value;
  charIndex.value = 0;
}

function more() {
  if (typing.value) return skipTyping();
  revealed.value = Math.min(revealed.value + STEP, lines.length);
  start(0);
}

// 열린 줄 중 아직 안 찍힌 글자는 투명하게 깔아 두어, 찍는 동안 높이가 흔들리지 않게 한다.
const view = computed(() =>
  lines.slice(0, revealed.value).map((text, i) => {
    if (i < lineIndex.value) return { shown: text, rest: '', current: false };
    if (i > lineIndex.value) return { shown: '', rest: text, current: false };
    return { shown: text.slice(0, charIndex.value), rest: text.slice(charIndex.value), current: true };
  }),
);

onMounted(() => start(500));
onBeforeUnmount(() => window.clearTimeout(timer));
</script>

<template>
  <div class="dialog px-box" @click="skipTyping">
    <span class="name">{{ profile.name }}</span>
    <p class="sr-only">{{ lines.slice(0, revealed).join(' ') }}</p>
    <div class="lines" aria-hidden="true">
      <p v-for="(line, i) in view" :key="i" class="line">
        <span>{{ line.shown }}</span><span v-if="line.current" class="caret">▌</span><span class="rest">{{ line.rest }}</span>
      </p>
    </div>
    <button v-if="hasMore" class="more" type="button" :disabled="typing" @click.stop="more">더보기 ▼</button>
  </div>
</template>

<style scoped>
.dialog { margin-top: 32px; padding: 20px 22px 16px; }
.name {
  position: absolute;
  top: -14px;
  left: 16px;
  padding: 2px 10px;
  font-family: var(--px);
  font-size: 11px;
  background: var(--accent);
  color: var(--on-accent);
  box-shadow: 0 0 0 2px var(--line);
}
.line { position: relative; margin: 0; font-size: 15px; line-height: 1.8; word-break: keep-all; }
.line + .line { margin-top: 2px; }
.rest { visibility: hidden; }
.caret { position: absolute; color: var(--accent); animation: blink 0.8s steps(2) infinite; }
.more {
  display: block;
  margin: 8px 0 0 auto;
  padding: 2px 4px;
  border: 0;
  background: none;
  cursor: pointer;
  font-size: 13px;
  color: var(--accent);
}
.more:disabled { visibility: hidden; }
.more:hover { text-decoration: underline; }
</style>
