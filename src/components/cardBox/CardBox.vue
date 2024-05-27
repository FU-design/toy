<template>
  <div class="card-box">
    <header>
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

<script setup></script>

<style lang="scss" scoped>
.card-box {
  margin: 16px 0;
  border-radius: 8px;
  box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 0.16);
  background-color: #ffffffa4;
  /* overflow: auto; */
  & > header {
    padding: 10px 16px;
    font-weight: 600;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  }
  & > main {
    width: 100%;
    height: auto;
    padding: 10px 16px 16px;
    box-sizing: border-box;
  }
}
</style>
