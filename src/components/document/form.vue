<template>
  <div>
    <v-card
      elevation="0"
      color="rgb(255, 0, 0, -0.8)"
      width="670"
      style="margin:auto"
    >
      <v-form class="create-user" ref="form" lazy-validation>
        <v-row>
          <v-col cols="6">
            <p class="label-right">Control Number</p>
            <v-text-field
              :rules="controlNumberRules"
              v-model="formdata.controlNumber"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <p class="label-right">Type</p>
            <v-select
              :rules="typeRules"
              v-model="formdata.type"
              outlined
              dense
              :items="['Report', 'Command', 'Symbol', 'Excel Macro']"
              placeholder="Select Type"
            ></v-select>
          </v-col>
          <v-col cols="6">
            <p class="label-right">Title</p>
            <v-text-field
              :rules="titleRules"
              v-model="formdata.title"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <p class="label-right">Revision</p>
            <v-text-field
              :rules="revisionRules"
              v-model="formdata.revision"
              type="number"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" v-if="!filename">
            <v-file-input
              placeholder="Upload file here..."
              v-model="formdata.file"
              outlined
              dense
              show-size
              counter
            ></v-file-input>
          </v-col>
          <v-col cols="12" v-else style="text-align:left">
            <p class="label-right">File</p>
            <v-text-field
              v-model="filename"
              outlined
              dense
              readonly
              append-outer-icon="mdi-delete"
              @click:append-outer="deleteUploadedFile"
            ></v-text-field>
          </v-col>
        </v-row>
        <div>
          <v-btn
            class="btn-primary"
            style="margin-right:20px"
            elevation="2"
            large
            @click="cancel"
          >
            Cancel
          </v-btn>
          <v-btn
            class="btn-primary"
            color="primary"
            elevation="2"
            large
            :loading="submitLoading"
            @click="submit"
          >
            Submit
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import {
  addDocumentAPI,
  getDocumentAPI,
  updateDocumentAPI,
} from "@/services/document.service";
export default {
  data() {
    return {
      isEdit: false,
      formdata: {
        controlNumber: null,
        type: null,
        title: null,
        revision: null,
        file: null,
      },
      filename: null,
      submitLoading: false,
      controlNumberRules: [(v) => !!v || "Required*"],
      typeRules: [(v) => !!v || "Required*"],
      titleRules: [(v) => !!v || "Required*"],
      revisionRules: [(v) => !!v || "Required*"],
    };
  },
  methods: {
    async submit() {
      try {
        this.submitLoading = true;
        if (!this.isEdit) {
          const form_data = this.appendToFormData(this.formdata);
          const data = await addDocumentAPI(form_data);
          if (data.data.status == "Success") {
            this.$router.replace({ name: "documents" });
          }
        } else {
          const form_data = this.appendToFormData(this.formdata);
          const data = await updateDocumentAPI(
            this.$route.params.id,
            form_data
          );
          if (data.data.status == "Success") {
            this.$router.replace({ name: "documents" });
          }
        }
      } catch (error) {
        console.log("error", error.response);
      } finally {
        this.submitLoading = false;
      }
    },
    cancel() {
      this.$router.replace({ name: "documents" });
    },
    deleteUploadedFile() {
      this.filename = null;
    },
    appendToFormData(form) {
      const formData = new FormData();
      formData.append("controlNumber", form.controlNumber);
      formData.append("type", form.type);
      formData.append("title", form.title);
      formData.append("revision", form.revision);
      formData.append("file", form.file);
      return formData;
    },
  },
  async mounted() {
    if (this.$route.params.id) {
      this.isEdit = true;

      const document = await getDocumentAPI(this.$route.params.id);
      console.log(document.data);
      this.formdata = document.data;
      this.filename = document.data.filename;
    }
  },
};
</script>

<style lang="scss">
th.text-start:last-child {
  text-align: center !important;
}
.v-input__prepend-outer {
  display: none;
}
</style>
