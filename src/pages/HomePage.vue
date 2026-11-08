<script setup lang="ts">
import HeroScene from '@/components/HeroScene.vue';
import ProfileCard from '@/components/ProfileCard.vue';
import IntroDialog from '@/components/IntroDialog.vue';
import SectionHead from '@/components/SectionHead.vue';
import HighlightGrid from '@/components/HighlightGrid.vue';
import CareerTimeline from '@/components/CareerTimeline.vue';
import ProjectList from '@/components/ProjectList.vue';
import SkillInventory from '@/components/SkillInventory.vue';
import { careerStart, projects } from '@/data/portfolio';
</script>

<template>
  <main>
    <section class="hero wrap" aria-label="소개">
      <div class="hero-grid">
        <HeroScene />
        <ProfileCard />
      </div>
      <IntroDialog />
    </section>

    <section class="section wrap" aria-labelledby="highlights">
      <SectionHead id="highlights" icon="trophy" label="HIGHLIGHTS" title="주요 성과" />
      <HighlightGrid />
    </section>

    <section id="career" class="section wrap" aria-labelledby="career-title">
      <SectionHead id="career-title" icon="flag" label="CAREER" title="경력" :sub="`${careerStart} UI 개발자로 시작해 지금까지`" />
      <CareerTimeline />
    </section>

    <section id="projects" class="section wrap" aria-labelledby="projects-title">
      <SectionHead id="projects-title" icon="scroll" label="PROJECTS" title="프로젝트" :sub="`${projects.length}개 · 최신순`" />
      <ProjectList />
    </section>

    <section id="skills" class="section wrap" aria-labelledby="skills-title">
      <SectionHead id="skills-title" icon="chest" label="SKILLS" title="기술" sub="칸을 누르면 어디에 썼는지 보여요" />
      <SkillInventory />
    </section>
  </main>
</template>

<style scoped>
.hero { padding-block: 36px 0; }
.hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
@media (max-width: 860px) {
  .hero-grid { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .hero { padding-block-start: 24px; }
}
</style>
