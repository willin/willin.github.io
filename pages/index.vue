<template>
  <h1>{{ $t('welcome') }}</h1>
</template>

<script>
import github from '~/assets/cache/github';

export default {
  data() {
    return {
      github
    };
  },
  mounted() {
    console.log(this.github);
  }
};
</script>
