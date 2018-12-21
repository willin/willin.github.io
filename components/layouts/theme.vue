<template>
  <nav class="switch">
    <template v-for="theme in themes">
      <span v-if="theme===currentTheme" :key="theme">
        {{ $t(`themes.${theme}`) }}
      </span>
      <a v-else :key="theme" href="#" @click.stop.prevent="toggleTheme">
        {{ $t(`themes.${theme}`) }}
      </a>
    </template>
  </nav>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      themes: ['light', 'dark']
    };
  },
  computed: {
    currentTheme() {
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
