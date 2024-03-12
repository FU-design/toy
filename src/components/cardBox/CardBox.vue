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

<style scoped>
.card-box {
  padding: 1rem;
  margin: 1rem;
  border-radius: 0.5rem;
  /* box-shadow: rgba(10, 9, 9, 0.1) 0px 0px 5px; */
  box-shadow: 0 0.125rem 0.3125rem 0.0625rem rgba(64, 60, 67, 0.16);
  background-color: #ffffffa4;
  overflow: auto;
}
.card-box header {
  font-weight: 600;
}
.card-box main {
  width: 100%;
  height: 100%;
}
</style>
