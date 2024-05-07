import { onMounted, onUnmounted, ref } from "vue";

export default function useCanvas(selector: HTMLCanvasElement | string) {
  const canvas = ref<HTMLCanvasElement | null>();
  const ctx = ref<CanvasRenderingContext2D | null>();

  const initSelector = (selector: HTMLCanvasElement | string) => {
    if (typeof selector === "string") {
      canvas.value = document.querySelector(selector) as HTMLCanvasElement;
    } else {
      canvas.value = selector;
    }
    ctx.value = canvas.value?.getContext("2d");
  };

  const clear = () => {
    canvas.value = null;
    ctx.value = null;
  };

  onMounted(() => {
    initSelector(selector);
  });

  onUnmounted(() => {
    clear();
  });

  return {
    canvas,
    ctx,
    initSelector,
  };
}
