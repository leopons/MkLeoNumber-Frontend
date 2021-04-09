<template>
  <header>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
  </header>

  <div class="content-container">
    <router-view></router-view>
  </div>

  <footer>
    <div class="footer__line">
      <router-link to="/about">What is this ?</router-link> -
      <router-link to="/credits">Credits</router-link> -
      <a
        href="https://github.com/leopons/smash-upset-distance__backend"
        target="_blank"
        >Github</a
      >
      <span class="d-none d-md-inline"> - </span>
      <a
        href="https://twitter.com/UnCalinSSB"
        target="_blank"
        class="d-none d-md-inline"
        >Made with love by @UnCalinSSB</a
      >
    </div>
    <div class="footer__line d-md-none">
      <a href="https://twitter.com/UnCalinSSB" target="_blank"
        >Made with love by @UnCalinSSB</a
      >
    </div>
  </footer>
</template>

<style lang="scss">
@import "@/styles/commons.scss";
@import "@/styles/loader.scss";
@import "@/styles/path-page.scss";
@import "@/styles/search-page.scss";
</style>
