import type { Directive } from 'vue';

// 화면에 들어올 때 한 번만 나타나게 하는 디렉티브. IntersectionObserver가 없으면 바로 보인다.
const observer =
  typeof IntersectionObserver === 'undefined'
    ? null
    : new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('in');
            observer?.unobserve(entry.target);
          }),
        { threshold: 0.1 },
      );

export const vReveal: Directive<HTMLElement> = {
  mounted(el) {
    el.classList.add('reveal');
    if (observer) observer.observe(el);
    else el.classList.add('in');
  },
  unmounted(el) {
    observer?.unobserve(el);
  },
};
