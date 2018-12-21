<template>
  <nav class="switch">
    <template v-for="locale in $i18n.locales">
      <span v-if="locale.code === $i18n.locale" :key="locale.code" class="active">
        {{ locale.name }}
      </span>
      <nuxt-link v-else :key="locale.code" :to="switchLocalePath(locale.code)">
        {{ locale.name }}
      </nuxt-link>
    </template>
  </nav>
</template>
