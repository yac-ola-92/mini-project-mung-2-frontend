<template>
	<div id="accom-update">
	<div style="background-color: #bc915e;height: 60px; padding-top: 10px;">
		<h2 style="color: aliceblue;">숙소 수정</h2>
	</div>
	  <hr>
	  <div class="section-top-border">
		<div class="row">
		  <form id="updateForm" action="/accom_update" method="post">
			<div>
			  <input type="hidden" name="user_id" />
			  
			  <!-- 숙소명, 위치, 전화번호, 소개 -->
			  <div class="mt-10">
				<label>숙소명</label>
				<input type="text" name="accom_name" v-model="accom.accom_name" placeholder="숙소명" required class="single-input-secondary" />
			  </div>
			  <div class="mt-10">
				<label>숙소 위치</label>
				<input type="text" name="accom_location" v-model="accom.accom_location" placeholder="위치" required class="single-input-secondary" />
			  </div>
			  <div class="mt-10">
				<label>숙소 전화번호</label>
				<input type="tel" name="accom_phone" v-model="accom.accom_phone" placeholder="숙소 전화번호" required class="single-input-secondary" />
			  </div>
			  <div class="mt-10">
				<label>숙소 소개</label>
				<textarea class="single-textarea" name="accom_description" v-model="accom.accom_description" required placeholder="숙소소개"></textarea>
			  </div>
  
			  <!-- 이미지 업로드 및 미리보기 -->
			  <div class="mt-10">
				<label>숙소 이미지</label>
				<ImagePreview :room_images_url="accom.accom_images_url" @update-images="updateImages" />
			  </div>
  
			  <!-- 예약 시 주의사항 -->
			  <div class="mt-10">
				<label>예약 시 주의사항</label>
				<textarea class="single-textarea" name="accom_caution" v-model="accom.accom_caution" required placeholder="예약 시 주의사항" style="height: 400px;"></textarea>
			  </div>
  
			  <!-- 편의시설 체크박스 -->
			  <div class="mt-10" style="flex-direction: row; flex-wrap: wrap;">
				<label style="width: 80px;">편의시설</label>
				<div v-for="(value, index) in amenities" :key="index">
				  <label class="cbx">
					<input type="checkbox" v-model="accom.amenities" :value="value" /> {{ value }}
				  </label>
				</div>
			  </div>
			  
			  <hr />
			  <!-- 객실 추가 버튼 -->
			  <button class="rm-btn" @click="openModal()">객실 추가</button>
			  
			  <!-- 객실 리스트 및 수정/삭제 버튼 -->
			  <div id="room-list">
				<div v-for="rm in roomList" :key="rm.room_id">
				  <div>
					<img class="pre-img" :src="rm.room_images_url[0]" alt="room thumbnail" />
					<div>
					  <h3>{{ rm.room_name }}</h3>
					  <div>
						<button @click="openModal(rm.room_id)" type="button">수정</button>
						<button @click="removeRoom(rm.room_id)" type="button">삭제</button>
					  </div>
					</div>
				  </div>
				  <hr />
				</div>
			  </div>
			  
			  <!-- 객실 수정/추가 모달 -->
			  <RoomModal v-if="isModalOpen" :room="currentRoom" @close-modal="closeModal" @save-room="saveRoom" />
  
			  <!-- 제출 버튼 -->
			  <button type="submit" class="submit">제출</button>
			  <button type="reset" class="cancel" onclick="window.location.href='/myPage'" style="margin-left: 10px;">취소</button>
			</div>
		  </form>
		</div>
	  </div>
	</div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref, reactive, onMounted } from 'vue';
  import ImagePreview from './ImagePreview.vue';
  import RoomModal from './RoomModal.vue';
  
  export default {
	name: 'AccomUpdate',
	components: {
	  ImagePreview,
	  RoomModal,
	},
	setup() {
	  const accom = ref({
		accom_name: '',
		accom_location: '',
		accom_phone: '',
		accom_description: '',
		accom_images_url: [],
		accom_caution: '',
		amenities: [],
	  });
	  const roomList = reactive([]);
	  const isModalOpen = ref(false);
	  const currentRoom = ref({});
	  const isEdit = ref(false);
	  const accomId = ref(1); // 숙소 ID
  
	  const amenities = ['소형견', '중형견', '대형견', '맹견가능', '애견수영장', '애견운동장', '무선인터넷', '주차가능', '바베큐장'];
  
	  const getData = async (accom_id) => {
		try {
		  const response = await axios.get(`http://localhost:8088/api/myAccom/edit/${accom_id}`);
		  accom.value = response.data;
		} catch (error) {
		  console.error('에러 발생', error);
		}
	  };
  
	  const getRoom = async (accom_id) => {
		try {
		  const response = await axios.get(`http://localhost:8088/api/myRoom/${accom_id}`);
		  roomList.splice(0, roomList.length, ...response.data);
		} catch (error) {
		  console.error('객실 정보 가져오기 실패', error);
		}
	  };
  
	  const openModal = (room_id = null) => {
		isModalOpen.value = true;
		isEdit.value = room_id !== null; //널값 아니면 룸아이디 넣어주기
		currentRoom.value = room_id ? roomList.find(rm => rm.room_id === room_id) : {}; //불러온 객실 중 해당 객실을 찾기
	  };
  
	  const closeModal = () => {
		isModalOpen.value = false;
		currentRoom.value = {};
	  };
  
	  const saveRoom = (updatedRoom) => {
		if (isEdit.value) {
		  // 객실 수정
		  axios.put(`http://localhost:8088/api/room_update`, updatedRoom)
			.then(() => {
			  getRoom(accomId.value);
			  closeModal();
			});
		} else {
		  // 객실 추가
		  axios.post(`http://localhost:8088/api/room_add`, updatedRoom)
			.then(() => {
			  getRoom(accomId.value);
			  closeModal();
			});
		}
	  };
  
	  const removeRoom = async (room_id) => { //객실 삭제
		try {
		  await axios.delete(`http://localhost:8088/api/room_delete/${room_id}`);
		  getRoom(accomId.value);
		} catch (error) {
		  console.error('객실 삭제 실패', error);
		}
	  };
  
	  const updateImages = (images) => {
		accom.value.accom_images_url = images;
	  };
  
	  onMounted(() => {
		getData(accomId.value);
		getRoom(accomId.value);
	  });
  
	  return {
		accom,
		roomList,
		isModalOpen,
		currentRoom,
		isEdit,
		amenities,
		openModal,
		closeModal,
		saveRoom,
		removeRoom,
		updateImages,
	  };
	},
  };
  </script>
  
  <style>
   /*     등록 메인      */
    #accom-update {
            text-align: center;
            margin: 100px;
            padding: 70px;
            background-color: #FAF0E6;

        }
        /*  input 태그들     */
        .mt-10 {
            display : flex;
			flex-direction : column;
            margin : 20px auto;
			width : 500px;
            align-items: center;
            justify-content: center;
        }

        div label {
            display : block;
            width: 150px;
			text-align: left; /* label의 텍스트를 왼쪽 정렬 */
			align-self: flex-start;
		}

		/*이미지 추가 프리뷰*/
		.upload {
			width: 150px;
			padding-top: 3px;
			height: 30px;
			color: white;
			border-radius: 3em;
            background-color: #bc915e;
			cursor : pointer;
        }

		.preview{
			width: 100%;
			height: 100%;
			margin-top: 10px;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-wrap: wrap;
			gap: 20px;
		}

		.preview li {
            flex: 1 1 23%; /* 한 줄에 약 4개 (4개가 100%를 차지하도록) */
            max-width: 23%; /* 한 이미지의 최대 너비 */
            height: 120px; /* 이미지의 고정 높이 */
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #f9f9f9;
        }
		.preview li img {
			max-width: 100%;
			max-height: 100%;
			object-fit: contain; /* 이미지 비율 유지 */
		}

				/* 체크박스 */
		.cbx{
			margin: 0 4px;
			width: auto;
		}
        .input-form {
            width: auto;
            margin-top: 10px;
            border: 1px solid #ccc;
            padding: 10px;
        }
        .submit , .cancel {
            background-color :#bc915e;
            border: none;
            width: 100px;
            height: 50px;

        }

        .btn-delete {
            background-color: #bc915e;
            border: none;
            width: 40px;
            height: 30px;
            padding: 10px;
            overflow: visible;
            display: flex;
            align-items: center;
            justify-content: center;
        }

		#modal {
			display: none; /* 모달창 숨겨 놓기 */
			position: fixed;
			padding-top: 100px;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			cursor: pointer; /* 마우스 손가락모양 */
			background-color: rgba(0, 0, 0, 0.8);
            z-index : 999;
		}
		/* 숙소 이미지 모달창 */
		#rmContent {
			margin: auto;
			display: block;
			width: 50%;
			height: auto;
			max-width: 1000px;
		}

        /*        객실 등록 폼        */
        #rmContent {
            margin: auto;
            margin-bottom: 100px;
            padding : 10px;

            display: flex;
            flex-direction: column;

            overflow-y: auto; /* 내용이 넘칠 경우 세로 스크롤 추가 */

            width: 70%;
            max-width: 1000px; /* 최대 너비 */
            min-width: 300px;  /* 최소 너비 */
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

        #roomPreview button{
            width: 80px;
            height: 40px;
            margin: 30px;
            background-color: #bc915e;
        }
		</style>