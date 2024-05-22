<template>
    <section class="page-section" id="about">
        <div class="container">
            <div class="text-center">
                <h2 class="section-heading text-uppercase">lunch</h2>
                <h3 class="section-subheading text-muted">점심을 확인해보세요!</h3>
            </div>
            <hr>
            <div class="row">
                <div class="col">
                    <h2>오늘의 중식</h2>
                    <div v-if="lunch.today != '오늘 급식은 없습니다'">
                    <h4 v-for="meneu in lunch.today" :key="meneu">{{ meneu }}</h4>
                    </div>
                    <div v-else>
                        <h4>오늘 급식은 없습니다.</h4>
                    </div>
                </div>
                <div class="col">
                    <h2>내일의 중식</h2>
                    <div v-if="lunch.tomorru != '내일 급식은 없습니다'">
                    <h4 v-for="menu in lunch.tomorru" :key="menu">{{ menu }}</h4>
                    </div>
                    <div v-else>
                        <h4>내일 급식은 없습니다.</h4>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import axios from 'axios';
export default {
    name: "posting",
    data() {
        return{
            lunch: []
        };
    },
    mounted(){
        this.getlunch();
    },
    methods: {
        getlunch: function(){
            axios.get('port-0-flask22-754g42aluyx17vx.sel5.cloudtype.app/api/lunch',{ withCredentials: true })
            .then(response =>{
                console.log(response);
                this.lunch=response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
        }
    },
}
</script>
