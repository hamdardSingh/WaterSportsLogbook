<template>
<div :style="squareStyle">
<h3>..</h3>
</div>
</template>
<script>
  export default {
    props: {
        color: { default: '#FF0000', height: '150px' }
    },
    data() {
            return {
                squareStyle : {
                    height: this.height,
                    backgroundColor : this.color


                }
              };
        },


}
</script>
