<template>
    <div id="roomModal">
      <form ref="roomForm" v-if="isModalOpen" @submit.prevent @click.self="closeModal">
        <div id="rmContent">
          <div class="mt-10">
            <div>
              <div style="background-color: #bc915e; width: 100%; height: 40px;">
                <h3 style="color: white; text-align: center;">{{ isEdit ? '객실 수정' : '객실 등록' }}</h3>
              </div>
              <br>
              <!-- 객실 이름 -->
              <div>
                <label>객실 명  </label>
                <input type="text" v-model="room.room_name" placeholder="객실명" required class="single-input-secondary">
              </div>
              <!-- 객실 타입 -->
              <div class="mt-10" style="flex-direction:row; align-items: flex-start; justify-content: flex-start;">
                <label style="width:80px;">객실 타입 </label>
                <label for="room_type" style="width:40px; margin:0 20px">캠핑</label>
                <input type="radio" v-model="room.room_type" name="room_type" id="room_type" value="캠핑" style="margin-top: 5px;">
                <label for="room_type" style="width:40px; margin:0 20px;">독채</label>
                <input type="radio" v-model="room.room_type" name="room_type" id="room_type2" value="독채" style="margin-top: 5px;">
              </div>
              <!-- 객실 금액 -->
              <div class="mt-10">
                <label>객실 금액  </label>
                <input type="number" v-model="room.room_price" placeholder="객실 금액" required class="single-input-secondary">
              </div>
              <!-- 이미지 프리뷰 및 업데이트 -->
              <div class="mt-10">
                <label>객실 이미지  </label>
                <ImagePreview :room_images_url="room.room_images_url" @update-images="updateImages" />
              </div>
              <!-- 객실 소개 -->
              <div class="mt-10">
                <label>객실 소개  </label>
                <textarea v-model="room.room_info" placeholder="객실에 대한 주의사항을 적어주세요" class="single-textarea"></textarea>
              </div>
              <!-- 객실 수 -->
              <div class="mt-10">
                <label>객실 수 </label>
                <input type="number" v-model="room.room_amount" placeholder="해당 객실의 수를 입력해 주세요." required class="single-input-secondary">
              </div>
              <!-- 수용 인원 -->
              <div class="mt-10" style="flex-direction: row; gap:10px;">
                <label>수용 인원 </label>
                <input type="number" v-model="room.capacity_standard" placeholder="객실 기준 인원 입력" required class="single-input-secondary" style="width:100%">
                <label>최대 인원 </label>
                <input type="number" v-model="room.capacity_max" placeholder="객실 최대 수용 인원 입력" required class="single-input-secondary" style="width:100%">
              </div>
              <!-- 동반 가능한 견종 -->
              <div class="mt-10" style="flex-direction:row; align-items: flex-start; justify-content: flex-start;">
                <label style="width:80px;"> 동반 가능한 견종 </label>
                <label for="pet_kind" style="width:50px; margin:0 20px">소형견</label>
                <input type="radio" v-model="room.pet_kind" name="pet_kind" id="s-dog" value="소형견">
                <label for="pet_kind" style="width:50px; margin:0 20px;">중형견</label>
                <input type="radio" v-model="room.pet_kind" name="pet_kind" id="m-dog" value="중형견">
                <label for="pet_kind" style="width:50px; margin:0 20px;">대형견</label>
                <input type="radio" v-model="room.pet_kind" name="pet_kind" id="l-dog" value="대형견">
              </div>
              <!-- 버튼 -->
              <div class="rm-btn-box">
                <button class="rm-btn" @click="addForm" type="button">등록</button>
                <button class="rm-btn" @click="closeModal" type="button">취소</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref, defineProps, defineEmits } from 'vue';
  import ImagePreview from '@/components/ImagePreview.vue'; // 이미지 미리보기 컴포넌트
  
  export default {
    name: 'roomModal',
    components: { ImagePreview },
  
    setup(props, { emit }) {
      const room = ref({
        room_id: null,
        room_name: '',
        room_type: '',
        room_price: '',
        room_amount: '',
        room_info: '',
        capacity_standard: '',
        capacity_max: '',
        room_images_url: [],
        pet_kind: ''
      });
  
      const isModalOpen = ref(false);
  
      // 이미지 업데이트 핸들러
      const updateImages = (images) => {
        room.value.room_images_url = images;
      };
  
      // 모달 창 열기
      const openModal = (room_id = null) => {
        isModalOpen.value = true;
        if (room_id) {
          getRoomdata(room_id);
        } else {
          resetData();
        }
      };
  
      // 객실 데이터 가져오기
      const getRoomdata = async (room_id) => {
        try {
          const response = await axios.get(`http://localhost:8088/room/${room_id}`);
          room.value = response.data;
          if (room.value.room_images_url) {
            room.value.room_images_url = room.value.room_images_url.split(',');
          }
        } catch (error) {
          console.error("객실 정보를 불러오는데 오류가 발생했습니다.");
        }
      };
  
      // 데이터 초기화
      const resetData = () => {
        room.value = {
          room_id: null,
          room_name: '',
          room_type: '',
          room_price: '',
          room_amount: '',
          room_info: '',
          capacity_standard: '',
          capacity_max: '',
          room_images_url: [],
          pet_kind: ''
        };
      };
  
      // 모달 닫기
      const closeModal = () => {
        isModalOpen.value = false;
        resetData();
      };
  
      // 객실 등록/수정 처리
      const addForm = async () => {
        try {
          let response;
          if (room.value.room_id) {
            response = await axios.put(`http://localhost:8088/api/room_update`, room.value);
            alert('객실이 수정되었습니다.');
          } else {
            response = await axios.post(`http://localhost:8088/accom_register`, room.value);
            alert('객실이 등록되었습니다.');
          }
        } catch (error) {
          alert('등록 중 오류가 발생했습니다.');
        } finally {
          closeModal();
        }
      };
  
      return {
        isModalOpen,
        room,
        openModal,
        closeModal,
        addForm,
        updateImages,
      };
    }
  };
  </script>
  

<style>
   
	#modal {
			position: fixed;
			padding-top: 100px;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			cursor: pointer; /* 마우스 손가락모양 */
			background-color: rgba(0, 0, 0, 0.8);
            z-index: 999;
           
		}

		/*        객실 등록 폼        */
		#rmContent {
			margin: auto;
			margin-bottom: 100px;
			padding : 30px;

			display: flex;
			flex-direction: column;
            

			overflow-y: auto; /* 내용이 넘칠 경우 세로 스크롤 추가 */

			width: 800px;
			max-height: 80vh;
			max-width: 1000px;
			background-color: white;
		}

		.rm-btn-box{
			align-items: center;
			display: flex;
			flex-direction: row;
			justify-content: center;
		}

		.rm-btn{
			margin: 20px;
			width: 100px;
			height: 40px;
			background-color: #bc915e;
			border: none;
		}

		.rm-btn:hover {
			background-color: antiquewhite;
			color: #bc915e;
			cursor: pointer;
		}

		/* 숙소등록폼에 나올 객실 썸네일 */
		#room-list{
			display: flex;
			align-items: center;
			justify-content: center;
		}

		#roomPreBox div{
			display: flex;
		}
		
		#roomPreview {
			width: 500px;
			height: 200px;
			background-color: antiquewhite;
			padding: 20px;
			
		}

		#roomPreview button{
			width: 80px;
			height: 40px;
			margin: 10px;
			background-color: #bc915e;
		}

</style>