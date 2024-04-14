<template>
<form @submit.prevent="signUp">
        <div class="card" style="width: 80%;  float:none; margin:0 auto">
            <div class="card-body">
                <div class="d-flex justify-content-center">
                    <div class="row">
                        <div class="col">
                            <div class="input_row">
                                <label for="id" class="form-label">아이디</label>
                                <input type="text" id="id" class="form-control border" v-model="user.userid">
                            </div>
                            <div class="input_row">
                                <label for="password" class="form-label">비밀번호</label>
                                <input type="password" id="password" class="form-control border" v-model="user.password">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-between">
                    <div class="col">
                        <button  class="btn btn" style="background-color: #eb6995; color: aliceblue; right: 20%;" type="submit">로그인</button>
                    </div>
                    <div class="col-3"  style="width: 150px; height: 40px;">
                        <button  class="btn btn" style="background-color: #eb6995; color: aliceblue;" @click="Register">회원가입</button>
                    </div>
                </div>
            </div>
        </div>
</form>
</template>
<script>
import axios from 'axios';
import router from '../router';
export default {
    name: "posting",
    data() {
    return {
        user: {
        userid: '',
        password: ''
        }
    }
    },
    methods: {
        Register(){
            this.$router.push('/RegisterUser')
        },
    signUp: function() {
        console.log(1)
        axios.post('/api/login', { 
        user: this.user
        })
        .then(response =>{
                console.log(response);
                console.log(response.data.massege)
                if (response.data.massege == 'seccess'){
                    sessionStorage.setItem('userid', response.data.userid);
                    sessionStorage.setItem('password', response.data.password);
                    this.$router.push('/Main')
                };
        })
        .catch(function (error) {
        alert(error)
        })
    }
    }
}
</script>