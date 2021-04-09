<template>
  <div class="loader">
    <div v-if="showtext" class="loader__text">Loading...</div>
    <div :class="'loader__outer' + (small ? ' --small' : '')">
      <div :class="'loader__inner' + (small ? ' --small' : '')"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loader",
  props: {
    showtext: {
      type: Boolean,
      default: true,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
