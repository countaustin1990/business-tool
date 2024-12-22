---
title: CRM Deals
---

<script setup>
import { ref, onMounted } from 'vue'
import { generateId } from '../utils/storage'
import { fetchDeals, createDeal, updateDealStage, deleteDeal } from '../utils/api'

const deals = ref([])
const newDeal = ref({ title: '', value: '', stage: 'prospect' })
const loading = ref(true)
const error = ref(null)

const stages = [
  { id: 'prospect', label: 'Prospect' },
  { id: 'qualified', label: 'Qualified' },
  { id: 'proposal', label: 'Proposal' },
  { id: 'negotiation', label: 'Negotiation' },
  { id: 'closed', label: 'Closed' }
]

async function loadDeals() {
  try {
    loading.value = true
    deals.value = await fetchDeals()
  } catch (e) {
    error.value = 'Failed to load deals'
  } finally {
    loading.value = false
  }
}

async function addDeal() {
  if (!newDeal.value.title || !newDeal.value.value) return
  
  try {
    const deal = {
      id: generateId(),
      ...newDeal.value,
      createdAt: new Date().toISOString()
    }
    
    await createDeal(deal)
    await loadDeals()
    newDeal.value = { title: '', value: '', stage: 'prospect' }
  } catch (e) {
    error.value = 'Failed to create deal'
  }
}

async function changeDealStage(dealId, newStage) {
  try {
    await updateDealStage(dealId, newStage)
    await loadDeals()
  } catch (e) {
    error.value = 'Failed to update deal'
  }
}

async function removeDeal(id) {
  try {
    await deleteDeal(id)
    await loadDeals()
  } catch (e) {
    error.value = 'Failed to delete deal'
  }
}

onMounted(() => {
  loadDeals()
})
</script>

# Deals Pipeline

<div v-if="error" class="error-message">
  {{ error }}
</div>

<div v-if="loading" class="loading">
  Loading deals...
</div>

<div v-else>
  <div class="deal-form">
    <input v-model="newDeal.title" placeholder="Deal Title" />
    <input v-model="newDeal.value" type="number" placeholder="Deal Value" />
    <select v-model="newDeal.stage">
      <option v-for="stage in stages" :value="stage.id">{{ stage.label }}</option>
    </select>
    <button @click="addDeal">Add Deal</button>
  </div>

  <div class="pipeline">
    <div v-for="stage in stages" :key="stage.id" class="pipeline-stage">
      <h3>{{ stage.label }}</h3>
      <div class="deals">
        <div v-for="deal in deals.filter(d => d.stage === stage.id)" 
             :key="deal.id" 
             class="deal-card">
          <h4>{{ deal.title }}</h4>
          <p>${{ deal.value }}</p>
          <select v-model="deal.stage" @change="changeDealStage(deal.id, deal.stage)">
            <option v-for="s in stages" :value="s.id">{{ s.label }}</option>
          </select>
          <button @click="removeDeal(deal.id)" class="delete-btn">Delete</button>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.deal-form {
  display: grid;
  gap: 1rem;
  max-width: 400px;
  margin: 2rem 0;
}

.deal-form input,
.deal-form select {
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
}

.pipeline {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
  overflow-x: auto;
}

.pipeline-stage {
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  border-radius: 8px;
}

.deals {
  display: grid;
  gap: 1rem;
}

.deal-card {
  background: var(--vp-c-bg);
  padding: 1rem;
  border-radius: 4px;
}

.delete-btn {
  background: var(--vp-c-danger);
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
}

.error-message {
  color: var(--vp-c-danger);
  padding: 1rem;
  margin: 1rem 0;
  background: var(--vp-c-danger-soft);
  border-radius: 4px;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: var(--vp-c-text-2);
}
</style>