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
      <nuxt-link to="/">
        简述
      </nuxt-link>
      <nuxt-link to="/writings">
        著作
      </nuxt-link>
      <nuxt-link to="/projects">
        项目
      </nuxt-link>
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
