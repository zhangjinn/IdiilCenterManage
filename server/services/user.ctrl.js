/**
 * @desc 用户模块控制器,添加路由获取服务端数据
 * @dateTime 2018-11-29
 **/

var express = require('express');
var path = require('path')
var fs = require('fs')
var os = require('os')
var User = require('../database/user.db.js');
var Helper = require('../util/helper');
const userRouter = express.Router()

userRouter.post('/login',async(req, res) => {
  var props = req.body;
  var user = new User({props: props});
  const result = await user.getUser();
  if(result){
    res.json({
      code:200,
      data:result
    })
  }else {
    res.json({
      code:500,
      message:'数据获取出错~~'
    })
  }
});
userRouter.get('/getAllUser',async(req, res) => {
      var props = {};
      var user = new User({props: props});
      const result = await user.getUserAllItems();
      if(!result){
        res.json({
          code:200,
          data:result
        })
      }else {
        res.json({
          code:500,
          message:'数据获取出错~~'
        })
      }
});
userRouter.post('/addStudentUser',async(req, res) => {
  var props = req.body;
  var user = new User({props: props});
  const reslut1 = await user.getMaxUserId();
  if (reslut1.length>0) {//有用户
    props.userId = Helper.createUserId(reslut1[0].userId);
  } else {
    props.userId = '001';//第一个用户
  }
  const result2 = await user.getAddUser();//学生表中加入新的数据
  console.log("服务端返回的数据-------111111111111----->>",result2);
  const result3 = await user.getAddUserToClass();//往 班级和学生表中 加入数据
  console.log("服务端返回的数据-------111111111111----->>",result3);
  if(result3){
    res.json({
      code:200,
      data:result3
    })
  }else {
    res.json({
      code:500,
      message:'数据出错~~'
    })
  }
});
userRouter.post('/updateStudentUser',async(req, res) => {
  var props = req.body;
  var user = new User({props: props});
  const result = await user.updateStudentUser();//更新 班级和学生表中 加入数据
  console.log("服务端返回的数据-------111111111111----->>",result);
  if(result){
    res.json({
      code:200,
      data:result
    })
  }else {
    res.json({
      code:500,
      message:'数据出错~~'
    })
  }
});
userRouter.post('/deleteStudentUser',async(req, res) => {
  var props = req.body;
  var user = new User({props: props});
  const result = await user.deleteStudentUser();//更新 班级和学生表中 加入数据
  console.log("服务端返回的数据-------111111111111----->>",result);
  if(result){
    res.json({
      code:200,
      data:result
    })
  }else {
    res.json({
      code:500,
      message:'数据出错~~'
    })
  }
});
userRouter.post('/registerUser',async(req, res) => {
  var props = req.body;
  var user = new User({props: props});
  const reslut1 = await user.getMaxUserId();
  if (reslut1.length>0) {//有用户
    props.userId = Helper.createUserId(reslut1[0].userId);
  } else {
    if(req.body.role == '1'){
      props.userId = '001';//第一个用户
    }else if(req.body.role == '2'){
      props.userId = '01';//第一个用户
    }else {
      props.userId = '0001';//第一个用户
    }
  }
  //props.password = Helper.getMD5(req.body.pass);
  const result = await user.getAddUser();
  if(result){
    res.json({
      code:200,
      data:result
    })
  }else {
    res.json({
      code:500,
      message:'数据出错~~'
    })
  }
});
userRouter.get('/writeFileJson', function(req, res) {
  var param = req.query;
  var dir = path.join(__dirname, ''); //文件路径，__dirname为当前运行js文件的目录
  var sep = path.sep;
  var arrydir = [];
  if(sep == '/'){
    arrydir = dir.split('/');
  }else {
    arrydir = dir.split('\\');
  }
  //区分开发和生产的，地址不一样
  if(process.env.NODE_ENV == 'production'){
    var filepath = arrydir.splice(0,arrydir.length-2).join('/')+"/dist/static/ClassUserList.json";
  }else {
    var filepath = arrydir.splice(0,arrydir.length-2).join('/')+"/static/ClassUserList.json";
  }
  //读取json文件
  console.log("__dirname地址---->>",dir)
  console.log("process.env.NODE_ENV---->>",process.env.NODE_ENV)
  console.log("json地址---->>",filepath)
  console.log('获取操作系统类型： '+os.type());
  try {
    fs.readFile(filepath, 'utf-8', function(err, data) {
      if (err) {
        res.json({
          code:500,
          message:"文件读取失败"
        })
      } else {
        let fileData = JSON.parse(data);
        //fileData.studentNeedData = param;
        fileData.classList = param;
        var ttt = JSON.stringify(fileData);
        fs.writeFileSync(filepath,ttt);
        res.json({
          code:200,
          data:fileData
        })
      }
    });
  }catch (e){
    console.log("文件读取失败:",e.stack);
    res.json({
      code:500,
      message:"文件读取出错"
    })
  }

});

module.exports = userRouter
