/**
 * @desc 管理员管理模块
 * @dateTime 2018-12-13
 **/

var express = require('express');
var Manage = require('../database/manage.db.js');
var Helper = require('../util/helper');
const manageRouter = express.Router();

/*
 * 查询所有中心得管理员信息（只有最高权限的管理员才可以查询）
 * */
manageRouter.post('/getAllManagerList',async(req, res) => {
  var props = req.body;
  var manage = new Manage({props: props});
  const result = await manage.getAllManagerList();
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
/*
 * 查询某个中心的所有班级信息
 * */
manageRouter.post('/getAllClassesOfCenter',async(req, res) => {
  let props = req.body;
  let manage = new Manage({props: props});
  const result = await manage.getAllClassesOfCenter();
  if(result){
    if(result.length>0){
      for(let i in result){
        let props = {};
        props.classId = result[i].classId;
        let manage2 = new Manage({props:props})
        const result2 = await manage2.getInfoOfClass();
        if(result2 && result2.length>0){
          result[i].otherInfo = result2;
          //result[index].otherInfo = result2;
        }else {
          result[i].otherInfo = [];
          //result[index].otherInfo = [];
        }
      }
      console.log(result)
    }
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
/*
 * 查询某个班级所有学生信息
 * */
manageRouter.post('/getAllStudentOfClass',async(req, res) => {
  let props = req.body;
  let manage = new Manage({props: props});
  const result = await manage.getAllStudentOfClass();
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
/*
 * 新增班级信息
 * */
manageRouter.post('/addClassInfo',async(req, res) => {
  let props = req.body;
  let manage = new Manage({props: props});
  props.classId = Helper.randomString(false,4);
  const result = await manage.addClass();
  if(result){
    res.json({
      code:200,
      data:result
    })
  }else {
    res.json({
      code:500,
      message:'数据添加出错~~'
    })
  }
});
/*
 * 删除某个班级所有信息
 * */
manageRouter.post('/deleteClassInfo',async(req, res) => {
  let props = req.body;
  let manage = new Manage({props: props});
  const result = await manage.deleteClass();
  if(result){
    res.json({
      code:200,
      data:result
    })
  }else {
    res.json({
      code:500,
      message:'数据删除出错~~'
    })
  }
});

module.exports = manageRouter;
