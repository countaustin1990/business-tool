const API_BASE_URL = 'http://localhost:3000/api';

// Contacts API
export async function fetchContacts() {
  const response = await fetch(`${API_BASE_URL}/contacts`);
  if (!response.ok) throw new Error('Failed to fetch contacts');
  return response.json();
}

export async function createContact(contact) {
  const response = await fetch(`${API_BASE_URL}/contacts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact)
  });
  if (!response.ok) throw new Error('Failed to create contact');
  return response.json();
}

export async function updateContact(id, contact) {
  const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact)
  });
  if (!response.ok) throw new Error('Failed to update contact');
  return response.json();
}

export async function deleteContact(id) {
  const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete contact');
}

// Deals API
export async function fetchDeals() {
  const response = await fetch(`${API_BASE_URL}/deals`);
  if (!response.ok) throw new Error('Failed to fetch deals');
  return response.json();
}

export async function createDeal(deal) {
  const response = await fetch(`${API_BASE_URL}/deals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(deal)
  });
  if (!response.ok) throw new Error('Failed to create deal');
  return response.json();
}

export async function updateDealStage(id, stage) {
  const response = await fetch(`${API_BASE_URL}/deals/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ stage })
  });
  if (!response.ok) throw new Error('Failed to update deal');
  return response.json();
}

export async function deleteDeal(id) {
  const response = await fetch(`${API_BASE_URL}/deals/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete deal');
}

// Custom Emojis API
export async function fetchCustomEmojis() {
  const response = await fetch(`${API_BASE_URL}/emoji`);
  if (!response.ok) throw new Error('Failed to fetch custom emojis');
  return response.json();
}

export async function createCustomEmoji(emoji) {
  const response = await fetch(`${API_BASE_URL}/emoji`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(emoji)
  });
  if (!response.ok) throw new Error('Failed to create custom emoji');
  return response.json();
}

export async function deleteCustomEmoji(id) {
  const response = await fetch(`${API_BASE_URL}/emoji/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete custom emoji');
}