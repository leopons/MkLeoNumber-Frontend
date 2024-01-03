<template>
  <div>
    <div class="text-content --left">
      <div class="text-content__title">What is this&nbsp;?</div>

      <div class="text-content__text mt-3">
        This web app goal is to allow any
        <b>Super Smash Bros. Ultimate</b> competitive player to calculate what I
        call his <i><b>upset distance</b></i> to the best player in the world at
        this day, MkLeo. This is better known as <i><b>the MkLeo Number</b></i
        >.
      </div>
      <div class="text-content__text">
        This is a personal non-profit project made on my free time. I really
        intend to spend more time on building cool tools for the smash
        community, so don't hesitate to
        <a href="https://twitter.com/UnCalinSSB" target="_blank"
          >follow me on twitter</a
        >
        to keep you informed about my new projects (No worries, I tweet very
        sparingly, and only about smash). You can make suggestions for new tools
        too.
      </div>

      <div class="text-content__subtitle mt-3">The Upset Distance</div>
      <div class="text-content__text">
        What do I mean by that ? Given all the sets that have been played in
        registered tournaments for this game, your upset distance to MkLeo is
        the minimal number of wins you need to go from you to him.
      </div>
      <div class="text-content__text"><b>Which means&nbsp;:</b></div>
      <div class="text-content__text">
        <ul>
          <li>
            All the people that have won at least one time against MkLeo on a
            registered tournament have a distance of 1 from him. For exemple
            Glutonny has won against MkLeo at least one time, thus he has a
            distance of 1.
          </li>
          <li>
            All the people that have won at least one time against someone who
            has beaten MkLeo, have a distance of 2. Said differently, if you
            have beaten someone who is at a distance of 1 from MkLeo, you are
            yourself at a distance of 2. For exemple Raflow has won one time
            against Glutonny, thus he has a distance of 2.
          </li>
          <li>This goes on as many times as needed.</li>
          <li>
            Your final distance is your minimal distance, which means the
            shortest path of wins that lead from you to MkLeo.
          </li>
          <li>
            Some people may not have a score, if there is not any win path that
            can lead to MkLeo. This can happen for example with a player that
            has never won against anyone.
          </li>
        </ul>
      </div>

      <div class="text-content__subtitle mt-3">Important Disclaimer</div>
      <div class="text-content__text">
        I am very aware that <i>"this means nothing"</i>&nbsp;: a player true
        level can't be determined by this distance, as it is heavily influenced
        by one time out-performances, or one may even say luck. I just though
        this was fun. So please don't complain about that.
      </div>

      <div class="text-content__subtitle mt-3">The Data</div>
      <div class="text-content__text">
        I'm using data from
        <a href="https://smashdata.gg/" target="_blank">The Player Database</a
        >&#8288;. Go check it out, it's a really nice website that aggregates
        and displays data about Smash players. They've done a really nice work
        of reconciliation of player ids from different sources like smash.gg or
        challonge, there was not point for me in trying to re-do it.
      </div>
      <div class="text-content__text">
        I'm accounting for all the Smash Ultimate sets on the Player Database,
        excepts for DQs. A lot of people requested it, so it is now possible to
        filter out online tournaments from the calculation!
      </div>

      <div class="text-content__subtitle mt-3">Suggestions</div>
      <div class="text-content__text">
        If you have any ideas or suggestions, please make yourself heard by
        <a href="https://twitter.com/UnCalinSSB" target="_blank"
          >taging me on Twitter</a
        >&#8288;. You can also private message me, but i'm not gonna lie&nbsp;:
        I'll be more easily convinced if I can see that people share your
        opinion.
      </div>
      <div class="text-content__text">
        If you witness any bugs in the app, same thing, you can tell me on
        twitter. If you prefer you can also raise an issue on
        <a href="https://github.com/leopons/MkLeoNumber-Backend" target="_blank"
          >the public Github repository</a
        >&#8288;.
      </div>
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
