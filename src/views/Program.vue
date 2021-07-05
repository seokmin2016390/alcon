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
            프로그램 정보
          </button>
        </h2>
      </b-col>
      <b-col sm="6" class="ui-col">
        <div class="data-control">
          <button type="button" class="button default data-save" @click="saveProgram()">
            저장
            <b-icon-check2-circle></b-icon-check2-circle>
          </button>
        </div>
      </b-col>
    </b-row>
    <b-row class="ui-row program-row">
      <b-col sm="4" class="display-flex flex-wrap ui-col program-col">
        <div class="left-column tree-area">
          <button @click="addNode">Add Node</button>
          <vue-tree-list
            @click="onClick"
            @change-name="onChangeName"
            @delete-node="onDel"
            @add-node="onAddNode"
            :model="data"
            default-tree-node-name="new node"
            default-leaf-node-name="new leaf"
            v-bind:default-expanded="false"
          >
            <template v-slot:leafNameDisplay="slotProps">
              <span>
                {{ slotProps.model.name }} <span class="muted">#{{ slotProps.model.id }}</span>
              </span>
            </template>
            <span class="icon" slot="addTreeNodeIcon">📂</span>
            <span class="icon" slot="addLeafNodeIcon">＋</span>
            <span class="icon" slot="editNodeIcon">📃</span>
            <span class="icon" slot="delNodeIcon">✂️</span>
            <span class="icon" slot="leafNodeIcon">🍃</span>
            <span class="icon" slot="treeNodeIcon">🌲</span>
          </vue-tree-list>
        </div>
      </b-col>
      <b-col sm="8" class="display-flex flex-wrap ui-col program-col">
        <b-row class="right-top-column">
          <b-col sm="6" class="ui-col">
            <label for="menu-name" class="default-tit input-tit text-center">메뉴명</label>
            <input type="text" id="menu-name" class="default-input input margin-left">
          </b-col>
          <b-col sm="6" class="ui-col">
            <label for="parent-menu-name" class="default-tit input-tit text-center">상위 메뉴명</label>
            <input type="text" id="parent-menu-name" class="default-input input margin-left">
          </b-col>
          <b-col sm="6" class="ui-col">
            <label for="call-url" class="default-tit input-tit text-center">호출 URL</label>
            <input type="text" id="call-url" class="default-input input margin-left">
          </b-col>
          <b-col sm="6" class="ui-col">
            <label for="btn-id" class="default-tit input-tit text-center">버튼 ID</label>
            <input type="text" id="btn-id" class="default-input input margin-left">
          </b-col>
          <b-col sm="6" class="ui-col">
            <label for="menu-type" class="default-tit input-tit text-center">메뉴 유형</label>
            <input type="text" id="menu-type" class="default-input input margin-left">
          </b-col>
          <b-col sm="6" class="ui-col">
            <label for="sort-order" class="default-tit input-tit text-center">정렬 순서</label>
            <input type="text" id="sort-order" class="default-input input margin-left">
          </b-col>
          <b-col sm="12" class="ui-col">
            <label class="default-tit input-tit text-center">사용 여부</label>
            <select class="default-v-select margin-left">
              <option value="0">사용</option>
              <option value="0">미사용</option>
            </select>
          </b-col>
          <b-col sm="12" class="ui-col">
            <label for="pop-example" class="default-tit input-tit text-center">설명</label>
            <input type="text" id="pop-example" class="default-input input margin-left">
          </b-col>
        </b-row>
        <b-row class="ui-row right-bottom-column">
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
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { GridView, LocalDataProvider } from 'realgrid'
import { columns, fields, rows } from './realgrid-data'
import { VueTreeList, Tree, TreeNode } from 'vue-tree-list'

let gridView = GridView
let dataProvider = LocalDataProvider

export default {
  name: 'Program',
  components: {
    VueTreeList
  },
  data() {
    return {
      bookmarkActive: false,
      data: new Tree([
        {
          name: 'Node 1',
          id: 1,
          pid: 0,
          dragDisabled: true,
          addTreeNodeDisabled: true,
          addLeafNodeDisabled: true,
          editNodeDisabled: true,
          delNodeDisabled: true,
          children: [
            {
              name: 'Node 1-2',
              id: 2,
              isLeaf: true,
              pid: 1
            }
          ]
        },
        {
          name: 'Node 2',
          id: 3,
          pid: 0,
          disabled: true
        },
        {
          name: 'Node 3',
          id: 4,
          pid: 0
        }
      ])
    }
  },
  methods: {
    bookmark() {
      this.bookmarkActive = !this.bookmarkActive
    },
    saveProgram() {
      alert('save')
    },
    loadData() {
      dataProvider.setRows(rows)
    },
    onDel(node) {
      console.log(node)
      node.remove()
    },

    onChangeName(params) {
      console.log(params)
    },

    onAddNode(params) {
      console.log(params)
    },

    onClick(params) {
      console.log(params)
    },

    addNode() {
      var node = new TreeNode({ name: 'new node', isLeaf: false })
      if (!this.data.children) this.data.children = []
      this.data.addChildren(node)
    },
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
