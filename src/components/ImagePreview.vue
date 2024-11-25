<template>
	<div>
	  <input type="file" ref="fileInput" class="acc-img" name="accom_images_url" accept="image/*" 
			 @change="fileChange" required multiple style="display: none;">
	  <div class="upload" @click="triggerFileInput">이미지 추가</div>
	  <ul style="display: flex;">
		<li class="preview" v-for="(img, index) in imgUrl" :key="index">
		  <img :src="img.url" alt="이미지 미리보기" class="pre-img">
		  <button class="btn-delete" @click="removeImage(index)">삭제</button>
		</li>
	  </ul>
	</div>
  </template>
  
  <script>
  import { ref, watchEffect } from 'vue';
  
  export default {
	name: 'ImagePreview',
	props: {
	  room_images_url: {
		type: Array,
		required: true,
	  },
	  accImg: {
		type: Array,
		required: true,
	  },
	},
	setup(props, { emit }) {
	  const imgUrl = ref([...props.room_images_url]);
	  const fileInput = ref(null);
  
	  // room_images_url이 변경될 때마다 imgUrl을 동기화
	  watchEffect(() => {
		imgUrl.value = [...props.room_images_url];
	  });
  
	  // input 태그의 파일 오픈 기능을 div가 직접 참조하게끔 하는 함수
	  const triggerFileInput = () => {
		fileInput.value.click();
	  };
  
	  const fileChange = (event) => {
		const files = event.target.files;
  
		if (!Array.isArray(props.room_images_url)) {
		  console.error('room_images_url은 배열이어야 합니다.');
		  return;
		}
  
		if (files.length + props.room_images_url.length > 4) {
		  alert('이미지는 최대 4개까지 업로드 가능합니다');
		  return;
		}
  
		const newImages = [...props.room_images_url];
  
		// 이미지 파일인지 체크하고 배열에 푸시
		for (let i = 0; i < files.length; i++) {
		  const file = files[i];
		  if (!file.type.match("image/.*")) {
			alert('이미지 파일만 업로드 가능합니다.');
			continue;
		  }
  
		  const reader = new FileReader();
		  reader.onload = (e) => {
			newImages.push({ file, url: e.target.result });
			emit('update-images', newImages); // 부모에게 이미지를 업데이트 이벤트 전송
		  };
		  reader.readAsDataURL(file);
		}
	  };
  
	  const removeImage = (index) => {
		const newImages = [...props.room_images_url];
		newImages.splice(index, 1);
		emit('update-images', newImages); // 부모에게 이미지 삭제 이벤트 전송
	  };
  
	  return {
		imgUrl,
		fileChange,
		triggerFileInput,
		fileInput,
		removeImage,
	  };
	},
  };
  </script>
  
  <style>
	/*이미지 추가 프리뷰*/
	.upload {
	  width: 150px;
	  padding-top: 4px;
	  height: 30px;
	  color: white;
	  border-radius: 3em;
	  background-color: #bc915e;
	  cursor: pointer;
	  text-align: center;
	}
  
	.preview {
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
  
	.pre-img {
	  width: 200px;
	  height: 150px;
	  object-fit: cover;
	}
  </style>
  