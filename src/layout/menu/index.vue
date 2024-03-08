<template>
  <header class="web-menu">
    <div class="web-title">{{ "Fdefined" }}</div>
    <section class="web-ops">
      <div
        class="web-sub-ops"
        v-for="m in QS"
        :key="m.category"
        @click="handleOptions(m)"
      >
        <div class="web-ops-text">
          <span>{{ m.category }}</span>
          <GgChevronDoubleDown />
        </div>
        <ul
          :class="[
            folds.includes(m.category) ? 'fold-active' : 'fold-deactive',
          ]"
          v-show="m.qestionList.length > 0"
          @click.stop
        >
          <li v-for="q in m.qestionList" :key="q.QS">
            <span>{{ q.QS }}</span>
          </li>
        </ul>
      </div>
    </section>
    <footer></footer>
  </header>
</template>

<script setup></script>

<style lang="scss" scoped></style>
