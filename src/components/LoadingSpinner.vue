<template>
    <div class="loading-spinner"
         :style="{width: this.size||'40px', height: this.size||'40px',margin:this.margin + ' auto' || '50% auto'} ">
    </div>
</template>

<script>
  export default {
    name: "LoadingSpinner",
    props: {
      size: String,
      margin: String
    }
  };
</script>

<style scoped lang="css">
    @keyframes loading-spinner {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .loading-spinner {
        border-radius: 50%;
        width: 40px;
        height: 40px;
        margin: 50% auto;
        position: relative;
        border-top: 3px solid rgba(0, 0, 0, 0.1);
        border-right: 3px solid rgba(0, 0, 0, 0.1);
        border-bottom: 3px solid rgba(0, 0, 0, 0.1);
        border-left: 3px solid #818a91;
        transform: translateZ(0);
        animation: loading-spinner 0.5s infinite linear;
    }
</style>