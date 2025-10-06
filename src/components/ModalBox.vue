<script setup>
    import { ref,computed} from 'vue';
    const emit=defineEmits(['save-data'])
    const ShowModal=ref(false);
    const Tache=ref('');
    const selectedDateTime = ref('');
    const selectedEndDateTime = ref('');
    const props =defineProps({
        dateTime:{
            type:Date,
            
        }
    });
    const SaveData = () => {
    emit('save-data', Tache.value, selectedDateTime.value, selectedEndDateTime.value, 'en-attente'); // ✅ Avec tiret
    CloseModal()
    console.log("je suis enregistre")
    Tache.value = '';
    }
    //on creer la fonction pour ouvrir et fermer le modal
    const OpenModal=()=>
    {
        ShowModal.value=true;
           if (props.dateTime) {
        const year = props.dateTime.getFullYear();
        const month = String(props.dateTime.getMonth() + 1).padStart(2, '0');
        const day = String(props.dateTime.getDate()).padStart(2, '0');
        const hours = String(props.dateTime.getHours()).padStart(2, '0');
        const minutes = String(props.dateTime.getMinutes()).padStart(2, '0');
        selectedDateTime.value = `${year}-${month}-${day}T${hours}:${minutes}`;
        const endHours = String((props.dateTime.getHours() + 1) % 24).padStart(2, '0');
        selectedEndDateTime.value = `${year}-${month}-${day}T${endHours}:${minutes}`;
    }
    }
    const CloseModal=()=>{ShowModal.value=false}
   

    //pour que les composants parent peux l'appele a l'aide de template ref
    defineExpose({OpenModal,CloseModal})
</script>
<template>
  <div class="modal-overlay" v-if="ShowModal">
    <div class="modal-container" >
      <!-- En-tête du modal -->
      <div class="modal-header">
        <h2 class="modal-title">
          <span class="icon">📅</span>
          Nouvel événement
        </h2>
        <button class="close-btn" @click="CloseModal">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- Corps du modal -->
      <div class="modal-body">
        <div class="event-form">
          <!-- Titre -->
          <div class="form-group">
            <label for="title" class="form-label">
              <span class="label-icon">✨</span>
              Titre
            </label>
            <input 
              type="text" 
              id="title" 
              class="form-input"
              placeholder="Ex: Réunion d'équipe"
              v-model="Tache"
            />
          </div>

          
          <div class="form-group">
                  <label for="start-time" class="form-label">
                <span class="label-icon">🕐</span>
                Début
              </label>
              <input 
                type="datetime-local"
                id="start-time" 
                class="form-input"
                v-model="selectedDateTime"
              />
          </div>
            <div class="form-group">
                 <label for="end-time" class="form-label">
                <span class="label-icon">🕐</span>
                Fin
              </label>
              <input 
                type="datetime-local" 
                id="end-time" 
                class="form-input"
                v-model="selectedEndDateTime"
              />
          </div>

       


          <!-- Boutons d'action -->
          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click="CloseModal">
              Annuler
            </button>
            <button type="button" class="btn btn-primary" @click="SaveData">
              <span>Enregistrer</span>
              <span class="btn-icon">✓</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-container {
  background: white;
  border-radius: 20px;
  width: 90%;
  max-width: 550px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 10px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon {
  font-size: 28px;
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

.modal-body {
  padding: 32px 28px;
  overflow-y: auto;
  max-height: calc(90vh - 100px);
}

.event-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 90%;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-label {
  font-weight: 600;
  font-size: 15px;
  color: #2d3748;
  display: flex;
  align-items: center;
  gap: 8px;
}

.label-icon {
  font-size: 18px;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 15px;
  transition: all 0.3s ease;
  font-family: inherit;
  background: #f7fafc;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

/* Styles pour le select personnalisé */
.select-wrapper {
  position: relative;
  width: 100%;
}

.form-select {
  width: 100%;
  padding: 14px 40px 14px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 15px;
  transition: all 0.3s ease;
  font-family: inherit;
  background: #f7fafc;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.form-select:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-select:hover {
  border-color: #cbd5e0;
}

.select-arrow {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #718096;
  transition: all 0.3s ease;
}

.form-select:focus ~ .select-arrow {
  color: #667eea;
  transform: translateY(-50%) rotate(180deg);
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.btn {
  flex: 1;
  padding: 14px 24px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-secondary {
  background: #e2e8f0;
  color: #4a5568;
}

.btn-secondary:hover {
  background: #cbd5e0;
  transform: translateY(-1px);
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
}

.btn-icon {
  font-size: 18px;
}

/* Responsive */
@media (max-width: 640px) {
  .modal-container {
    width: 95%;
    border-radius: 16px;
  }

  .modal-header {
    padding: 20px 20px;
  }

  .modal-title {
    font-size: 20px;
  }

  .modal-body {
    padding: 24px 20px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }
}
</style>