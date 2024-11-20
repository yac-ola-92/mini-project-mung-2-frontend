 <template>
    <div class="room-page-container">
      <h1 class="page-title">방 정보</h1>
      <room-info :room-name="room.name" :room-price="room.price" />
      <router-link to="/reservation">
        <button class="btn-reservation">예약하러 가기</button>
      </router-link>
    </div>
  </template>
  
  <script>
  import RoomInfo from "../components/RoomInfo.vue";
  
  export default {
    name: "RoomPage",
    components: { RoomInfo },
    data() {
      return {
        room: { name: "디럭스 룸", price: 120000 },
      };
    },
  };
  </script>
  
  <style scoped>
  .room-page-container {
    text-align: center;
    padding: 20px;
  }
  
  .page-title {
    font-size: 2rem;
    margin-bottom: 20px;
  }
  
  .btn-reservation {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    text-align: center;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  
  .btn-reservation:hover {
    background-color: #45a049;
  }
  </style>
  