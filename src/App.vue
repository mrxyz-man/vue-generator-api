<template lang="pug">
  div
    div Hello-world
    div(v-if="errors.length") {{ errors }}
</template>

<script>
export default {
  data() {
    return {
      errors: [],
      obs: {
        setErrors: (errors) => this.errors.push(errors),
      },
    };
  },
  created() {
    const { obs } = this;
    this.$api.base.get('/products', { obs });
  },
};
</script>
