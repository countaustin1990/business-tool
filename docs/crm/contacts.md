---
title: CRM Contacts
---

<script setup>
import { ref, onMounted } from 'vue'
import { generateId } from '../utils/storage'
import { fetchContacts, createContact, deleteContact } from '../utils/api'

const contacts = ref([])
const newContact = ref({ name: '', email: '', phone: '' })
const loading = ref(true)
const error = ref(null)

async function loadContacts() {
  try {
    loading.value = true
    contacts.value = await fetchContacts()
  } catch (e) {
    error.value = 'Failed to load contacts'
  } finally {
    loading.value = false
  }
}

async function addContact() {
  if (!newContact.value.name || !newContact.value.email) return
  
  try {
    const contact = {
      id: generateId(),
      ...newContact.value,
      createdAt: new Date().toISOString()
    }
    
    await createContact(contact)
    await loadContacts()
    newContact.value = { name: '', email: '', phone: '' }
  } catch (e) {
    error.value = 'Failed to create contact'
  }
}

async function removeContact(id) {
  try {
    await deleteContact(id)
    await loadContacts()
  } catch (e) {
    error.value = 'Failed to delete contact'
  }
}

onMounted(() => {
  loadContacts()
})
</script>

# Contacts

<div v-if="error" class="error-message">
  {{ error }}
</div>

<div v-if="loading" class="loading">
  Loading contacts...
</div>

<div v-else>
  <div class="contact-form">
    <input v-model="newContact.name" placeholder="Name" />
    <input v-model="newContact.email" type="email" placeholder="Email" />
    <input v-model="newContact.phone" placeholder="Phone" />
    <button @click="addContact">Add Contact</button>
  </div>

  <div class="contacts-list">
    <div v-for="contact in contacts" :key="contact.id" class="contact-card">
      <h3>{{ contact.name }}</h3>
      <p>{{ contact.email }}</p>
      <p>{{ contact.phone }}</p>
      <button @click="removeContact(contact.id)" class="delete-btn">Delete</button>
    </div>
  </div>
</div>

<style>
.contact-form {
  display: grid;
  gap: 1rem;
  max-width: 400px;
  margin: 2rem 0;
}

.contact-form input {
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
}

.contacts-list {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

.contact-card {
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.delete-btn {
  background: var(--vp-c-danger);
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
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