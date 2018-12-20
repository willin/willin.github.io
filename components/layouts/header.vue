<template>
  <header>
    <h1>
      Willin
      <span id="logo">
      &nbsp;
      </span>
      Wang
    </h1>
  </header>
</template>

<style scoped>
h1 {
  font-size: 6vmin;
  line-height: 10vmin;
  margin: 0.5em 0;
}
#logo {
  display: flex;
  width: 10vmin;
  height: 10vmin;
  margin: 0 0.2em;
  animation: move-around 4s infinite;
  background-image: url(/images/ww.png);
  background-size: 20vmin 10vmin;
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
