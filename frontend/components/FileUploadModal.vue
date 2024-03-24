<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on">Abrir Modal de Upload</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Upload de Arquivo</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-file-input
                v-model="file"
                label="Selecione um arquivo"
                @change="handleFileUpload"
              ></v-file-input>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue darken-1" text @click="dialog = false">Fechar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      file: null,
    };
  },
  methods: {
    handleFileUpload() {
      // Você pode acessar o arquivo selecionado através de this.file
      console.log("Arquivo selecionado:", this.file);
      // Aqui você pode fazer o que desejar com o arquivo selecionado
    },
  },
};
</script>
