<template>
  <div class="w-full flex justify-center">
    <div
      v-if="badNetwork != null"
      id="notification"
      class="notification"
      :class="{
        show: badNetwork != null,
      }"
      s
    >
      ⚠️ {{ badNetwork.cidr }} is not a private network ({{ badNetwork.name }})
    </div>

    <div
      class="container flex w-full"
      :class="{
        'mt-16': badNetwork != null,
      }"
    >
      <Card
        v-for="network of networks"
        :key="network.id"
        :network="network"
        :conflicts="conflicts"
        @click="
          selectedNetwork = network;
          detailsOpened = true;
        "
      />
    </div>

    <div id="sidePanel" class="side-panel"></div>

    <SidePanel
      :network="selectedNetwork"
      :opened="detailsOpened"
      @close="detailsOpened = false"
    />
  </div>
</template>

<script>
import { checkConflicts } from "../functions/check-conflicts";
import { isPrivateCIDR } from "../functions/is-private-network";

export default {
  data() {
    return {
      badNetwork: null,
      detailsOpened: false,
      networks: [],
      selectedNetwork: {},
      conflicts: [],
    };
  },
  mounted() {
    this.fetchData();
    setInterval(this.fetchData, 1000);
  },
  methods: {
    async fetchData() {
      const data = await $fetch("/api/");
      this.networks = data;

      this.conflicts = checkConflicts(this.networks);
      for (const network of this.networks) {
        if (!isPrivateCIDR(network.cidr)) {
          this.badNetwork = network;
        }
      }

      // Upgrade selected network if panel is open
      if (this.selectedNetwork) {
        const selectedNetwork = this.networks
          .filter((network) => network.name === this.selectedNetwork.name)
          .at(0);
        if (selectedNetwork) {
          this.selectedNetwork = selectedNetwork;
        }
      }
    },
  },
};
</script>

<style>
body {
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f7f7f7;
  position: relative;
}

.notification {
  background-color: #f44336;
  color: white;
  padding: 16px;
  font-size: 18px;
  font-weight: bold;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  z-index: 1000;
  display: none;
  transition: transform 0.3s ease-out;
}

.notification.show {
  transform: translateY(0);
  display: inline;
}

.container {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  padding: 40px;
}

.network-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  cursor: pointer;
}

.network-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.network-header {
  padding: 15px;
  color: white;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  position: relative;
}

.conflict-icon {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 20px;
  color: #ff6b6b;
}

.network-header:hover .conflict-icon {
  display: block;
}

.conflict-text {
  font-size: 12px;
  color: #ff6b6b;
}

.network-details {
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.details-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.details-item .label {
  font-weight: 600;
  color: #555;
  font-size: 16px;
}

.details-item .value {
  font-weight: 400;
  color: #333;
  font-size: 16px;
}

.usable-range {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #eee;
  font-size: 16px;
}

.network-footer {
  padding: 10px;
  text-align: center;
  background-color: #f1f1f1;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: center;
  gap: 12px;
  bottom: 0px;
}

.badge {
  display: inline-block;
  background-color: #64b5f6;
  color: white;
  border-radius: 12px;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 600;
}

.side-panel-content {
  padding: 20px;
}

.side-panel-close {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 20px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .container {
    padding: 20px;
    grid-template-columns: 1fr;
  }

  .side-panel {
    width: 100%;
  }
}

.details-grid {
  padding: 15px;
}
</style>
