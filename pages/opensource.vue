<template>
  <main>
    <article>
      <section>
        <h2>
          Github: &nbsp;
          <a href="https://github.com/willin" target="_blank">
            <strong>willin</strong>
          </a>
        </h2>
        <nav>
          <p>
            {{ $t('unit.followers') }}: <strong>{{ github.count.followers }}</strong> |
            {{ $t('unit.starred') }}: <strong>{{ github.count.starred }}</strong>
          </p>
          <p>
            {{ $t('unit.repositories') }}: <strong>{{ github.count.repositories }}</strong> |
            {{ $t('unit.contributed') }}: <strong>{{ github.count.contributed }}</strong>
          </p>
        </nav>
      </section>
      <section>
        <ul class="github">
          <li v-for="project in github.projects" :key="project.url">
            <a :href="project.url" target="_blank">
              {{ project.name }}
            </a>
            <p>
              <span v-if="project.primaryLanguage" class="circle" :style="{backgroundColor: project.primaryLanguage.color}">
                &nbsp;
              </span>
              <span v-if="project.primaryLanguage">
                {{ project.primaryLanguage.name }}
              </span> |
              Starred: {{ project.stargazers }} |
              Forked: {{ project.forks }}
            </p>
            <p>{{ project.description }}</p>
          </li>
        </ul>
      </section>
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
  }
};
</script>
