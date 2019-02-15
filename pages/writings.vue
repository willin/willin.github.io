<template>
  <main>
    <section>
      <h2>{{ $t('nav.writings') }}</h2>
      <ul>
        <li>
          <a href="https://leader.js.cool" target="_blank">
            leader.js.cool
          </a>
          : 《不可替代的团队领袖培养计划》
        </li>
        <li>
          <a href="https://learn.js.cool" target="_blank">
            learn.js.cool
          </a>
          : 《边学边玩酷js》
        </li>
        <li>
          <a href="https://codewars.js.cool" target="_blank">
            codewars.js.cool
          </a>
          : 《Codewars解题集》
        </li>
        <li>
          <a href="https://v0.chat" target="_blank">
            v0.chat
          </a>
          : 初瘦（{{ $t('projects.wechat_feed') }}: <a href="/images/assholev0.jpg" class="gallery">
            assholev0
          </a>）
        </li>
      </ul>
    </section>
    <section>
      <h2>{{ $t('projects.latest') }}</h2>
      <nav>
        {{ $t('unit.posts') }}: <strong>{{ v0.postcount }}</strong> |
        {{ $t('unit.wordcount') }}: <strong>{{ v0.wordcount }}</strong>
      </nav>
      <ul>
        <li v-for="post in v0.posts" :key="post.slug">
          <a :href="`https://v0.chat/p/${ post.slug }`">
            {{ post.title }}
          </a>
          <time :datetime="post.date">
            {{ new Date(post.date).toLocaleDateString() }}
          </time>
        </li>
      </ul>
    </section>

    <section>
      <h2>翻译及其他</h2>
      <ul>
        <li>
          <a href="https://js.cool" target="_blank">
            js.cool
          </a>
          : {{ $t('projects.menu') }}
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
import { Luminous } from 'luminous-lightbox';
import v0 from '~/assets/cache/v0';

export default {
  data() {
    return {
      v0
    };
  },
  mounted() {
    window.test = this;
    setTimeout(() => {
      // eslint-disable-next-line no-new
      new Luminous(document.querySelector('.gallery'));
    }, 300);
  }
};
</script>

<style>
.qr {
  width: 20vmin;
  height: 20vmin;
}
</style>
