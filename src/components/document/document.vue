<template>
  <div class="document">
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          outlined
          dense
        >
        </v-text-field>
      </v-col>
      <v-col cols="6" style="text-align:right;">
        <v-btn
          style="margin-right:5px"
          v-if="deleteSelectbtn"
          class="warning deleteSelect"
          depressed
          dense
          @click="deleteSelected"
          >Delete Selected</v-btn
        >
        <v-btn
          v-if="checkRole($role.Admin)"
          class="primary"
          depressed
          dense
          @click="newDocument"
        >
          New Document
        </v-btn>
      </v-col>
    </v-row>

    <v-data-table
      v-model="tableDocument"
      :headers="tableHeader"
      :items="tableData"
      :loading="isTableLoading"
      :search="search"
      :show-select="checkRole($role.Admin)"
      item-key="id"
      class="elevation-1"
    >
      <template v-slot:[`item.uploadedDate`]="{ item }">
        <span>{{ formatDate(item.uploadedDate) }}</span>
      </template>
      <template v-slot:[`item.updatedDate`]="{ item }">
        <span>{{ formatDate(item.updatedDate) }}</span>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ma-2"
              text
              icon
              color="green"
              v-bind="attrs"
              v-on="on"
              :loading="loadingDownloadBtn"
              @click="download(item)"
            >
              <v-icon>mdi-download</v-icon>
            </v-btn>
          </template>
          <span>Download</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-if="checkRole($role.Admin)"
              class="ma-2"
              text
              icon
              color="blue"
              v-bind="attrs"
              v-on="on"
              @click="editItem(item)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <span>Edit</span>
        </v-tooltip>

        <v-tooltip top v-if="checkRole($role.Admin) && !deleteSelectbtn">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ma-2"
              text
              icon
              color="warning"
              v-bind="attrs"
              v-on="on"
              @click="deleteItem(item)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
          <span>Delete</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <deleteDocumentDialog ref="refDeleteDialog" @toRefresh="refreshTable" />
  </div>
</template>
<script>
import { checkRole } from "@/helpers/common.helper";
import deleteDocumentDialog from "@/components/document/dialog/deleteDocument";
import { getDocumentListAPI } from "@/services/document.service";
import { format } from "date-fns";

import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
      tableDocument: [],
      search: "",
      deleteSelectbtn: false,
      loadingDownloadBtn: false,
      isTableLoading: false,
      tableHeader: [
        { text: "Control Number", value: "controlNumber" },
        { text: "Title", value: "title" },
        { text: "Type", value: "type" },
        { text: "Updated Date", value: "updatedDate" },
        { text: "Revision", value: "revision" },
        { text: "Actions", value: "actions", align: "center", sortable: false },
      ],
    };
  },
  components: {
    deleteDocumentDialog,
  },
  watch: {
    tableDocument: function(val) {
      if (val.length > 1) {
        this.deleteSelectbtn = true;
      } else this.deleteSelectbtn = false;
    },
  },
  methods: {
    checkRole,
    newDocument() {
      this.$router.push({ name: "form" });
    },
    async getDocuments() {
      try {
        this.isTableLoading = true;
        const data = await getDocumentListAPI();
        console.log(data.data);
        this.tableData = data.data;
      } catch (error) {
        console.log(error.response);
      } finally {
        this.isTableLoading = false;
      }
    },
    download(item) {
      this.loadingDownloadBtn = true;
      const url = item.filePath;
      console.log(url);
      axios({
        method: "get",
        url,
        responseType: "blob",
      })
        .then((response) => {
          console.log(response.data);
          const blob = new Blob([response.data], { type: response.data.type });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          // const contentDisposition = response.headers["content-disposition"];
          // let fileName = item.title;
          // if (contentDisposition) {
          //   const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
          //   if (fileNameMatch.length === 2) fileName = fileNameMatch[1];
          // }
          link.setAttribute("download", item.filename);
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url);
        })
        .catch(() => console.log("error occured"))
        .finally(() => (this.loadingDownloadBtn = false));
    },
    refreshTable() {
      this.getDocuments();
      this.deleteSelectbtn = false;
    },
    deleteItem(item) {
      this.$refs.refDeleteDialog.makeDialogShow(item);
    },
    deleteSelected() {
      let idArr = [];
      for (let index = 0; index < this.tableDocument.length; index++) {
        const element = this.tableDocument[index];
        idArr.push(element.id);
      }
      this.$refs.refDeleteDialog.makeDialogShow(idArr);
    },
    editItem(item) {
      this.$router.push({ name: "edit-document", params: { id: item.id } });
    },
    formatDate(value) {
      if (value) {
        const date = new Date(value);
        date.setHours(date.getHours() + 8);
        return format(date, "MM/dd/yyyy hh:mm a");
      } else return "";
    },
  },
  mounted() {
    this.getDocuments();
  },
};
</script>

<style lang="scss">
.document {
  button.ma-2.v-btn.v-btn--icon {
    margin: 0 !important;
  }
  thead.v-data-table-header {
    background-color: #34495e;

    th.text-start.sortable {
      color: #ffffff;
    }
    th.text-start {
      color: #ffffff !important;
    }
    th.text-center {
      color: #ffffff !important;
    }
  }
}
</style>
