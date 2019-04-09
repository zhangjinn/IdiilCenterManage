<template>
  <el-container>
    <el-header class="register">
      <el-row>
        <el-col :span="12"><div class="logoSection"><img src="../../../static/images/logo.png"></div></el-col>
        <el-col :span="12"><div class="backSection"><el-button round icon="el-icon-back" @click="BackHandle">圆角按钮</el-button></div></el-col>
      </el-row>
    </el-header>
    <el-main>
      <section class="form_contianer_register">
        <div class="senctionblock">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="registerForm" label-width="80px" class="demo-ruleForm">
            <el-form-item label="中心号" prop="centerId">
              <el-input type="text" v-model="ruleForm.centerId"></el-input>
            </el-form-item>
            <el-form-item label="角色类型" prop="role">
              <el-radio-group v-model="ruleForm.role">
                <el-radio label="1">学生</el-radio>
                <el-radio label="2">教师</el-radio>
                <el-radio label="3">管理员</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="用户名" prop="userName">
              <el-input type="text" v-model="ruleForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="班级" prop="classId">
              <el-input type="text" v-model="ruleForm.classId"></el-input>
            </el-form-item>
            <el-form-item label="年级" prop="grade">
              <el-input type="text" v-model="ruleForm.grade"></el-input>
            </el-form-item>
            <el-form-item label="学科" prop="subject">
              <el-input type="text" v-model="ruleForm.subject"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input type="number" v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-button @click="Register('registerForm')" class="enterButton">提 交</el-button>
          </el-form>
        </div>
      </section>
    </el-main>
  </el-container>
</template>

<script type="text/ecmascript-6">
  import {registerUser} from '../../api/user'
  import {getClassInfo} from '../../api/classes'
  import {setStore,getStore,clearStore,setSession,getSession} from '../../config/publicMethod'
  export default {
    name: 'door',
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '' || value.length>12 || value<8) {
          callback(new Error('请输入正确手机号'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          userName:'',
          centerId:'',
          classId:'',
          grade:'',
          subject:'',
          phone:'',
        },
        rules: {
          role: [
            {required: true,  message: '请选择角色', trigger: 'blur' }
          ],
          centerId: [
            { required: true, message: '请输入中心号', trigger: 'blur' },
          ],
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          classId: [
            {required: true,  message: '请输入班级', trigger: 'blur' }
          ],
          grade: [
            { required: true, message: '请选择年级', trigger: 'blur' },
          ],
          subject: [
            {required: true,  message: '请选择用户学科', trigger: 'blur' }
          ],
          phone: [
            {required: true,  validator: validatePass, trigger: 'blur' }
          ],
        }
      }
    },
    methods:{
      async Register(formName){
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            let params = this.ruleForm;
            let result = await registerUser(params);
            console.log("注册结果------->",params,result)
            if(result.code == 200){
              this.$router.push('/');
            }else {
              alert('注册信息出错')
            }
          } else {
            console.error('error register submit!!');
            return false;
          }
        });
      },
      BackHandle(){
        this.$router.back();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
  @import '../../assets/mixin.less';
  .register{
    background-color: #337cac;
    .logoSection{
      float: left;
    }
    .backSection{
      float: right;
      margin-top: 10px;
    }
  }
  .senctionblock{
    position: relative;
    width: 100%;
    background-color: white;
  }
  .form_contianer_register{
    width: 520px;
    min-height: 210px;
    position: absolute;
    top: 25%;
    left: 50%;
    margin-top: -105px;
    margin-left: -260px;
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    background-color: #fff;
  .loginButton{
    font-size: 18px;
    font-weight: 400;
  }
  .enterButton{
    background-color: #00c1de;
    font-size: 20px;
    width: 100%;
    cursor: pointer;
    color: white;
  }
  }
</style>
