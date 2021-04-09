<template>
  <div class="player-box">
    <div class="player-box__name">
      <b>{{ tag }}</b
      ><img
        v-if="maincharacter"
        :src="
          'https://smashdata.gg/static/assets/stock_icons/ultimate/' +
          maincharacter +
          '_0.png'
        "
      />
    </div>
    <div v-if="twittertag" class="player-box__twittertag">
      <a :href="'https://twitter.com/' + twittertag" target="_blank">
        @{{ twittertag }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerBox",
  data() {
    return {
      loading: true,
      twittertag: null,
    };
  },
  props: ["id", "tag", "maincharacter"],
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData();
  },
  methods: {
    fetchData() {
      // GET request using fetch with error handling
      fetch(
        process.env.VUE_APP_BACKEND_ROOT + "upsets/twittertag/player/" + this.id
      )
        .then(async (response) => {
          const data = await response.json();
          this.loading = false;
          // check for error response
          if (!response.ok) {
            const error = data;
            return Promise.reject(error);
          } else {
            this.twittertag = data.twitter_tag;
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
  },
};
</script>
