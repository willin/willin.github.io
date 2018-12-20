<template>
  <footer>
    <p>Copyright &copy; 2002~{{ year }} Willin Wang</p>
    <p>
      当前主题： {{ theme }}
      <a href="javascript:void(0);" @click="toggleTheme">
        切换主题
      </a>
    </p>
    <p>
      <template v-for="locale in $i18n.locales">
        <nuxt-link
          v-if="locale.code !== $i18n.locale"
          :key="locale.code"
          :to="switchLocalePath(locale.code)"
        >
          {{ locale.name }}
        </nuxt-link>
      </template>
    </p>
  </footer>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      year: new Date().getFullYear()
    };
  },
  computed: {
    theme() {
      return this.$store.state.theme;
    }
  },
  methods: {
    ...mapMutations({
      toggleTheme: 'toggleTheme'
    })
  }
};
</script>

<style>
footer {
  text-align: center;
}
</style>
