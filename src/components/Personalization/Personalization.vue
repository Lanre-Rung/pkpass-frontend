<template>
  <div>
    <PersonalizationForm
      :personalization="temp"
      @update-personalization="updatePersonalization"
    ></PersonalizationForm>
  </div>
</template>
<script>
import PersonalizationForm from "./PersonalizationForm.vue";
export default {
  components: {
    PersonalizationForm,
  },
  props: {
    personalization: Object,
  },
  data() {
    return {
      temp: {
        description: "",
        requiredPersonalizationFields: [],
        termsAndConditions: "",
      },
    };
  },
  methods: {
    updatePersonalization(form) {
      this.temp = form;
      this.$message.success("保存成功");
      this.$emit("Personalization", this.temp);
    },
  },
  created() {
    if (this.personalization) {
      this.temp = this.personalization;
    }
  },
};
</script>
<style scoped>
</style>