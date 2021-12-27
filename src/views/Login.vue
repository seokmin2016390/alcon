<style scope lang="scss">
@import '../css/login.scss';
</style>
<template>
  <div class="login-template">
    <h1 class="logo">
      <img src="../img/login-logo.png" alt="alcon위탁재고시스템" />
    </h1>
    <fieldset class="login-form">
      <legend class="blind">로그인</legend>
      <div class="input-row">
        <label for="login-id" class="default-label">User Id</label>
        <input
          type="text"
          class="default-input"
          id="login-id"
          v-model="userId"
        />
      </div>
      <div class="input-row">
        <label for="login-password" class="default-label">Password</label>
        <input
          type="password"
          class="default-input"
          id="login-password"
          v-model="userPassword"
        />
      </div>
      <div class="chk-row">
        <input type="checkbox" id="maintain-status" />
        <label for="maintain-status" class="chk-label">로그인 상태 유지</label>
      </div>
      <div class="btn-row">
        <button type="button" class="default-btn login-btn" @click="LoginProcessing">
          LOGIN
        </button>
      </div>
      <router-link to="/" class="find-password">
        비밀번호를 잊으셨나요?
      </router-link>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      userId: '',
      userPassword: ''
    }
  }
}
</script>
