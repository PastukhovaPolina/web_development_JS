<template>
    <div class="bitcoin-app">
        <h1>Конвертер биткоина</h1>
        <button @click="getBitcoinRates">Обновить курсы</button>

        <div v-if="error" class="error">{{ error }}</div>

        <div v-if="btcRates.USD">
            <div class="current-rates">
                <h2>Текущая цена 1 биткоина:</h2>
                <p>USD (United States Dollar): {{ btcRates.USD }} $</p>
                <p>EUR (Euro): {{ btcRates.EUR }} €</p>
                <p>GBP (British Pound Sterling): {{ btcRates.GBP }} £</p>
            </div>

            <div class="conversion-form">
                <label for="btcAmount">Введите количество биткоинов:</label>
                <input type="number" v-model="btcAmount" min="0" />

                <div class="currency-selection">
                    <label for="convertTo">Выберите валюту для конвертации:</label>
                    <select v-model="convertTo">
                        <option value="USD">USD (United States Dollar)</option>
                        <option value="EUR">EUR (Euro)</option>
                        <option value="GBP">GBP (British Pound Sterling)</option>
                    </select>
                </div>

                <p class="result">Итоговая сумма: {{ convertBitcoin(btcAmount, convertTo).toFixed(2) }} {{ convertTo }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            btcRates: {},
            btcAmount: 1,
            convertTo: 'USD',
            error: '',
        };
    },
    methods: {
        getBitcoinRates() {
            axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,eur,gbp')
                .then(response => {
                    this.btcRates = {
                        USD: response.data.bitcoin.usd,
                        EUR: response.data.bitcoin.eur,
                        GBP: response.data.bitcoin.gbp,
                    };
                })
                .catch(err => {
                    this.error = 'Ошибка при получении данных о курсе биткоина';
                    console.error(err);
                });
        },
        convertBitcoin(amount, currency) {
            if (!this.btcRates[currency]) {
                this.error = 'Выберите правильную валюту для конвертации';
                return 0;
            }
            return amount * this.btcRates[currency]; // Перевод в выбранную валюту
        }
    },
    created() {
        this.getBitcoinRates();
    }
};
</script>

<style scoped>
.error {
    color: #d03939;
    margin-top: 20px;
}

.bitcoin-app {
    width: 900px;
    padding: 20px;
    border-radius: 20px;
    background: #1f0f24;
    text-align: center;
    color: #fff;
    margin-top: 30px;
}

.bitcoin-app h1 {
    margin-bottom: 20px;
}

.current-rates h2 {
    margin-bottom: 10px;
}

input[type="number"] {
    padding: 5px;
    font-size: 16px;
    margin-top: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 200px;
}

.currency-selection {
    margin-top: 15px;
}

select {
    margin-top: 10px;
    padding: 5px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 220px;
}

button {
    background-color: #e3bc4b;
    color: #fff;
    border-radius: 10px;
    border: 2px solid #b99935;
    padding: 10px 15px;
    margin: 10px;
    cursor: pointer;
    transition: transform 500ms ease;
}

button:hover {
    transform: scale(1.1) translateY(-5px);
}

.conversion-form {
    margin-top: 20px;
}

.result {
    margin-top: 15px;
    font-size: 18px;
    font-weight: bold;
}
</style>