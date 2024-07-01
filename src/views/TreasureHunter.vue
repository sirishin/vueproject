<template>
    <div class="stamp-board">
      <div v-for="(stamp, index) in stamps" :key="index" class="stamp">
        <img v-if="stamp" src="@/assets/star-stamp.png" alt="Stamp" />
      </div>
    </div>
    <br>
    <br>
    <div class="quiz-container">
    <div v-for="(question, index) in quizData" :key="index" :class="['slide', { 'active-slide': index === currentSlide }]">
      <div class="question">{{ question.question }}</div>
      <div class="answer">
        <label v-for="(answer, key) in question.answers" :key="key">
          <input type="radio" :name="'question' + index" :value="key" v-model="selectedAnswer" @change="handleAnswerSelect(key)">
          {{ key }} : {{ answer }}
        </label>
      </div>
    </div>
    <div class="navigation-buttons">
      <!-- <button @click="showPreviousSlide" :disabled="currentSlide === 0">Previous</button> -->
      <button @click="showNextSlide" v-if="selectedAnswer !== null && currentSlide < quizData.length">다음</button>
      <button @click="showResult" v-if="currentSlide === quizData.length">제출하기</button>
    </div>
    <div id="result">{{ resultMessage }}</div>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import axios from 'axios';
import apiClient from '@/main.js';

export default defineComponent({
  data(){
    return{
      quizData:[
        {
          question:'물의 화학식은 무엇인가요?',
          answers:{
            a: "H2O",
            b: "CO2",
            c: "NaCl"
          },
          correct:'a',
          answeredCorrectly: false
        },
        {
          question:'미국의 첫 번째 대통령은 누구인가요?',
          answers:{
            a: '토마스 제퍼슨',
            b: '조지 워싱턴',
            c: '아브라함 링컨'
          },
          correct: 'b',
          answeredCorrectly: false
        },
        {
          question: '중력 퍼텐셜 에너지의 공식은 무엇인가요?',
          answers: {
            a: 'mgh',
            b: '1/2mv^2',
            c: 'mgh+1/2mv^2'
          },
          correct: 'a',
          answeredCorrectly: false
        },
        {
          question: '윌리엄 셰익스피어는 어떤 나라의 작가인가요?',
          answers: {
            a: '프랑스',
            b: '스페인',
            c: '영국'
          },
          correct: 'c',
          answeredCorrectly: false
        },
        {
          question: '다음 중 행성이 아닌 것은 무엇인가요?',
          answers: {
            a: '지구',
            b: '태양',
            c: '토성'
          },
          correct: 'b',
          answeredCorrectly: false
        },
      ],
      currentSlide: 0,
      userAnswers: [],
      selectedAnswer: null,
      resultMessage: ''
    }
  },
  mounted(){
      if(sessionStorage.getItem('userid')==null){
          this.$router.push('/Login')
          alert('로그인 후 이용해 주십시오.')
      }
      else{
      }
  },
  methods:{
    showPreviousSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--;
        this.selectedAnswer = this.userAnswers[this.currentSlide] || null;
      }
    },
    handleAnswerSelect(answer) {
      this.selectedAnswer = answer;
      this.userAnswers[this.currentSlide] = answer;
    },
    showNextSlide() {
      const currentQuestion = this.quizData[this.currentSlide];
      const userAnswer = this.userAnswers[this.currentSlide];
      if (userAnswer === currentQuestion.correct) {
        console.log('Correct');
        this.addStamp()
        currentQuestion.answeredCorrectly = true;
      } else {
        console.log('Incorrect');
      }

      let nextSlide = this.currentSlide + 1;
      while (nextSlide < this.quizData.length && this.quizData[nextSlide].answeredCorrectly) {
        nextSlide++;
      }

      if (nextSlide < this.quizData.length) {
        this.currentSlide = nextSlide;
        this.selectedAnswer = this.userAnswers[this.currentSlide] || null;
      } else {
        this.currentSlide = nextSlide;
      }
    },
    showResult() {
      let numCorrect = 0;
      this.quizData.forEach((question, index) => {
        if (this.userAnswers[index] === question.correct) {
          numCorrect++;
        }
      });
      this.resultMessage = `${this.quizData.length}개 중에서 ${numCorrect}개 맞추셨습니다.`;
    }
 },
  setup() {
    const state = reactive({
      stamps: Array(5).fill(false),
    });

    const addStamp = async () => {
      const index = state.stamps.findIndex(stamp => !stamp);
      if (index !== -1) {
        state.stamps[index] = true;
        // 도장의 개수를 계산
        const stampCount = state.stamps.filter(stamp => stamp).length;
        // 서버로 데이터 전송
        try {
          const datsa ={'stamp': stampCount, 'id':sessionStorage.getItem('userid')}
          console.log(datsa)
          await apiClient.post('https://port-0-flask22-754g42aluyx17vx.sel5.cloudtype.app/api/stampretrun', { datsa});
          console.log(`Sent ${stampCount} stamps to the server`);
        } catch (error) {
          console.error('Failed to send stamp count:', error);
        }
      }
    };

    return {
      stamps: state.stamps,
      addStamp,
    };
  },
});
</script>

<style scoped>
.stamp-board {
  display: flex;
  gap: 10px;
}
.stamp {
  width: 50px;
  height: 50px;
  border: 1px solid #ccc;
  cursor: not-allowed;
  pointer-events: none;
}
.stamp img {
  width: 100%;
  height: 100%;
}
.quiz-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.slide {
  display: none;
}

.active-slide {
  display: block;
}

.question {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.answer label {
  display: block;
  margin: 5px 0;
}

.navigation-buttons {
  margin-top: 20px;
}

button {
  margin-right: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:not(:disabled):hover {
  background-color: #0056b3;
}

#result {
  margin-top: 20px;
  font-size: 1.2em;
  color: #333;
}
</style>
