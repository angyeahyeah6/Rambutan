<template>
  <div id="components-modal-demo-position">
    <a-modal
      v-model="isVisible"
      centered
      @ok="closeModal"
      @cancel="closeModal"
      :footer="null"
      :width="480"
      :body-style="{ padding: '50px', paddingTop: '50px', height: '542px' }"
    >
      <div class="ard-block-container">
        <p>{{ $t(`plan_select`) }} <span class="star">*</span></p>
        <a-space :size="15">
          <DropDown
            :title="this.select.platforms"
            :menulist="platforms"
            @selectValue="selectPlatform"
          />
          <DropDown v-if="!isSelect" disabled />
          <DropDown
            v-else
            :title="this.select.plans"
            :menulist="plans"
            @selectValue="selectPlan"
          />
        </a-space>
      </div>
      <div class="ard-block-container">
        <p>{{ $t(`plan_price`) }}</p>
        <a-space :size="15">
          <DropDown
            title="NT$"
            :menulist="currency"
            @selectValue="
              (val) => {
                this.select.currency = val.value;
              }
            "
          />
          <a-input-number disabled v-model="this.select.price" :min="0" />
          <p>/</p>
          <DropDown
            :title="$t(`${this.select.timeSlot}`)"
            :menulist="timeSlot"
            @selectValue="
              (val) => {
                this.select.timeSlot = val.value;
              }
            "
          />
        </a-space>
      </div>
      <div class="ard-block-container">
        <p>{{ $t(`split`) }}</p>
        <a-space :size="15" align="baseline">
          <a-input-number
            v-model="this.select.peoplecnt"
            :min="1"
            :max="this.select.max_cnt"
            @change="selectPeople"
          />
          <p>{{ $t(`people`) }}</p>
        </a-space>
      </div>
      <div style="margin-top:40px;">
        <a-checkbox
          :checked="this.select.public"
          @change="(val) => (this.select.public = !this.select.public)"
        >
          {{ $t(`make_this_room_public`) }}</a-checkbox
        >
      </div>
      <div class="ard-button-container">
        <a-button
          class="btn-primary"
          key="add Room"
          type="primary"
          @click="createRoom()"
        >
          + {{ $t(`add_room`) }}
        </a-button>
      </div>
    </a-modal>
  </div>
</template>
<script>
import DropDown from "./DropDown";
import api from "../api";
export default {
  components: {
    DropDown,
  },
  props: { visible: { type: Boolean, default: false } },
  data() {
    return {
      select: {
        serviceId: -1,
        platforms: "Platforms",
        plans: "Plan",
        price: 0,
        timeSlot: "month",
        currency: "NT",
        peoplecnt: 1,
        max_count: 1,
        public: false,
      },
      isSelect: false,
      isVisible: false,
      platforms: [],
      plans: [],
      currency: [
        {
          id: 1,
          value: "NT",
        },
        {
          id: 2,
          value: "US",
        },
      ],
      timeSlot: [
        {
          id: 1,
          value: this.$t(`year`),
        },
        {
          id: 2,
          value: this.$t(`month`),
        },
        {
          id: 3,
          value: this.$t(`week`),
        },
        {
          id: 4,
          value: this.$t(`day`),
        },
      ],
    };
  },
  methods: {
    selectPeople(val) {
      if (val < this.select.max_count) {
        this.select.peoplecnt = val;
      } else {
        this.select.peoplecnt = this.select.max_count;
      }
    },
    selectPlan(val) {
      this.select.plans = val.value;
      this.select.price = this.plans[val.id - 1].cost;
      this.select.max_count = this.plans[val.id - 1].max_count;
    },
    selectPlatform(val) {
      this.select.platforms = val.value;
      this.select.serviceId = val.id;
      var cnt = 1;
      this.plans = [];
      this.platforms[val.id - 1].plans.forEach((ele) => {
        this.plans.push({
          id: cnt,
          value: ele.plan_name,
          cost: ele.cost,
          max_count: ele.max_count,
        });
        cnt += 1;
      });
      this.isSelect = true;
    },
    closeModal() {
      this.$emit("closeAddModal", this.isVisible);
      // this.isVisible = false;
    },
    goToInfoPage() {
      this.$router.push("/Info");
    },
    getServicesforModal() {
      fetch(api + "/services", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => response.json())
        .then((response) => {
          const data = response.data;
          data.forEach((ele) => {
            var plans = [];
            ele.plans.forEach((e) => {
              plans.push({
                plan_name: e.plan_name,
                cost: e.cost,
                max_count: e.max_count,
              });
            });
            this.platforms.push({
              id: ele.id,
              value: ele.name,
              plans: plans,
            });
          });
        })
        .catch((err) => {
          console.log(err);
          this.platforms = [{ id: 1, name: "Netflix" }];
        });
    },
    getServicesPlan(id) {
      fetch(api + "/services/" + id.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((response) => response.json());
    },
    createRoom() {
      const result = {
        max_count: this.select.peoplecnt,
        service_id: this.select.serviceId,
        plan_name: this.select.plans,
        is_public: this.select.public,
      };
      if (this.select.serviceId > -1) {
        fetch(api + "/rooms", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(result),
        })
          .then((response) => response.json())
          .then((res) => {
            this.$router.push("/Info/" + res.room_id.toString());
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.isVisible = this.visible;
      }
    },
  },
  created() {},
  mounted() {
    this.getServicesforModal();
  },
};
</script>
<style scoped>
.ard-input {
  height: 32px;
  width: 109px;
  border-radius: 2px;
}
.ard-button-container {
  justify-content: flex-end;
  display: flex;
  padding: 0px;
  margin-top: 40px;
}
.ard-modal {
  padding-top: "30px";
  padding-left: "50px";
  padding-right: "50px";
  height: "1080px";
}
.ard-space {
  justify-content: space-between;
}
.ard-block-container {
  margin-bottom: 30px;
}
.star {
  margin-left: 5px;
}
p {
  margin: 0px;
  margin-bottom: 10px;
}
.btn-primary {
  height: 40px;
  width: 130px;
  border-radius: 50px;
  color: black;
  font-weight: bold;
}
</style>
