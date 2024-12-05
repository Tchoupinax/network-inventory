<template>
  <div class="network-card">
    <div
      class="network-header relative flex justify-center items-center"
      :style="`background-color: ${network.color};`"
    >
      {{ network.name }}
      <span
        v-if="conflicts.filter((c) => c.networkA === network.name).length > 0"
        class="text-xs absolute right-0 w-28 xl:w-16 xl:hover:w-40 h-full flex justify-center items-center bg-red-500 p-1"
      >
        conflict
        {{ conflicts.filter((c) => c.networkA === network.name)[0]?.networkB }}
      </span>
      <span
        v-if="conflicts.filter((c) => c.networkB === network.name).length > 0"
        class="text-xs absolute right-0 w-28 xl:w-16 xl:hover:w-40 h-full flex justify-center items-center bg-red-500 p-1"
      >
        conflict
        {{ conflicts.filter((c) => c.networkB === network.name)[0]?.networkA }}
      </span>
    </div>

    <div class="network-details">
      <div class="details-grid">
        <div class="details-item">
          <span class="label"> CIDR: </span>
          <span class="value">{{ network.cidr }} </span>
        </div>
        <div class="details-item">
          <span class="label">Mask:</span>
          <span class="value">{{ details.subnetMask }}</span>
        </div>
        <div class="details-item">
          <span class="label">Machines:</span>
          <span class="value">{{ details.numAddresses }}</span>
        </div>
        <div class="details-item">
          <span class="label">Broadcast:</span>
          <span class="value">{{ details.broadcast }}</span>
        </div>
      </div>

      <div class="network-footer">
        <span class="badge" :style="`background-color: ${network.color};`">{{
          details.firstIP
        }}</span>
        <span class="badge" :style="`background-color: ${network.color};`">{{
          details.lastIP
        }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  calculateNetworkDetails,
  type Details,
} from "../functions/calculate-network-details";

export default {
  props: {
    network: {
      required: true,
      type: Object,
    },
    conflicts: {
      required: true,
      type: Array,
    },
  },
  computed: {
    details(): Details {
      return calculateNetworkDetails(this.network.cidr);
    },
  },
};
</script>

<style>
.network-footer {
  background-color: #f1f1f1;
  border-top: 1px solid #eee;
  bottom: 0px;
  display: flex;
  gap: 12px;
  justify-content: center;
  padding: 10px;
  text-align: center;
}
</style>
