<template>
  <el-card>
    <div class="rowBox cardBody">
      <el-form-item label="区块名称:">
        <span v-if="editBlockFlag">
          <el-input v-model="blockList.name"></el-input>
        </span>
        <span v-else>{{blockList.name}}</span>
      </el-form-item>
      <el-form-item label="教学目标:">
        <span v-if="editBlockFlag">
          <el-input type="textarea" v-model="blockList.target"></el-input>
        </span>
        <span v-else>{{blockList.target}}</span>
      </el-form-item>
      <el-form-item label="课程时长:">
        <span v-if="editBlockFlag">
          <el-input v-model="blockList.duration"></el-input>
        </span>
        <span v-else>{{blockList.duration}}</span>
      </el-form-item>
      <el-form-item label="课程内容:">
        <div class="fileContainer">
            <span class="fileItem">
              <span>{{blockList.name}}</span>
            </span>
        </div>
      </el-form-item>
      <el-form-item class="btnBox">
        <el-button size="mini" @click.prevent="editBlock">编辑</el-button>
        <el-button size="mini" @click.prevent="removeResource(blockList)">删除</el-button>
      </el-form-item>
    </div>
  </el-card>
</template>
<script>
  import {setStore,getStore} from '../config/publicMethod'
  export default{
    props:['blockLists', 'blockList'],
    data(){
      return{
        editBlockFlag:false
        }
      },
      mounted(){

      },
      methods:{
        //删除区块列表中的选中项
        removeResource(item) {
          var index = this.blockLists.indexOf(item);
          if (index !== -1) {
            this.blockLists.splice(index, 1)
          }
        },
        editBlock(){
          this.editBlockFlag=true
        }
      }
  }
</script>
<style scoped lang="less">
  .btnBox{
    text-align: right;
  }
</style>
