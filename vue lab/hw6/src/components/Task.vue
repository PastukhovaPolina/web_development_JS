<template>
  <div class="task" :class="{ completed: task.completed }">
    <div class="task-details" @click="$emit('toggleComplete', index)">
      <input type="checkbox" v-model="task.completed" />
      <span>{{ task.text }}</span>
    </div>
    <button @click.stop="$emit('deleteTask', index)">🗑️</button>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
.task {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

.task:hover {
  transform: scale(1.02);
}

.task.completed {
  background-color: #e0ffe0;
}

.task-details {
  display: flex;
  align-items: center;
  cursor: pointer;
}

input[type="checkbox"] {
  margin-right: 10px;
}

span {
  font-size: 16px;
  color: #333;
}

button {
  background-color: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #e74c3c;
}

button:hover {
  color: #c0392b;
}
</style>