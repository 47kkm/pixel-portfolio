<script setup lang="ts">
import { profile, careerYear } from '@/data/portfolio';
import { profileRows } from '@/data/site';
</script>

<template>
  <div class="profile px-box">
    <span class="label">PROFILE</span>
    <div class="name">
      <strong>{{ profile.name }}</strong>
      <span class="role">{{ profile.role }} · {{ careerYear }}년 차</span>
    </div>
    <h1 class="headline">
      {{ profile.headline.lead }} <mark>{{ profile.headline.tail }}</mark>
    </h1>
    <dl class="rows">
      <template v-for="row in profileRows" :key="row.term">
        <dt>{{ row.term }}</dt>
        <dd>{{ row.desc }}</dd>
      </template>
    </dl>
    <div class="actions">
      <RouterLink class="px-btn primary" :to="{ path: '/', hash: '#projects' }">프로젝트 보기</RouterLink>
      <a class="px-btn" :href="profile.github" target="_blank" rel="noopener">GitHub ↗</a>
    </div>
  </div>
</template>

<style scoped>
.profile { display: flex; flex-direction: column; padding: 22px 22px 20px; }
.name { display: flex; flex-wrap: wrap; align-items: baseline; gap: 10px; margin: 4px 0 10px; }
.name strong { font-family: var(--px); font-size: 22px; font-weight: 400; line-height: 1.2; }
.role { font-size: 12px; font-weight: 600; padding: 1px 7px; background: var(--ink); color: var(--bg); }
.headline { margin: 0 0 16px; font-size: 1.3rem; font-weight: 800; line-height: 1.45; letter-spacing: -.02em; word-break: keep-all; }
.headline mark { color: inherit; background: linear-gradient(transparent 58%, var(--hl) 58%); }
.rows {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 6px 14px;
  margin: 0 0 18px;
  padding: 12px 14px;
  font-size: 14px;
  background: var(--panel-2);
}
.rows dt { font-size: 13px; color: var(--ink-2); padding-top: 1px; }
.rows dd { margin: 0; font-weight: 600; }
.actions { display: flex; flex-wrap: wrap; gap: 14px 16px; margin-top: auto; }
</style>
