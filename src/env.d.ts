/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<object, object, unknown>;
  export default component;
}

// 기존 포트폴리오의 docs/.vuepress/data/main.js
declare module '@portfolio/.vuepress/data/main.js' {
  export const profile: {
    name: string;
    role: string;
    headline: { lead: string; tail: string };
    intro: string[];
    github: string;
  };
  export const highlightList: { value: string; label: string; to: string }[];
  export const techStack: { title: string; list: string[] }[];
  export const careerList: {
    company: string;
    team: string;
    role?: string;
    period: string;
    duration: string;
    current?: boolean;
    taskList?: string[];
    historyList?: { year: string; text: string }[];
  }[];
  export const educationList: { period: string; title: string; desc: string }[];
  export const relLink: { text: string; href: string }[];
}
