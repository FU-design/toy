<template>
  <div class="qs">
    <!-- <div class="qs-pic">
      <img src="../../assets/images/yuan.png" />
    </div> -->
    <ul class="qs-category">
      <template v-for="qs in qModules">
        <li
          class="qs-category-item"
          :class="[
            currQModule.category == qs.category
              ? 'qs-category-active'
              : 'qs-category-deactive',
          ]"
          v-if="qs.logo"
          @click="handleqModule(qs)"
        >
          <IconProvider :size="40">
            <component :title="qs.category" :is="qs.logo"></component>
          </IconProvider>
        </li>
      </template>
    </ul>
    <div class="qs-ctx">
      <ul class="qs-ctx-wrp">
        <li v-for="(item, idx) in getQuestions" :key="idx">
          <h4>{{ item.QS }}</h4>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { IconProvider } from "@twist-space/vue3-icons";
import { QS } from "./questions";

const qModules = ref<any>(QS);
const currQModule = ref<any>(QS[0]);

const getQuestions = computed(() => {
  return currQModule.value.qestionList;
});

const handleqModule = (qs: any) => {
  currQModule.value = qs;
};
</script>
<style lang="scss" scoped>
.qs {
  width: 70vw;
  // height: calc(100vh - 60px);
  position: relative;
  margin: 0 auto;
  box-sizing: border-box;
  &-pic {
    margin-top: -30vh;
    border-radius: 8px;
    overflow: hidden;
    @include flex(center, center);
    img {
      width: 100%;
      height: 100%;
    }
  }
  &-ctx {
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    overflow: auto;
    &-wrp {
      list-style: none;
      margin: 0;
      padding: 0;
      overflow: auto;
      display: flex;
      flex-wrap: wrap;
      li {
        padding: 10px;
        margin: 10px;
        // flex: 0 1 calc((100% / 1) - 20px);
        // min-width: calc((100% / 1) - 20px);
        flex: 0 1 calc(100% - 20px);
        height: 200px;
        cursor: pointer;
        box-sizing: border-box;
        border-radius: 8px;
        background-color: #ffffff;
        box-shadow: 0 0 0 1px rgba(23, 23, 23, 0.05);
        &:hover {
          border-width: 1px;
        }
        h4 {
          margin: 0;
        }
      }
    }
  }
  &-category {
    position: absolute;
    left: -4rem;
    top: 1rem;
    padding: 8px;
    margin: 0;
    list-style: none;
    font-size: 1.5rem;
    cursor: pointer;
    background-color: #ffffff;
    border-radius: 1rem;

    &-item {
      margin: 1.5rem 0;
      box-sizing: border-box;
      @include flex(center);
    }
    &-active {
      // filter: drop-shadow(16px 16px 20px rgba(34, 34, 34, 0.411));
      // filter: drop-shadow(5px 5px 0 red) hue-rotate(180deg)
      //   drop-shadow(5px 5px 0 red);
      filter: drop-shadow(12px 12px 5px #2f31318a);
      transform: scale(1.2);
      transition: all 0.4s;
    }
    &-deactive {
      &:hover {
        filter: drop-shadow(12px 12px 5px #2f31318a);
        transition: all 0.4s;
      }
    }
  }
}
</style>
