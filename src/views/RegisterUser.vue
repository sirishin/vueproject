<template>
    <form @submit.prevent="register">
        <div class="card" style="width: 80%;  float:none; margin:0 auto">
            <div class="card-body">
                <div class="d-flex justify-content-center">
                    <div class="row">
                        <div class="col">
                            <div class="input_row">
                                <label for="number" class="form-label">Number</label>
                                <input v-model="user.number" class="form-control border" type="text" name="number" id="number" value>
                            </div>
                            <div class="input_row">
                                <label for="name" class="form-label">Name</label>
                                <input v-model="user.name" class="form-control border" type="text" name="name" id="name" value>
                            </div>
                            <div class="input_row">
                                <label for="id" class="form-label">Id</label>
                                <input v-model="user.userid" class="form-control border" type="text" name="id" id="id" value>
                            </div>
                            <div class="input_row">
                                <label for="password" class="form-label">Password</label>
                                <input v-model="user.password" class="form-control border" type="password" id="password" value>
                            </div>
                            <!-- <div class="input_row">
                                <label for="image" class="form-label">Profile Image</label><br />
                                <input multiple @change="imageUpload()" ref="image" type="file"><br />
                                <img style="width: 60%;;" :src="imageUploaded" alt="올린 이미지"/> <br />
                            </div> -->
                    </div>
                </div>
            </div>
            <button class="btn btn" style="right: 30%; background-color: #eb6995; color: aliceblue;" type="submit">가입하기</button>
        </div>
    </div>
    </form>
</template>
<script>
import axios from 'axios';
import apiClient from '@/main.js';
export default {
    name: "posting",
    data() {
    return {
        user: {
        number: '',
        name: '',
        userid: '',
        password: '',
        },
        imageUploaded:'',
        image:''
    }
    },
    methods: {
        // imageUpload: function(){
        //     this.image = this.$refs.image.files[0]
        //     console.log(this.image)
        //     this.imageUploaded = URL.createObjectURL(this.image)
        // },
        register: function() {
            // console.log(1)
            apiClient.post('https://port-0-flask22-754g42aluyx17vx.sel5.cloudtype.app/api/register', { 
            user: this.user,
            // image : this.imageUploaded
            })
            .then(response =>{
                    // console.log(response);
                    if (response.data.massege == 'seccess'){
                        this.$router.push('/Login')
                    }
                    else if(response.data.massege == 'fail'){
                        alert(response.data.say)
                    }
            })
            .catch(function (error) {
            alert(error)
            })
    }
    }
}
</script>
