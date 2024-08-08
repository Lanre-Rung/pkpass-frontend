<template>
  <div>
    <PersonalizationForm :personalization="personalization"
                         @update-personalization="updatePersonalization"></PersonalizationForm>
  </div>
</template>
<script>
import PersonalizationForm from "./PersonalizationForm.vue";
export default {
  components: {
    PersonalizationForm,
  },
  data () {
    return {
      personalization: {
        description: "fdsfsd",
        requiredPersonalizationFields: ["PKPassPersonalizationFieldPostalCode"],
        termsAndConditions: "fdsfds",
      },
    };
  },
  methods: {
    updatePersonalization (form) {
      this.personalization = form;
      this.$message.success("保存成功");
      this.$emit('Personalization', this.personalization)
    },
  },
};
</script>
<style scoped>
</style>