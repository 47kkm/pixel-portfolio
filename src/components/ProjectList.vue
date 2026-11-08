<script setup lang="ts">
import { computed, ref } from 'vue';
import { projects, categories, type Category } from '@/data/portfolio';
import { categoryTone } from '@/data/site';

const current = ref<Category | '전체'>('전체');
const filters = computed(() => [
  { key: '전체' as const, count: projects.length },
  ...categories.map((c) => ({ key: c, count: projects.filter((p) => p.category === c).length })),
]);
const list = computed(() => (current.value === '전체' ? projects : projects.filter((p) => p.category === current.value)));
</script>

<template>
  <div>
    <div class="filters" role="group" aria-label="분류">
      <button
        v-for="f in filters"
        :key="f.key"
        class="filter"
        type="button"
        :aria-pressed="current === f.key"
        @click="current = f.key"
      >
        <i v-if="f.key !== '전체'" class="swatch" :class="`tone-${categoryTone[f.key]}`" />{{ f.key }} <span class="count">{{ f.count }}</span>
      </button>
    </div>
    <div class="grid">
      <RouterLink v-for="p in list" :key="p.no" class="card px-card" :to="`/projects/${p.no}`">
        <div class="top">
          <span class="tag" :class="`tone-${categoryTone[p.category]}`">{{ p.category }}</span>
          <span v-if="p.ongoing" class="ongoing">진행 중</span>
        </div>
        <h3>{{ p.title }}</h3>
        <p>{{ p.description }}</p>
        <ul class="chips">
          <li v-for="s in p.stack" :key="s">{{ s }}</li>
        </ul>
        <span class="period">{{ p.period }}</span>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.filters { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 24px; }
.filter {
  padding: 5px 13px;
  border: 0;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  background: var(--panel);
  box-shadow: 0 0 0 2px var(--line-soft);
}
.filter:hover { box-shadow: 0 0 0 2px var(--line); }
.filter[aria-pressed="true"] { background: var(--ink); color: var(--bg); box-shadow: 0 0 0 2px var(--ink); }
.count { margin-left: 2px; font-weight: 400; opacity: .7; }
/* 분류 버튼 앞 작은 색 네모: 카드 뱃지 색과 짝을 맞춘다 */
.swatch { display: inline-block; width: 8px; height: 8px; margin-right: 7px; vertical-align: 1px; }
.swatch.tone-blue { background: var(--tone-blue-ink); }
.swatch.tone-violet { background: var(--tone-violet-ink); }
.swatch.tone-teal { background: var(--tone-teal-ink); }
.swatch.tone-slate { background: var(--tone-slate-ink); }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; }
.card { display: flex; flex-direction: column; padding: 16px 16px 14px; }
.card:hover h3 { color: var(--accent); }
.top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
.ongoing { font-size: 12px; font-weight: 700; color: var(--accent); }
h3 { margin: 0 0 2px; font-size: 15px; font-weight: 800; word-break: keep-all; }
p { margin: 0 0 12px; font-size: 13px; color: var(--ink-2); word-break: keep-all; }
.chips { margin-top: auto; }
.period { margin-top: 10px; font-size: 12px; color: var(--ink-2); }
@media (max-width: 640px) { .grid { grid-template-columns: 1fr; } }
</style>
