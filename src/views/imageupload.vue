<template>
    <div v-if="openModal == true">
            <div class="card" style="width: 80%;  float:none; margin:0 auto">
                <div class="card-body">
                    <h4 class="text-center">{{ selectedtitle.realtitle }}</h4>
                    <hr>
                    <p class="text-center">{{ selectedtitle.content }}</p>
                    <div style="text-align: center;">
                        <img class="text-center" style="width: 50%;;" v-bind:src="'data:image/jpeg;charset=utf-8;base64,'+imageUrl"/>
                    </div>
                    <hr>
                    <h4>댓글</h4>
                    <div class="input_row">
                        <label for="ment" class="form-label">댓글달기</label>
                        <input hidden="hidden" />
                        <input type="text" class="form-control border" id="ment" v-model="coments.ment">
                        <div class="row px-2">
                            <button class="btn my-2 p-1" style="background-color: #eb6995; color: aliceblue;" @click="wantment">게시</button>
                        </div>
                    </div>
                        <div v-for = "(value, key) in finisi">
                            <div class="row">
                                <hr>
                                <div class="col-3">
                                    <img src="../views/profile.jpg" class="rounded" style="height: 50px;"/>
                                </div>
                                <div class="col-sm-3 col-sm-push-9">
                                    <div>익명 {{ value[2] }}</div>
                                    <div>{{ value[0] }}</div>
                                </div> 
                                <div class="row">
                                    <div class="col-3">
                                        <div :class="{readLess:readMore == true}" class="description-info">
                                        <p>
                                            {{ value[1] }}
                                        </p>
                                        </div>
                                        <div v-if="readMore == true" class="read-more">
                                            <a @click="readMore =! readMore">더보기</a>
                                        </div>
                                        <div v-else class="read-less">
                                            <a @click="readMore =! readMore">줄이기</a>
                                        </div>
                                        <button type="button"  v-if="value[2] == id" class="btn btn-link" @click="deletment(value[1])">삭제</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row justify-content-end">
                            <div class="col-3" style="width: 99px; height: 40px;">
                                <button v-if="selectedtitle.id == id" class="btn btn my-2" style="background-color: #eb6995; color: aliceblue; right: 150%;" @click="deletepoam(selectedtitle.num[0])">삭제</button>
                            </div>
                            <div class="col-3" style="width: 99px; height: 40px;">
                                <button class="btn btn my-2" style="background-color: #eb6995; color: aliceblue;" @click="closeModal">닫기</button>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    <div v-if="opensModals == true">
            <div class="card" style="width: 80%;  float:none; margin:0 auto">
                <div class="card-body">
                    <h4 class="card-title text-center">글쓰기</h4>
                    <hr>
                    <div class="row">
                        <div class="col">
                        <form class="form">
                            <div class="mb-3">
                                <label for="title" class="form-label">제목</label>
                                <input type="text" class="form-control border" id="title" v-model="title">
                            </div>
                            <div class="mb-3">
                                <label for="content" class="form-label">내용</label>
                                <input type="text" class="form-control border" id="content" v-model="content">
                                <input multiple @change="imageUpload()" ref="image" type="file">
                                <img style="width: 60%;;" :src="imageUploaded" alt="올린 이미지"/> <br />
                            </div>
                        </form>
                        </div>
                    </div>
                    <div class="row justify-content-between">
                        <div class="col">
                            <button  class="btn btn" style="background-color: #eb6995; color: aliceblue; right: 30%;" @click="[upload(), closeModal()]">게시하기</button>
                        </div>
                        <div class="col-3" style="width: 99px; height: 40px;">
                            <button class="btn btn" style="background-color: #eb6995; color: aliceblue;" @click="closeModal">닫기</button>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    <section class="page-section" id="services">
        <div class="container" v-if="closeText">
            <div class="text-center">
                <h2 class="section-heading text-uppercase">photo community</h2>
                <h3 class="section-subheading text-muted">자유롭게 이야기를 나눠보세요!</h3>
            </div>
            <table class="table table-hover table-striped text-center" style="border: 1px soild;">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>조회수</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for = "(ss, i) in paginatedData">
                        <td><span v-html="ss.num[0]"></span></td>
                        <td ><span v-html="ss.title" @click="clickedtitles(i)"></span></td>
                        <td><span v-html="ss.view"></span></td>
                        <td><span v-html="ss.times"></span></td>
                    </tr>
                </tbody>
            </table>
                <div class="pagination d-flex justify-content-center align-items-center">
                    <button :disabled="pageNum === 0" class="btn next my-2" @click="prevPage()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-square" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                        </svg>
                    </button>
                    <span>{{ pageNum + 1 }} / {{ pageCount===0? 1: pageCount }}</span>
                    <button :disabled="pageNum >= pageCount - 1" class="btn next my-2" @click="nextPage()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-square" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                        </svg>
                    </button>
                </div>
                <button class="btn btn" style="background-color: #eb6995; color: aliceblue; margin-right: 75%;" @click="opensModal">글쓰기</button>
        </div>
    </section>


</template>
<style>
.close{
    cursor: pointer;
    border: none;
    background: #6667AB;
    color: white;
    font-weight: bold;
    border-radius: 5px;
    padding: 5px 15px;
}
.readLess {
    height: 109px;
    overflow: hidden;
}
.read-more, .read-less {
    display: inline-block;
    color: #eb6995;
}
</style>
<script>
import axios from 'axios';
import { GDialog } from 'gitart-vue-dialog'
import { mapMutations, mapState } from "vuex";

export default {
    name: "posting",
    components: {
        GDialog,
    },
    data() {
        return{
            image: '',
            imageUploaded: '',
            pageNum: 0,
            pageSize:5,
            finisi:[],
            selectedtitle:[],
            closeText: true,
            todos: [],
            imageUrl: null,
            coments:{
                ment:'',
                num:'',
                id:sessionStorage.getItem('userid'),
                other:''
            },
            tc : {
                title:'',
                content:'',
                id:sessionStorage.getItem('userid')
            },
            openModal : false,
            opensModals : false,
            title:'',
            content:'',
            id:'',
            readMore : true
        };
    },
    mounted(){
        if(sessionStorage.getItem('userid')==null){
            this.$router.push('/Login')
            alert('로그인 후 이용해 주십시오.')
        } else{
            this.getTodos();
        }


    },
    computed: {
        pageCount: function() {
            console.log(1)
            const listLeng = this.todos.length;
            const listSize = this.pageSize;
            let page = Math.floor(listLeng / listSize);
            if (listLeng % listSize > 0) page += 1;

            return page;
        },

        paginatedData: function() {
            console.log(2)
            const start = this.pageNum * this.pageSize;
            const end = start + this.pageSize;
            return this.todos.slice(start, end);
        },
        categorys: function(){
            return ca
        }

    },
    methods: {
        imageUpload: function(){
            this.image = this.$refs.image.files[0]
            console.log(this.image)
            this.imageUploaded = URL.createObjectURL(this.image)
        },
        nextPage: function(){
            this.pageNum +=1;
        },
        prevPage() {
            this.pageNum -= 1;
        },
        deletepoam: function(i){
            axios.delete('/api/deletes/' + i, {
            }).then(response => {
                console.log(response)
                for(var n = 0; n < this.todos.length; n++){
                    if (this.todos[n].num==this.selectedtitle.num){
                        this.todos.splice(n,1);
                        console.log(this.todos)
                        n--;
                        this.closeModal()
                    }
                }
            })
        },
        opensModal: function(){
            this.opensModals = true;
            this.content='';
            this.title='';
            this.closeText=false;
        },
        clickedtitles: function(i){
            this.openModal = true;
            this.id = sessionStorage.getItem('userid')
            this.selectedtitle = this.todos[i]
            this.imageUrl = this.selectedtitle.photo          
            console.log(this.imageUrl)
            axios.get('/api/mentscollecs/'+ this.selectedtitle.num[0],{
            }).then(response => {
                console.log(response)
                this.finisi=response.data.ment;
                console.log(response.data.view)
                this.todos[i].view = response.data.view;
            })
            this.closeText=false;
            // console.log(this.finisi)
        },
        wantment: function(){
            this.coments.num = this.selectedtitle.num
            console.log(this.coments)
            axios.post('/api/mentscollecs/'+1,{
                coments : this.coments
            })
            .then(response =>{
                this.coments.ment='';
                // console.log(response);
                console.log(46)
                this.finisi = response.data.ment;
            })
        },
        deletment:function(i){
            axios.delete('/api/mentscollecs/'+i,{
            })
            window.location.reload(true);
        },
        closeModal() {
            this.openModal = false;
            this.opensModals = false;
            this.closeText = !this.closeText;
        },
        upload(){
            window.location.reload(true);
            console.log(1)
            const dto = {
                date: this.date,
                routine: this.content
            }
            const dtoToBlob = new Blob([JSON.stringify(dto)], {
                type: 'application/json'
            })
            var formData = new FormData()
            formData.append('routineDTO', dtoToBlob)
            formData.append('image', this.image)
            formData.append('title', this.title)
            formData.append('content', this.content)
            formData.append('id',sessionStorage.getItem('userid'))
            console.log(formData)

            const config = {
                headers: {
                'Content-Type': 'multipart/form-data' // 컨텐츠 타입 지정해줘야함
                }
            }
            axios.post('/api/updata', formData, config)
            .then(response =>{
                    console.log(response);
                    console.log(response.data.num);
                    this.tc['num'] = response.data.num;
                    this.tc['times'] = response.data.times;
                    this.tc['view'] = response.data.view;
                    this.tc['title'] = response.data.title;
                    this.tc['realtitle']= response.data.realtitle;
                    const copy = JSON.parse(JSON.stringify(this.tc));
                    this.todos.unshift(copy);
            })
            .catch(function (error) {
            alert(error)
            })
        },
        getTodos: function(){
            axios.get('/api/start')
            .then(response =>{
                console.log(response);
                this.todos=response.data;
                console.log(this.todos)
        })
        .catch(e => {
          this.errors.push(e);
        });
        }
    },
}
</script>