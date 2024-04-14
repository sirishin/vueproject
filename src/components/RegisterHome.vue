<script>
export default {
  name: 'BoardList',
  data: function () {
    return {
      boardList: []
    }
  },
  created: function () {
    this.getList()
  },
  methods: {
    getList: function () {
      // axios를 이용하여 API 호출 (component 안에서 axios를 this.$axios로 사용할 수 있습니다.)
      this.$axios.get('http://127.0.0.1:5000/').then(response => {
        console.log('### response: ' + JSON.stringify(response))
        this.boardList = response.data
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>