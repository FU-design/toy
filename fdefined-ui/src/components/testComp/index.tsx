import { defineComponent, provide, inject, Ref, ref } from "vue";

const Parent = defineComponent({
  name: "Parent",
  setup(_, { slots }) {
    // global state count
    const count = ref(0);

    //callback to update count
    const updateCount = () => {
      count.value++;
    };

    // provide count and updateCount to all children
    provide("count", {
      count,
      updateCount,
    });

    return () => (
      <div>
        <span>Parent: {count.value}</span>
        {slots.default?.()}
      </div>
    );
  },
});

const Child = defineComponent({
  name: "Child",
  setup(_, { slots }) {
    // count and updateCount not accessed here
    return () => <div>{slots.default?.()}</div>;
  },
});

const DeepChild = defineComponent({
  name: "DeepChild",
  setup() {
    // count and updateCount injected in DeepChild
    const { count, updateCount } = inject("count") as {
      count: Ref<number>;
      updateCount: () => void;
    };

    return () => <button onClick={() => updateCount()}>DeepChild: {count.value}</button>
  },
});

export { Parent, Child, DeepChild };