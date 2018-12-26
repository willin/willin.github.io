<template>
  <main>
    <section>
      <ul>
        <li>
          <a href="https://v0.chat" target="_blank">
            v0.chat
          </a>
          ：初瘦（公众号：<a href="/images/assholev0.jpg" class="gallery">
            assholev0
          </a>）
        </li>
        <li>
          Posts: {{ v0.postcount }}
        </li>
        <li>
          WordCount: {{ v0.wordcount }}
        </li>
        <li>
          <ul>
            <li v-for="post in v0.posts" :key="post.slug">
              <a :href="`https://v0.chat/p/${ post.slug }`">
                {{ post.title }}
              </a>
              <time :datetime="post.date">
                {{ post.date }}
              </time>
            </li>
          </ul>
        </li>
      </ul>
      <hr>
    </section>
    <ul>
      <li>
        <a href="https://leader.js.cool" target="_blank">
          leader.js.cool
        </a>
        ：《不可替代的团队领袖培养计划》
      </li>
      <li>
        <a href="https://learn.js.cool" target="_blank">
          learn.js.cool
        </a>
        ：《边学边玩酷js》
      </li>
      <li>
        <a href="https://codewars.js.cool" target="_blank">
          codewars.js.cool
        </a>
        ：《Codewars解题集》
      </li>
    </ul>
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
