<template>
  <v-app>
    <Sidebar />
    <Header />
    <v-main>
      <v-container fluid>
        <v-breadcrumbs
          style="padding-left: 0 !important;position: absolute;top: -65px;"
          :items="routes"
        ></v-breadcrumbs>
        <router-view></router-view>
      </v-container>
    </v-main>
    <!-- <v-footer app>
    </v-footer> -->
  </v-app>
</template>

<script>
import Header from "../components/layouts/AppHeader";
import Sidebar from "../components/layouts/AppSider";
import { titleCase } from "@/helpers/common.helper";
export default {
  components: {
    Header,
    Sidebar,
  },
  data() {
    return {
      routes: [],
    };
  },
  watch: {
    "$route.path"(val) {
      console.log("watch", val);
      this.getPath(val);
    },
  },
  methods: {
    getPath(val) {
      this.routes = [];
      this.routes.push({
        text: "Home",
        disabled: false,
        href: "/",
      });
      let paths = val.split("/");
      for (let value of paths) {
        if (value) {
          this.routes.push({
            text: titleCase(value),
            disabled: false,
            to: { name: value },
          });
        }
      }
    },
  },
  created() {
    console.log("created", this.$route.path);
    this.getPath(this.$route.path);
  },
};
</script>
