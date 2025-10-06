<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  taches: {
    type: Array,
    default: () => []
  }
});
const emit=defineEmits(['supprimer-tache']);
const ShowModalTache = ref(false);
const activeDropdown = ref(null);

const AfficheModalTache = () => {
    ShowModalTache.value = true
};

const FermerModal = () => {
    ShowModalTache.value = false
    activeDropdown.value = null
};

// Calculer la progression
const progression = computed(() => {
  if (props.taches.length === 0) return { percentage: 0, completed: 0, total: 0 };
  const completed = props.taches.filter(t => t.status === 'terminee').length;
  const percentage = Math.round((completed / props.taches.length) * 100);
  
  return { percentage, completed, total: props.taches.length };
});

// Formater les dates
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('fr-FR', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Gérer le dropdown
const toggleDropdown = (index) => {
  activeDropdown.value = activeDropdown.value === index ? null : index;
};

// Changer le status directement dans le tableau
const changerStatus = (index, nouveauStatus) => {
  props.taches[index].status = nouveauStatus;
  activeDropdown.value = null;
};

// Supprimer une tâche directement du tableau
const supprimerTache = (index) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
        emit('supprimer-tache',index)
  }

};

// Obtenir le libellé du status
const getStatusLabel = (status) => {
  const labels = {
    'en-attente': 'En attente',
    'en-cours': 'En cours',
    'terminee': 'Terminée'
  };
  return labels[status] || 'En attente';
};

defineExpose({ AfficheModalTache, FermerModal })
</script>

<template>
  <div class="modal-overlay" v-if="ShowModalTache">
    <div class="modal-container">
      <div class="modal-header">
        <h2>Liste des tâches</h2>
        <button class="close-button" @click="FermerModal">✕</button>
      </div>

      <!-- Barre de progression -->
      <div class="progress-section">
        <div class="progress-info">
          <span class="progress-label">Progression</span>
          <span class="progress-percentage">{{ progression.percentage }}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progression.percentage + '%' }"></div>
        </div>
        <div class="progress-details">
          <span>{{ progression.completed }} tâche(s) terminée(s) sur {{ progression.total }}</span>
        </div>
      </div>

      <!-- Liste des tâches dynamique -->
      <div class="tasks-list">
        <div v-if="taches.length === 0" class="no-tasks">
          Aucune tâche pour cette date
        </div>
        
        <div v-for="(tache, index) in taches" :key="index" class="task-card">
          <div class="task-header">
            <h3 class="task-name">{{ tache.title }}</h3>
            <div class="task-actions">
              <!-- Dropdown pour changer le statut -->
              <div class="status-dropdown">
                <button 
                  :class="['task-status', 'status-' + (tache.status || 'en-attente')]"
                  @click="toggleDropdown(index)"
                >
                  {{ getStatusLabel(tache.status || 'en-attente') }}
                  <span class="dropdown-arrow">▼</span>
                </button>
                <!-- Menu dropdown -->
                <div v-if="activeDropdown === index" class="dropdown-menu">
                  <button 
                    class="dropdown-item status-en-attente"
                    @click="changerStatus(index, 'en-attente')"
                  >
                    En attente
                  </button>
                  <button 
                    class="dropdown-item status-en-cours"
                    @click="changerStatus(index, 'en-cours')"
                  >
                    En cours
                  </button>
                  <button 
                    class="dropdown-item status-terminee"
                    @click="changerStatus(index, 'terminee')"
                  >
                    Terminée
                  </button>
                </div>
              </div>
              <!-- Bouton X pour supprimer -->
              <button class="delete-button" @click="supprimerTache(index)" title="Supprimer la tâche">
                ✕
              </button>
            </div>
          </div>
          <div class="task-details">
            <div class="task-detail-item">
              <span class="detail-label">📅 Début :</span>
              <span class="detail-value">{{ formatDate(tache.start) }}</span>
            </div>
            <div class="task-detail-item">
              <span class="detail-label">⏰ Fin :</span>
              <span class="detail-value">{{ formatDate(tache.end) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.no-tasks {
  text-align: center;
  padding: 2rem;
  color: #666;
  font-style: italic;
}

/* Overlay de la modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Container de la modal */
.modal-container {
  background-color: white;
  border-radius: 12px;
  width: 90%;
  max-width: 700px;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
}

/* En-tête */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  color: #6b7280;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.close-button:hover {
  background-color: #f3f4f6;
  color: #1f2937;
}

/* Section progression */
.progress-section {
  padding: 24px;
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.progress-label {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.progress-percentage {
  font-size: 20px;
  font-weight: 700;
  color: #4CAF50;
}

.progress-bar {
  width: 100%;
  height: 12px;
  background-color: #e5e7eb;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4CAF50 0%, #66BB6A 100%);
  border-radius: 6px;
  transition: width 0.3s ease;
}

.progress-details {
  font-size: 13px;
  color: #6b7280;
  text-align: center;
}

/* Liste des tâches */
.tasks-list {
  padding: 16px 24px 24px;
  overflow-y: auto;
  flex: 1;
}

/* Carte de tâche */
.task-card {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  transition: box-shadow 0.2s, transform 0.2s;
}

.task-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.task-card:last-child {
  margin-bottom: 0;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  gap: 12px;
}

.task-name {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  flex: 1;
}

.task-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* ========== DROPDOWN POUR CHANGER LE STATUT ========== */
.status-dropdown {
  position: relative;
}

.task-status {
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.task-status:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.dropdown-arrow {
  font-size: 8px;
  transition: transform 0.2s;
}

.task-status:hover .dropdown-arrow {
  transform: translateY(1px);
}

.status-en-attente {
  background-color: #FFF3CD;
  color: #856404;
}

.status-terminee {
  background-color: #D4EDDA;
  color: #155724;
}

.status-en-cours {
  background-color: #CCE5FF;
  color: #004085;
}

/* Menu dropdown qui apparaît quand on clique */
.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 10;
  min-width: 140px;
  animation: dropdownSlide 0.2s ease;
}

@keyframes dropdownSlide {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-item {
  width: 100%;
  padding: 10px 16px;
  border: none;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  text-transform: uppercase;
}

.dropdown-item:hover {
  opacity: 0.8;
}

.dropdown-item.status-en-attente {
  background-color: #FFF3CD;
  color: #856404;
}

.dropdown-item.status-en-cours {
  background-color: #CCE5FF;
  color: #004085;
}

.dropdown-item.status-terminee {
  background-color: #D4EDDA;
  color: #155724;
}

/* ========== BOUTON X POUR SUPPRIMER ========== */
.delete-button {
  background-color: #fee;
  color: #c00;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.delete-button:hover {
  background-color: #f44336;
  color: white;
  transform: scale(1.1);
  box-shadow: 0 2px 6px rgba(244, 67, 54, 0.3);
}

/* Détails de la tâche */
.task-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.task-detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.detail-label {
  font-size: 13px;
  font-weight: 500;
  color: #6b7280;
  min-width: 80px;
}

.detail-value {
  font-size: 13px;
  color: #1f2937;
}

/* Scrollbar personnalisée */
.tasks-list::-webkit-scrollbar {
  width: 6px;
}

.tasks-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.tasks-list::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.tasks-list::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>