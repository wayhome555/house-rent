<template>
  <div class="like-container" @click="toggleLike">
    <span class="heart" :class="{ liked: isLiked }">❤</span>
    <span class="count">{{ likeCount }}</span>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 初始点赞数（可替换为 props 或 API 数据）
const initialLikes = 10
const isLiked = ref(false)

const likeCount = computed(() => {
  return isLiked.value ? initialLikes + 1 : initialLikes
})

const toggleLike = () => {
  isLiked.value = !isLiked.value
}
</script>

<style scoped>
.like-container {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  user-select: none;
  /* padding: 4px 6px; */
  border-radius: 4px;
}

.heart {
  font-size: 18px;
  color: #999;
  transition: color 0.2s ease;
}

.heart.liked {
  color: #e91e63; /* Material Design 的 pink-500 */
}

.count {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}
</style>