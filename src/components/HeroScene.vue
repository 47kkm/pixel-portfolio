<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import PixelSprite from './PixelSprite.vue';
import { mugSteamRows } from '@/lib/sprites';
import { screenLines } from '@/data/site';

// 창문 안 밤하늘 별 위치(%)
const stars = [[12, 20], [30, 56], [46, 16], [64, 44], [84, 24], [20, 80], [74, 76]];
const notes = ['TS', 'JS', '</>'];

const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const timers: number[] = [];

// 모니터: 한 줄씩 쳐지고, 다 쳐진 줄은 위로 쌓인다(최근 두 줄만 남김).
const history = ref<string[]>([]);
const typed = ref('');
let line = 0;
let char = 0;
let typeTimer = 0;

function later(fn: () => void, ms: number) {
  window.clearTimeout(typeTimer);
  typeTimer = window.setTimeout(fn, ms);
}
function finishLine() {
  typed.value = screenLines[line];
  char = typed.value.length;
  later(nextLine, reduced ? 3600 : 1800);
}
function typeChar() {
  if (char >= screenLines[line].length) return later(nextLine, 1800);
  typed.value = screenLines[line].slice(0, ++char);
  later(typeChar, 70);
}
function nextLine() {
  history.value = [...history.value, screenLines[line]].slice(-2);
  line = (line + 1) % screenLines.length;
  char = 0;
  typed.value = '';
  if (reduced) finishLine();
  else later(typeChar, 300);
}
// 모니터를 누르면 치던 줄을 끝내고, 다 쳐진 상태면 다음 줄로 넘어간다.
function pressMonitor() {
  if (char < screenLines[line].length) finishLine();
  else nextLine();
}

// 러버덕: 누르면 꽥 하고 뛰며 하트가 뜬다.
const quacking = ref(false);
const hearts = ref<number[]>([]);
let heartId = 0;
function quack() {
  quacking.value = false;
  requestAnimationFrame(() => (quacking.value = true));
  const id = ++heartId;
  hearts.value.push(id);
  window.setTimeout(() => (hearts.value = hearts.value.filter((h) => h !== id)), 900);
}

// 화분: 누르면 흔들린다.
const swaying = ref(false);
function sway() {
  swaying.value = false;
  requestAnimationFrame(() => (swaying.value = true));
}

// 머그: 김이 두 장면을 오간다.
const steam = ref(false);

onMounted(() => {
  if (reduced) finishLine();
  else {
    later(typeChar, 600);
    timers.push(window.setInterval(() => (steam.value = !steam.value), 600));
  }
});
onBeforeUnmount(() => {
  window.clearTimeout(typeTimer);
  timers.forEach((t) => window.clearInterval(t));
});
</script>

<template>
  <div class="scene px-box">
    <div class="room">
      <ul class="notes" aria-label="자주 쓰는 언어">
        <li v-for="n in notes" :key="n">{{ n }}</li>
      </ul>

      <div class="win">
        <div class="window">
          <PixelSprite class="sun" name="sun" :scale="2" />
          <PixelSprite class="moon" name="moon" :scale="2" />
          <i v-for="([x, y], i) in stars" :key="i" class="star" :style="{ left: `${x}%`, top: `${y}%`, animationDelay: `${(i % 4) * 0.5}s` }" />
          <PixelSprite class="cloud c1" name="cloud" :scale="2" />
          <PixelSprite class="cloud c2" name="cloud" :scale="2" />
        </div>
        <div class="sill" />
        <button class="obj plant" :class="{ sway: swaying }" type="button" data-label="화분" aria-label="화분 흔들기" @click="sway" @animationend="swaying = false">
          <PixelSprite name="plant" :scale="3" />
        </button>
      </div>

      <div class="station">
        <button class="monitor" type="button" aria-label="모니터: 다음 줄 보기" @click="pressMonitor">
          <span class="bezel">
            <span class="screen" aria-hidden="true">
              <span v-for="(h, i) in history" :key="`${i}-${h}`" class="done">&gt; {{ h }}</span>
              <span class="now">&gt; {{ typed }}<i class="cursor" /></span>
            </span>
          </span>
          <span class="neck" />
          <span class="base" />
        </button>
        <PixelSprite class="keyboard" name="keyboard" :scale="3" />
        <PixelSprite class="mouse" name="mouse" :scale="2" />
      </div>

      <button class="obj duck" :class="{ quack: quacking, talking: hearts.length }" type="button" data-label="러버덕" aria-label="러버덕 누르기" @click="quack" @animationend="quacking = false">
        <PixelSprite class="duck-body" name="duck" :scale="3" />
        <span v-if="hearts.length" class="quack-text" aria-hidden="true">꽥!</span>
        <PixelSprite v-for="h in hearts" :key="h" class="heart-pop" name="heart" :scale="2" />
      </button>
      <button class="obj keycap" type="button" data-label="K" aria-label="K 키 누르기">
        <PixelSprite name="keycap" :scale="2" />
      </button>
      <div class="obj mug" data-label="커피">
        <PixelSprite name="mug" :scale="2" :rows="steam ? mugSteamRows : undefined" />
      </div>
    </div>
    <div class="desk" />
  </div>
</template>

<style scoped>
.scene {
  min-height: 300px;
  overflow: hidden;
  container-type: inline-size;
  background: repeating-linear-gradient(90deg, var(--wall) 0 18px, var(--wall-2) 18px 21px);
}
/* 장면이 넓어져도 소품 배치는 가운데 520px 안에 모은다 */
.room { position: absolute; inset: 0; max-width: 520px; margin-inline: auto; }

/* 포스트잇 */
.notes { position: absolute; top: 28px; left: 26px; display: flex; gap: 10px; margin: 0; padding: 0; list-style: none; }
.notes li {
  position: relative;
  display: grid;
  place-items: center;
  width: 32px;
  height: 30px;
  font-family: var(--px);
  font-size: 11px;
  color: #262139;
  background: var(--note);
  box-shadow: 0 0 0 2px #262139, 2px 2px 0 2px rgba(38, 33, 57, .25);
}
.notes li:nth-child(2) { margin-top: 8px; }
/* 위쪽 압정 */
.notes li::before { content: ''; position: absolute; top: -5px; left: calc(50% - 3px); width: 6px; height: 5px; background: var(--accent); box-shadow: 0 0 0 1px #262139; }

/* 창문 + 창틀 + 화분 */
.win { position: absolute; top: 30px; right: 34px; width: min(150px, 32cqi); }
.window {
  position: relative;
  height: 96px;
  overflow: hidden;
  background: linear-gradient(var(--sky-1), var(--sky-2));
  box-shadow: 0 0 0 5px var(--frame), 0 0 0 8px #262139;
}
.window::before, .window::after { content: ''; position: absolute; z-index: 1; background: var(--frame); }
.window::before { top: 0; bottom: 0; left: calc(50% - 2px); width: 5px; }
.window::after { left: 0; right: 0; top: calc(50% - 2px); height: 5px; }
.sun, .moon { position: absolute; top: 10px; right: 12px; }
.moon, .star { display: none; }
:root[data-theme="dark"] .sun { display: none; }
:root[data-theme="dark"] .moon, :root[data-theme="dark"] .star { display: block; }
:root[data-theme="dark"] .cloud { opacity: .25; }
.star { position: absolute; width: 3px; height: 3px; background: #fff3c4; animation: blink 2.4s steps(2) infinite; }
.cloud { position: absolute; left: -40px; animation: drift linear infinite; }
.c1 { top: 14px; animation-duration: 26s; }
.c2 { top: 54px; animation-duration: 38s; animation-delay: -19s; opacity: .8; }
@keyframes drift { to { left: 100%; } }
.sill {
  position: absolute;
  top: calc(100% + 8px);
  left: -16px;
  right: -16px;
  height: 8px;
  background: var(--frame);
  box-shadow: 0 0 0 3px #262139;
}
.plant { position: absolute; right: -6px; bottom: -8px; z-index: 2; }
.plant.sway :deep(svg) { animation: sway 480ms steps(4); }
@keyframes sway { 25% { transform: translateX(-3px); } 75% { transform: translateX(3px); } }

/* 책상 */
.desk {
  position: absolute;
  inset: auto 0 0 0;
  height: 44px;
  background: linear-gradient(var(--desk-top) 0 12px, #262139 12px 15px, var(--desk) 15px 36px, var(--desk-2) 36px);
}

/* 모니터 + 키보드 + 마우스 */
.station { position: absolute; left: 26px; bottom: 34px; z-index: 2; width: min(212px, 60cqi); }
.monitor {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
}
.bezel {
  display: block;
  width: calc(100% - 6px);
  margin-top: 3px;
  padding: 7px;
  background: var(--bezel);
  box-shadow: 0 0 0 3px #262139;
}
.screen {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 70px;
  padding: 6px 8px;
  overflow: hidden;
  font-family: var(--px);
  font-size: 11px;
  line-height: 18px;
  text-align: left;
  white-space: nowrap;
  color: #eef1ff;
  background: #1d1a33;
}
.monitor:hover .screen { background: #23203d; }
.done { color: #7d89b8; }
.cursor {
  display: inline-block;
  width: 6px;
  height: 11px;
  margin-left: 2px;
  vertical-align: -1px;
  background: #8fb4ff;
  animation: blink 1s steps(2) infinite;
}
.neck { display: block; width: 18px; height: 12px; background: var(--bezel); box-shadow: -3px 0 0 #262139, 3px 0 0 #262139; }
.base { display: block; width: 66px; height: 6px; background: var(--bezel); box-shadow: 0 0 0 3px #262139; }
.keyboard { position: absolute; left: calc(50% - 39px); bottom: -8px; }
.mouse { position: absolute; left: calc(50% + 52px); bottom: -8px; }

/* 책상 위 소품 */
.obj { position: absolute; z-index: 2; padding: 0; border: 0; background: none; line-height: 0; }
button.obj { cursor: pointer; }
.obj::after {
  content: attr(data-label);
  position: absolute;
  left: 50%;
  bottom: calc(100% + 6px);
  transform: translateX(-50%);
  padding: 1px 6px;
  font-family: var(--px);
  font-size: 11px;
  line-height: 1.6;
  white-space: nowrap;
  color: #fff;
  background: #262139;
  opacity: 0;
  pointer-events: none;
}
.obj:hover::after, .obj:focus-visible::after { opacity: 1; }
.duck.talking::after { opacity: 0; }

.duck { right: 146px; bottom: 34px; }
.duck.quack .duck-body { animation: hop 420ms steps(6); }
@keyframes hop { 50% { transform: translateY(-18px); } }
.quack-text {
  position: absolute;
  left: -30px;
  bottom: calc(100% - 6px);
  padding: 1px 6px;
  font-family: var(--px);
  font-size: 11px;
  line-height: 1.6;
  white-space: nowrap;
  color: #262139;
  background: #fff;
  box-shadow: 0 0 0 2px #262139;
}
.heart-pop {
  position: absolute;
  left: calc(50% - 7px);
  bottom: 100%;
  pointer-events: none;
  animation: pop 900ms steps(9) forwards;
}
@keyframes pop { to { transform: translateY(-36px); opacity: 0; } }

.keycap { right: 92px; bottom: 34px; }
.keycap:active :deep(svg) { transform: translateY(3px); }
.mug { right: 30px; bottom: 34px; }

/* 좁은 화면: 키캡은 빼고 오리·머그를 모니터 오른쪽에 붙인다 */
@container (max-width: 440px) {
  .notes { top: 22px; left: 18px; }
  .win { top: 26px; right: 24px; }
  .station { left: 16px; }
  .keycap { display: none; }
  .duck { right: 58px; }
  .mug { right: 14px; }
}
</style>
