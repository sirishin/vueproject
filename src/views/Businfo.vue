<template>
    <div id="app">
    <div v-if="isLoading">
        <div class="d-flex justify-content-center">
            <div class="spinner-border m-9" style="width: 3rem; height: 3rem; color: #eb6995;" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
    <div v-show="isload">
        <div id="map">  
        </div>
    </div>
    </div>
</template>
<style>
#map{
    width: 100%;
    height: 400px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
<script>

// import axios from 'axios';
    // "@quasar/extras": "^1.16.7",
    // "@quasar/vite-plugin": "^1.5.0",

export default {
    name: "busin",
    data() {
        return{
            timerID:0,
            connection: null,
            isLoading:true,
            isload:true,
            info:[],
            iwinfo:'',
            dataa : [],
            mapCenter : { lat :37.265324, lng:127.479680 },
            map : null,
            datie:'',
            na:'',
            ti:null,
            onwi:false
        };
    },
    mounted(){
        // this.start();
        // this.initMap()
        this.isload = false;
        this.map = new google.maps.Map(document.getElementById("map"), { //getElementById로 map id 속성의 요소를 가져온다.
                center: this.mapCenter, //center로 할 위도, 경도를 지정한다.
                zoom: 17, //zoom size를 지정.
                maxZoom: 20,
                minZoom: 3,
                // mapTypeId:'terrain',
                streetViewControl: true,
                mapTypeControl: true,
                fuulscreenControl: true,
                zoomControl: true,
            });
    },
    created(){
        this.connectionWebsocket();
        },
    methods: {
        initMap() {
            this.isload = true;
            console.log(1)
            this.isLoading = false;
            var positions = [
                {
                    id: 'apt',
                    store: '시내 방향',
                    info: this.dataa.cho,
                    latlng: [37.260142, 127.477520],
                },
                {
                    id: 'cho',
                    store: '하이닉스 방향',
                    info:  this.dataa.apt,
                    latlng : [37.259772, 127.477757],
                },
                {
                    id: 'bb',
                    store: '이천역 방향',
                    info: this.dataa.bb,
                    latlng : [37.264495, 127.483508],
                },
                {
                    id: 'ic',
                    store: '부발역 방향',
                    info: this.dataa.ic,
                    latlng : [37.264850, 127.483685],
                    
                },
            ]
            var myIcon = new google.maps.MarkerImage("/img/busicon.jpg", null, null, null, new google.maps.Size(12,20));
            var infowindow = new google.maps.InfoWindow();
            // var marimage = new google.maps.MarkerImage("./views/busicon.png")
            // const image = "@/assets/img/busicon.png"
            const icon = {
                url :'http://127.0.0.1:5000/api/icon',
                scaledSize: new google.maps.Size(0.5, 0.5), // scaled size
                origin: new google.maps.Point(0,0), // origin
                anchor: new google.maps.Point(0, 0)            
            }
            var marker,i;
            for (i = 0; i < positions.length; i++) {  
                marker = new google.maps.Marker({
                position: new google.maps.LatLng(positions[i].latlng[0], positions[i].latlng[1]),
                map: this.map,
                id:positions[i].id,
                icon: 'http://127.0.0.1:5000/api/icon'
                });
                var iwinfon =''
                var iwinfot =''
                var iwinfow =''
                for(var ii = 0; ii<positions[i].info.length; ii++){
                    iwinfon=iwinfon+'<p>'+
                                        positions[i].info[ii].name+
                                    '</p>'
                    iwinfot=iwinfot+'<p>'+
                                        positions[i].info[ii].time+
                                    '</p>'
                    iwinfow=iwinfow+'<p>'+
                                        positions[i].info[ii].which+
                                    '</p>'
                }
                // console.log(iwinfon)
                const contentString = '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h4 id="firstHeading" class="firstHeading">'+positions[i].store+'</h4>' +
    '<div id="bodyContent">' +
    '<div class="row">' +
    '<div class="col-4">'+
            iwinfon+   
    '</div>'+
    '<div class="col">'+
            iwinfot+    
    '</div>'+
    '<div class="col-5">'+
            iwinfow+    
    '</div>'+
    '</div>'+

    '<p>도움이 되었나요?' +
    "(서버 개선에 노력하겠습니다.)</p>" +
    "</div>" +
    "</div>";
            var m = this.map
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function(){
                    infowindow.setContent(contentString);
                    infowindow.open(m, marker);
                }
            })(marker, i));
            }
        },
        connectionWebsocket(){
            this.connection = new WebSocket("ws://127.0.0.1:8800");
            this.connection.onopen = this.onOpen;
            this.connection.onmessage = this.onMessage;
            this.connection.onerror = this.onError;
            this.connection.onclose = this.onClose;
        },
        onClose(event){
            this.connection.send('good')
            console.log('WebSocket connection closed:', event.code);
            setTimeout(()=> {
                this.connectionWebsocket();
            }, 5000);
        },
        unmounted() {
            this.connection.close();
            this.connection = null; // to prevent memory leaking
            console.log("Closing connection to WebSocket Server");
        },
        onOpen(event) {
            console.log("WebSocket connection opened:", event);
        },
        onMessage(event) {
            this.onSocketOpen(event);
            console.log("WebSocket message received:");
        },
        onError(error) {
            console.log("WebSocket error:", error);
        },
        // start(){
        //     let connection = new WebSocket("ws://127.0.0.1:8800");
        //     console.log("Starting connection to WebSocket Server");
        //     connection.onmessage = this.onSocketOpen;
        //     sendMessage()
        //     connection.onopen=(event)=>{
        //         console.log(event);
        //         console.log("Successfully connected to the echo websocket server...");
        //     }
        //     // function heartbeat(){
        //     //     console.log('pi')
        //     //     connection.send('ping');
        //     //     // setTimeout(heartbeat, 500)
        //     // }
        //     function sendMessage() {
        //         if (connection.readyState === WebSocket.OPEN) {
        //             // 연결이 열려있으면 메시지 보내기
        //             connection.send('message');
        //         } else if (connection.readyState === WebSocket.CLOSED || connection.readyState === WebSocket.CLOSING) {
        //             // 이미 닫혀있는 경우 에러 메시지 출력
        //             console.error('WebSocket is already in CLOSING or CLOSED state.');
        //         } else {
        //             // 연결 중인 경우 잠시 후 다시 시도
        //             setTimeout(function() {
        //                 sendMessage();
        //             }, 500); // 1초 후 재시도
        //         }
        //     }
        // },
        onSocketOpen(event){
            console.log(12)
            this.dataa = JSON.parse(event.data);
            console.log(this.dataa)
            if(this.dataa.type == 'businfo'){
                this.initMap()
            }
        },
    }
}
</script>
