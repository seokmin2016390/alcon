<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import './css/reset.css';
@import './css/style.scss';
@import './css/main.scss';
#app {
  font-family: 'Dotum', 'AppleGothic', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  flex: none;
  box-sizing: border-box;
  padding: 30px 15px;
  width: 200px;
  border-right: 1px solid #eaecef;
  text-align: center;

  a {
    display: block;
    margin: 1em 0;
    font-weight: bold;
    color: #2c3e50;

    &:hover,
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.router-tab {
  flex: 1 1 0px;

  &-page {
    padding: 20px 15px;
  }
}

// 移动端尺寸
$smallScreen: 767.98px;

// 移动端样式
@media screen and (max-width: $smallScreen) {
  #app {
    flex-direction: column;
  }
  #nav {
    padding: 0 15px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    white-space: nowrap;
    overflow: auto;

    a {
      margin: 0 1em;
      display: inline-block;
    }
  }
}
</style>
