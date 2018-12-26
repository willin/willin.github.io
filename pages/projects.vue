<template>
  <main>
    <article>
      <section>
        <ul>
          <li>
            小程序： <a href="/images/mpv0.jpg" class="gallery">
              微聆
            </a>
          </li>
          <li>
            网易云音乐热评
          </li>
        </ul>
        <hr>
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
            Repositories: {{ github.count.repositories }}
          </li>
          <li>
            Contributed: {{ github.count.contributed }}
          </li>
          <li>
            Starred: {{ github.count.starred }}
          </li>
        </ul>
        <hr>
      </section>
      <section>
        <ul>
          <li v-for="project in github.projects" :key="project.url">
            <a :href="project.url" target="_blank">
              {{ project.name }}
            </a>
            <span v-if="project.primaryLanguage" :style="{color: project.primaryLanguage.color}">
              {{ project.primaryLanguage.name }}
            </span>
            <br>
            {{ project.description }}
            <br>
            Starred: {{ project.stargazers }} | Forks: {{ project.forks }}
          </li>
        </ul>
      </section>
    </article>
  </main>
</template>

<script>
import { Luminous } from 'luminous-lightbox';
import github from '~/assets/cache/github';

export default {
  data() {
    return {
      github
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
