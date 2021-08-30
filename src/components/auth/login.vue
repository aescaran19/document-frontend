<template>
  <div class="login d-flex justify-center mb-6">
    <!-- <v-row>
      <v-col cols="9"> -->
    <v-card class="login-card" elevation="0" width="600">
      <!-- <v-row> -->
        <!-- <v-col class="col-logo" cols="4">
          <div class="logo-left"></div>
        </v-col> -->
        <!-- <v-col cols="12"> -->
          <Card>
            <template v-slot:title><h3 class="sign">Sign in</h3></template>
            <template v-slot:body>
              <v-form ref="form" lazy-validation>
                <!-- <p class="label-right">Username</p> -->
                <v-text-field
                  v-model="data.username"
                  label="Username"
                  outlined
                  :rules="usernameRules"
                  @keyup.enter.native="handleLogin"
                  dense
                ></v-text-field>
                <!-- <p class="label-right">Password</p> -->
                <v-text-field
                  outlined
                  label="Password"
                  v-model="data.password"
                  :append-icon="pass ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="pass ? 'text' : 'password'"
                  @click:append="pass = !pass"
                  @keyup.enter.native="handleLogin"
                  :rules="passwordRules"
                  dense
                ></v-text-field>
                <div>
                  <v-row>
                    <v-col cols="6">
                      <v-checkbox
                        label="Remember me"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="6" style="text-align:right">
                      <!-- <a href="#">Forgot password?</a> -->
                    </v-col>
                  </v-row>
                </div>
                <div>
                  <v-btn
                    class="btn-login"
                    block
                    elevation="2"
                    x-large
                    @click="handleLogin"
                    :loading="loading"
                  >
                    Login
                  </v-btn>
                </div>
              </v-form>
            </template>
          </Card>
        <!-- </v-col> -->
      <!-- </v-row> -->
    </v-card>
  </div>
</template>
<script>
import Card from "@/components/shared/Card";
import { login } from "@/services/auth.service";
import { setAuthSession } from "@/helpers/auth.helper";
export default {
  name: "login",
  data() {
    return {
      pass: false,
      loading: false,
      data: {
        username: null,
        password: null,
      },
      usernameRules: [(v) => !!v || "Username is required"],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 8) || "Password must be atleast 8 characters",
      ],
    };
  },
  components: {
    Card,
  },
  methods: {
    async handleLogin() {
      const vm = this;
      if (this.$refs.form.validate()) {
        vm.loading = true;
        try {
          const data = await login(this.data);
          console.log(data);
          if (data.status == 200) {
            setAuthSession(data.data);
            vm.$router.replace({ name: "documents" });
          }
        } catch (error) {
          console.log(error.response);
        } finally {
          this.loading = false;
        }
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
.login {
  .login-card.v-card.v-sheet.theme--light.elevation-0 {
    border-radius: 10px;
    padding: 10px 10px 10px 10px;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
      0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%) !important;
  }

  .col-logo {
    padding: 1px !important;
  }
  .v-input.theme--light.v-input--selection-controls.v-input--checkbox {
    margin-top: -2px !important;
}
  .sign {
    color: #408062;
  }
  // .logo-left {
  //   background-color: #408062;
  //   height: 100%;
  //   width: 100%;
  //   border-radius: 10px 0px 0px 10px;
  // }
  .btn-login {
    text-transform: none !important;
    border: 1px solid #408062;
    transition: 0.3s;
    span.v-btn__content {
      color: #408062;
      font-weight: 700;
      font-size: 18px;
    }
  }
  .btn-login:hover {
    background-color: #408062 !important;
    transition: 0.3s;
    span.v-btn__content {
      color: #ffffff;
      font-weight: 700;
      font-size: 18px;
    }
  }
}
</style>
