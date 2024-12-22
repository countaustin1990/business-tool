---
title: Emoji Generator
---

<script setup>
import { ref } from 'vue'
import { emojiCategories, getRandomEmoji } from '../utils/emojiUtils'

const selectedCategory = ref('')
const generatedEmoji = ref('😊')
const customText = ref('')
const emojiSize = ref('3rem')

function generateNewEmoji() {
  generatedEmoji.value = getRandomEmoji(selectedCategory.value || undefined)
}

function copyToClipboard() {
  navigator.clipboard.writeText(generatedEmoji.value)
}

const categories = Object.keys(emojiCategories)
</script>

# Emoji Generator

<div class="emoji-generator">
  <div class="emoji-display" :style="{ fontSize: emojiSize }">
    {{ generatedEmoji }}
  </div>
  
  <div class="controls">
    <select v-model="selectedCategory">
      <option value="">All Categories</option>
      <option v-for="category in categories" :value="category">
        {{ category.charAt(0).toUpperCase() + category.slice(1) }}
      </option>
    </select>
    
    <input type="range" v-model="emojiSize" min="1rem" max="6rem" step="0.5rem" />
    
    <button @click="generateNewEmoji" class="generate-btn">
      Generate New Emoji
    </button>
    
    <button @click="copyToClipboard" class="copy-btn">
      Copy to Clipboard
    </button>
  </div>
  
  <div class="category-preview">
    <div v-for="category in categories" :key="category" class="category-section">
      <h3>{{ category.charAt(0).toUpperCase() + category.slice(1) }}</h3>
      <div class="emoji-grid">
        <span v-for="emoji in emojiCategories[category]" 
              :key="emoji"
              class="emoji-item"
              @click="generatedEmoji = emoji">
          {{ emoji }}
        </span>
      </div>
    </div>
  </div>
</div>

<style>
.emoji-generator {
  max-width: 600px;
  margin: 0 auto;
}

.emoji-display {
  text-align: center;
  margin: 2rem 0;
  padding: 2rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.controls {
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;
}

.controls select,
.controls input {
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
}

.generate-btn,
.copy-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: var(--vp-c-brand);
  color: white;
}

.copy-btn {
  background: var(--vp-c-brand-light);
}

.category-preview {
  margin-top: 2rem;
}

.category-section {
  margin-bottom: 1.5rem;
}

.emoji-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
  gap: 0.5rem;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.emoji-item {
  font-size: 1.5rem;
  cursor: pointer;
  text-align: center;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.emoji-item:hover {
  background: var(--vp-c-bg-mute);
}
</style>