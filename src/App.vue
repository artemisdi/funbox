<template>
  <div id="app">
    <test />
  </div>
</template>

<script>

import Test from "@/components/test";
export default {
  name: 'App',
  components: {
    Test
  }
}
</script>

<style>
  body {
    margin: 0;
  }
#app {
  margin: 0 auto;
  display: flex;
}
</style>
