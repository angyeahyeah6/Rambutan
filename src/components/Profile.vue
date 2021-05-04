<template>
<div id="pro">
    <div class="pro-user-container">
        <img :src="user" />
        <div>Carolyn</div>
        <a-rate :default-value="2.5" allow-half />
    </div>
    <div class="pro-detail-container">
        <a-form
        :form="form"
        @submit="handleSubmit"
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
												},{ 
														validator: checkAccountExist }
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
												},{ 
														validator: checkAccountExist }
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
												},{ 
														validator: checkAccountExist }
								]},]" block>
								
							</a-input>
							</template>
							<a-input v-model="add"
								v-decorator="[
										'userName',
										{ rules: [{
														required: true, message: 'Account is required.'
												},{ 
														validator: checkAccountExist }
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
export default {
    data() {
    return {
      user,
			add:"+ add",
			data:{
				name:"carolyn",
				email:"carolyn@gmail.com",
				bankinfo:[{
					id: 1,
					value: "(812) 1234-567890"
					}, {
					id:2,
					value: "Line Pay"
					}],
			}
    };
  },
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