<template>
  <div class="card-box">
    <header v-if="showHeader">
      <slot name="header"> </slot>
    </header>
    <main>
      <slot>
        <!-- 默认内容 -->
        <p>我是卡片</p>
      </slot>
    </main>
    <footer>
      <slot name="footer"> </slot>
    </footer>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  showHeader?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  showHeader: true,
});

const { showHeader } = props;
</script>

<style lang="scss" scoped>
.card-box {
  height: auto;
  margin: 16px 0;
  border-radius: 8px;
  box-shadow: 0 2px 5px 1px $shadow-light;
  background-color: $content-background-color;

  & > header {
    padding: 10px 16px;
    font-weight: 600;
    box-shadow: 0 0 5px 1px $shadow-light;
  }

  & > main {
    width: 100%;
    height: 100%;
    padding: 10px 16px 16px;
  }
}
</style>
