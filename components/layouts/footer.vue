<template>
  <footer>
    <p>Copyright &copy; 2002~{{ year }} Willin Wang</p>
    <v-theme /> |
    <v-lang />
  </footer>
</template>

<script>
import VLang from './language';
import VTheme from './theme';

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
  text-align: center;
}
.switch {
  display: inline;
}
</style>
