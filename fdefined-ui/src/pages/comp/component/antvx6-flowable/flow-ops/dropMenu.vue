<template>
  <div class="dropdown-menu">
    <a-dropdown :trigger="['click']">
      <a> + </a>
      <template #overlay>
        <a-menu>
          <a-menu-item v-for="item in menuOps" :key="item.type">
            <div class="menu-item" @click="handleSelect(item)">
              <div class="icon">
                <img :src="item.icon" />
              </div>
              <span>{{ item.name }}</span>
            </div>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import { menuOps, type MenuItem } from "../actionOps";

const emits = defineEmits(["selected"]);

const handleSelect = (item: MenuItem) => {
  emits("selected", item);
};
</script>

<style lang="scss" scoped>
.menu-item {
  display: flex;
  .icon {
    height: 24px;
    margin-right: 10px;
    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }
}
</style>
