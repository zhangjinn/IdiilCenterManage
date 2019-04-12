<template>
  <el-card>
    <div class="rowBox cardBody">
      <el-form-item label="区块名称:">
        <el-input v-model="blockList.name"></el-input>
      </el-form-item>
      <el-form-item label="教学目标:">
        <el-input type="textarea" v-model="blockList.target"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="btnBox">
          <div>
            <el-upload ref="upload"
                       :file-list="fileList"
                       action="/api/file/upload"
                       :on-preview="handlePreview"
                       :on-remove="handleFileRemove"
                       :auto-upload="false"
                       :on-change="changeFileHandle"
                       :on-success="uploadSuccess"
                       :on-error="uploadError"
                       :data="uploadParam"
                       :before-upload="beforeUpload"
                       :limit=5
                       multiple>
              <el-button slot="trigger" size="mini" type="primary">选择文件</el-button>
              <el-button size="mini" type="success" @click="submitUpload">上传</el-button>
            </el-upload>
          </div>
          <div>
            <el-button size="mini" @click="removeResource(blockList)">删除</el-button>
          </div>
        </div>

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
        fileList:[], //上传的文件列表 eg： [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
        uploadParam:{
          username:JSON.parse(getStore('userInfo')).userName
        }
      }
    },
    mounted(){

    },
    methods:{
      //点击文件列表中已上传的文件时的钩子
      handlePreview(file){
        console.log(file);
      },
      //删除选择的上传文件
      handleFileRemove(file){
        let filterNowList = this.fileList;
        for(let ii in filterNowList){
          if(filterNowList[ii].uid == file.uid){
            filterNowList.splice(ii,1)
            break;
          }
        }
        console.log("删除的文件：：：：",file, this.fileList);
      },
      //添加外部文件时的处理函数
      changeFileHandle(file){
        console.log("改变文件：：：：",file, this.fileList);
      },
      beforeUpload(file){
        //在这里可以做文件上传之前的操作
        console.log("文件上传之前：：：：",file);
      },
      //文件上传成功
      uploadSuccess(response, file, fileList){
        console.log("上传成功：：：：",response,file,fileList);
        this.form.otherSource = fileList;
        this.$message({message: '上传成功！',type:'success'});
      },
      //文件上传失败处理
      uploadError(err, file, fileList){
        console.log("上传失败：：：：",err,file,fileList);
        this.$message({message: '上传成功！',type:'error'});
      },
      submitUpload() {
        const data = new FormData();
        data.append("files", this.$refs.upload.uploadFiles);
        data.append("username", JSON.parse(getStore('userInfo')).userName);
        console.log("upload--->",this.$refs.upload)
        this.$refs.upload.submit(); //上传文件 "/api/file/upload"

      },
      //删除区块列表中的选中项
      removeResource(item) {
        var index = this.blockLists.indexOf(item);
        if (index !== -1) {
          this.blockLists.splice(index, 1)
        }
      }

    }
  }
</script>
<style scoped  lang="less" type="text/less">
.btnBox{
  display: flex;
  justify-content: space-between;
}
</style>
