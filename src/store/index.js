/**
 * Created by zhangjinjin on 2019/4/11.
 */
import Vue from "vue";
import Vuex from "vuex";
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

const state = {
  count:0,
  sourceListsInfo:{
    classList:{
      classId:"",
      name:"因数与倍数",
      datetime: "",
      target: "（一）知识与技能  理解因数和倍数的意义以及两者之间相互依存的关系，掌握找一个数的因数和倍数的方法，发现一个数的倍数、因数中最大的数、最小的数，及因数和倍数个数方面的特征。 （二）过程与方法  通过整数的乘除运算认识因数和倍数的意义，自主探索和总结出求一个数的因数和倍数的方法。（三）情感态度和价值观  在探索的过程中体会数学知识之间的内在联系，在解决问题的过程中培养学生思维的有序性和条理性。教学重点：理解因数和倍数的含义。教学难点：自主探索有序地找一个数的因数和倍数的方法。",
      duration:"100分钟",
      version:"人教版",
      commits: ""
    },
    blockLists:[]
  }

};
export default new Vuex.Store({
  state,
  mutations,
  actions
});
