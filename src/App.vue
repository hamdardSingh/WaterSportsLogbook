<template>
  <div id="app">
    <div style="padding: 0px; width: 150px; height: 200px; filter: drop-shadow(0px 0px 5px #666); background-color: rgb(255, 255, 255);">
      <!--Square color="#FF6668"/-->
    </div>


  </div>
</template>

<script>
import App1 from './App1.vue'
export default {
 components: {
     'Square': App1,
   },
  name: 'app',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  //margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}


.cardStyle{
  padding-left: 40%;
  padding-right: 40%;
}
</style>
