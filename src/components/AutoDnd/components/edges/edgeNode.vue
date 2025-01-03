<template>
  <div class="edge-node">
    <svg width="50" height="50">
      <defs>
        <marker id="arrow" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
          <path d="M 0 0 L 4 2 L 0 4 Z" fill="#888" />
        </marker>
      </defs>

      <line
        x1="25"
        y1="0"
        x2="25"
        y2="46"
        stroke="#888"
        stroke-width="1"
        marker-end="url(#arrow)"
      />
    </svg>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
