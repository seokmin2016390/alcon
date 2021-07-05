import axios from 'axios'
import router from '../../router'

const state = {
  reportWritingList: {},
  reportWritingListLength: '',
  totalPage: 1,
  adminPostVal: {},
  adminPostUserVal: {},
  statusCountMap: {},
  fileId: 0,
  fileName: '',
  postId: 0,
  initStatus: ''
}
const getters = {
  getReportWrtingList (state) {
    return state.reportWritingList
  },
  getReportWrtingListLength (state) {
    return state.reportWritingListLength
  },
  getPageTotal (state) {
    return state.totalPage
  },
  getAdminPostVal (state) {
    return state.adminPostVal
  },
  getAdminPostUserVal (state) {
    return state.adminPostUserVal
  },
  getFileIdAdmin (state) {
    return state.fileId
  },
  getFileNameAdmin (state) {
    let temp = state.fileName.split('/')
    state.fileName = temp[temp.length - 1]
    return state.fileName
  },
  getPostIdAdmin (state) {
    return state.postId
  },
  getAdminPostStatus (state) {
    return state.adminPostVal.statusCode
  },
  getStatusCountMap (state) {
    return state.statusCountMap
  },
  getAdminInitStatus (state) {
    return state.initStatus
  }
}
const mutations = {
  setReportWritingList (state, payload) {
    state.reportWritingList = payload
  },
  setReportWritingLength (state, payload) {
    state.reportWritingListLength = payload
  },
  setTotalPages (state, payload) {
    state.totalPage = payload
  },
  setAdminPostVal (state, payload) {
    state.adminPostVal = payload
    state.postId = payload.id
    state.initStatus = payload.statusCode
  },
  setAdminPostUserVal (state, payload) {
    state.adminPostUserVal = payload
  },
  setAttachFile (state, payload) {
    state.fileId = payload.id
    state.fileName = payload.clientFilename
  },
  setAttachFileInit (state, payload) {
    state.fileId = 0
    state.fileName = ''
  },
  setAdminAddComments (state, payload) {
    state.adminPostVal.comments.push(payload)
  },
  setAdminPostStatus (state, payload) {
    state.adminPostVal.statusCode = payload
  },
  setStatusCountMap (state, payload) {
    state.statusCountMap = payload
  }
}
const actions = {
  apiReportedWriting (context, payload) {
    let getParam = ''
    if (payload !== undefined) {
      getParam = '?companyType=' + payload.companyType + '&page=' + payload.page + '&sort=' + payload.postSort
    }
    if (sessionStorage.getItem('token') != null) {
      axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('token')
      axios.get('/api/admin/posts' + getParam)
        .then((response) => {
          context.commit('setReportWritingList', response.data.board)
          context.commit('setReportWritingLength', response.data.board.totalElements)
          context.commit('setTotalPages', response.data.board.totalPages)
          context.commit('setStatusCountMap', response.data.statusCountMap)
        })
        .catch((error) => {
          alert(error.response.data.message)
          if (error.response.status === 410) {
            sessionStorage.removeItem('token')
            router.push('/sessiontimeout')
          }
        })
    } else {
      alert('세션 만료 또는 잘못된 접근 입니다.')
      router.push('/sessiontimeout')
    }
  },
  apiAdminInquiry (context, payload) {
    if (sessionStorage.getItem('token') != null) {
      axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('token')
      axios.get('/api/admin/posts/' + sessionStorage.getItem('pageId'))
        .then((response) => {
          context.commit('setAdminPostVal', response.data)
          context.commit('setAdminPostUserVal', response.data.user)
          if (response.data.attachFiles[0] !== undefined) {
            context.commit('setAttachFile', response.data.attachFiles[0])
          } else {
            context.commit('setAttachFileInit', '')
          }
        })
        .catch((error) => {
          alert(error.response.data.message)
          if (error.response.status === 410) {
            sessionStorage.removeItem('token')
            router.push('/sessiontimeout')
          }
        })
    } else {
      alert('세션 만료 또는 잘못된 접근 입니다.')
      router.push('/sessiontimeout')
    }
  },
  apiItemState (context, payload) {
    if (sessionStorage.getItem('token') != null) {
      axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('token')
      axios.patch('/api/admin/posts/' + payload.page + '?postStatus=' + payload.state)
        .then((response) => {
          context.commit('setAdminPostStatus', response.data.postStatus)
          context.dispatch('apiAdminInquiry')
          alert('변경되었습니다.')
        })
        .catch((error) => {
          alert(error.response.data.message)
          if (error.response.status === 410) {
            sessionStorage.removeItem('token')
            router.push('/sessiontimeout')
          }
        })
    } else {
      alert('세션 만료 또는 잘못된 접근 입니다.')
      router.push('/sessiontimeout')
    }
  },
  apiAdminPostsExcel (context, payload) {
    if (sessionStorage.getItem('token') != null) {
      axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('token')
      axios.get('/api/admin/posts.xls?companyType=' + payload.companyType + '&sort=' + payload.sort, {responseType: 'blob'})
        .then((response) => {
          if (window.navigator.msSaveOrOpenBlob) {
            let blob = new Blob([response.data])
            window.navigator.msSaveOrOpenBlob(blob, '사이버감사실_관리자게시글.xlsx')
          } else {
            const url = window.URL.createObjectURL(new Blob([response.data], {type: response.headers['content-type']}))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', '사이버감사실_관리자게시글.xlsx')
            document.body.appendChild(link)
            link.click()
          }
        })
        .catch((error) => {
          alert(error.response.data.message)
          if (error.response.status === 410) {
            sessionStorage.removeItem('token')
            router.push('/sessiontimeout')
          }
        })
    } else {
      alert('세션 만료 또는 잘못된 접근 입니다.')
      router.push('/sessiontimeout')
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
