/**
 * 查询用户信息基本信息
 * Created by gaoju on 2017/11/15.
 */

const query_db = require('./dbconfig')
/*用户模块 构造方法*/
var User = function(user) {
    this.props = user.props
};


/*用户登录校验*/
User.prototype.getUser = function() {
  var _sql = '';
  if(this.props.role == '1'){//学生
    _sql = `select userId,userName,centerId from tblStudent where username='${this.props.name}' and pwd='${this.props.pass}'`;
  }
  if(this.props.role == '2'){//教师
    _sql = `select userId,userName,centerId from tblTeacher where username='${this.props.name}' and pwd='${this.props.pass}'`;
  }
  if(this.props.role == '3'){//管理员
    _sql = `select userId,userName,centerId,permissionLevel from tblManage where username='${this.props.name}' and pwd='${this.props.pass}'`;
  }
  const res = query_db({sql: _sql, name: 'getUserAllItems'}).catch((err)=>{
    console.log("服务端查询出错了。。。",err)
  })
  return res
}
/*获取当前最新的用户id*/
User.prototype.getMaxUserId = function(callback) {
  var _sql = '';
  if(this.props.role == '1'){//学生
    _sql = "select userId from tblStudent where id>0  ORDER BY userid DESC LIMIT 0,1";
  }
  if(this.props.role == '2'){//教师
    _sql = "select userId from tblTeacher where id>0  ORDER BY userid DESC LIMIT 0,1";
  }
  if(this.props.role == '3'){//教师
    _sql = "select userId from tblManage where id>0  ORDER BY userid DESC LIMIT 0,1";
  }
  const res = query_db({sql: _sql, name: 'getMaxUserId'}).catch((err)=>{
    console.log("服务端查询出错了。。。",err)
  })
  return res
}
/*注册 添加用户数据*/
User.prototype.getAddUser = function() {
  var _sql = '';
  if(this.props.role == '1'){//学生
    _sql = `INSERT INTO tblStudent(userid,username,centerid) VALUES ('${this.props.userId}','${this.props.userName}','${this.props.centerId}');`;
  }
  if(this.props.role == '2'){//教师
    _sql = `INSERT INTO tblTeacher(userid,username,pwd,centerid,phone) VALUES ('${this.props.userId}','${this.props.userName}','123456','${this.props.centerId}','${this.props.phone}');`;
  }
  if(this.props.role == '3'){
    _sql = `INSERT INTO tblManage(userid,username,pwd,centerid,phone) VALUES ('${this.props.userId}','${this.props.userName}','123456','${this.props.centerId}','${this.props.phone}');`;
  }
  const res = query_db({sql: _sql, name: 'getAddUser'}).catch((err)=>{
    console.log("服务端查询出错了。。。",err)
  })
  return res
}
/*班级对应学生表中 添加数据*/
User.prototype.getAddUserToClass = function() {
  var _sql = `INSERT INTO tblClass2Student (studentId,classId) VALUES ('${this.props.userId}','${this.props.classId}');`;
  const res = query_db({sql: _sql, name: 'getAddUserToClass'}).catch((err)=>{
    console.log("服务端查询出错了。。。",err)
  })
  return res
}
/*添加学生数据*/
User.prototype.updateStudentUser = function() {
  var _sql = `update tblClass2Student t1,tblStudent t2 set t1.classid='${this.props.classId}',t2.username='${this.props.userName}',t2.grade='${this.props.grade}' where t1.studentId='${this.props.userId}' and t2.userid='${this.props.userId}'`;
  const res = query_db({sql: _sql, name: 'updateStudentUser'}).catch((err)=>{
    console.log("服务端查询出错了。。。",err)
  })
  return res
}
/*删除学生数据*/
User.prototype.deleteStudentUser = function() {
  var _sql = `delete t1,t2 from tblClass2Student t1,tblStudent t2 where t1.studentId='${this.props.userId}' and t2.userid='${this.props.userId}'`;
  const res = query_db({sql: _sql, name: 'deleteStudentUser'}).catch((err)=>{
    console.log("服务端查询出错了。。。",err)
  })
  return res
}

module.exports = User
