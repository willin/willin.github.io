<template>
  <div id="app" :class="theme">
    <v-header />
    <nuxt />
    <v-footer />
  </div>
</template>

<script>
/* eslint-disable max-len */
import VHeader from '~/components/layouts/header';
import VFooter from '~/components/layouts/footer';

export default {
  components: {
    VHeader,
    VFooter
  },
  computed: {
    theme() {
      return this.$store.state.theme;
    }
  }
};
</script>


<style src="~/assets/reset.css"></style>
<style src="~/assets/themes.css"></style>
<style>
*,*::before,*::after {
  transition: all 350ms ease-in-out;
}

#app {
  background-image: url(/bg.jpg);
  background-size: cover;
  background-blend-mode: soft-light;
  background-color: var(--bg-color);
  color: var(--bg-text-color);
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;/*垂直居中*/
  justify-content:  center;/*水平居中*/
}


div,h1,h2,h3,h4,h5,h6 {
  display: flex;
}

body {
  font-family: specialSymbol,DINRegular,-apple-system,BlinkMacSystemFont,"PingFang SC","Helvetica Neue","Hiragino Sans GB","Segoe UI","Microsoft YaHei",微软雅黑,sans-serif;
}
</style>
