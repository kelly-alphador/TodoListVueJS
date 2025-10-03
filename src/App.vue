<script setup>
import { ref } from 'vue'
import CalendarVue from './components/CalendarVue.vue'
import ModalBox from './components/ModalBox.vue'
import ListTache from './components/ListTache.vue'


const modalRef = ref(null)
const modalTacheref=ref(null);
const DateSelectionner=ref(null)
const tachesDuJour = ref([]) // Nouveau state pour les tâches
//lorsu'on a les donnees depuis clendar on va le passer a l'aide de props aux modal
const handleOpenModal = (date) => {
  //console.log("Date reçue dans App:", date.toLocaleString())
  modalRef.value.OpenModal() //  ouvre le modal
  //Donnees pour le props
    DateSelectionner.value=date
    
};
const handleOpenListeTache = (data) => {
   // console.log("Données reçues:", data);
    tachesDuJour.value = data.evenements; // Stocker les événements
    console.log("les evenements",tachesDuJour.value);
    modalTacheref.value.AfficheModalTache();
};

const events = ref([
  {
    start: '2025-10-05 10:00',
    end: '2025-10-05 12:00',
    title: 'Réunion test'
  }
]);
// quand ModalBox envoie les données d’un nouvel événement
const handleSaveData = (titre, start, end) => {
   // console.log("Données reçues:", { titre, start, end })
    //on enleve le T sur le formta date et on remplace par vide
    const formatStartDate = start.replace('T', ' ')
    const formatEndDate = end.replace('T', ' ')
  // on ajoute dans la liste des events
  events.value.push({
    start: formatStartDate, // ou formaté en string
    end: formatEndDate,
    title: titre
  })
  //console.log("Events après ajout:", events.value)
  // on ferme le modal après l’enregistrement
  modalRef.value.CloseModal()
}
</script>

<template>
  <div>
    <h1>Mon Calendrier</h1>
    <ListTache ref="modalTacheref" :taches="tachesDuJour"/>
    <CalendarVue @open-modal="handleOpenModal" :events="events" @ouvrir-modal-listetache="handleOpenListeTache"/> 
    <ModalBox ref="modalRef"  @save-data="handleSaveData" :dateTime="DateSelectionner "/>
  </div>
</template>


<style scoped>
</style>