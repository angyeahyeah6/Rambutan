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
							<a-input v-model="add"
								v-decorator="[
										'userName',
										{ rules: [{
														required: true, message: 'Account is required.'
												}
								]},]" block>
							</a-input>
						</a-form-item>
					</div>
        </a-form>
    </div>
</div>
</template>
<script>
import user from "../assets/user.png";
import api from "../api";
export default {
    data() {
    return {
      user,
			add:"+ add",
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
			fetch(api + "/users/1",{
				method: "GET",
				headers: { "Content-Type": "application/json", 'Authorization': "Bearer " + localStorage.getItem("token")},
			}).then(response => response.json())
			.then(response => {
				console.log(response)
				this.data.name = response.name;
				this.data.email = response.email;
				// console.log(response.data)
			})
		}
	},
	mounted(){
		this.getUser();
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
img{
    width:80px;
    height:80px;
}
</style>