<template lang="pug">
  #app
    router-view
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
    @import 'assets/css/car.css';
    #app{height: 100%;min-height: 100%;}
    body{
        margin:0;padding:0;
    }
</style>
