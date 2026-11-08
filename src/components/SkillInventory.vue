<script setup lang="ts">
import { computed, ref } from 'vue';
import { techStack } from '@/data/portfolio';
import { skillNotes, learningSkills } from '@/data/site';

interface Skill {
  name: string;
  mono: string;
  desc: string;
  group: string;
}

const groups = computed(() => {
  const owned = techStack.map((g) => ({
    title: g.title,
    items: g.list.map<Skill>((name) => ({
      name,
      mono: skillNotes[name]?.mono ?? name.slice(0, 2),
      desc: skillNotes[name]?.desc ?? '',
      group: g.title,
    })),
  }));
  const learning = {
    title: '수련 중',
    items: learningSkills.map<Skill>((s) => ({ ...s, group: '수련 중' })),
  };
  return [...owned, learning];
});

const selected = ref<Skill>(groups.value[1]?.items[0] ?? groups.value[0].items[0]);
</script>

<template>
  <div class="inventory">
    <div class="groups px-card">
      <div v-for="g in groups" :key="g.title" class="group">
        <h3>{{ g.title }}</h3>
        <div class="slots">
          <button
            v-for="item in g.items"
            :key="item.name"
            class="slot"
            type="button"
            :aria-pressed="selected.name === item.name"
            @click="selected = item"
            @mouseenter="selected = item"
          >
            <span class="icon">{{ item.mono }}</span>
            {{ item.name }}
          </button>
        </div>
      </div>
    </div>
    <aside class="info px-card" aria-live="polite">
      <span class="label">어디에 썼나</span>
      <div class="info-head">
        <span class="icon big">{{ selected.mono }}</span>
        <div>
          <strong>{{ selected.name }}</strong>
          <span>{{ selected.group }}</span>
        </div>
      </div>
      <p>{{ selected.desc }}</p>
    </aside>
  </div>
</template>

<style scoped>
.inventory { display: grid; grid-template-columns: 1fr 260px; gap: 28px; align-items: start; }
.groups { padding: 20px; }
.group + .group { margin-top: 20px; }
/* 분류 이름: 카테고리를 나누는 제목이라 도트 글꼴로 또렷하게 */
h3 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 10px;
  font-family: var(--px);
  font-size: 13px;
  font-weight: 400;
  color: var(--ink);
}
h3::after { content: ''; flex: 1; height: 2px; background: var(--line-soft); }
.slots { display: grid; grid-template-columns: repeat(auto-fill, minmax(76px, 1fr)); gap: 8px; }
.slot {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 8px 4px 6px;
  border: 0;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  background: var(--panel-2);
}
.slot:hover { background: var(--accent-soft); }
.slot[aria-pressed="true"] { background: var(--accent-soft); box-shadow: inset 0 0 0 2px var(--accent); }
.icon {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  font-family: var(--px);
  font-size: 11px;
  color: var(--ink);
  background: var(--panel);
  box-shadow: 0 0 0 2px var(--line-soft);
}
.info { position: sticky; top: 80px; padding: 18px; }
.info-head { display: flex; align-items: center; gap: 12px; margin: 8px 0 12px; }
.icon.big { width: 44px; height: 44px; font-size: 16px; }
.info-head strong { display: block; font-size: 16px; }
.info-head span { font-size: 12px; color: var(--ink-2); }
.info p { margin: 0; font-size: 14px; word-break: keep-all; }
@media (max-width: 860px) {
  .inventory { grid-template-columns: 1fr; }
  .info { position: static; }
}
</style>
