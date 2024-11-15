<template>
  <div class="add-task">
    <input type="text" v-model="newTask" placeholder="Введите новую задачу" />
    <button @click="submitTask">+</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTask: ''
    }
  },
  methods: {
    submitTask() {
      if (this.newTask.trim() !== '') {
        this.$emit('addTask', { text: this.newTask, completed: false });
        this.newTask = '';
      }
    }
  }
}
</script>

<style scoped>
.add-task {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

input {
  padding: 15px;
  font-size: 16px;
  width: 80%;
  border-radius: 50px;
  border: 1px solid #ddd;
  outline: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

input::placeholder {
  color: #bbb;
}

button {
  padding: 15px;
  font-size: 18px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2980b9;
}
</style>