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
        <p>Plan Select *</p>
        <a-space :size="15">
          <DropDown :title="this.select.platforms" :menulist="platforms" 
          @selectValue="(val) => {this.select.platforms = val.value;  this.select.serviceId = val.id}" />
          <DropDown :title="this.select.plans" :menulist="plans" 
          @selectValue="(val) => {this.select.plans = val.value;}"/>
        </a-space>
      </div>
      <div class="ard-block-container">
        <p>Plan Price</p>
        <a-space :size="15">
          <DropDown title="NT$" :menulist="currency" 
          @selectValue="(val) => {this.select.currency = val.value;}"/>
          <a-input-number v-model="this.select.price" :min="0"  
          @change="(value) => {this.select.price = value}" />
          <p>/</p>
          <DropDown :title="this.select.timeSlot" :menulist="timeSlot" 
          @selectValue="(val) => {this.select.timeSlot = val.value;}"/>
        </a-space>
      </div>
      <div class="ard-block-container">
        <p>Split</p>
        <a-space :size="15" align="baseline">
          <a-input-number v-model="this.select.peoplecnt" :min="1" :max="10" />
          <p>people</p>
        </a-space>
      </div>
      <div style="margin-top:40px;">
        <a-checkbox :checked="this.select.public"
        @change="(val) => this.select.public = !this.select.public">
          Make this room public</a-checkbox>
      </div>
      <div class="ard-button-container">
        <a-button
          class="btn-primary"
          key="add Room"
          type="primary"
          @click="createRoom()"
        >
          + Add Room
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
      select:{
        serviceId: -1,
        platforms: "Platforms",
        plans: "Plan",
        price: 0,
        timeSlot: "month",
        currency: "NT",
        peoplecnt: 4,
        public: false
      },
      isVisible: false,
      platforms:[],
      plans: [
        {
          id: 1,
          value: "family",
        },
        {
          id: 2,
          value: "premium",
        },
      ],
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
          value: "year",
        },
        {
          id: 2,
          value: "month",
        },
        {
          id: 3,
          value: "week",
        },
        {
          id: 4,
          value: "day",
        },
      ],
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeAddModal", this.isVisible);
      // this.isVisible = false;
    },
    goToInfoPage() {
      this.$router.push("/Info");
    },
    getServicesforModal(){
      fetch(api + "/services",
        { 
          method: "GET",
          headers: { "Content-Type": "application/json", 'Authorization': "Bearer " + localStorage.getItem("token")}
          
        })
      .then(response => response.json())
      .then(response => {
        const data = response.data
        data.forEach((ele) => {
          this.platforms.push({
            id: ele.id,
            value: ele.name
          })
        });
      })
      .catch((err) => {
        console.log(err);
        this.platforms = [{id: 1, name: "Netflix"}]
      })
    },
    getServicesPlan(id){
      fetch(api + "/services/" + id.toString(),
        { 
          method: "GET",
          headers: { "Content-Type": "application/json", 'Authorization': "Bearer " + localStorage.getItem("token")}
          
        })
      .then(response => response.json())
    },
    createRoom(){
      const result = {
        "max_count": this.select.peoplecnt,
        "service_id": this.select.serviceId,
        "plan_name": this.select.plans,
        "is_public": this.select.public
      }
      // console.log(result);
      if(this.select.serviceId > -1){
        fetch(api + "/rooms",
        { 
          method: "POST",
          headers: { "Content-Type": "application/json", 'Authorization': "Bearer " + localStorage.getItem("token")},
          body: JSON.stringify(result)
        })
      .then(response => console.log(response.status))
      }
    }
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.isVisible = this.visible;
      }
    },
  },
  created(){
    
  },
  mounted(){
    this.getServicesforModal();
  }
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
