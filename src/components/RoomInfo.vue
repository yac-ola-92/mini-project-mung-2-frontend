<template>
    <div class="room-info-container">
      <h2 class="room-title">선택한 객실: <span>{{ roomName }}</span></h2>
      <p class="room-price"><span>{{ roomPrice }}</span>원 / 1박</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      roomName: {
        type: String,
        default: "디럭스 룸",
      },
      roomPrice: {
        type: Number,
        default: 120000,
      },
    },
  };
  </script>
  
  <style scoped>
  .room-info-container {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .room-title {
    font-size: 1.8rem;
    margin-bottom: 10px;
  }
  
  .room-price {
    font-size: 1.5rem;
    color: #4CAF50;
    font-weight: bold;
  }
  </style>
  