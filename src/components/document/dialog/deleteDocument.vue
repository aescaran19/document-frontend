<template>
  <DialogLayout :showDialog="showDialog" @close="close" :dialogWidth="width">
    <template v-slot:dialogbody>
      <p style="font-size: 16px;color:black">
        Are you sure to delete <b v-if="dataArray.length > 0">seleted items</b
        ><b v-else>{{ data.title }}</b
        >?
      </p>
      <div style="margin-top:30px">
        <v-btn
          color="primary"
          style="margin-right:20px"
          @click="toDelete"
          :loading="deleteLoading"
          >Confirm</v-btn
        >
        <v-btn color="error" @click="close">Cancel</v-btn>
      </div>
    </template>
  </DialogLayout>
</template>

<script>
import DialogLayout from "@/components/shared/Dialog";
import {
  deleteDocumentAPI,
  deleteDocumentsAPI,
} from "@/services/document.service";
export default {
  data() {
    return {
      showDialog: false,
      width: 400,
      data: {
        title: null,
      },
      dataArray: [],
      deleteLoading: false,
    };
  },
  components: {
    DialogLayout,
  },
  methods: {
    makeDialogShow(item) {
      if (item.length > 0) {
        this.dataArray = item;
      } else this.data = item;
      this.showDialog = true;
    },
    async toDelete() {
      try {
        this.deleteLoading = true;
        if (this.dataArray.length > 0) {
          console.log("data array", this.dataArray)
          await deleteDocumentsAPI(this.dataArray);
        } else await deleteDocumentAPI(this.data.id);
        this.$emit("toRefresh");
        this.showDialog = false;
      } catch (error) {
        console.log(error.response);
      } finally {
        this.deleteLoading = false;
      }
    },
    close() {
      this.showDialog = false;
      this.dataArray = [];
    },
  },
};
</script>
