<template>
  <footer>
    <adsbygoogle />
    <p>Copyright &copy; 2002~{{ year }} Willin Wang</p>
    <v-theme /> |
    <v-lang />
    <p><small>苏ICP备17011988号-1</small></p>
  </footer>
</template>

<script>
import VLang from './language.vue';
import VTheme from './theme.vue';

export default {
  components: {
    VLang,
    VTheme
  },
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>

<style>
footer {
  margin-top: 1em;
  text-align: center;
  font-size: 0.8em;
}
.switch {
  display: inline;
}
</style>
