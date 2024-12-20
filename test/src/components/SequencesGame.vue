<template>
  <div class="game-container sequence-test-container">
    <button @click="$emit('goHome')">← Назад</button>
    <h1>Тест Числовых Последовательностей</h1>
    <p>
      <strong>"Тест Числовых Последовательностей"</strong> — это тест для развития логического мышления и аналитических способностей.
    </p>
    <p>
      <strong>Цель игры:</strong> Разгадать закономерность числовой последовательности и выбрать правильное число.
    </p>
    <p>
      В каждом вопросе вы увидите числовую последовательность с пропущенным элементом. Ваша задача — найти логическую связь между числами и выбрать правильный ответ из предложенных вариантов.
    </p>
    <p>
      Этот тест помогает улучшать навыки анализа, тренировать внимание и развивать математическое мышление. Удачи!
    </p>

    <button v-if="!gameStarted" @click="startGame" class="start-button">Начать тест</button>

    <div v-else>
      <div class="info">
        <p>Вопрос: {{ currentQuestion + 1 }}/{{ questions.length }}</p>
      </div>

      <div class="sequence">
        <p v-html="questions[currentQuestion].sequence"></p>
      </div>

      <div class="answers">
        <button
          v-for="(option, index) in questions[currentQuestion].options"
          :key="index"
          @click="handleAnswer(option)"
          :disabled="answered"
          class="answer-button"
        >
          {{ option }}
        </button>
      </div>

      <p v-if="answered" class="feedback">{{ feedback }}</p>
    </div>

    <div v-if="gameEnded" class="results">
      <h3>Тест завершён!</h3>
      <p>Вы ответили правильно на {{ correctAnswers }} из {{ questions.length }} вопросов.</p>
      <p>Ваш результат: {{ score }}%</p>
      <p class="final-message">{{ finalMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gameStarted: false,
      gameEnded: false,
      currentQuestion: 0,
      score: 0,
      answered: false,
      feedback: "",
      correctAnswers: 0,
      questions: [
        { sequence: "1, 2, ?, 4, 5", options: [2, 3, 1, 4], answer: 3 }, //Числа увеличиваются на 1
        { sequence: "1, 3, ?, 7, 9", options: [5, 3, 1, 13], answer: 5 }, //Нечетные числа
        { sequence: "1, 10, 3, 8, ?, 6, 7, 4, 9, 2", options: [8, 9, 5, 11], answer: 5 }, //Каждое следующее число больше или меньше предыдущего
        { sequence: "1, 3, 9, 27, ?, 243", options: [36, 48, 81, 54], answer: 81 }, //Число умножается на 3
        { sequence: "2, 3, 5, 7, 11, 13, 17, 19, ?, 29", options: [23, 22, 25, 30], answer: 23 }, //Простые числа
        { sequence: "916, 015, ?, 213, 312, 411", options: [123, 332, 113, 114], answer: 114 }, //Каждая цифра увеличивается справа и слева на +1
        { sequence: "23, 57, 1113, 1719, 2329, ?, 4143, 4753", options: [3137, 4122, 51232, 12523], answer: 3137 }, //Число составлено из следующего простого числа в каждой части
        { sequence: "1, 5, 16, 17, 18,<br>" + "2, 6, 17, 18, ?", options: [31, 22, 19, 5], answer: 19 }, //Первая строка повторяется во второй на +1
        { sequence: "1 - 2 - 5 - 7 - 8,<br>" + " 1 - 2 - 5 - 7 - 1,<br>" + "8 - 7 - ? - 8 - 2,<br>" + "7 - 5 - 2 - 1 - 5,<br>" + "5 - 2 - 1 - 8 - 7", options: [1, 2, 5, 8, 7], answer: 8 }, //Соседние числа
        { sequence: "6 - 2 - 7 - 6 - 6 - 2,<br>" + "2 - 0 - 7 - 0 - ? - 0,<br>" + "0 - 2 - 0 - 7 - 0 - 2,<br>" + "2 - 6 - 6 - 7 - 2 - 6,<br>" + "7 - 6 - 6 - 2 - 7 - 6,<br>" + "7 - 0 - 2 - 0 - 7 - 0<br>", options: [2, 0, 6, 7], answer: 2 }, //Цифры следуют закономерности повторения и симметрии
        { sequence: "3.14, 4.28, 5.46, 6.82, 7.64, ?", options: [8.99, 8.28, 8.38, 8.00], answer: 8.28 },
        { sequence: "8110423, 259974, 9814143, 5512166, 113322, ?", options: [334455, 7911132, 9841233, 872236], answer: 7911132 },
      ],
    };
  },
  computed: {
    finalMessage() {
      if (this.score >= 80) return "Вы настоящий мастер!";
      if (this.score >= 50) return "Хороший результат! Немного практики — и всё получится!";
      return "Может быть, вам ближе искусство?";
    },
  },
  methods: {
    startGame() {
      this.gameStarted = true;
      this.gameEnded = false;
      this.currentQuestion = 0;
      this.score = 0;
      this.correctAnswers = 0;
      this.answered = false;
      this.feedback = "";
    },
    handleAnswer(option) {
      if (this.answered) return;

      this.answered = true;
      const current = this.questions[this.currentQuestion];

      if (option === current.answer) {
        this.feedback = "Правильно!";
        this.correctAnswers++;
      } else {
        this.feedback = `Неправильно! Правильный ответ: ${current.answer}`;
      }

      this.score = Math.round((this.correctAnswers / this.questions.length) * 100);

      setTimeout(() => {
        this.moveToNextQuestion();
      }, 1500);
    },
    moveToNextQuestion() {
      this.answered = false;

      if (this.currentQuestion + 1 < this.questions.length) {
        this.currentQuestion++;
      } else {
        this.endGame();
      }
    },
    endGame() {
      this.gameStarted = false;
      this.gameEnded = true;
    },
  },
};
</script>

<style src="../assets/sequencesGame.css"></style>