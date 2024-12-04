<template>
  <div class="side-panel" :class="{ 'side-panel active': opened }">
    <div
      class="side-panel-header"
      :style="`background-color: ${network.color};`"
    >
      {{ network.name }}
      <span class="side-panel-close" @click="$emit('close')">X</span>
    </div>

    <div class="side-panel-content">
      <p><strong>CIDR:</strong> {{ network.cidr }}</p>

      <h3 class="mt-8 text-xl underline">Devices</h3>
      <ul>
        <li v-for="device of network.devices" :key="device.id">
          <span class="font-bold">{{ device.name }}</span> — {{ device.ip }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    opened: {
      required: true,
      type: Boolean,
    },
    network: {
      required: true,
      type: Object,
    },
  },
  emits: ["close"],
  mounted() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" || event.code === "Escape") {
        this.$emit("close");
      }
    });
  },
  unmounted() {
    document.removeEventListener("keydown", (event) => {
      if (event.key === "Escape" || event.code === "Escape") {
        this.$emit("close");
      }
    });
  },
};
</script>

<style>
.side-panel {
  position: fixed;
  top: 0;
  right: -800px;
  width: 500px;
  height: 100%;
  background-color: #ffffff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transition: right 0.4s ease-in-out;
  z-index: 1000;
  overflow-y: auto;
}

.side-panel.active {
  right: 0;
}

.side-panel-header {
  background-color: #4caf50;
  color: white;
  padding: 20px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
</style>
