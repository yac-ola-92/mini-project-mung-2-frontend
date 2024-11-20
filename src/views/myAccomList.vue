<template>
    <div class="listForm">
      <div class="container">
            <div id="title-box">
                <h2 style="text-align: center; color:white;">나의 숙소</h2>
            </div>
            <div class="register-btn-box">
                <button class="list-btn" onclick="registerForm()" style="margin: 10px; width: 80px;">숙소 등록</button>
            </div>
            <div class="accom-content" v-for="acc in userAcc" :key="acc.accom_id">
                <div class="accom-box">
                    <div class="accom-img-box">
                    <img class="acoom-img" :src="acc.accom_images_url.split(',')[0]">
                    </div>
                    <div class="accom-title">
                    <h3 class="accom-name">{{acc.accom_name}}</h3>
                    <input type="hidden" class="accom-id" :value="acc.accom_id">
                    </div>
                    <div class="btn-box">
                    <button class="list-btn" @click="update(acc.accom_id)">수정</button>
                    <button class="list-btn" @click="remove(acc.accom_id)">삭제</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router'; // useRouter 훅 추가

  export default {
    setup() {
      const userAcc = ref([]);
      const router = useRouter(); 
  
      //유저 아이디 가져오기
      const getUserId = async () => {
        try {
          const response = await axios.get('http://localhost:8088/api/getId');
          const user_id = response.data;
          console.log(user_id);
            getAccList(user_id);
        } catch (error) {
          console.error('사용자 아이디를 가져오는 데 실패했습니다.', error);
        }
      };
      // 아이디로 숙소 리스트 불러오기
      const getAccList= async (user_id) => {
        try{
            const response = await axios.get(`http://localhost:8088/api/myAccomList/${user_id}`);
            userAcc.value = response.data;
            console.log(userAcc.value);
        }catch(error){
            console.error('숙소 리스트를 가져오는 데 실패했습니다', error);
        }
      };
      // 숙소 수정
      const update = (accom_id) => {
        console.log("변경할 숙소 : "+ accom_id);
        router.push({path:`/accomUpdate/${accom_id}`});
      };
      // 숙소 삭제
      const remove = async(accom_id) => {
        console.log("삭제할 숙소 : "+ accom_id);
        const isConfirmed = confirm("숙소를 삭제하시겠습니까?");
        if(isConfirmed){
           const response = await axios.delete(`http://localhost://8088/api/accom_delete/${accom_id}`) ;
           console.log("숙소가 삭제되었습니다.");
           alert("숙소가 삭제되었습니다.");
           getUserId(); //새로고침
        } else{
            console.log("삭제를 취소하였습니다.")
        }
        
      };
      
      // 숙소 등록 폼 이동
      const registerForm = () =>{
        window.location.href = '';
      }
      
      onMounted(getUserId);

      return {
        userAcc,
        update,
        remove,
        registerForm,
      };
    }
  };
</script>
<style>
.listForm{
    margin: 0 200px;
}

 #title-box{
            height: 80px;
            width: 100%;
            background-color: #bc915e;
            border-radius: 3px;
            padding-top: 20px;
        }

        .container{
            background-color: #FAF0E6;
            height: 100%;
            width: 700px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin:  50px auto;
            padding: 40px 20px;

        }
        .accom-content{
            background-color: white;
            width: 500px;
            height: 200px;
            padding: 20px;
            margin : 10px;
            flex-direction: row;
            display: flex;
        }
        .accom-box{
            display: flex;
        }
        .line{
            height: 10px;
        }
        .accom-img-box{
            background-color: #bc915e;
            height: 150px;
            width: 150px;
            margin : auto 10px;
        }
        .accom-title{
            margin: 20px;
            width : 150px;
        }
        .list-btn{
            width: 45px;
            height: 40px;
            margin : 3px;
            background-color: #bc915e;
            border: none;
            border-radius: 5px;
            color: white;
        }
        .list-btn:hover{
            background-color: #fff9f0;
            border: solid 2px #bc915e;
            color: #bc915e;
            cursor: pointer;
        }
        .btn-box{
            display: flex;
            padding-top: 120px;
        }
        .register-btn-box{
            display: flex;
            margin-left: auto;
            margin-right: 100px;
        }
        .acoom-img {
            width : 150px;
            height : 150px;
        }
</style>
  