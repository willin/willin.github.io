<template>
  <main>
    <nav>
      首页 著作 项目
    </nav>
    <article>
      概要统计、链接
    </article>
  </main>
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
    window.test = this;
  }
};
</script>
