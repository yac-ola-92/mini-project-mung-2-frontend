<template>
    <header>
      <div class="header-bottom header-sticky" style="background-color:#fff9f0; height:150px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <!-- 로고 영역 -->
        <div class="logo" style="margin-bottom: 10px; margin-top:10px">
          <a href="/mainPage">
            <!-- 이미지를 import 해서 사용하는 방식 -->
            <img style="margin-top: 20px; width: 100px;" :src="logoSrc" alt="Logo">
          </a>
        </div>
        <!-- 네비게이션 메뉴 영역 -->
        <nav>
          <ul class="header">
            <li class="header-li" v-if="isHost">
              <a href="/registerForm" style="color: #bc915e;">나의 숙소</a>
            </li>
            <li class="header-li"><a href="/postMain" style="color:#bc915e;">게시판</a></li>
            <li class="header-li"><a href="/myPage" style="color:#bc915e;">마이페이지</a></li>
            <li class="header-li" v-if="!userInfo"> <a href="/login" id="login">로그인</a></li>
            <li class="header-li" v-if="userInfo"><a href="/logout" id="logout">로그아웃</a></li>
          </ul>
        </nav>
      </div>
    </header>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // 이미지 파일을 import 해서 사용
  import logoSrc from '@/assets/img/logo/munglogo.png';
  
  // 사용자 로그인 정보가 있는지 여부를 나타내는 ref
  const userInfo = ref(null);
  
  // 호스트 권한 여부를 나타내는 ref (예시로 false로 설정)
  const isHost = ref(false);
  
  // 로그인 상태에 따라 로그인/로그아웃 버튼을 보여주기 위해 반응형 데이터 사용
  function checkLoginStatus() {
    if (userInfo.value === null) {
      // 로그인 상태가 아니라면 로그인 버튼을 보여주고, 로그아웃 버튼은 숨김
      document.getElementById('login').style.display = 'block';
      document.getElementById('logout').style.display = 'none';
    } else {
      // 로그인 상태라면 로그인 버튼을 숨기고, 로그아웃 버튼을 보여줌
      document.getElementById('login').style.display = 'none';
      document.getElementById('logout').style.display = 'block';
    }
  }
  </script>
  