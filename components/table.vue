<template>
  <div class="rounded-lg w-full">
    <table class="w-full">
      <thead class="w-full">
        <tr>
          <th v-for="header in headers" :key="header" class="">
            {{ header }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(row, index) in rows"
          :key="index"
          class="even:bg-slate-200 odd:bg-slate-100"
        >
          <div
            class="w-4 h-12"
            :style="`background-color: ${row?.color};`"
          ></div>

          <td class="w-1/3 px-6 text-center">
            {{ row.name }}
          </td>

          <td class="w-1/3 px-6 text-center">
            {{ row.ip }}
          </td>

          <td class="w-1/3 px-6 text-center">
            {{ row.mac }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
  },
};
</script>
