<template>
  <div class="real-container">
    <h2 class="content-tit">주문 생성</h2>
    <div class="data-control text-right">
      <button type="button" class="data-add">신규<b-icon-plus-circle></b-icon-plus-circle></button>
      <button type="button" class="data-delete">삭제<b-icon-trash></b-icon-trash></button>
    </div>
    <div id="realgrid" class="real-grid" style="width: 100%; height: 400px"></div>
  </div>
</template>


<script>
import { GridView, LocalDataProvider } from 'realgrid';
import { columns, fields, rows } from './realgrid-data';

let gridView = GridView; 
let dataProvider = LocalDataProvider;

export default {
  name: 'Delivery',
  data: function () {
      return {
      }
  },
  methods: {
      loadData: function() {
        dataProvider.setRows(rows);
      }
  },
  mounted() {
    dataProvider = new LocalDataProvider(false);
    gridView = new GridView("realgrid");
    gridView.setDataSource(dataProvider);

    dataProvider.setFields(fields);
    gridView.setColumns(columns);
    this.loadData()
  }
}
</script>
