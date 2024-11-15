<template>
    <div id="app">
        <weather-app></weather-app>
        <bitcoin-app></bitcoin-app>
    </div>
</template>

<script>
import WeatherApp from './components/WeatherApp.vue';
import BitcoinApp from './components/BitcoinApp.vue';

export default {
    components: {
        WeatherApp,
        BitcoinApp
    }
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
