export const emojiCategories = {
  faces: ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊'],
  animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'],
  food: ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓'],
  activities: ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🎱'],
};

export function getRandomEmoji(category?: keyof typeof emojiCategories) {
  const emojis = category ? emojiCategories[category] : Object.values(emojiCategories).flat();
  return emojis[Math.floor(Math.random() * emojis.length)];
}