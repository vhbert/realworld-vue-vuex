<template>
    <div>
        <template v-if="errors">
            <ul class="error-messages">
                <li v-for="error in errors" :key="error">{{error}}</li>
            </ul>
        </template>
    </div>
</template>

<script>
  export default {
    name: "ErrorList",
    props: {
      errors: {}
    }
  };
</script>

