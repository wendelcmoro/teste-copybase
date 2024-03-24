<template>
  <v-container>
    <div>
      <FileUploadModal />
    </div>
  </v-container>
</template>

<script>
import FileUploadModal from "~/components/FileUploadModal.vue";

export default {
  name: "IndexPage",
  components: {
    FileUploadModal,
  },
  async asyncData({ $axios }) {
    try {
      // Faz a requisição para a API
      const response = await $axios.get(process.env.apiUrl + "/subscriptions");

      // Verifica se a requisição foi bem sucedida
      console.log(response.data);
      if (response.status !== 200) {
        throw new Error("Erro ao obter os dados da API");
      }

      // Retorna os dados obtidos da API
      return {
        data: response.data,
      };
    } catch (error) {
      // Captura e trata erros
      console.error("Ocorreu um erro:", error);
      return {
        data: null,
      };
    }
  },
  mounted() {},
};
</script>
