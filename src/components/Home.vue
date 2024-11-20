<template>
    <div>
      <h1>Home Page</h1>
      <input type="text" id="phone" />
      <button @click="fetchData">Fetch Data</button>
      <p v-if="data">{{ data }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "Home",
    data() {
      return {
        data: null,
      };
    },
    methods: {
    async fetchData() {
        let phone = document.getElementById('phone').value;
      const payload = {
        phone:phone
      };

      try {
        const res = await fetch("http://localhost:8088/api/findIdByPhone", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        // 응답이 JSON 형식일 경우
        if (res.ok) {
          const result = await res.text();  // JSON 응답 처리
          this.data = result;
        } else {
          console.error("Failed to fetch data:", res.status);
        } 
      } catch (error) {
        console.error("Error sending POST request:", error);
      }
    },
  },
};
  </script>
  