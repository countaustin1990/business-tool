---
title: CRM Dashboard
---

<script setup>
import { ref, onMounted } from 'vue'
import { loadFromLocalStorage } from '../utils/storage'

const contacts = ref([])
const deals = ref([])

onMounted(() => {
  contacts.value = loadFromLocalStorage('contacts') || []
  deals.value = loadFromLocalStorage('deals') || []
})
</script>

# CRM Dashboard

<div class="dashboard-stats">
  <div class="stat-card">
    <h3>Total Contacts</h3>
    <p class="stat-number">{{ contacts.length }}</p>
  </div>
  
  <div class="stat-card">
    <h3>Active Deals</h3>
    <p class="stat-number">{{ deals.length }}</p>
  </div>
</div>

<style>
.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.stat-card {
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: var(--vp-c-brand);
}
</style>