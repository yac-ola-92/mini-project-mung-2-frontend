<template>
    <form @submit.prevent="onSubmit" class="reservation-form">
      <div class="form-group">
        <label for="checkin-date" class="form-label">체크인 날짜</label>
        <input v-model="checkinDate" type="date" id="checkin-date" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="checkout-date" class="form-label">체크아웃 날짜</label>
        <input v-model="checkoutDate" type="date" id="checkout-date" class="form-control" required />
      </div>
      <guest-slider v-model="guestCount" />
      <div class="form-group">
        <label for="reservation-name" class="form-label">예약자 이름</label>
        <input v-model="name" type="text" id="reservation-name" class="form-control" required />
      </div>
      <button type="submit" class="btn-submit">예약 확인</button>
    </form>
  
    <!-- 예약 정보 전달 -->
    <reservation-summary
      v-if="reservationConfirmed"
      :room-name="roomName"
      :checkin-date="checkinDate"
      :checkout-date="checkoutDate"
      :guest-count="guestCount"
      :name="name"
      :show="reservationConfirmed"
    />
  </template>
  
  <script>
  import GuestSlider from "../components/GuestSlider.vue";
  import ReservationSummary from "../components/ReservationSummary.vue";
  
  export default {
    components: { GuestSlider, ReservationSummary },
    data() {
      return {
        checkinDate: "",
        checkoutDate: "",
        guestCount: 1,
        name: "",
        reservationConfirmed: false,  // 예약 정보가 확인되었는지 여부
        roomName: "디럭스 룸",
      };
    },
    methods: {
      onSubmit() {
        const totalDays = this.calculateDays();
        if (totalDays <= 0) {
          alert("체크아웃 날짜는 체크인 날짜 이후여야 합니다.");
        } else {
          this.reservationConfirmed = true; // 예약 정보 확인 후 상태 변경
        }
      },
      calculateDays() {
        const checkin = new Date(this.checkinDate);
        const checkout = new Date(this.checkoutDate);
        return (checkout - checkin) / (1000 * 3600 * 24);
      },
    },
  };
  </script>
  
  
  <style scoped>
  .reservation-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
    text-align: center;
  }
  
  .form-label {
    font-size: 1rem;
    margin-bottom: 10px;
  }
  
  .form-control {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .btn-submit {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    text-align: center;
    margin-top: 20px;
  }
  
  .btn-submit:hover {
    background-color: #45a049;
  }
  </style>
  