<script setup>
import { ref } from 'vue'


const props=defineProps({
  events: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['open-modal'])

const onEventClick = (event) => {
  console.log('Événement cliqué:', event)
  emit('open-modal', event) // ✅ nom en kebab-case
}

const onDateClique = (event) => {
  console.log("La date sélectionnée est:", event)
  emit('open-modal', event) // ✅ pareil ici
}
</script>

<template>
  <div class="calendar-container">
    <VueCal
      :events="props.events"
      :time-from="6 * 60"
      :time-to="23 * 60"
      :disable-views="['years', 'year']"
      default-view="month"
      locale="fr"
      @event-click="onEventClick"
      @cell-click="onDateClique"
    />
  </div>
</template>

<style scoped>
.calendar-container {
  height: 700px;
  width: 100%;
}
</style>