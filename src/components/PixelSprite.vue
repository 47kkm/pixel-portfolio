<script setup lang="ts">
import { computed } from 'vue';
import { sprites, renderSprite, type Palette, type SpriteName } from '@/lib/sprites';

const props = withDefaults(defineProps<{ name: SpriteName; scale?: number; rows?: string[]; pal?: Palette }>(), {
  scale: 3,
});

// 그림 정의는 코드 안의 고정값이라 v-html로 넣어도 안전하다.
const svg = computed(() => {
  const base = sprites[props.name];
  return renderSprite({ pal: props.pal ?? base.pal, rows: props.rows ?? base.rows }, props.scale);
});
</script>

<template>
  <span class="sprite" aria-hidden="true" v-html="svg" />
</template>

<style scoped>
.sprite { display: inline-flex; line-height: 0; }
</style>
