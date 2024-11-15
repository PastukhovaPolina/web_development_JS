<template>
    <div class="wrapper">
        <h1>Погодное приложение</h1>
        <div class="region-selection">
            <h2>Средняя температура по региону</h2>
            <select v-model="selectedRegion">
                <option disabled value="">Выберите регион</option>
                <option value="europe">Европа</option>
                <option value="asia">Азия</option>
                <option value="america">Америка</option>
                <option value="russia">Россия</option>
            </select>
            <button @click="getAverageTemp">Получить среднюю температуру</button>
            <div v-if="averageTemp != null" class="average-temp">
                <p>Средняя температура в регионе: {{ averageTemp }}°C</p>
            </div>
        </div>
        <div class="city-selection" v-if="selectedRegion">
            <p>Выберите город для получения погоды:</p>
            <div class="city-buttons">
                <button
                    v-for="city in regions[selectedRegion]"
                    :key="city"
                    @click="getWeather(city)"
                    :class="{ selected: selectedCity === city }"
                >
                    {{ city }}
                </button>
            </div>
        </div>
        <p class="error">{{ error }}</p>
        <div v-if="info != null" class="weather-info">
            <p>{{ showTemp }}</p>
            <p>{{ showFeelsLike }}</p>
            <p>{{ showMinTemp }}</p>
            <p>{{ showMaxTemp }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            error: "",
            info: null,
            averageTemp: null,
            selectedRegion: "",
            selectedCity: "",
            regions: {
                europe: ["Лондон", "Париж", "Берлин"],
                asia: ["Токио", "Пекин", "Сеул"],
                america: ["Нью-Йорк", "Лос-Анджелес", "Чикаго"],
                russia: ["Москва", "Санкт-Петербург", "Казань"]
            }
        }
    },
    computed: {
        showTemp() {
            return "Температура: " + this.info.main.temp + "°C";
        },
        showFeelsLike() {
            return "Ощущается как: " + this.info.main.feels_like + "°C";
        },
        showMinTemp() {
            return "Минимальная температура: " + this.info.main.temp_min + "°C";
        },
        showMaxTemp() {
            return "Максимальная температура: " + this.info.main.temp_max + "°C";
        }
    },
    methods: {
        getWeather(city) {
            this.selectedCity = city;
            this.error = "";

            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0ba39c23e0dd0a5b63ccdd6354473356`)
                .then(res => {
                    this.info = res.data;
                })
                .catch(err => {
                    this.error = "Ошибка при получении данных или город не найден";
                    console.error(err);
                });
        },
        getAverageTemp() {
            if (!this.selectedRegion) {
                this.error = "Пожалуйста, выберите регион";
                return false;
            }

            this.error = "";
            const cities = this.regions[this.selectedRegion];
            const requests = cities.map(city =>
                axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0ba39c23e0dd0a5b63ccdd6354473356`)
            );

            Promise.all(requests)
                .then(responses => {
                    const temps = responses.map(res => res.data.main.temp);
                    this.averageTemp = (temps.reduce((sum, temp) => sum + temp, 0) / temps.length).toFixed(2);
                })
                .catch(() => {
                    this.error = "Не удалось получить данные от некоторых городов";
                });
        }
    }
};
</script>

<style scoped>
.error {
    color: #d03939;
    margin-top: 20px;
}

.wrapper {
    width: 900px;
    padding: 20px;
    border-radius: 20px;
    background: #1f0f24;
    text-align: center;
    color: #fff;
}

.wrapper h1 {
    margin-bottom: 30px;
}

.region-selection {
    margin-bottom: 30px;
}

.city-selection {
    margin-bottom: 30px;
}

.city-buttons {
    margin-top: 20px;
}

.wrapper button:disabled {
    background: #746027;
    cursor: not-allowed;
}

.wrapper button {
    background: #e3bc4b;
    color: #fff;
    border-radius: 10px;
    border: 2px solid #b99935;
    padding: 10px 15px;
    margin: 10px;
    cursor: pointer;
    transition: transform 500ms ease;
}

.wrapper button:hover {
    transform: scale(1.1) translateY(-5px);
}

.wrapper button.selected {
    background-color: #6e2d7d;
}

select {
    margin-top: 10px;
    padding: 5px;
    font-size: 16px;
}

.average-temp {
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
}

.weather-info {
    margin-top: 30px;
    font-size: 18px;
}
</style>