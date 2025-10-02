<script setup>
import { ref } from 'vue'
import CalendarVue from './components/CalendarVue.vue'
import ModalBox from './components/ModalBox.vue'

const modalRef = ref(null)
const DateSelectionner=ref(null)
const handleOpenModal = (date) => {
  console.log("Date reçue dans App:", date.toLocaleString())
  modalRef.value.OpenModal() // ✅ ouvre le modal
    DateSelectionner.value=date
    
}
const events = ref([
  {
    start: '2025-10-05 10:00',
    end: '2025-10-05 12:00',
    title: 'Réunion test'
  }
]);
// quand ModalBox envoie les données d’un nouvel événement
const handleSaveData = (titre, start, end) => {
    console.log("Données reçues:", { titre, start, end })
    const formatStartDate = start.replace('T', ' ')
    const formatEndDate = end.replace('T', ' ')
  // on ajoute dans la liste des events
  events.value.push({
    start: formatStartDate, // ou formaté en string
    end: formatEndDate,
    title: titre
  })
  console.log("Events après ajout:", events.value)
  // on ferme le modal après l’enregistrement
  modalRef.value.CloseModal()
}
</script>

<template>
  <div>
    <h1>Mon Calendrier</h1>
    <CalendarVue @open-modal="handleOpenModal" :events="events" /> 
    <ModalBox ref="modalRef"  @save-data="handleSaveData" :dateTime="DateSelectionner "/>
  </div>
</template>


<style scoped>
</style>