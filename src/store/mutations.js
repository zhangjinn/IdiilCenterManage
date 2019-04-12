/**
 * Created by zhangjinjin on 2019/4/11.
 */

import {
  ADD_COUNT,
  SOURCE_LIST
} from './mutation-types'
import {setStore,getStore} from '../config/publicMethod'
export default{
  [SOURCE_LIST](state,newList){
    //console.log(state.sourceListsInfo);
    state.sourceListsInfo.classList=newList.classList;

    //存入localStorage
    setStore('sourceLists',JSON.stringify(state.sourceListsInfo))

  },
  [ADD_COUNT](state){
    state.count++;
  }
}
