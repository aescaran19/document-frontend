<template>
  <div class="sidebar-wrapper">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      app
    >
      <v-list-item class="upper-drawer">
        <v-app-bar-nav-icon
          class="app-bar-icon"
          @click.stop="mini = !mini"
        ></v-app-bar-nav-icon>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              <!-- Company Admin -->
            </v-list-item-title>
            <v-list-item-subtitle></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list nav>
        <v-list-item-group mandatory>
          <v-list-item
            v-for="item in routes"
            :key="item.name"
            link
            :to="'/' + item.route"
          >
            <v-list-item-action>
              <v-img
                class="menu-icon"
                :src="require(`@/assets/images/documents.png`)"
                alt
              ></v-img>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routes: [
        {
          name: "Documents",
          icon: "mdi-file-document-multiple",
          route: "documents",
        },
      ],
      drawer: true,
      mini: false,
    };
  },
  methods: {
    goTo(page) {
      let currentRoute = this.$router.currentRoute.name;
      if (currentRoute != page) {
        this.$router.replace({
          name: page,
        });
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
.sidebar-wrapper {
  .menu-icon {
    max-width: 25px;
  }
  text-align: left;
  .upper-drawer {
    background: #34495E 0% 0% no-repeat padding-box;
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
      0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  }
  .v-icon.v-icon {
    color: #ffffff;
    font-size: 18px !important;
    // background-color: #8c8c8c !important;
    border-radius: 5px !important;
    padding: 5px !important;
  }

  .theme--light.v-list-item--active::before {
    opacity: 0 !important;
  }
  .v-list-item.v-item--active.v-list-item--active.v-list-item--link.theme--light {
    background-color: #d0cccc;
    font-weight: 600;
    border-radius: 0;
  }
  .v-list.v-sheet.theme--light.v-list--nav {
    padding-right: 0 !important;
  }

  .append {
    border: 1px solid #e4e4e4;
    background-color: #f5f5f7;

    .title {
      font-size: 14px !important;
      color: #1d1d1f !important;
    }

    .sub-title {
      font-size: 10px !important;
      color: #6f6f6f !important;
    }
  }
}
</style>
