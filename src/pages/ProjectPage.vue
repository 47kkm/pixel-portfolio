<script setup lang="ts">
import { computed } from 'vue';
import MarkdownIt from 'markdown-it';
import { projects, findProject } from '@/data/portfolio';
import { categoryTone } from '@/data/site';

const props = defineProps<{ no: string }>();

const md = new MarkdownIt({ html: true });
// 바깥 링크는 새 탭으로 연다
const defaultLinkOpen = md.renderer.rules.link_open ?? ((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options));
md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  const href = String(tokens[idx].attrGet('href') ?? '');
  if (/^https?:/.test(href)) {
    tokens[idx].attrSet('target', '_blank');
    tokens[idx].attrSet('rel', 'noopener');
  }
  return defaultLinkOpen(tokens, idx, options, env, self);
};

// md는 기존 포트폴리오 저장소의 내 파일이라 html을 그대로 렌더링한다.
// VuePress 전용 <Badge> 태그는 일반 span으로 바꾼다.
function toHtml(body: string) {
  const source = body.replace(/<Badge\s+type="(\w+)"\s+text="([^"]+)"[^>]*\/>/g, '<span class="md-badge $1">$2</span>');
  return md
    .render(source)
    .replace(/<h2>프로젝트 개요<\/h2>\s*<p>/, '<h2>프로젝트 개요</h2>\n<p class="md-lead">')
    .replace(/<h2>문제 및 해결<\/h2>\s*<ul>/, '<h2>문제 및 해결</h2>\n<ul class="md-issues">');
}

const project = computed(() => findProject(Number(props.no)));
const html = computed(() => (project.value ? toHtml(project.value.body) : ''));
const index = computed(() => projects.findIndex((p) => p.no === Number(props.no)));
const newer = computed(() => (index.value > 0 ? projects[index.value - 1] : undefined));
const older = computed(() => (index.value >= 0 && index.value < projects.length - 1 ? projects[index.value + 1] : undefined));
</script>

<template>
  <main class="wrap page">
    <RouterLink class="back" :to="{ path: '/', hash: '#projects' }">← 전체 프로젝트</RouterLink>

    <template v-if="project">
      <header class="head">
        <div class="meta">
          <span class="tag" :class="`tone-${categoryTone[project.category]}`">{{ project.category }}</span>
          <span class="period">{{ project.period }}</span>
        </div>
        <h1>{{ project.heading }}</h1>
        <ul class="chips">
          <li v-for="s in project.stack" :key="s">{{ s }}</li>
        </ul>
      </header>

      <article class="md px-box" v-html="html" />

      <nav class="pager" aria-label="다른 프로젝트">
        <RouterLink v-if="newer" class="px-btn" :to="`/projects/${newer.no}`">← {{ newer.title }}</RouterLink>
        <span v-else />
        <RouterLink v-if="older" class="px-btn" :to="`/projects/${older.no}`">{{ older.title }} →</RouterLink>
      </nav>
    </template>

    <p v-else class="empty">없는 프로젝트예요.</p>
  </main>
</template>

<style scoped>
.page { max-width: 820px; padding-top: 32px; }
.back { font-size: 14px; font-weight: 600; color: var(--ink-2); text-decoration: none; }
.back:hover { color: var(--accent); }
.head { margin: 20px 0 28px; }
.meta { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
/* 페이지 바탕 위라 칩은 흰 바탕으로 */
.head .chips li { background: var(--panel); }
.period { font-size: 13px; color: var(--ink-2); }
h1 { margin: 12px 0 14px; font-size: 1.6rem; font-weight: 800; line-height: 1.35; letter-spacing: -.02em; word-break: keep-all; }
.md { padding: 8px 26px 26px; }
.pager { display: flex; justify-content: space-between; gap: 16px; margin-top: 36px; }
.empty { margin: 40px 0; }

.md :deep(h2) {
  margin: 34px 0 14px;
  padding-bottom: 8px;
  font-family: var(--px);
  font-size: 18px;
  font-weight: 400;
  border-bottom: 2px solid var(--line);
}
.md :deep(h3) { margin: 20px 0 8px; font-size: 15px; }
.md :deep(p) { margin: 0 0 12px; }
.md :deep(ul) { margin: 0 0 12px; padding-left: 20px; }
.md :deep(li) { margin: 3px 0; word-break: keep-all; }
.md :deep(li::marker) { content: '▪ '; color: var(--accent); }
.md :deep(a) { color: var(--accent); }
.md :deep(code) { padding: 1px 5px; font-size: 13px; background: var(--panel-2); }
.md :deep(.md-lead) {
  padding: 14px 16px;
  font-size: 15px;
  line-height: 1.75;
  background: var(--panel-2);
  box-shadow: inset 3px 0 0 var(--accent);
}
.md :deep(.md-issues) { padding: 0; list-style: none; }
.md :deep(.md-issues > li) {
  margin: 0 0 14px;
  padding: 14px 16px;
  background: var(--panel-2);
}
.md :deep(.md-issues > li::marker) { content: ''; }
.md :deep(.md-issues ul) { margin: 8px 0 0; padding: 0; list-style: none; }
.md :deep(.md-issues ul li::marker) { content: ''; }
.md :deep(.md-badge) {
  display: inline-block;
  margin-right: 6px;
  padding: 0 7px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.7;
  color: #262139;
  vertical-align: 1px;
}
/* 문제·해결 뱃지도 프로젝트 분류와 같은 차분한 계열로: 문제 회청, 해결·고려 파랑, 개선 청록, 진행 중 라벤더 */
.md :deep(.md-badge.danger) { background: var(--tone-slate-bg); color: var(--tone-slate-ink); }
.md :deep(.md-badge.tip) { background: var(--tone-blue-bg); color: var(--tone-blue-ink); }
.md :deep(.md-badge.info) { background: var(--tone-teal-bg); color: var(--tone-teal-ink); }
.md :deep(.md-badge.warning) { background: var(--tone-violet-bg); color: var(--tone-violet-ink); }
/* 한 글에 프로젝트가 둘일 때 두 번째 제목: 본문 안 구분선이 있는 중간 제목 */
.md :deep(h1) {
  margin: 28px -26px 0;
  padding: 26px 26px 0;
  font-size: 20px;
  font-weight: 800;
  line-height: 1.4;
  border-top: var(--bw) solid var(--line);
}
@media (max-width: 640px) {
  .md { padding: 4px 16px 18px; }
  .md :deep(h1) { margin-inline: -16px; padding-inline: 16px; font-size: 18px; }
  .pager { flex-direction: column; }
}
</style>
