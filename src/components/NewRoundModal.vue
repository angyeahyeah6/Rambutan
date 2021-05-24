<template>
  <a-modal
    v-model="isVisible"
    :footer="null"
    :width="480"
    :closable="false"
    @ok="close"
    @cancel="close"
  >
    <div class="content">
      <div class="item">
        <div class="label">Plan Start</div>
        <a-date-picker class="date-picker" @change="handleDatePicker" />
      </div>

      <div class="item">
        <div class="label">Plan Interval</div>
        <a-input
          placeholder="0"
          v-model="interval"
          style="width: 110px; margin-right: 12px;"
        />
        <a-select
          v-model="intervalUnit"
          :default-value="intervalUnitData[0]"
          style="width: 110px"
        >
          <a-select-option v-for="ele in intervalUnitData" :key="ele">
            {{ ele }}
          </a-select-option>
        </a-select>
      </div>

      <div class="item">
        <div class="label">Payment Deadline</div>
        <a-input
          placeholder="0"
          v-model="deadline"
          style="width: 110px; margin-right: 12px;"
        />
        <a-select
          v-model="deadlineUnit"
          :default-value="deadlineUnitData[0]"
          style="width: 110px"
        >
          <a-select-option v-for="ele in deadlineUnitData" :key="ele">
            {{ ele }}
          </a-select-option>
        </a-select>
        <span class="text">before start</span>
      </div>

      <a-checkbox
        style="font-size: 16px"
        :checked="isAddedToGoogleCalendar"
        @change="handleGoogleCalendar"
      >
        Add to Google Calendar
      </a-checkbox>

      <div class="btn-container">
        <a-button
          class="btn-primary btn-new-round"
          key="Save"
          type="primary"
          @click="createNewRound()"
        >
          New Round
        </a-button>
      </div>
    </div>
  </a-modal>
</template>

<script>
const intervalUnitData = ["year", "month", "week"];
const deadlineUnitData = ["year", "month", "week"];
import api from "../api"
Date.prototype.toISODate = function() {
  return this.getFullYear() + '-' +
          ('0'+ (this.getMonth()+1)).slice(-2) + '-' +
          ('0'+ this.getDate()).slice(-2);
};
export default {
  props: { 
    visible: { type: Boolean, default: false } ,
    roomId: { type: String, default: "0" }
  },
  data() {
    return {
      isVisible: false, // default should be false
      date: "",
      interval: 1,
      intervalUnit: intervalUnitData[0],
      intervalUnitData,
      deadline: 1,
      deadlineUnit: deadlineUnitData[0],
      deadlineUnitData,
      isAddedToGoogleCalendar: false,
    };
  },
  watch: {
    visible: function(val) {
      this.isVisible = val;
    },
  },
  methods: {
    close: function() {
      this.isVisible = false;
      this.$emit("close", this.isVisible);
    },
    handleDatePicker(date, dateString) {
      this.date = dateString;
      console.log(date, dateString);
    },
    handleGoogleCalendar() {
      this.isAddedToGoogleCalendar = !this.isAddedToGoogleCalendar;
    },
    createNewRound() {
      const new_round = {
        "starting_time": this.date,
        "round_interval": this.interval,
        "payment_deadline": this.deadline,
        "is_add_calendar": this.isAddedToGoogleCalendar
      }
      console.log(new_round);
      fetch(api + "/rooms/" + this.roomId +"/round", 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token"),
        },
         body: JSON.stringify(new_round),
      }).then(res => {
        if(res.status == 201){
          this.close();
          this.$emit("setboard");
        }
      })
      .catch((err) => console.log(err))
    }
  },
};
</script>

<style lang="less" scoped>
.content {
  height: 518px;
  padding: 26px;
  font-size: 16px;

  .item {
    margin-bottom: 50px;

    .label {
      margin-bottom: 10px;
    }

    .date-picker {
      width: 256px;
    }

    .text {
      margin-left: 15px;
    }
  }

  .btn-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    .btn-primary {
      height: 40px;
      width: 130px;
      margin-bottom: 20px;
      border-radius: 50px;
      padding: 8px, 16px, 8px, 16px;
      color: black;
      font-weight: bold;
    }

    .btn-new-round {
      margin-top: 50px;
    }
  }
}
</style>
