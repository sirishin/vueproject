<template>
    <div>
    <!-- 팝업 -->
    <div v-if="showPopup" class="popup">
      <!-- 팝업 내용 -->
      <div class="popup-content">
        <h4>공지사항</h4>
        <p>효양고등학교 익명 커뮤니티 서비스입니다.</p>
        <p>익명커뮤니티 사용시 안내사항을 알려드리겠습니다.</p>
        <p>1. 타인을 비난 하거나 모욕하는 행위는 제한됩니다.</p>
        <p>2. 폭력적인 언어, 욕설 등은 삼가해 주세요.</p>
        <p>3. 비정상적인 방식으로 사이트를 접속하지 마세요.</p>
        <p>위의 규칙을 지키지 않았을 때의 불이익은 도움을 드릴 수 없습니다.</p>
        <!-- 하루 동안 안 보기 체크박스 -->
        <label class="checkbox-container">
          <input type="checkbox" v-model="hideForADay">
          <span class="checkmark"></span>
          하루 동안 안 보기
        </label>
        <!-- 닫기 버튼 -->
        <button @click="closePopup">닫기</button>
      </div>
    </div>
  </div>
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
<style>
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f9f6f7;
  width: 80%; /* 팝업 창의 가로폭을 화면의 80%로 설정 */
  max-width: 400px; /* 최대 너비 설정 */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  text-align: center;
}

/* 팝업 내용 스타일 */
.popup-content {
  font-family: 'Arial', sans-serif;
}

/* 닫기 버튼 스타일 */
button {
  background-color: #ff8484;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 20px;
}

/* 닫기 버튼 호버 스타일 */
button:hover {
  background-color: #ff6b6b;
}

/* 하루 동안 안 보기 체크박스 스타일 */
.checkbox-container {
  display: block;
  margin-top: 20px;
  position: relative;
  padding-left: 25px;
  font-size: 14px;
  cursor: pointer;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.checkbox-container:hover input ~ .checkmark {
  background-color: #ccc;
}

.checkbox-container input:checked ~ .checkmark {
  background-color: #2196F3;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-container .checkmark:after {
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
</style>
<script>
import axios from 'axios';
import apiClient from '@/main.js';
export default {
    name: "posting",
    data() {
        return{
            showPopup: true, // 팝업을 보여줄지 여부
            hideForADay: false, 
            lunch: []
        };
    },
    mounted(){
        const hidePopup = localStorage.getItem('hidePopup');
        if (hidePopup) {
            this.showPopup = false;
        }
        this.getlunch();
    },
    methods: {
        closePopup() {
      // 체크박스가 선택되었을 때 로컬 스토리지에 값을 저장하여 하루 동안 팝업을 보이지 않게 함
            if (this.hideForADay) {
                localStorage.setItem('hidePopup', 'true');
            }
            this.showPopup = false; // 팝업을 닫음
        },
        getlunch: function(){
            apiClient.get('https://port-0-flask22-754g42aluyx17vx.sel5.cloudtype.app/api/lunch',{ withCredentials: true })
            .then(response =>{
                // console.log(response);
                this.lunch=response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
        }
    },
}
</script>
