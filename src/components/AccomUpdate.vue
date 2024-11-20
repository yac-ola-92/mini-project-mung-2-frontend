<template>
<div id="accom-update">
    <h2 style="margin-top:20px; color: aliceblue;">숙소 수정</h2>
	<h1>숙소 아이디 : {{accom_id}}</h1>
</div>
<hr>
<div class="section-top-border">
		<div class="row">
			<form id="updateForm" action="/accom_update" method="post">
				<div>
					<input type="hidden" name="user_id" >
					<div class="mt-10">
						<label>숙소명  </label>
						<input type="text" name="accom_name" v-model="accom.accom_name" placeholder="숙소명" onfocus="this.placeholder = ''" onblur="this.placeholder = '숙소명'"
							   required class="single-input-secondary">
					</div>
					<div class="mt-10">
						<label>숙소 위치  </label><input type="text" name="accom_location" v-model="accom.accom_location"
                                placeholder="위치" onfocus="this.placeholder = ''" onblur="this.placeholder = '위치'"
													 required class="single-input-secondary">
					</div>
					<div class="mt-10">
						<label>숙소 전화번호  </label><input type="tel" name="accom_phone" placeholder="숙소 전화번호" v-model="accom.accom_phone"
													   onfocus="this.placeholder = ''"   onblur="this.placeholder = '숙소 전화번호'" required
													   class="single-input-secondary">
					</div>
					<div class="mt-10">
						<label>숙소 소개  </label><textarea class="single-textarea" placeholder="숙소소개" v-model="accom.accom_description"
														name="accom_description" onfocus="this.placeholder = ''"
														onblur="this.placeholder = '숙소 소개'" required></textarea>
					</div>
					<div class="mt-10">
						<label>숙소 이미지  </label>
						<input type="file" ref="fileInput" class="acc-img" name="accom_images_url" accept="image/*" 
                       			@change="hanldeFileChange" required multiple style="display: none;">
						<div class="upload" @click="triggerFileInput">이미지 추가</div>
						<ul style="display: flex;">
							<li class="preview" v-for="img , index in accImg" :key="index">
								<img :src="img" alt="이미지 미리보기" style="width: 200px;">
								<button class="btn-delete" @click="removeImage(index)">삭제</button>
							</li>
						</ul>
					</div>
					<div class="mt-10">
						<label>예약 시 주의사항 : </label><textarea class="single-textarea" placeholder="예약 시 주의사항" v-model="accom.accom_caution" style="height: 400px;"
															 onfocus="this.placeholder = ''"
															 onblur="this.placeholder = '예약 시 주의사항'"
															 name="accom_caution" required></textarea>
					</div>
					<div class="mt-10" style="flex-direction: row; flex-wrap: wrap;">
						<label style="width:80px;">편의시설</label>
						<label class="cbx"><input type="checkbox" v-model="amenity" value="소형견">소형견</label>
						<label class="cbx"><input type="checkbox" v-model="amenity" value="중형견">중형견</label>
						<label class="cbx"><input type="checkbox" v-model="amenity" value="대형견">대형견</label>
						<label class="cbx"><input type="checkbox" v-model="amenity" value="맹견가능">맹견가능</label>
						<label class="cbx"><input type="checkbox" v-model="amenity" value="애견운동장">애견운동장</label>
						<label class="cbx"><input type="checkbox" v-model="amenity" value="무선인터넷">무선인터넷</label>
						<label class="cbx"><input type="checkbox" v-model="amenity" value="주차가능">주차가능</label>
						<label class="cbx"><input type="checkbox" v-model="amenity" value="바베큐장">바베큐장</label>
					</div>
					<div id="cb-result" class="mt-10" style="background-color:white; height:50px;"></div>
					<div style="display: flex; align-items: center; justify-content: center;">
						<p id="selected" style="text-align: center;">선택한 편의시설 : {{ amenity }}</p>
					</div>	
				<button type="submit" class="submit">제출</button>
				<button type="reset" class="cancel" onclick="window.location.href='/myPage'"
						style="margin-left: 10px;">취소</button>
			</div>


	<div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
		<div class="modal-content">		
          <div class="mt-10">
			<div v-if="room.length > 0" v-for="rm in room" :key="rm.room_id">
				<div>
                  <label>객실 명  </label>
                  <input type="text" name="room_name" v-model="rm.room_name" placeholder="객실명" onfocus="this.placeholder = ''" onblur="this.placeholder = '객실명'"
                               required class="single-input-secondary">
          </div>
          <div class="mt-10" style="flex-direction:row; align-items: flex-start; justify-content: flex-start;">
                  <label style="width:80px;">객실 타입 </label>
                <label  for="room_type" style="width:40px; margin:0 20px">캠핑</label>
                <input type="radio" v-model="rm.room_type" name="room_type" id="room_type" value="캠핑" style="margin-top: 5px;">
                <label for="room_type" style="width:40px; margin:0 20px;">독채</label>
                <input type="radio" v-model="rm.room_type" name="room_type" id="room_type2" value="독채" style="margin-top: 5px;">
          </div>
          <div class="mt-10">
                <label>객실 금액  </label>
                <input type="number" name="room_price" v-model="rm.room_price" placeholder="객실 금액" onfocus="this.placeholder = ''" onblur="this.placeholder = '1박의 금액을 입력해주세요'"
                          required class="single-input-secondary">
          </div>
          <div class="mt-10">
                <label>객실 이미지  </label>
                <input type="file" ref="fileInput" class="acc-img" name="room_images_url" accept="image/*" 
				 @change="handleFileChange" required multiple style="display:none">
                <div class="upload" @click="triggerFileInput">이미지 추가</div>
                <ul style="display: flex;">
					<li class="preview" v-for="img, index in rmImg" :key="index">
						<img :src="img" alt="이미지 미리보기" style="width: 200px;">
						<button class="btn-delete" @click="removeImage(index)">삭제</button>
					</li>
				</ul>
          </div>
          <div class="mt-10">
                <label>객실 소개  </label>
                <textarea name="room_info"  v-model="rm.room_info" class="single-textarea" placeholder="객실에 대한 주의사항을 적어주세요"></textarea>
          </div>
          <div class="mt-10">
                <label>객실 수 </label>
                <input type="number" name="room_amount" v-model="rm.room_amount" placeholder="해당 객실의 수를 입력해 주세요." onfocus="this.placeholder = ''"
                                    onblur="this.placeholder = '해당 객실의 수를 입력해 주세요.'"
                                    required class="single-input-secondary">
          </div>
          <div class="mt-10" style=" flex-direction: row; gap:10px;">
                <label>수용 인원 </label><br>
                <input type="number" name="capacity_standard" v-model="rm.capacity_standard" placeholder="객실 기준 인원 입력" onfocus="this.placeholder = ''" onblur="this.placeholder = '객실 기준 인원'"
                             required class="single-input-secondary" style="width:100%">
                <label>최대 인원 </label><br>
                <input type="number" name="capacity_max" v-model="rm.capacity_max" placeholder="객실 최대 수용 인원 입력" onfocus="this.placeholder = ''" onblur="this.placeholder = '객실 최대 수용 인원'"
                            required class="single-input-secondary" style="width:100%">
          </div>
          <div class="rm-btn-box">
          <button class="rm-btn" @click="addForm()">등록</button>
          <button class="rm-btn" @click="closeModal()">취소</button>
          </div>
		</div>
	</div>
	</div>
	</div>

        </form>
    </div>
</div>
</template>
<script>
import axios from 'axios';
import { ref ,onMounted} from 'vue';
import { useRoute } from 'vue-router';

export default{
    setup()  {
		const route = useRoute(); //현재 경로 가져오기 
		const accom_id = route.params.accom_id; //url 에서 id 가져오기
		const accom = ref({}); // 숙소정보
		const accImg = ref([]); // 숙소 이미지
        const fileInput = ref(null); // input file 직접 참조 div 를 누르면 저기가 참조 되게 하기 위함
		const amenity = ref([]);
		const room = ref([]);
		const rmImg = ref([]);
		const isModalOpen = ref(false);
        

				//숙소 정보 불러오기
		const getData = async(accom_id)=>{
		console.log('수정하려는 숙소 아이디 : '+ accom_id);
		try{
			const response = await axios.get(`http://localhost:8088/api/myAccom/edit/${accom_id}`);
			console.log(response.data);
			accom.value = response.data; 

			if(accom.value.accom_images_url){
				accImg.value = accom.value.accom_images_url.split(',');
				console.log(accImg.value);
			}
			if(accom.value.accom_amenities){
				amenity.value = accom.value.accom_amenities.split(',').map(item => item.trim());
				console.log(amenity.value);
			}
			
		} catch(error){
			console.error("에러가 발생했습니다.",error);
			}
		};

		const getRoom = async(accom_id) =>{
			console.log(accom_id+"객실 정보 가져올게요");
			try{
				const response = await axios.get(`http://localhost:8088/api/myRoom/${accom_id}`);
				room.value = response.data;
				console.log(room.value);	
				
				room.value.forEach((rm) => {
            if (Array.isArray(rm.room_images_url)) { // 배열이면 그냥 넣기
                rmImg.value = rm.room_images_url;
            } else if (typeof rm.room_images_url === 'string') {
                // 스플릿 하고 배열에 넣기
                rmImg.value = rm.room_images_url.split(',');
            }
            console.log(rmImg.value); 
        });
			}catch(error){
				console.error("에러가 발생했습니다.",error);
			}
		};
	

			/* input 태그의 파일 오픈 기능을 div가 직접 참조하게끔 하는 함수  */
        const triggerFileInput = () => { 
					fileInput.value.click(); 	
			};
        
		const handleFileChange =(event) =>{ //파일 입력 요소에서 파일을 선택했을 때 발생하는 이벤트를 뜻함
        const files= event.target.files;
			if(files.length + accImg.value.length >4){
				alert('이미지는 최대 4개까지 업로드 가능합니다');
				return;
			}
		
			// 이미지 파일인지 체크하고 배열에 푸쉬
			for(let i=0; i<files.length; i++){
				const file = files[i];
				if(!file.type.match("image/.*")){
					alert('이미지 파일만 업로드 가능합니다.');
					continue;
				}
				const reader = new FileReader();
				reader.onload = (e) => {
					accImg.value.push({file , url:e.target.result})
				};
				reader.readAsDataURL(file);
				//파일을 Data URL 형식으로 읽음
			}
		}
		
				// 이미지 삭제
		const removeImage = (index)=>{
		accImg.value.splice(index,1);
		console.log(accImg.value);
		alert('이미지 삭제완료');
		}
		/*       이미지 프리뷰    끝  */

		 // 모달 열기 함수
		 const openModal = async () => {
      		isModalOpen.value = true;
     		 await fetchRoomData();
   		 };

	onMounted(() =>{getData(accom_id);
		getRoom(accom_id);

	});
	
    return {
       accom_id,
	   accom,
	   room,

	   accImg,
	   rmImg,
	   removeImage,
	   triggerFileInput,
	   handleFileChange,
	   amenity,
	   isModalOpen,
	    }
	}
}



</script>
<style>

		/*     등록 메인      */
		main {
			text-align: center;
			margin: 100px;
			padding: 70px;
			background-color: #FAF0E6;

		}
		#accom-update{
			text-align: center; 
			background-color: #bc915e;
			height: 80px;
			padding-top: 20px;
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
			padding-top: 10px;
			height: 30px;
			color: white;
			border-radius: 3em;
			background-color: #bc915e;
			cursor : pointer;
			text-align: center;
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
			flex-direction: row;
			justify-content: center;
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
			width: 90px;
		}
		#selected {
			text-align: center;
    		background-color: #bc915e;
   			 color: white;
    		width: 750px;
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
			width: 60px;
			height: 30px;
			padding: 8px;
			border-radius: 5px;
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