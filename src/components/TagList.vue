<template>
    <div class="tag-list">
        <router-link v-for="tag in tags"
                     class="tag-pill tag-default"
                     :to="{name:'Home',query:{type:'tag',tag:tag}}"> {{tag}}
        </router-link>
    </div>
</template>

<script>
  export default {
    name: "TagList",
    props: {
      tags: {}
    }
  };
</script>
