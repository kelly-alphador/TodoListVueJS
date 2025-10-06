<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  events: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['open-modal','ouvrir-modal-listetache'])

const onEventClick = (event) => {
  emit('open-modal', event)
}

const formattedEvents = computed(() =>
  props.events.map(event => {
    let background = ''
    let borderColor = ''
    let textColor = ''
    
 
    if (event.status === 'en-attente') {
      background = '#FFF3CD' 
      borderColor = '#856404' 
      textColor = '#856404' 
    }
    else if (event.status === 'en-cours') {
      background = '#CCE5FF' 
      borderColor = '#004085' 
      textColor = '#004085' 
    }
    else if (event.status === 'terminee') {
      background = '#D4EDDA' 
      borderColor = '#155724' 
      textColor = '#155724' 
    }

    return {
      ...event,
      background,
      color: textColor, // Couleur du texte
      class: `status-${event.status}` // Classe CSS personnalisée
    }
  })
)

const onDateClique = (event) => {
  emit('open-modal', event)
}

// Récupérer la date depuis cell
const onBouttonVoirListCLick = (cell) => {
    console.log("Cellule complète:", cell);
    
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
      :events="formattedEvents"
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
/*:DEEP selecteur css qui permet de cibler le style css de l'autre composant on utlise deep car vuecal est une autre composant */
/* Styles personnalisés pour les événements selon leur statut */
:deep(.vuecal__event.status-en-attente) {
  background-color: #FFF3CD !important;
  border-left: 4px solid #856404 !important;
  color: #856404 !important;
}

:deep(.vuecal__event.status-en-cours) {
  background-color: #CCE5FF !important;
  border-left: 4px solid #004085 !important;
  color: #004085 !important;
}

:deep(.vuecal__event.status-terminee) {
  background-color: #D4EDDA !important;
  border-left: 4px solid #155724 !important;
  color: #155724 !important;
}

/* Style général des événements */
:deep(.vuecal__event) {
  font-weight: 600;
  border-radius: 4px;
  padding: 4px 8px;
}
</style>