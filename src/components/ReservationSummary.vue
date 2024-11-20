<template>
    <div v-if="show">
      <h3 class="text-center">예약 정보</h3>
      <p><strong>숙소:</strong> {{ roomName }}</p>
      <p><strong>체크인 날짜:</strong> {{ checkinDate }}</p>
      <p><strong>체크아웃 날짜:</strong> {{ checkoutDate }}</p>
      <p><strong>인원:</strong> {{ guestCount }}명</p>
      <p><strong>예약자:</strong> {{ name }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      roomName: String,
      checkinDate: String,
      checkoutDate: String,
      guestCount: Number,
      name: String,
      show: Boolean, // 예약 정보가 확인되었을 때 보여주는 플래그
    },
  };
  </script>
  

  <style scoped>
  .reservation-summary-container {
    text-align: center;
    margin-top: 20px;
  }
  
  .summary-title {
    font-size: 2rem;
    margin-bottom: 20px;
  }
  
  .reservation-summary-container p {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
  </style>
  