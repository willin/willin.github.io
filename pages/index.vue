<template>
  <main>
    <article>
      <section>
        <ul>
          <li>
            Github
          </li>
          <li>
            Followers: {{ github.count.followers }}
          </li>
          <li>
            Projects: {{ github.count.contributed + github.count.repositories }}
          </li>
        </ul>
        <hr>
      </section>
      <section>
        <ul>
          <li>V0</li>
          <li>
            Posts: {{ v0.postcount }}
          </li>
          <li>
            WordCount: {{ v0.wordcount }}
          </li>
        </ul>
        <hr>
      </section>
      <section>
        <ul>
          <li>Codewars</li>
          <li>
            {{ codewars.level }}
          </li>
          <li>
            Position: #{{ codewars.position }}
          </li>
          <li>
            Solutions: {{ codewars.total }}
          </li>
        </ul>
        <hr>
      </section>
      <section>
        {{ $t('donate.text') }}:
        <ul>
          <li>
            <a href="/images/wx.png" class="gallery">
              {{ $t('donate.wechat') }}
            </a>
          </li>
          <li>
            <a href="/images/alipay.png" class="gallery">
              {{ $t('donate.alipay') }}
            </a>
          </li>
          <li>
            <a href="https://www.patreon.com/willin" target="_blank">
              {{ $t('donate.patreon') }}
            </a>
          </li>
          <li>
            <a href="https://www.paypal.me/willinwang" target="_blank">
              {{ $t('donate.paypal') }}
            </a>
          </li>
        </ul>
      </section>
    </article>
  </main>
</template>

<script>
import { Luminous } from 'luminous-lightbox';
import v0 from '~/assets/cache/v0';
import github from '~/assets/cache/github';
import codewars from '~/assets/cache/codewars';

export default {
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
