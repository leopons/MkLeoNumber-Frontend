<template>
  <div>
    <div class="text-content --left">
      <div class="text-content__title">Credits</div>
      <div class="text-content__subtitle mt-3">The Player Database</div>
      <div class="text-content__text">
        As explained in the <router-link to="/about">About</router-link> page,
        this website relies on
        <a href="https://smashdata.gg/" target="_blank">The Player Database</a>
        data. Huge thanks to them, as it saved me precious time collecting the
        data from platforms like smash.gg or challonge. Please check it out,
        it's a really nice website that aggregates and display data about Smash
        players.
      </div>
      <div class="text-content__subtitle mt-3">Nintendo</div>
      <div class="text-content__text">
        This is a website about a
        <a href="https://www.nintendo.com/" target="_blank">Nintendo Co. Ltd</a>
        game. The visuals presented on this website come from the game and thus
        are Nintendo intellectual property.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreditPage",
  created() {
    document.getElementById("app").scrollTop = 0;
  },
};
</script>
