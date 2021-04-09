<template>
  <div class="path-page">
    <div class="text-content">
      <Loader v-if="loading" />

      <div v-if="error" class="path-page__text-content">
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
        <router-link to="/" class="text-content__cta"
          >Go back to home</router-link
        >
      </div>

      <div v-if="not_found" class="path-page__text-content">
        <div class="text-content__title">Hum, this is awkward.</div>
        <div class="text-content__subtitle">
          I can't find your player id in my database.
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
        <router-link to="/" class="text-content__cta"
          >Go back to home</router-link
        >
      </div>

      <div v-if="no_path" class="path-page__text-content">
        <div class="text-content__title">
          I'm sorry, there isn't any {{ offline_only ? "offline" : "" }} win
          path that leads from you to MkLeo...
        </div>
        <img class="sad-kirby" src="/kirby.png" />
        <div class="text-content__text">
          Try to play more registered sets by attending tournaments on
          <a href="https://smash.gg" target="_blank">smash.gg</a> for
          example&nbsp;! <br />
          If you succeed in beating someone better than you, come back here, it
          should be enough&nbsp;:)
        </div>
        <router-link v-if="offline_only" :to="'/path/' + $route.params.id"
          >Try including online tournaments.</router-link
        >
        <router-link to="/" class="text-content__cta"
          >Go back to home</router-link
        >
      </div>

      <div v-if="path" class="path-page__text-content">
        <div class="text-content__title">
          Your {{ offline_only ? "offline" : "" }} MkLeo number is
          {{ upsetdistance }}&nbsp;!
        </div>
        <div v-if="upsetdistance == 1" class="text-content__subtitle">
          Don't act like you didn't know.
        </div>
        <div
          v-if="upsetdistance >= 2 && upsetdistance < 4"
          class="text-content__subtitle"
        >
          Damn, that's impressive.
        </div>
        <div
          v-if="upsetdistance >= 4 && upsetdistance < 7"
          class="text-content__subtitle"
        >
          Hey, that's actually not so far, don't you think&nbsp;?
        </div>
        <div v-if="upsetdistance >= 7" class="text-content__subtitle">
          And I'm sure you can get closer&nbsp;!<br />Come back in a few good
          wins&nbsp;:)
        </div>
        <div class="text-content__text">
          Check your shortest upset path below.
        </div>
        <router-link
          v-if="offline_only"
          :to="'/path/' + $route.params.id"
          class="text-content__offline-switch"
          >Include online tournaments</router-link
        >
        <router-link
          v-if="!offline_only"
          :to="'/path/' + $route.params.id + '/offline'"
          class="text-content__offline-switch"
          >Filter out online tournaments</router-link
        >
      </div>

      <div v-if="ismkleo" class="path-page__text-content">
        <div class="text-content__title">Hey Leo&nbsp;!</div>
        <div class="text-content__subtitle">Thanks for checking my app.</div>
        <div class="text-content__text">
          You are yourself, so I guess you are 0 wins away from yourself&nbsp;?
        </div>
        <router-link to="/" class="text-content__cta"
          >Go back to home</router-link
        >
      </div>
    </div>

    <div v-if="path" class="upset-path">
      <div class="upset-path__side-column --left"></div>
      <ul class="upset-path__path-list">
        <li v-for="node in path" :key="node.node_depth">
          <div class="player-row">
            <div :class="'player-row__side-column --depth-' + node.node_depth">
              <div>{{ node.node_depth }}</div>
              <div class="player-row__side-line"></div>
            </div>
            <PlayerBox
              :id="node.upset.winner.id"
              :tag="node.upset.winner.tag"
              :maincharacter="node.upset.winner.main_character"
            ></PlayerBox>
            <div :class="'player-row__side-column --depth-' + node.node_depth">
              <div class="player-row__side-line"></div>
            </div>
          </div>
          <div class="path-list__pipe">|</div>
          <div class="tournament-box">
            <div class="tournament-box__name">
              <svg
                class="tournament-box__name-wifi-icon"
                v-if="node.upset.tournament.online"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 469.333 469.333"
              >
                <g>
                  <path
                    d="M170.667,336.6l64,64l64-64C263.36,301.293,205.973,301.293,170.667,336.6z"
                  />
                  <path
                    d="M85.333,251.267L128,293.933c58.88-58.88,154.453-58.88,213.333,0L384,251.267
                  		C301.547,168.813,167.787,168.813,85.333,251.267z"
                  />
                  <path
                    d="M0,165.933L42.667,208.6c106.027-106.027,277.973-106.027,384,0l42.667-42.667C339.733,36.333,129.6,36.333,0,165.933z"
                  />
                </g>
              </svg>
              {{ node.upset.tournament.name }}
            </div>
            <div class="tournament-box__date">
              {{ node.upset.tournament.start_date }}
            </div>
            <div class="tournament-box__result">
              <span class="tournament-box__result-half --left">
                <li
                  v-for="character in node.upset.winner_characters"
                  :key="character"
                >
                  <img
                    class="tournament-box__character"
                    :src="
                      'https://smashdata.gg/static/assets/stock_icons/ultimate/' +
                      character +
                      '_0.png'
                    "
                  />
                </li>
                <span class="tournament-box__player-tag">{{
                  node.upset.winner.tag
                }}</span>
                -
                <span class="tournament-box__player-score --winner">{{
                  node.upset.winner_score
                }}</span>
              </span>
              -
              <span class="tournament-box__result-half --right">
                <span class="tournament-box__player-score --loser">{{
                  node.upset.loser_score
                }}</span>
                -
                <span class="tournament-box__player-tag">{{
                  node.upset.loser.tag
                }}</span>
                <li
                  v-for="character in node.upset.loser_characters"
                  :key="character"
                >
                  <img
                    class="tournament-box__character"
                    :src="
                      'https://smashdata.gg/static/assets/stock_icons/ultimate/' +
                      character +
                      '_0.png'
                    "
                  />
                </li>
              </span>
            </div>
          </div>
          <div class="path-list__pipe">|</div>
        </li>
        <li class="path-list__mkleo">
          <div class="player-row">
            <div class="player-row__side-column">
              <div class="player-row__side-line"></div>
            </div>
            <div class="player-box">
              <div class="player-box__name">
                <b>MkLeo</b>
              </div>
              <div class="player-box__twittertag">
                <a href="https://twitter.com/Mkleosb" target="_blank">
                  @Mkleosb
                </a>
              </div>
            </div>
            <div class="player-row__side-column">
              <div class="player-row__side-line"></div>
            </div>
            <img class="path-list__mkleo-joker" src="/joker.png" />
          </div>
        </li>
      </ul>
      <div class="upset-path__side-column"></div>
    </div>
    <div v-if="path" class="path-page__text-content">
      <div class="text-content">
        <div class="text-content__title">Share your path!</div>
        <div class="path-page__share-buttons">
          <a :href="twitterurl" target="_blank">
            <svg
              class="path-page__share-button --twitter"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m256 0c-141.363281 0-256 114.636719-256 256s114.636719 256 256 256 256-114.636719 256-256-114.636719-256-256-256zm116.886719 199.601562c.113281 2.519532.167969 5.050782.167969 7.59375 0 77.644532-59.101563 167.179688-167.183594 167.183594h.003906-.003906c-33.183594 0-64.0625-9.726562-90.066406-26.394531 4.597656.542969 9.277343.8125 14.015624.8125 27.53125 0 52.867188-9.390625 72.980469-25.152344-25.722656-.476562-47.410156-17.464843-54.894531-40.8125 3.582031.6875 7.265625 1.0625 11.042969 1.0625 5.363281 0 10.558593-.722656 15.496093-2.070312-26.886718-5.382813-47.140624-29.144531-47.140624-57.597657 0-.265624 0-.503906.007812-.75 7.917969 4.402344 16.972656 7.050782 26.613281 7.347657-15.777343-10.527344-26.148437-28.523438-26.148437-48.910157 0-10.765624 2.910156-20.851562 7.957031-29.535156 28.976563 35.554688 72.28125 58.9375 121.117187 61.394532-1.007812-4.304688-1.527343-8.789063-1.527343-13.398438 0-32.4375 26.316406-58.753906 58.765625-58.753906 16.902344 0 32.167968 7.144531 42.890625 18.566406 13.386719-2.640625 25.957031-7.53125 37.3125-14.261719-4.394531 13.714844-13.707031 25.222657-25.839844 32.5 11.886719-1.421875 23.214844-4.574219 33.742187-9.253906-7.863281 11.785156-17.835937 22.136719-29.308593 30.429687zm0 0"
              />
            </svg>
          </a>
          <a :href="facebookurl" target="_blank">
            <svg
              class="path-page__share-button --facebook"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m512 256c0-141.4-114.6-256-256-256s-256 114.6-256 256 114.6 256 256 256c1.5 0 3 0 4.5-.1v-199.2h-55v-64.1h55v-47.2c0-54.7 33.4-84.5 82.2-84.5 23.4 0 43.5 1.7 49.3 2.5v57.2h-33.6c-26.5 0-31.7 12.6-31.7 31.1v40.8h63.5l-8.3 64.1h-55.2v189.5c107-30.7 185.3-129.2 185.3-246.1z"
              />
            </svg>
          </a>
          <a @click.stop.prevent="copyurl">
            <svg
              class="path-page__share-button --link"
              viewBox="0 100.25 599.675 599.5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M300,100.25C134.453,100.25,0.25,234.453,0.25,400c0,165.547,134.203,299.75,299.75,299.75
                  	c165.548,0,299.75-134.203,299.75-299.75C599.75,234.453,465.548,100.25,300,100.25z M327.66,497.41l-66.307,66.308
                  	c-16.552,16.57-39.035,25.847-62.456,25.765c-48.827-0.031-88.384-39.639-88.353-88.466c0.015-23.398,9.305-45.837,25.834-62.398
                  	l80.327-80.39c16.558-16.615,39.062-25.935,62.518-25.892c16.9,0,33.445,4.843,47.678,13.957c5.375,3.417,10.352,7.419,14.84,11.935
                  	c5.121,5.131,7.789,12.216,7.326,19.45c-0.436,6.053-3.035,11.748-7.324,16.04c-9.969,9.383-25.52,9.383-35.49,0
                  	c-14.793-14.774-38.758-14.774-53.551,0l-80.643,80.58c-14.805,14.805-14.805,38.809,0,53.614c14.805,14.805,38.809,14.805,53.614,0
                  	l47.678-47.742c1.801-1.812,4.519-2.362,6.883-1.389c12.832,5.219,26.561,7.879,40.415,7.83h2.527
                  	c3.486-0.02,6.33,2.791,6.352,6.278C329.537,494.586,328.865,496.216,327.66,497.41z M463.557,361.449l-80.389,80.39
                  	c-11.309,11.312-25.473,19.343-40.984,23.239h-0.695l-3.662,0.758l-2.021,0.379l-4.357,0.631h-2.146
                  	c-1.643,0-3.096,0.316-4.484,0.379l-3.789,0.442h-0.379h-4.42c-3.15-0.126-6.291-0.422-9.41-0.885
                  	c-2.588-0.441-5.115-0.947-7.64-1.578l-3.726-1.011c-1.326-0.379-2.715-0.82-4.041-1.326c-1.326-0.505-2.715-0.947-4.042-1.516
                  	c-1.326-0.567-2.652-1.073-3.978-1.704c-9.398-4.355-17.951-10.342-25.26-17.683c-5.12-5.132-7.788-12.216-7.325-19.45
                  	c0.406-6.097,3.009-11.84,7.325-16.166c9.969-9.383,25.52-9.383,35.49,0c14.793,14.775,38.758,14.775,53.551,0l20.713-20.587
                  	l0.506-0.568l59.234-59.171c14.807-14.806,14.807-38.809,0-53.614c-14.805-14.805-38.809-14.805-53.613,0l-47.553,47.489
                  	c-1.801,1.813-4.518,2.362-6.883,1.389c-12.807-5.238-26.515-7.919-40.353-7.894h-2.336c-2.58,0.049-4.93-1.476-5.936-3.852
                  	c-1.017-2.37-0.493-5.119,1.326-6.947l66.246-66.181c34.527-34.528,90.508-34.528,125.035,0S498.086,326.921,463.557,361.449z"
              />
            </svg>
            <input type="hidden" id="url-to-copy" :value="currenturl()" />
          </a>
        </div>
        <div v-if="share_message" class="text-content__text">
          {{ share_message }}
        </div>
        <router-link to="/" class="text-content__cta d-block mx-auto"
          >Go back to home</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import PlayerBox from "@/components/PlayerBox.vue";
import Loader from "@/components/Loader.vue";

export default {
  name: "PathPage",
  data() {
    return {
      loading: true,
      path: null,
      error: null,
      not_found: false,
      no_path: false,
      share_message: null,
    };
  },
  components: { PlayerBox, Loader },
  mounted() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData();
  },
  watch: {
    // call again the method if the route changes
    $route() {
      this.fetchData();
    },
  },
  methods: {
    fetchData() {
      this.error = this.path = null;
      this.not_found = false;
      this.no_path = false;
      this.share_message = null;
      if (this.ismkleo) {
        this.loading = false;
      } else {
        this.loading = true;
        const fetchedId = this.$route.params.id;
        const fetch_url =
          process.env.VUE_APP_BACKEND_ROOT +
          "upsets/playerpath/" +
          fetchedId +
          (this.offline_only ? "/?offline_only=True" : "");
        // GET request using fetch with error handling
        fetch(fetch_url)
          .then(async (response) => {
            const data = await response.json();
            this.loading = false;
            // make sure this request is the last one we did, discard otherwise
            if (this.$route.params.id !== fetchedId) return;
            // check for error response
            if (response.status == 404) {
              this.not_found = true;
            } else if (!response.ok) {
              const error = data;
              return Promise.reject(error);
            } else {
              if ("path_exist" in data) {
                if (data.path_exist) {
                  if ("path" in data) {
                    this.path = data.path;
                  } else {
                    return Promise.reject("Invalid API response");
                  }
                } else {
                  this.no_path = true;
                }
              } else {
                return Promise.reject("Invalid API response");
              }
            }
          })
          .catch((error) => {
            this.loading = false;
            this.error = error.toString();
          });
      }
    },
    copyurl() {
      let urlToCopy = document.querySelector("#url-to-copy");
      urlToCopy.setAttribute("type", "text");
      urlToCopy.select();
      try {
        document.execCommand("copy");
        this.share_message = "Link copied to clipboard !";
      } catch (err) {
        this.share_message = "Weird, unable to copy.";
      }
      /* unselect the range */
      urlToCopy.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();
    },
    currenturl() {
      return window.location.href;
    },
  },
  computed: {
    offline_only() {
      return (
        "option" in this.$route.params && this.$route.params.option == "offline"
      );
    },
    ismkleo() {
      return this.$route.params.id == 222927;
    },
    upsetdistance() {
      return this.ismkleo ? 0 : this.path[0].node_depth;
    },
    twitterurl() {
      let message =
        "My " +
        (this.offline_only ? "offline " : "") +
        "MkLeo Number is " +
        this.upsetdistance +
        " ! Here is my upset path : " +
        this.winpathtext +
        ". What about you ?";
      return (
        "http://twitter.com/share?text=" + message + "&url=" + this.currenturl()
      );
    },
    facebookurl() {
      return (
        "https://www.facebook.com/sharer/sharer.php?u=" + this.currenturl()
      );
    },
    winpathtext() {
      let rep = "";
      this.path.forEach((node) => {
        rep += node.upset.winner.tag + " > ";
      });
      rep += "MkLeo";
      return rep;
    },
  },
};
</script>
