<template>
  <UiCalendarView>
    <template #default="{ date }">
      <UiCalendarEvent v-for="meetup in meetupsByDate(date)" :key="meetup.id" tag="a" :href="`/meetups/${meetup.id}`">
        {{ meetup.title }}
      </UiCalendarEvent>
    </template>

  </UiCalendarView>
</template>

<script>
import UiCalendarView from './UiCalendarView.vue';
import UiCalendarEvent from './UiCalendarEvent.vue';

export default {
  name: 'MeetupsCalendar',

  components: {
    UiCalendarEvent,
    UiCalendarView,
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },
  methods:{
    meetupsByDate(date) {
      return this.meetups.filter(meetup => meetup.date === date);
    }
  }
};
</script>

<style scoped></style>
