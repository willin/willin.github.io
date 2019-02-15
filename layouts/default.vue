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
<style src="luminous-lightbox/dist/luminous-basic.min.css"></style>
<style src="~/assets/responsive.css"></style>

<style>
*,*::before,*::after {
  transition: all 350ms linear;
}

#app {
  background-image: url(/images/bg.jpg);
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
  font-size: 1.5vmin;
  font-family: 'Exo',specialSymbol,DINRegular,-apple-system,BlinkMacSystemFont,"PingFang SC","Helvetica Neue","Hiragino Sans GB","Segoe UI","Microsoft YaHei",微软雅黑,sans-serif;
}

a {
  color: var(--link-color);
}
nav a {
  padding-left: 0.5em !important;
}
a, a:link, a:visited,a:hover {
  text-decoration: none;
}
main {
  max-width: 480px;
}
section {
  margin-top: 1em;
}
.github li {
  margin-bottom: 0.5em;
}
.github .circle {
  display: inline-block;
  width: .75em;
  height: .75em;
  line-height: 1em;
  border-radius: 100%;
  vertical-align: middle;
}
</style>
