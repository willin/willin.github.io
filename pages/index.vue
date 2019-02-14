<template>
  <main>
    <article>
      <section>
        <p>
          Location: Nanjing, China
        </p>
        <p>
          Job: Freelancer
        </p>
      </section>
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
import Donate from '~/components/donate';

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
