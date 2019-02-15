<template>
  <main>
    <article>
      <section>
        <h3>
          {{ $t('projects.wechat_mp') }}： <a href="/images/mpv0.jpg" class="gallery">
            微聆
          </a>
        </h3>
        <p>{{ $t('projects.weiling') }}</p>
      </section>
    </article>
  </main>
</template>

<script>
import { Luminous } from 'luminous-lightbox';

export default {

  mounted() {
    setTimeout(() => {
      // eslint-disable-next-line no-new
      new Luminous(document.querySelector('.gallery'));
    }, 300);
  }
};
</script>
