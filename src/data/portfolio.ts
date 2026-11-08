// 기존 포트폴리오의 데이터와 프로젝트 md를 읽어 이 사이트에 맞게 가공한다.
import {
  profile,
  highlightList,
  techStack,
  careerList,
  educationList,
  relLink,
} from '@portfolio/.vuepress/data/main.js';

export { profile, techStack, relLink };

export type Category = '서비스' | '프로모션' | '사내 도구' | '개인 프로젝트';
export const categories: Category[] = ['서비스', '프로모션', '사내 도구', '개인 프로젝트'];

export interface Project {
  no: number;
  title: string;
  description: string;
  category: Category;
  stack: string[];
  period: string;
  heading: string;
  body: string;
  ongoing: boolean;
  order: number;
  sortKey: number;
}

const files = import.meta.glob<string>('@portfolio/projects/project*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

// frontmatter는 `키: 값`, `키: [a, b]`, 따옴표 문자열만 쓰므로 그만큼만 읽는다.
function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  const data: Record<string, string | string[]> = {};
  if (!match) return { data, body: raw };
  for (const line of match[1].split(/\r?\n/)) {
    const at = line.indexOf(':');
    if (at < 0) continue;
    const key = line.slice(0, at).trim();
    const value = line.slice(at + 1).trim();
    const unquote = (s: string) => s.trim().replace(/^['"]|['"]$/g, '');
    data[key] = value.startsWith('[') && value.endsWith(']')
      ? value.slice(1, -1).split(',').map(unquote).filter(Boolean)
      : unquote(value);
  }
  return { data, body: raw.slice(match[0].length) };
}

// "2020.10 ~ 2020.11 · 2025.05 ~ 2025.06" → 마지막 구간의 시작 달 202505
function periodKey(period: string) {
  const last = period.split('·').pop() ?? period;
  const m = last.match(/(\d{4})\.(\d{2})/);
  return m ? Number(m[1] + m[2]) : 0;
}

export const projects: Project[] = Object.entries(files)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw);
    const title = String(data.title ?? '');
    const period = String(data.period ?? '');
    const heading = body.match(/^#\s+(.+)$/m)?.[1].trim() ?? title;
    return {
      no: Number(path.match(/project(\d+)\.md$/)?.[1]),
      title,
      description: String(data.description ?? ''),
      category: data.category as Category,
      stack: Array.isArray(data.stack) ? data.stack : [],
      period,
      heading,
      body: body.replace(/^#\s+.+$/m, '').trim(),
      ongoing: period.includes('진행 중'),
      order: Number(data.order ?? 99),
      sortKey: periodKey(period),
    };
  })
  .sort((a, b) => b.sortKey - a.sortKey || a.order - b.order);

export const findProject = (no: number) => projects.find((p) => p.no === no);

// 하이라이트의 링크 '/projects/project8.html' → 8
export const highlights = highlightList.map((h) => ({
  ...h,
  no: Number(h.to.match(/project(\d+)/)?.[1]),
}));

// 프론트엔드로 일한 개월 수(자영업 제외)로 "N년 차"를 계산한다.
function monthsOf(period: string, now: Date) {
  const [from, to] = period.split('~').map((s) => s.match(/(\d{4})\.(\d{2})/));
  if (!from) return 0;
  const start = Number(from[1]) * 12 + Number(from[2]);
  const nowIndex = now.getFullYear() * 12 + now.getMonth() + 1;
  const end = to ? Math.min(Number(to[1]) * 12 + Number(to[2]), nowIndex) : nowIndex;
  return Math.max(0, end - start + 1);
}
const workMonths = careerList
  .filter((c) => c.role)
  .reduce((sum, c) => sum + monthsOf(c.period, new Date()), 0);
export const careerYear = Math.floor(workMonths / 12) + 1;
export const careerStart = careerList.at(-1)?.period.split('~')[0].trim() ?? '';

export interface TimelineItem {
  period: string;
  org: string;
  text: string;
  now?: boolean;
}

// 경력 데이터를 오래된 순서의 타임라인으로 편다.
const university = educationList.find((e) => e.title.includes('대학교'));
const certificates = educationList.filter((e) => !e.title.includes('대학교'));
const firstJob = careerList.find((c) => c.historyList);
const sideJobs = careerList.filter((c) => !c.role);
const currentJob = careerList.find((c) => c.current);

export const timeline: TimelineItem[] = [
  ...(university ? [{ period: university.period, org: university.desc, text: university.title }] : []),
  ...(firstJob?.historyList ?? []).map((h, i) => ({
    period: h.year,
    org: i === 0 ? `${firstJob!.company} · ${firstJob!.team}` : firstJob!.company,
    text: h.text,
  })),
  ...sideJobs.map((c) => ({ period: c.period, org: c.company, text: `${c.team} (${c.duration})` })),
  ...(currentJob
    ? [{ period: currentJob.period, org: `${currentJob.company} · ${currentJob.role}`, text: currentJob.taskList?.[0] ?? '', now: true }]
    : []),
  ...certificates.map((e) => ({ period: e.period, org: e.desc, text: e.title })),
];
