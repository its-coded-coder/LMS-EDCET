<template>

  <KOptionalText
    :text="date ? $formatRelative(ceilingDate, { now: now }) : ''"
  />

</template>


<script>

  import { now } from 'kolibri.utils.serverClock';

  export default {
    name: 'ElapsedTime',
    props: {
      date: {
        type: Date,
        default: null,
      },
    },
    data: () => ({
      now: now(),
      timer: null,
    }),
    computed: {
      ceilingDate() {
        if (this.date > this.now) {
          return this.now;
        }
        return this.date;
      },
    },
    mounted() {
      this.timer = setInterval(() => {
        this.now = now();
      }, 10000);
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
  };

</script>


<style lang="scss" scoped></style>
