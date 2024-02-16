<template>
    <li>{{ comment.text }}</li>
  </template>
  
  <script>
  export default {
    props: {
      comment: Object,
    },
  };
  </script>
<style scoped>
li {
  color: #555;
  list-style: none;
  margin: 5px 0;
}

/* Add additional styles as needed for comments */
</style>
  