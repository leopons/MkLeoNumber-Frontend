<template>
  <div>
    <div class="text-content --left">
      <div class="text-content__title">Want to buy me a coffee?</div>

      <div class="text-content__text mt-3">
        I've maintained this app for a few years now, and it still gets quite a
        lot of traffic. I'm really happy to see that people still use it, and
        I'm really grateful for all the nice messages I get.
      </div>
      <div class="text-content__text">
        I've been asked a few times if there was a way to donate, so here it is!
        Sure it costs me money and a bit of time to keep the app online, but
        it's not really about this: the gesture in itself would really make my
        day!
      </div>

      <div class="text-content__subtitle mt-3">Ko-fi</div>
      <div class="text-content__text">
        Easily send me a few bucks with Paypal or credit card on my Ko-fi page:
      </div>
      <a href="https://ko-fi.com/leopons" target="_blank" class="kofi-button">
        <img src="/ko-fi.webp" alt="Buy Me a Coffee at ko-fi.com" />
        Thanks !
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
  created() {
    document.getElementById("app").scrollTop = 0;
  },
};
</script>
