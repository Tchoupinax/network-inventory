<template>
  <div class="side-panel" :class="{ 'side-panel active': opened }">
    <div
      v-if="network"
      class="side-panel-header"
      :style="`background-color: ${network.color};`"
    >
      {{ network.name }}
      <span class="side-panel-close" @click="$emit('close')">X</span>
    </div>

    <div class="side-panel-content">
      <p><strong>CIDR:</strong> {{ network.cidr }}</p>

      <h3 class="mt-8 text-xl underline mb-4">Devices</h3>
      <ul>
        <li
          v-for="device of network.devices"
          :key="device.id"
          class="flex justify-start items-start mb-3"
        >
          <div class="mr-2">
            <span v-if="isIpInCidr(device.ip, network.cidr)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 text-green-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                />
              </svg>
            </span>
            <span v-else>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 text-red-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"
                />
              </svg>
            </span>
          </div>

          <div>
            <div class="font-bold w-96 inline">{{ device.ip }}</div>
            —
            {{ device.name }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { isIpInCidr } from "../functions/is-ip-in-cidr";

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
  methods: {
    isIpInCidr,
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
