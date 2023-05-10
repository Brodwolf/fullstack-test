<template>
  <vue3-progress />
  <router-view />
</template>

<script>
export default {
  name: "App",
  mounted() {
    this.$progress.finish();
  },
  created() {
    // exibe as animações do nprogress
    this.$progress.start();

    this.$router.beforeEach((to, from, next) => {
      this.$progress.start();
      next();
    });

    this.$router.afterEach(() => {
      this.$progress.finish();
    });
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap");
</style>