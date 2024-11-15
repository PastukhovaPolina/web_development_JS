<template>
  <div class="app">
    <h1>Ваши задачи</h1>

    <!-- Компонент для добавления новой задачи -->
    <AddTask @addTask="addTask" />

    <!-- Вывод списка задач -->
    <div v-if="tasks.length === 0" class="empty-list">Список дел пуст</div>
    <Task 
      v-for="(task, index) in tasks" 
      :key="index" 
      :task="task" 
      :index="index" 
      @deleteTask="deleteTask" 
      @toggleComplete="toggleComplete"
    />
  </div>
</template>

<script>
import AddTask from './components/AddTask.vue'
import Task from './components/Task.vue'

export default {
  components: { AddTask, Task },
  data() {
    return {
      tasks: [] // Массив задач
    }
  },
  methods: {
    // Метод для добавления новой задачи
    addTask(task) {
      this.tasks.push(task);
    },
    
    // Метод для удаления задачи
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },

    // Метод для пометки задачи как выполненной
    toggleComplete(index) {
      this.tasks[index].completed = !this.tasks[index].completed;
    }
  }
}
</script>

<style scoped>
.app {
  width: 400px;
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px;
  background: #f5f7fa;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  color: #333;
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 24px;
  margin-bottom: 20px;
}

.empty-list {
  font-size: 18px;
  color: #999;
}
</style>
