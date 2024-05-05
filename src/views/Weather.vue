<template>
    <section class="page-section" id="about">
        <div class="container">
            <div class="text-center">
                <h2 class="section-heading text-uppercase">Weather</h2>
                <h3 class="section-subheading text-muted">With Earth Science</h3>
            </div>
            <div style="padding:15px;"> 
            </div>
            <p>부발읍의 정보</p>
            <div class="space-between" style="display: flex; white-space:nowrap; overflow:auto;">
                <div v-for="item in tw">
                    <div class="card" style="width: 90%; height: 130px;">
                        <div class="text-center">
                            <div class="card-body" style="height: 100px;">
                                <div v-if="item[0] > 17">
                                    <skycon condition="clear-night" style="width: 100%;"/>
                                </div>
                                <div v-else>
                                    <skycon condition="clear-day" style="width: 100%;"/>
                                </div>
                                <h5 class="hee">{{ item[1] }}°C</h5>
                                <p >{{ item[0] }}시</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="padding:25px;"> 
            </div>
            <!-- <h1>-일기도-</h1> -->
            <div class="row">
                <div class="polaroid" style="text-align: center;">
                    <img style="width: 100%;;" :src="weatherUpdata" alt="일기도"/> <br />
                    <div class="container">
                        <p><b>00:00</b></p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<style>

div.polaroid {
  margin: auto;  
  width: 50%;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.hee{
    margin: 0;
    padding: 0;
}
div.container {
  margin: auto;
  text-align: center;
  padding: 10px 20px;
}
</style>
<script>
import axios from 'axios';
import Skycon from "vue-skycons";
axios.defaults.withCredentials = true

export default {
    name: "posting",
    data() {
        return{
            weather: [],
            weatherUpdata: '',
            weatherUpdata2: '',
            tw: {},
            nw:[],
            wl:'',
            dd:'',
            loaded: false,
            chartData: null,
            ordered : {}
        };
    },
    components:{
        Skycon

    },
    mounted(){
        this.getweather()
            // "vue-material-tabs": "^1.1.2",

    },
    methods: {
        sortObject: function(o){
            return Object.keys(o).sort().reduce((r,k)=>(r[k]=o[k],r),{});
        },
        getweather: function(){
            axios.get('/api/weather')
            .then(response =>{
                console.log(response.data.c);
                this.weather=response.data.whea;
                this.tw = response.data.d
                for(const apd of this.tw){
                    console.log(apd)
                }
                    this.weatherUpdata = this.weather[0]
                    console.log(this.weatherUpdata)
                })
        .catch(e => {
            console.log(e)
            this.errors.push(e);
          
        });
        }
    },
}
</script>