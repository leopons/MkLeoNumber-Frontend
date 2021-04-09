<template>
  <div>
    <div class="text-content">
      <div class="text-content__title">Hum, this is awkward.</div>
      <div class="text-content__subtitle">
        The infamous 404 : I can't find what your asking for.
      </div>
      <div class="text-content__text mt-3">
        If you came here with a direct link, please double check it's valid.
        <br />
        Otherwise, I probably just messed something up. Please
        <a href="https://twitter.com/UnCalinSSB" target="_blank"
          >insult me on twitter</a
        >.
      </div>
      <div class="text-content__text">
        <i>(I might be able to do something about it.)</i>
      </div>
      <router-link to="/" class="text-content__cta d-block mx-auto mt-4"
        >Go back to home</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFoundPage",
  created() {
    document.getElementById("app").scrollTop = 0;
  },
};
</script>
