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

  <div id="cute-calendar">
      <div class="calendar">
        <div class="calendar-header">
          <div class="col align-self-center">
          <h4>{{ currentYear }}년 {{ currentMonthName }}</h4>
          </div>
        </div>
            <div class="calendar-grid">
              <!-- 요일을 표시하는 부분 -->
              <div class="weekday" v-for="(day, index) in weekdays" :key="index">
                {{ day }}
              </div>
              <!-- 날짜를 표시하는 부분 -->
              <div class="day" v-for="(day, index) in days" :key="index" @click="day && selectDate(day)">
                {{ day }}
              </div>
            </div>
      </div>
        <br>
      <ins class="kakao_ad_area" style="display:none;"
          data-ad-unit = "DAN-DHqYsK4L6x4ryFrE"
          data-ad-width = "320"
          data-ad-height = "50"></ins>
          <component is="script" src="//t1.daumcdn.net/kas/static/ba.min.js"></component>
      
      <div v-if="showModal" class="modal-backdrop" @click.self="closeModal">
        <div class="modal-content">
          <button class="close-button" @click="closeModal">×</button>
          <div v-if="lunch[ass[2]] != 'its empty'">
          <h4 v-for="menu in lunch[ass[2]]" :key="menu">{{ menu }}</h4>
          </div>
          <div v-else>
            <h4>급식 정보가 없습니다</h4>
          </div>
          <button class="modal-close-btn" @click="closeModal">닫기</button>
        </div>
      </div>
    </div>
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

.calendar {
width: 400px;
margin: 0 auto;
background-color: #ffebcd;
border-radius: 15px;
padding: 20px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.calendar-header {
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 20px;
}
.calendar-grid {
display: grid;
grid-template-columns: repeat(7, 1fr);
gap: 5px;
}
.day {
width: 40px;
height: 40px;
display: flex;
justify-content: center;
align-items: center;
background-color: #fff;
border-radius: 50%;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
cursor: pointer;
transition: background-color 0.3s ease;
text-align: center;    
}
.day:hover {
background-color: #f0e68c;
}
.modal-backdrop {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.5);
display: flex;
justify-content: center;
align-items: center;
}
.modal-content {
background-color: #fff;
padding: 20px;
border-radius: 10px;
position: relative;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.close-button {
position: absolute;
top: 10px;
right: 10px;
background: none;
border: none;
font-size: 20px;
cursor: pointer;
}
.modal-close-btn {
display: block;
margin: 20px auto 0;
padding: 10px 20px;
background-color: #f0e68c;
border: none;
border-radius: 5px;
cursor: pointer;
font-size: 16px;
}
.modal-close-btn:hover {
background-color: #ffd700;
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
.weekday {
    text-align: center;
    font-weight: bold;
    margin-bottom: 10px;
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
          showPopup: true,
        hideForADay: false,
        lunch: {},
        currentYear: new Date().getFullYear(),
        currentMonth: new Date().getMonth(),
        days: [],
        weekdays: ['일', '월', '화', '수', '목', '금', '토'], // 요일 데이터 추가
        showModal: false,
        selectedDate: '',
        selectedLunch: '',
        ass:''
        };
    },
    computed:{
      currentMonthName() {
        return new Date(this.currentYear, this.currentMonth).toLocaleString('default', { month: 'long' });
      }
    },
    created(){
      this.generateCalendar();
    },
    mounted(){
        const hidePopup = localStorage.getItem('hidePopup');
        if (hidePopup) {
            this.showPopup = false;
        }
        this.getlunch();
    },
    methods: {
      generateCalendar() {
        const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
        const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
        const daysArray = [];

        // Add empty slots for days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            daysArray.push('');
        }

        // Add actual days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            daysArray.push(i);
        }

        this.days = daysArray;
      },
      selectDate(day) {
        const date = `${this.currentYear}-${this.currentMonth + 1}-${day}`;
        this.selectedDate = date;
        this.ass = this.selectedDate.split('-')
        // console.log(this.ass[2])
        this.showModal = true;
      },
      closeModal() {
        this.showModal = false;
      },
      prevMonth() {
        this.currentMonth--;
        if (this.currentMonth < 0) {
          this.currentMonth = 11;
          this.currentYear--;
        }
        this.generateCalendar();
      },
      nextMonth() {
        this.currentMonth++;
        if (this.currentMonth > 11) {
          this.currentMonth = 0;
          this.currentYear++;
        }
        this.generateCalendar();
      },
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
