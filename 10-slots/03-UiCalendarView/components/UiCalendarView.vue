<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button
          class="calendar-view__control-left"
          type="button"
          aria-label="Previous month"
          @click="previousMonth"
        ></button>
        <div class="calendar-view__date">{{ selectedMonth }}</div>
        <button class="calendar-view__control-right" type="button" aria-label="Next month" @click="nextMonth"></button>
      </div>
    </div>
    <div class="calendar-view__grid">
      <div
        v-for="i in daysArray"
        :key="i"
        class="calendar-view__cell"
        :class="{ 'calendar-view__cell_inactive': !i.thisMonth }"
        tabindex="0"
      >
        <div class="calendar-view__cell-day">{{ i.day }}</div>
        <div class="calendar-view__cell-content">
          <slot :date="i.d"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import UiAlert from '../../02-PromiseWrapper/components/UiAlert.vue';
import utc from "dayjs/plugin/utc";
dayjs.extend(utc)
export default {
  name: 'UiCalendarView',
  components: { UiAlert },
  data() {
    return {
      selectedDate: new dayjs().utc(),
    };
  },
  computed: {
    selectedMonth() {
      return this.selectedDate.toDate().toLocaleDateString(navigator.language, {
        month: 'long',
        year: 'numeric',
      });
    },
    firstDayOfMonth() {
      return this.selectedDate.startOf('month');
    },
    lastDayOfMonth() {
      return this.selectedDate.endOf('month').startOf('day');
    },
    lastDayOfPreviousMonth() {
      return this.selectedDate.subtract(1, 'months').endOf('month').startOf('day');
    },
    firstDayOfWeekIndex() {
      return this.firstDayOfMonth.day() === 0 ? 6 : this.firstDayOfMonth.day() - 1;
    },
    lastDayOfWeekIndex() {
      return this.lastDayOfMonth.day() === 0 ? 6 : this.lastDayOfMonth.day() - 1;
    },
    daysArray() {
      const daysArray = [];
      for (let i = this.firstDayOfWeekIndex - 1; i >= 0; i -= 1) {
        daysArray.push({
          day: this.lastDayOfPreviousMonth.subtract(i, 'day').date(),
          thisMonth: false,
          d: this.formatDate(this.lastDayOfPreviousMonth.subtract(i, 'day')),
        });
      }
      for (let i = 1; i <= this.lastDayOfMonth.date(); i += 1) {
        daysArray.push({ day: i, thisMonth: true, d: this.formatDate(this.firstDayOfMonth.add(i - 1, 'day')) });
      }
      for (let i = 1; i <= 6 - this.lastDayOfWeekIndex; i += 1) {
        daysArray.push({ day: i, thisMonth: false, d: this.formatDate(this.firstDayOfMonth.add(1, 'month').add(i - 1, 'day')) });
      }
      return daysArray;
    },
  },
  methods: {
    nextMonth() {
      this.selectedDate = this.selectedDate.add(1, 'month');
    },
    previousMonth() {
      this.selectedDate = this.selectedDate.subtract(1, 'month');
    },
    getMeetupUrl(meetup) {
      return `/meetups/${meetup.id}`;
    },
    formatDate(date) {
      return +date.toDate();
    }
  },
};
</script>

<style scoped>
.calendar-view {
}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}
</style>
