/**
 * 查询用户信息基本信息
 * Created by gaoju on 2017/11/15.
 */

const query_db = require('./dbconfig')
/*管理员用户模块 构造方法*/
var Manage = function(manage) {
  this.props = manage.props
};

/*查询所有中心管理员数据*/
Manage.prototype.getAllManagerList = function() {
  var _sql = `select * from tblManage`;
  const res = query_db({sql: _sql, name: 'getAllManagerList'}).catch((err)=>{
    console.log("服务端查询出错了。。。",err)
  })
  return res
};
/*查询中心的班级数据*/
Manage.prototype.getAllClassesOfCenter = function() {
  var _sql = `select * from tblClass where centerId='${this.props.centerId}'`;
  const res = query_db({sql: _sql, name: 'getAllClassesOfCenter'}).catch((err)=>{
    console.log("服务端查询出错了。。。",err)
  })
  return res
};
/*查询班级数据老师和科目*/
Manage.prototype.getInfoOfClass = function() {
  var _sql = `SELECT * FROM tblClass2Subject where classId='${this.props.classId}'`;
  const res = query_db({sql: _sql, name: 'getInfoOfClass'}).catch((err)=>{
    console.log("服务端查询出错了。。。",err)
  })
  return res
};
/*查询班级的所有学生*/
Manage.prototype.getAllStudentOfClass = function() {
  var _sql = `SELECT studentId,classId,userName,centerId,grade from tblClass2Student t1,tblStudent t2 where t1.classid='${this.props.classId}' and t1.studentId = t2.userid`;
  const res = query_db({sql: _sql, name: 'getAllStudentOfClass'}).catch((err)=>{
    console.log("服务端查询出错了。。。",err)
  })
  return res
};
/*新增班级*/
Manage.prototype.addClass = function() {
  var _sql = `INSERT INTO tblClass (centerId,classId,className,grade) VALUES ('${this.props.centerId}','${this.props.classId}','${this.props.className}','${this.props.grade}');`;
  const res = query_db({sql: _sql, name: 'addClass'}).catch((err)=>{
    console.log("服务端查询出错了。。。",err)
  })
  return res
};
/*删除班级*/
Manage.prototype.deleteClass = function() {
  //var _sql = `delete t1,t2,t3  from tblClass t1,tblClass2Student t2,tblClass2Subject t3 where t1.classid='${this.props.classId}' and t2.classid='${this.props.classId}' and t3.classid='${this.props.classId}'`;
  var _sql = `DELETE t1,t2,t3  from (tblClass t1 LEFT OUTER JOIN tblClass2Student t2 on t1.classId=t2.classid) LEFT OUTER JOIN tblClass2Subject t3 on (t1.classId=t3.classid) where t1.classid='${this.props.classId}'`;
  const res = query_db({sql: _sql, name: 'deleteClass'}).catch((err)=>{
    console.log("服务端查询出错了。。。",err)
  })
  return res
};
module.exports = Manage
