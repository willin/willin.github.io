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
    </article>
  </main>
</template>

<script>
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
    console.log(this.codewars);
    window.test = this;
  }
};
</script>
