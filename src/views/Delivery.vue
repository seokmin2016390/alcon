<template>
  <div class="real-container">
    <b-row class="ui-row">
      <b-col sm="6" class="ui-col">
        <h2 class="content-tit">
          <button
            type="button"
            @click="bookmark()"
            class="bookmark-btn"
            :class="{ active: bookmarkActive }"
          >
            <transition name="mode-fade" mode="out-in">
              <b-icon-star-fill v-if="bookmarkActive"></b-icon-star-fill>
              <b-icon-star v-else></b-icon-star>
            </transition>
            배송
          </button>
        </h2>
      </b-col>
      <b-col sm="6" class="ui-col">
        <div class="data-control">
          <button type="button" class="data-add" @click="addRow()">
            신규
            <b-icon-plus-circle></b-icon-plus-circle>
          </button>
          <button type="button" class="data-delete" @click="removeRow()">
            제외
            <b-icon-trash></b-icon-trash>
          </button>
        </div>
      </b-col>
    </b-row>
    <b-row class="ui-row">
      <b-col sm="5" class="display-flex flex-wrap ui-col">
        <label class="default-tit input-tit text-center" for="company-name">
          화주
        </label>
        <input
          type="text"
          class="default-input input margin-left"
          id="company-name"
          placeholder="화주코드를 입력해주세요."
        />
      </b-col>
      <b-col sm="7" class="display-flex flex-wrap ui-col">
        <label class="default-tit input-tit text-center" for="occurrence-start">
          발생일
        </label>
        <div class="date-container">
          <b-form-datepicker
            id="occurrence-start"
            class="date-picker"
            placeholder="시작일"
            locale="ko-kr"
            hide-header
            today-button
            reset-button
            close-button
            label-today-button="오늘날짜"
            label-reset-button="초기화"
            label-close-button="닫기"
            :date-format-options="{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric'
            }"
            v-model="occurrenceStart"
            @context="dateStart"
          >
          </b-form-datepicker>
          <span class="waves">~</span>
          <b-form-datepicker
            id="occurrence-end"
            class="date-picker"
            placeholder="종료일"
            locale="ko-kr"
            hide-header
            today-button
            reset-button
            close-button
            label-today-button="오늘날짜"
            label-reset-button="초기화"
            label-close-button="닫기"
            :date-format-options="{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric'
            }"
            v-model="occurrenceEnd"
            @context="dateEnd"
          >
          </b-form-datepicker>
        </div>
      </b-col>
    </b-row>
    <b-row class="ui-row">
      <b-col sm="12" class="display-flex flex-wrap ui-col">
        <label class="default-tit input-tit text-center" for="select-name">
          셀렉트박스
        </label>
        <multiselect
          id="select-name"
          v-model="locationVal"
          :options="locationOption"
          :multiple="true"
          selectLabel="추가"
          deselectLabel="제외"
          placeholder="배송지를 선택해주세요."
          class="default-select"
          track-by="name"
          label="name"><span slot="noResult">일치하는 배송지가 없습니다.</span></multiselect>
      </b-col>
    </b-row>
    <b-row class="ui-row">
      <b-col sm="12" class="display-flex flex-wrap ui-col">
        <label class="default-tit input-tit text-center" for="input-name">
          인풋박스
        </label>
        <input
          type="text"
          class="default-input input margin-left"
          id="input-name"
          placeholder="화주코드를 입력해주세요."
        />
      </b-col>
    </b-row>
     <b-row class="ui-row grid-section">
      <b-col sm="6" class="display-flex flex-wrap ui-col">
        <h3 class="grid-tit">배송 데이터 조회</h3>
      </b-col>
      <b-col sm="6" class="display-flex flex-wrap ui-col data-control">
        <button type="button" class="data-add">신규
          <b-icon-plus-circle></b-icon-plus-circle>
        </button>
      </b-col>
      <b-col sm="12">
        <div id="realgrid" class="real-grid"></div>
      </b-col>
    </b-row>
    <b-modal
      id="add-modal"
      class="item-modal"
      size="lg"
      title="추가하기"
      @show="resetModal"
      @hidden="resetModal"
    >
      <b-row class="modal-row">
        <b-col sm="12" class="modal-col">
          <label class="default-label" for="name-input">Name</label>
          <b-form-input v-model="infoModal.name" id="name-input"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="modal-row">
        <b-col sm="12" class="modal-col">
          <label class="default-label" for="fullname-input">Fullname</label>
          <b-form-input v-model="infoModal.fullName" id="fullname-input">
          </b-form-input>
        </b-col>
      </b-row>
      <b-row class="modal-row">
        <b-col sm="12" class="modal-col">
          <label class="default-label" for="companyname-input">
            Companyname
          </label>
          <b-form-input v-model="infoModal.companyName" id="companyname-input">
          </b-form-input>
        </b-col>
      </b-row>
      <b-row class="modal-row">
        <b-col sm="12" class="modal-col">
          <label class="default-label" for="age-input">Age</label>
          <b-form-input v-model="infoModal.age" id="age-input"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="modal-row">
        <b-col sm="12" class="modal-col">
          <label class="default-label" for="email-input">Email</label>
          <b-form-input v-model="infoModal.eMail" id="email-input">
          </b-form-input>
        </b-col>
      </b-row>
      <template #modal-footer>
        <b-row class="modal-row">
          <b-button class="button default margin-right" @click="addSave()">
            저장
          </b-button>
          <b-button class="button pink" @click="addClose()">취소</b-button>
        </b-row>
      </template>
    </b-modal>
  </div>
</template>
<script>
import { GridView, LocalDataProvider } from 'realgrid'
import { columns, fields, rows } from './realgrid-data'

let gridView = GridView
let dataProvider = LocalDataProvider

export default {
  name: 'Delivery',
  data() {
    return {
      bookmarkActive: false,
      occurrenceStart: '',
      occurrenceEnd: '',
      locationOption: [
        {
          name: '용마로지스 본사',
          value: 1
        },
        {
          name: '용마로지스 안성',
          value: 2
        },
        {
          name: '동아제약 본사',
          value: 3
        },
        {
          name: 'DA인포메이션 신설동',
          value: 4
        }
      ],
      locationVal: [],
      infoModal: {
        class: 'info-modal',
        title: '배너 추천',
        name: '',
        fullName: '',
        companyName: '',
        age: '',
        eMail: ''
      },
      value: null,
      options: ['용마로지스 백석점', '공공이', '놀토']
    }
  },
  methods: {
    bookmark() {
      this.bookmarkActive = !this.bookmarkActive
    },
    addRow() {
      this.infoModal.title = '배너 추가하기'
      this.$root.$emit('bv::show::modal', 'add-modal')
    },
    removeRow() {
      const deleteRowConfirm = confirm('선택한 라인을 제외하시겠습니까?')
      if (deleteRowConfirm === true) {
        let curr = gridView.getCurrent()
        dataProvider.removeRow(curr.dataRow)
      } else {
        return false
      }
    },
    addSave() {
      this.$nextTick(() => {
        this.$bvModal.hide('add-modal')
        let values = [
          this.infoModal.name,
          this.infoModal.fullName,
          this.infoModal.companyName,
          this.infoModal.age,
          this.infoModal.eMail
        ]
        dataProvider.addRow(values)
      })
    },
    addClose() {
      this.$nextTick(() => {
        this.$bvModal.hide('add-modal')
      })
    },
    resetModal() {
      this.infoModal = {
        title: '',
        name: '',
        fullName: '',
        companyName: '',
        age: '',
        eMail: ''
      }
    },
    loadData() {
      dataProvider.setRows(rows)
    },
    dateStart() {
      console.log('시작' + this.occurrenceStart)
    },
    dateEnd() {
      console.log('종료' + this.occurrenceEnd)
    }
  },
  mounted() {
    dataProvider = new LocalDataProvider(false)
    gridView = new GridView('realgrid')
    gridView.setDataSource(dataProvider)
    gridView.setCheckBar({
      visible: false
    })
    dataProvider.setFields(fields)
    gridView.setColumns(columns)
    this.loadData()
  }
}
</script>
