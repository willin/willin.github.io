<template>
  <header>
    <h1>
      Willin
      <span id="logo">
      &nbsp;
      </span>
      Wang
    </h1>
    <p>
      {{ $t('motto') }}
    </p>
    <nav>
      <nuxt-link :to="localePath('index')">
        {{ $t('nav.index') }}
      </nuxt-link>
      <nuxt-link :to="localePath('service')">
        {{ $t('nav.service') }}
      </nuxt-link>
      <nuxt-link :to="localePath('writings')">
        {{ $t('nav.writings') }}
      </nuxt-link>
      <nuxt-link :to="localePath('projects')">
        {{ $t('nav.projects') }}
      </nuxt-link>
      <nuxt-link :to="localePath('opensource')">
        {{ $t('nav.opensource') }}
      </nuxt-link>
      <nuxt-link :to="localePath('resume')">
        {{ $t('nav.resume') }} &nbsp;
      </nuxt-link>
      <!-- <nuxt-link :to="localePath('hire')">
        {{ $t('nav.hire') }} &nbsp;
      </nuxt-link> -->
    </nav>
  </header>
</template>

<style>
header {
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}

header h1 {
  font-size: 3rem;
  line-height: 5rem;
}
header h2 {
  font-size: 1.5rem;
  line-height: 2rem;
  margin: 0.25em 0;
}
header p {
  order: -1;
  margin-bottom: 0.5em;
}

header nav {
  margin: 0.5em 0;
}
header nav a {
  padding: 0.1em 0.25em;
  color: var(--bg-color);
  background-color: var(--bg-text-color);
}
header nav a:hover, header nav a.nuxt-link-exact-active {
  color: var(--bg-text-color);
  background-color: var(--bg-color);
}

#logo {
  user-select: none;
  display: flex;
  width: 5rem;
  height: 5rem;
  margin: 0 0.2em;
  animation: move-around 4s infinite;
  background-image: url(/images/ww.png);
  background-size: 10rem 5rem;
  background-position: 0 0;
}
.light #logo {
  background-position: 100% 0;
}

@keyframes move-around {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-15deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(15deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
