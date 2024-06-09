<template>
    <div v-if="openModal == true">
            <div class="card" style="width: 80%;  float:none; margin:0 auto">
                <div class="card-body">
                    <h4 class="text-center">{{ selectedtitle.realtitle }}</h4>
                    <hr>
                    <p class="text-center">{{ selectedtitle.content }}</p>
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
                                <div class="col-sm-3 col-9">
                                    <div>익명 {{ value[2] }}</div>
                                    <div>{{ value[0] }}</div>
                                </div> 
                                <div class="row">
                                    <div class="col text-start">
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
                                        <button type="button"  v-if="value[3] == id" class="btn btn-link" @click="deletment(value[4])">삭제</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row justify-content-end">
                            <div class="col-3" style="width: 99px; height: 40px;">
                                <button v-if="selectedtitle.id == id" class="btn btn my-2" style="background-color: #eb6995; color: aliceblue;" @click="remake(selectedtitle.num[0])">수정</button>
                            </div>
                            <div class="col-3" style="width: 99px; height: 40px;">
                                <button v-if="selectedtitle.id == id" class="btn btn my-2" style="background-color: #eb6995; color: aliceblue;" @click="deletepoam(selectedtitle.num[0])">삭제</button>
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
                                <input type="text" class="form-control border" id="title" v-model="tc.title">
                            </div>
                            <div class="mb-3">
                                <label for="content" class="form-label">내용</label>
                                <input type="text" class="form-control border" id="content" v-model="tc.content">
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
    <div v-if="opensModls == true">
        <div class="card" style="width: 80%;  float:none; margin:0 auto">
            <div class="card-body">
                <h4 class="card-title text-center">글 수정하기</h4>
                <hr>
                <div class="row">
                    <div class="col">
                    <form class="form">
                        <div class="mb-3">
                            <label for="title" class="form-label">제목</label>
                            <input type="text" class="form-control border" id="title" v-model="tc.title">
                        </div>
                        <div class="mb-3">
                            <label for="content" class="form-label">내용</label>
                            <input type="text" class="form-control border" id="content" v-model="tc.content">
                        </div>
                    </form>
                    </div>
                </div>
                <div class="row justify-content-between">
                    <div class="col">
                        <button  class="btn btn" style="background-color: #eb6995; color: aliceblue; right: 30%;" @click="[complete(selectedtitle.num[0])]">재게시하기</button>
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
                <h2 class="section-heading text-uppercase">anonymous community</h2>
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
                        <td><span v-html="ss.views"></span></td>
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
import apiClient from '@/main.js';

export default {
    name: "posting",
    components: {
    },
    data() {
        return{
            clickcoment:false,
            pageNum: 0,
            pageSize:5,
            finisi:[],
            // comdelet:'',
            selectedtitle:[],
            closeText: true,
            todos: [],
            coments:{
                ment:'',
                num:'',
                id:sessionStorage.getItem('userid'),
                other:''
            },
            openModal : false,
            opensModals : false,
            opensModls: false,
            tc: {
                title:'',
                content:'',
                id:sessionStorage.getItem('userid')
            },
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
            const listLeng = this.todos.length;
            const listSize = this.pageSize;
            return Math.ceil(listLeng / listSize);
        },

        paginatedData: function() {
            const start = this.pageNum * this.pageSize;
            const end = start + this.pageSize;
            return this.todos.slice(start, end);
        },

    },
    methods: {
        clickmet: function(){
            this.show =! this.show;
        },
        cles : function(){
            this.lessText.style.display = 'none';
            this.moreText.style.display = 'inline-block';
            this.text.style.display = '-webkit-box';
        },
        nextPage: function(){
            if (this.pageNum < this.pageCount - 1) {
                this.pageNum += 1;
            }
        },
        prevPage() {
            if (this.pageNum > 0) {
                this.pageNum -= 1;
            }
        },
        remake: function(){
            this.opensModls = true;
            this.openModal = false;
            this.opensModals = false;
        },
        complete(i){
            apiClient.put('https://port-0-flask22-754g42aluyx17vx.sel5.cloudtype.app/api/everything/'+i,{
                tc: this.tc
            },{ withCredentials: true }).then(response =>{
                window.location.reload(true);
            })
            .catch(function (error) {
            alert(error)
            })
        },
        deletepoam: function(i){
            apiClient.delete('https://port-0-flask22-754g42aluyx17vx.sel5.cloudtype.app/api/everything/' + i, {
            },{ withCredentials: true }).then(response => {
                // console.log(response)
                for(var n = 0; n < this.todos.length; n++){
                    if (this.todos[n].num==this.selectedtitle.num){
                        this.todos.splice(n,1);
                        // console.log(this.todos)
                        n--;
                        this.closeModal()
                    }
                }
            })
        },
        opensModal: function(){
            this.opensModals = true;
            this.tc.content='';
            this.tc.title='';
            this.closeText=false;
        },
        clickedtitles: function(i){
            const actualIndex = (this.pageNum * this.pageSize) + i;
            this.openModal = true;
            this.id = sessionStorage.getItem('userid')
            this.selectedtitle = this.todos[actualIndex];
            apiClient.get('https://port-0-flask22-754g42aluyx17vx.sel5.cloudtype.app/api/mentscollec/'+ this.selectedtitle.num[0],{
            },{ withCredentials: true }).then(response => {
                this.finisi=response.data.ment;
                this.todos[actualIndex].views = response.data.view;
            })
            this.closeText=false;
            // console.log(this.finisi)
        },
        wantment: function(){
            this.coments.num = this.selectedtitle.num
            // console.log(this.coments)
            apiClient.post('https://port-0-flask22-754g42aluyx17vx.sel5.cloudtype.app/api/mentscollec/1',{
                coments : this.coments
            },{ withCredentials: true })
            .then(response =>{
                this.coments.ment='';
                // console.log(response);
                // console.log(46)
                this.finisi = response.data.ment;
                // console.log(this.finisi)
            })
        },
        deletment: function(i){
            apiClient.delete('https://port-0-flask22-754g42aluyx17vx.sel5.cloudtype.app/api/mentscollec/'+i,{
            },{ withCredentials: true })
            window.location.reload(true);

            // .then(response =>{
            //     for(let d=0; d<this.finisi.length; d++){
            //         if(this.finisi[d] === i){
            //             this.finisi.splice(d,1);
            //             i--;
            //         }
            //     }
            //     this.finisi = this.finisi
            // })
        },
        closeModal() {
            this.openModal = false;
            this.opensModals = false;
            this.closeText = !this.closeText;
            this.opensModls = false;
        },
        upload(){
            // console.log(1)
            // console.log(this.tc);
            apiClient.post('https://port-0-flask22-754g42aluyx17vx.sel5.cloudtype.app/api/everything/1', { 
            tc: this.tc
            },{ withCredentials: true })
            .catch(function (error) {
            alert(error)
            })
            window.location.reload(true);

            // window.location.reload(true);

        },
        getTodos: function(){
            apiClient.get('https://port-0-flask22-754g42aluyx17vx.sel5.cloudtype.app/api/need')
            .then(response =>{
                // console.log(response);
                this.todos=response.data;
                // console.log(this.todos)
        },{ withCredentials: true })
        .catch(e => {
          this.errors.push(e);
        });
        }
    },
}
</script>
