<template>
  <div class="main-template">
    <header class="alcon-header">
      <div class="logo-area">
        <h1 class="logo"></h1>
      </div>
      <!-- <button type="button">
        <b-icon-x-square-fill></b-icon-x-square-fill>
      </button> -->
    </header>
    <section class="contents">
      <aside class="alcon-aside">
        <div class="user-area">
          <div class="profile">
            <img src="../../img/profile-img.png" alt="프로필" />
          </div>
          <div class="affiliation">
            <span class="position">알콘관리자</span>
          </div>
          <div class="btns-area">
            <button type="button" class="user-btn" @click="defaultMenu">
              <b-icon-grid></b-icon-grid>
            </button>
            <button type="button" class="user-btn" @click="bookmarkMenu">
              <b-icon-star></b-icon-star>
            </button>
            <button type="button" class="user-btn" @click="logout">
              <b-icon-power></b-icon-power>
            </button>
          </div>
          <div class="aside-menu">
            <ul class="menu-list">
              <li class="list-item">
                <button type="button" class="item-btn active" @click="oneDepth = !oneDepth">
                  대메뉴
                  <i class="symbol mark" :class="{expanded: oneDepth}">
                  </i>
                </button>
                <transition
                  name="bounce"
                  enter-active-class="animated slideInLeft"
                  leave-active-class="animated slideOutLeft"
                >
                  <ul class="detail-list" v-if="oneDepth" style="animation-duration: 0.5s">
                    <li class="detail-item">
                      <router-link to="/main" class="detail-btn">
                        Home
                        <i class="symbol">
                          <b-icon-chevron-right></b-icon-chevron-right>
                        </i>
                      </router-link>
                    </li>
                    <li class="detail-item">
                      <router-link to="/delivery" class="detail-btn">
                        배송
                        <i class="symbol">
                          <b-icon-chevron-right></b-icon-chevron-right>
                        </i>
                      </router-link>
                    </li>
                    <li class="detail-item">
                      <router-link to="/deliveryscheduled" class="detail-btn">
                        배송예정
                        <i class="symbol">
                          <b-icon-chevron-right></b-icon-chevron-right>
                        </i>
                      </router-link>
                    </li>
                    <li class="detail-item">
                      <router-link to="/Program" class="detail-btn">
                        프로그램 정보
                        <i class="symbol">
                          <b-icon-chevron-right></b-icon-chevron-right>
                        </i>
                      </router-link>
                    </li>
                  </ul>
                </transition>
              </li>
              <li></li>
            </ul>
          </div>
        </div>
      </aside>
      <div class="tab-area">
        <router-tab />
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'Main',
  data() {
    return {
      oneDepth: true
    }
  },
  methods: {
    defaultMenu() {
      alert('defaultMenu')
    },
    bookmarkMenu() {
      alert('bookmarkMenu')
    },
    logout() {
      alert('logout')
    },
    deleteAllCloce() {
      const deleteAllConfirm = confirm('모든 탭을 닫으시겠습니까?')
      if (deleteAllConfirm === true) {
        this.tabs = []
      } else {
        return false
      }
    }
  }
}
</script>
