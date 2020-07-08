<template>
  <main>
    <article>
      <section>
        <p>
          {{ $t('index.location') }}: {{ $t('index.nanjing') }}
        </p>
        <p>
          {{ $t('index.job') }}: {{ $t('index.freelancer') }}
        </p>
      </section>
      <section>
        <h3>Github</h3>
        <nav>
          {{ $t('unit.followers') }}: <strong>{{ github.count.followers }}</strong> |
          {{ $t('nav.projects') }}: <strong>{{ github.count.contributed + github.count.repositories }}</strong>
        </nav>
      </section>
      <section>
        <h3>{{ $t('projects.wechat_feed') }}: {{ $t('projects.v0') }}</h3>
        <nav>
          {{ $t('unit.posts') }}: <strong>{{ v0.postcount }}</strong> |
          {{ $t('unit.wordcount') }}: <strong>{{ v0.wordcount }}</strong>
        </nav>
      </section>
      <section>
        <h3>CodeWars &nbsp; <strong>{{ codewars.level }}</strong></h3>
        <nav>
          {{ $t('index.rank') }}: <strong>#{{ codewars.position }}</strong> |
          {{ $t('index.solutions') }}: <strong>{{ codewars.total }}</strong>
        </nav>
      </section>
      <Donate />
    </article>
  </main>
</template>

<script>
import { Luminous } from 'luminous-lightbox';
import v0 from '~/assets/cache/v0';
import github from '~/assets/cache/github';
import codewars from '~/assets/cache/codewars';
import Donate from '~/components/donate.vue';

export default {
  components: {
    Donate
  },
  data() {
    return {
      v0,
      codewars,
      github
    };
  },
  mounted() {
    setTimeout(() => {
      const images = document.querySelectorAll('.gallery');
      for (let i = 0; i < images.length; i += 1) {
        // eslint-disable-next-line no-new
        new Luminous(images[i]);
      }
    }, 300);
  }
};
</script>
