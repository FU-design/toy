import { effectScope, ref } from "vue";

export default function useCanvas(selector: HTMLCanvasElement | string) {
  const scope = effectScope();
  const canvas = ref<HTMLCanvasElement | null>();
  const ctx = ref<CanvasRenderingContext2D | null>();

  const initSelector = () => {
    scope.run(() => {
      if (typeof selector === "string") {
        canvas.value = document.querySelector(selector) as HTMLCanvasElement;
      } else {
        canvas.value = selector;
      }
      ctx.value = canvas.value?.getContext("2d");
    });
  };

  const cleanup = () => {
    scope.stop();
  };

  return {
    canvas,
    ctx,
    initSelector,
    cleanup,
  };
}
