<template>
  <main>
    <article>
      <section>
        <h3>
          小程序： <a href="/images/mpv0.jpg" class="gallery">
            微聆
          </a>
        </h3>
        <p>网易云音乐热评</p>
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
