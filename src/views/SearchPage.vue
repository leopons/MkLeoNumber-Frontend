<template>
  <div class="search-page">
    <h2>Find your MkLeo number&nbsp;!</h2>
    <p>
      Have <b>you</b> beaten <b>someone</b> who has beaten <b>MkLeo</b>&nbsp;?
    </p>
    <img class="search-page__example" src="/example1.png" />
    <p>
      Or maybe <b>you</b> have beaten <b>someone</b> who has beaten
      <b>someone</b> who has beaten <b>MkLeo</b>&nbsp;?
    </p>
    <img class="search-page__example" src="/example2.png" />
    <input
      placeholder="Search for your player tag"
      class="search-page__input"
      v-model="search_term"
      @keyup="fetchData"
      ref="input"
    />
    <div v-if="loading || no_results || players" class="search_box">
      <Loader v-if="loading && !players" class="m-2" />
      <Loader
        v-if="loading && players"
        class="search-page__fixed-loader"
        :showtext="false"
        :small="true"
      />
      <div v-if="no_results" class="m-3">No players found</div>
      <ul>
        <li v-for="player in players" :key="player.id">
          <router-link :to="'/path/' + player.id" class="player-result">
            <div class="player-result__box">
              <div class="player-result__tag-container">
                <b class="player-result__tag">{{ player.tag }}</b>
                <img
                  v-if="player.main_character"
                  class="player-result__main-char"
                  :src="
                    'https://smashdata.gg/static/assets/stock_icons/ultimate/' +
                    player.main_character +
                    '_0.png'
                  "
                />
              </div>
              <div class="player-result__last-tournament">
                Last tournament :
                <span v-if="player.last_tournament">
                  {{ player.last_tournament.name }} </span
                ><span v-else>Unknown</span>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
      <div v-if="error" class="text-content">
        <div class="text-content__title">Hum, this is awkward.</div>
        <div class="text-content__subtitle">My thing doesn't seem to work.</div>
        <div class="text-content__text mt-3">
          Check your internet connection and try to reload the page.
          <br />
          But honestly, I probably just messed something up. Please
          <a href="https://twitter.com/UnCalinSSB" target="_blank"
            >insult me on twitter</a
          >&#8288;.
        </div>
        <div class="text-content__text">
          <i>(I might be able to do something about it.)</i>
        </div>
      </div>
    </div>
    <div class="search-page__last-data-update">
      Last data update : 01 Jan. 2024
      <br />
      (I'll update this every quarter)
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import _ from "lodash";

export default {
  name: "SearchPage",
  data() {
    return {
      search_term: null,
      loading: false,
      error: null,
      players: null,
      no_results: false,
    };
  },
  components: { Loader },
  methods: {
    fetchData: _.debounce(function () {
      this.error = null;
      this.loading = true;
      this.no_results = false;
      const fetchedTerm = this.search_term;
      if (fetchedTerm) {
        // GET request using fetch with error handling
        fetch(
          process.env.VUE_APP_BACKEND_ROOT +
            "upsets/players/search/?term=" +
            fetchedTerm
        )
          .then(async (response) => {
            const data = await response.json();
            // make sure this request is the last one we did, discard otherwise
            if (this.search_term !== fetchedTerm) return;
            this.loading = false;
            // check for error response
            if (!response.ok) {
              const error = data;
              return Promise.reject(error);
            } else {
              if (data.length == 0) {
                this.no_results = true;
                this.players = null;
              } else {
                this.players = data;
              }
            }
          })
          .catch((error) => {
            this.loading = false;
            this.error = error.toString();
          });
      } else {
        this.loading = false;
        this.players = null;
      }
    }, 150),
  },
  mounted() {
    this.$refs.input.focus();
  },
};
</script>
