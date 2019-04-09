<template>
  <div>
    <head-top></head-top>
    <div class="studentManage_section">
      <header>
        <el-row>
          <el-col :span="12" class="grid-content titleSetion"><h2>学生管理</h2></el-col>
          <el-col :span="12" class="grid-content editSetion"><el-button type="primary" @click="addHandle">新增用户</el-button></el-col>
        </el-row>
      </header>
      <section class="select_section">
        <el-row>
          <span style="font-weight: bold">中心号：</span><span>{{centerName}}</span>
          <span style="margin-left: 20px;font-weight: bold">班级：</span>
          <el-select v-model="classValue" placeholder="请选择" @change="selectChange">
            <el-option
              v-for="(item,index) in classOptions"
              :key="index"
              :label="item.className"
              :value="item.classId">
            </el-option>
          </el-select>
        </el-row>
      </section>
      <section class="section_table">
        <el-table
          ref="multipleTable"
          :data="currentData"
          border
          height="450"
          :header-row-style="headerStyle"
          :highlight-current-row="true"
          :cell-style="cellStyle"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="50">
          </el-table-column>
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="centerId"
            sortable
            label="中心号">
          </el-table-column>
          <el-table-column
            prop="classId"
            label="班级">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="grade"
            label="年级">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row>
          <el-col :span="12">
            <div style="text-align: left">
              <el-button @click="deleteSelection()">删除选中的项</el-button>
              <el-button @click="cancelSelection()">取消选择</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size="pageSize"
              @current-change=this.PageChange
              :total="allData.length">
            </el-pagination>
          </el-col>
        </el-row>
        <el-dialog
          :title="alterFlag ? '添加用户':'修改信息' "
          :show-close="modalClickOther"
          :visible.sync="dialogVisible"
          :closeOnClickModal="modalClickOther"
          width="40%">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="alterForm" label-width="80px" class="demo-ruleForm">
            <el-form-item label="中心号:" prop="centerId">
              <el-input type="text" v-model="ruleForm.centerId" :value="centerId" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="用户名:" prop="userName">
              <el-input type="text" v-model="ruleForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="班级:" prop="classId">
              <el-select v-model="ruleForm.classId" placeholder="请选择" style="float: left;">
                <el-option
                  v-for="(item,index) in classOptions"
                  :key="index"
                  :label="item.className"
                  :value="item.classId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="MakeSureHandle(alterFlag)">确 定</el-button>
          </span>
        </el-dialog>
      </section>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import headTop from '../../components/headTop'
  import {getAllClassesOfCenter,getAllStudentOfClass} from '../../api/manage'
  import {addStudentUser,updateStudentUser,deleteStudentUser} from '../../api/user'
  import {getStore} from '../../config/publicMethod'
  export default{
    data(){
      return{
        cellStyle:{
          textAlign:'center'
        },
        headerStyle:{
          backgroundColor:'rgb(117, 203, 214)',
          color: '#4f504b'
        },
        pageSize:10,
        allData:[],//所有的数据
        currentData:[],//当前页面展示的条数
        currentClass:'',//当前的班级号
        multipleSelection: [],
        dialogVisible:false,
        modalClickOther:false,
        centerName:'上地中心',
        centerId:'',
        classValue:'',
        classOptions:[],
        alterFlag:false,//true为新增，false为修改
        ruleForm: {
          grade:'',
          userName:'',
          centerId:'',
          classId:'',
          role:'1'
        },
        rules: {
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          centerId: [
            { required: true, message: '请输入中心号', trigger: 'blur' },
          ],
          classId: [
            {required: true,  message: '请输入班级', trigger: 'blur' }
          ]
        }
      }
    },
    components:{
      headTop
    },
    computed: {
      dialogTitle(){
        return this.alterFlag ? '':'';
      }
    },
    mounted(){
      //进入首页的时候查询
      this.getAllUserList();
    },
    methods:{
      async getAllUserList(){
        let centerId= JSON.parse(getStore('manageUser')).centerId;//中心号
        this.ruleForm.centerId = centerId;
        let result1 = await getAllClassesOfCenter({centerId:'002'});
        console.log("班级列表",result1)
        if(result1.code == 200){
          this.classOptions = result1.data;
        }
        console.log("所有的中心列表",this.allData)
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.dialogVisible = true;
        this.alterFlag = false;
        this.ruleForm = {
          grade: row.grade,
          userId: row.studentId,
          userName: row.userName,
          centerId: row.centerId,
          classId: row.classId,
          role:'1',
        }
      },
      addHandle(){
        this.dialogVisible = true;
        this.alterFlag = true;
        this.ruleForm.grade = '';
        this.ruleForm.userName = '';
        this.ruleForm.classId = '';
      },
      async handleDelete(index, row) {
        console.log(index, row);
        let result = await deleteStudentUser({userId:row.studentId});
        if(result.code == 200){
          this.$message({message: '删除成功！',type:'success'});
        }
      },
      PageChange(page){
        console.log("PageChange",page)
        let num = this.pageSize;
        this.currentData = this.allData.slice( (page-1)*num,(page-1)*num+num)
      },
      MakeSureHandle(flag){
        console.log("弹框确定--》》》",flag);
        this.$refs.alterForm.validate(async(valid) => {
          if (valid) {
            let params = this.ruleForm;
            console.log("ruleForm结果------->",params)
            if(flag){//添加用户
              let result = await addStudentUser(params);
              if(result.code == 200){
                this.$message({message: '添加成功！',type:'success'});
              }
            }else {//修改用户
              let result = await updateStudentUser(params);
              if(result.code == 200){
                this.$message({message: '修改成功！',type:'success'});
              }
            }
          } else {
            console.error('error register submit!!');
            return false;
          }
        });
      },
      deleteSelection() {
        console.log("选择的行：：---》》》",this.$refs.multipleTable.selection);
        console.log("多条删除还没做呢^----^");
      },
      cancelSelection(rows) {
        this.$refs.multipleTable.clearSelection();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      async selectChange(val){
        console.log("选择的：：---》》》",val);
        this.currentClass = val;
        let result = await getAllStudentOfClass({classId:val});
        console.log("返回学生列表：：---》》》",result);
        if(result.code === 200){
          this.allData = result.data;
          this.currentData = result.data.slice( 0,this.pageSize)
        }
      },
      selectChangeDialog(){

      }
    }
  }
</script>
<style scoped lang="less" type="text/less">
  .studentManage_section {
    position: relative;
    padding: 20px;
    overflow: auto;
  .select_section{
    margin-bottom: 10px;
    text-align: left;
  }
  .section_table{
    border: 1px solid gainsboro;
    padding: 10px;
  }
  .titleSetion{
    padding: 20px;
    text-align: left;
  }
  .editSetion{
    padding: 20px;
    text-align: right;
  }
  .questionStyle{
    border: 1px solid gainsboro;
    padding: 10px;
  }
  }
  .el-row {
    font-size: 14px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
    padding: 5px 0;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 32px;
    line-height: 32px;
  }
</style>
