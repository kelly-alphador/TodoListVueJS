<script setup>
import { ref } from 'vue'

const props = defineProps({
  events: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['open-modal','ouvrir-modal-listetache'])

const onEventClick = (event) => {
  //console.log('Événement cliqué:', event)
  emit('open-modal', event)
}

const onDateClique = (event) => {
  //console.log("La date sélectionnée est:", event)
  emit('open-modal', event)
}
// ✅ Correction : récupérer la date depuis cell
const onBouttonVoirListCLick = (cell) => {
    console.log("Cellule complète:", cell);
    
    // Utiliser cell.startDate qui contient la date de la cellule
    const cellDate = cell.startDate;
    console.log("Date de la cellule:", cellDate);
    
    // Filtrer les événements pour cette date spécifique
    const evenementsDuJour = props.events.filter(event => {
      const eventDate = new Date(event.start);
      const cellDateObj = new Date(cellDate);
      
      return eventDate.getFullYear() === cellDateObj.getFullYear() &&
             eventDate.getMonth() === cellDateObj.getMonth() &&
             eventDate.getDate() === cellDateObj.getDate();
    });
    
    console.log("Événements trouvés:", evenementsDuJour);
    
    emit('ouvrir-modal-listetache', {
      date: cellDate,
      evenements: evenementsDuJour
    });
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
    >
      <template #cell-content="{ cell }">
        <div class="custom-day-cell">
          <span class="day-number">{{ cell.content }}</span>
          <button class="task-button" @click.stop="onBouttonVoirListCLick(cell)">
            Voir les tâches
          </button>
        </div>
      </template>
    </VueCal>
  </div>
</template>

<style scoped>
.calendar-container {
  height: 700px;
  width: 100%;
}

.custom-day-cell {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}

.day-number {
  font-weight: bold;
  font-size: 14px;
}

.task-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 11px;
  transition: background-color 0.3s;
  z-index: 10;
  position: relative;
}

.task-button:hover {
  background-color: #45a049;
}
</style>