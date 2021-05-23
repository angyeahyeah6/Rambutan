<template>
<div id="pro">
    <div class="pro-user-container">
        <img :src="user" />
        <div> {{ this.data.name}}</div>
        <a-rate :default-value="this.data.rating" allow-half disabled/>
    </div>
    <div class="pro-detail-container">
        <a-form
        hasFeedback
        :style="{ radius:'2px'}"
        >
					<div class="pro-form-item">
						<p>name</p>
						<a-form-item>
							<a-input v-model="data.name"
								v-decorator="[
										'userName',
										{ rules: [{
														required: true, message: 'Account is required.'
												},
								]},]" block>
								<a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
							</a-input>
						</a-form-item>
					</div>
					
					<div class="pro-form-item">
						<p>email</p>
						<a-form-item>
							<a-input v-model="data.email"
								v-decorator="[
										'userName',
										{ rules: [{
														required: true, message: 'Account is required.'
												},
								]},]" block>
								<a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
							</a-input>
						</a-form-item>
					</div>
					<div class="pro-form-item">
						<p>bank info</p>
						<a-form-item >
							<template v-for="info in data.bankinfo">
							<a-input :key="info.id" v-model="info.value"
								v-decorator="[
										'userName',
										{ rules: [{
														required: true, message: 'Account is required.'
												}
								]},]" block>
								
							</a-input>
							</template>
							<a-button type="dashed" v-model="add"
								v-decorator="[
										'userName',
										{ rules: [{
														required: true, message: 'Account is required.'
												}
								]},]" block>
								<a-icon type="plus" /> Add
							</a-button>
						</a-form-item>
					</div>
        </a-form>
				<div class="pro-button-container">
        <a-button v-if="!ischanged"
          class="btn-primary"
          type="primary"
          disabled
        >
          Save
        </a-button>
				<a-button v-else
          class="btn-primary"
          type="primary"
          @click="patchUser()"
        >
          Save
        </a-button>
      </div>
    </div>
</div>
</template>
<script>
import user from "../assets/user.png";
import api from "../api";
export default {
    data() {
    return {
			obs_cnt :0,
      user,
			add:"add",
			ischanged: false,
			data:{
				name:"",
				email:"",
				rating: 3,
				bankinfo:[{
					id: 1,
					value: "(812) 1234-567890"
					}, {
					id:2,
					value: "Line Pay"
					}],
			},
    };
  },
	methods:{
		getUser(){
			fetch(api + "/users/5",{
				method: "GET",
				headers: { "Content-Type": "application/json", 'Authorization': "Bearer " + localStorage.getItem("token")},
			}).then(response => response.json())
			.then(response => {
				console.log(response)
				this.data.name = response.name;
				this.data.email = response.email;
				this.data.rating = 2.5;
			})
		},
		patchUser(){
			const update_user ={
				"name": this.data.name,
				"email": this.data.email,
				"image_url": ""
			}
			fetch(api + "/users",{
				method: "PATCH",
				headers: { "Content-Type": "application/json", 'Authorization': "Bearer " + localStorage.getItem("token")},
				body: JSON.stringify(update_user)
			}).then(response => console.log(response.status))
			this.obs_cnt = 0;
			this.ischanged = false;
		}
	},
	mounted(){
		this.getUser();
		this.ischanged = false
	},
	watch:{
		data: {
			handler(val){
				console.log(this.obs_cnt)
				if (!this.ischanged & this.obs_cnt != 0){
					this.ischanged = true
				}
				this.data.name = val.name
				this.data.email = val.email
				this.obs_cnt += 1;
			},
			deep: true
		}
		
	}
}
</script>
<style lang="less" scoped>
#pro{
	display: flex;
	margin:20px;
}
.pro-form-item{
	margin-bottom:50px;
}
.pro-detail-container{
	margin-right: 94px;
	width:395px;
}
.pro-user-container{
    width:180px;
    margin:40px;
    justify-content: center;
    text-align: center;
}
.pro-button-container {
  justify-content: flex-end;
  display: flex;
  padding: 0px;
  margin-top: 110px;
}
img{
    width:80px;
    height:80px;
}
.btn-primary {
  height: 40px;
  width: 130px;
  border-radius: 50px;
  color: black;
  font-weight: bold;
}
</style>