/**
 * 静态数据
 * Created by gaoju on 2018/11/8.
 */
const classData = {
  classList:{
    classId:"",
    courseId:"",
    teacherId:"",
    teacherName:"",
    subjectId:"",
    subjectName:"",
    name:"因数与倍数",
    datetime: "",
    target: "（一）知识与技能  理解因数和倍数的意义以及两者之间相互依存的关系，掌握找一个数的因数和倍数的方法，发现一个数的倍数、因数中最大的数、最小的数，及因数和倍数个数方面的特征。 （二）过程与方法  通过整数的乘除运算认识因数和倍数的意义，自主探索和总结出求一个数的因数和倍数的方法。（三）情感态度和价值观  在探索的过程中体会数学知识之间的内在联系，在解决问题的过程中培养学生思维的有序性和条理性。教学重点：理解因数和倍数的含义。教学难点：自主探索有序地找一个数的因数和倍数的方法。",
    duration:"100分钟",
    version:"人教版",
    commits: "",
    studentGroup:{
      groupArray:[],//创建的组
      nowGroup:['学生列表','默认组'],//当前正在修改的组
      nowList:[],//当前正在修改的组的数据
      nowStudentData:[],
      groups:[]
    },
    source: [
    ],
    otherSource:[]
  },
  blockList:[],
  studentList:[
    {
    id:"00201",
    name:"学生1",
    pass:"123456",
    key:"1",
  },{
    id:"00202",
    name:"栗战书",
    pass:"123456",
    key:"2",
  },{
    id:"00203",
    name:"邵伟思",
    pass:"123456",
    key:"3",
  },{
    id:"00204",
    name:"濠江",
    pass:"123456",
    key:"4",
  },{
    id:"00205",
    name:"刘上传",
    pass:"123456",
    key:"5",
  },{
    id:"00206",
    name:"五七",
    pass:"123456",
    key:"6",
  },{
    id:"00207",
    name:"皇上",
    pass:"123456",
    key:"7",
  },{
    id:"00208",
    name:"三小",
    pass:"123456",
    key:"8",
  },{
    id:"00209",
    name:"王麻子",
    pass:"123456",
    key:"9",
  },{
    id:"002010",
    name:"李四",
    pass:"123456",
    key:"10",
  },{
    id:"002011",
    name:"张三",
    pass:"123456",
    key:"11",
  },],
  teacherList:[
    {
      id:"002011",
      name:"admin",
      pass:"123456",
      key:"1",
    }
  ]
}

export default classData
