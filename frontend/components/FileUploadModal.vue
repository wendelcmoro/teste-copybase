<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on">Upload Subscriptions</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Upload Subscriptions</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-file-input
                type="file"
                v-model="selectedFile"
                accept=".csv"
                label="Select a CSV file with separator ';'"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" @click="dialog = false">Close</v-btn>
        <v-btn color="success" @click="uploadFile">Upload</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      selectedFile: null,
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
      this.selectedFile = null;
    },
    uploadFile() {
      const formData = new FormData();
      formData.append("file", this.selectedFile);

      this.$axios
        .post(process.env.apiUrl + "/csv/upload", formData)
        .then((response) => {
          console.log("Arquivo enviado com sucesso:", response.data);
          this.selectedFile = null;
          this.closeDialog();
        })
        .catch((error) => {
          console.error("Erro ao enviar o arquivo:", error);
        });
    },
  },
};
</script>
