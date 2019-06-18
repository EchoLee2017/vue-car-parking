<template lang="pug">
    div.header-title(@click="back")
        i.back-icon.fa.fa-chevron-left
        span {{title}}
</template>
<style scoped>
    .header-title {
        width: 100%;
        height: 3rem;
        line-height: 3rem;
        font-size: 1rem;
        position: fixed;
        top: 0;
        padding-left: 1.5rem;
        vertical-align: middle;
        background: #fff;
        z-index: 10000;
    }

    .header-title i.back-icon {
        font-size: 1.2rem;
        color: #757575;
        margin-right: .5rem;
        vertical-align: middle;
    }

    .header-title span {
        vertical-align: middle;
    }
</style>
<script>
  export default {
    props: ['title'],
    methods: {
      back: function () {
        var vm = this;
        //为了防止一直在pay页面
      }
    }
  }
</script>
