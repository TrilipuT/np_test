<script setup>
const emit = defineEmits(['action']);
defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'fs-1'
  }
})

function action() {
  emit('action');
}
</script>

<template>
  <button @click.prevent="action" class="btn btn-primary btn-lg" type="submit" :disabled="loading">
    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="loading"></span>
    <span class="" :class="size">
      <slot/>
    </span>
  </button>
</template>

<style scoped>

</style>
