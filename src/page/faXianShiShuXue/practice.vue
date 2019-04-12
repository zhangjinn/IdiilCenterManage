<template>
  <div>
    <div class="row">
      <div class="col-2">

      </div>

      <div class="col-6">
        {{draggingInfo}}

        <draggable
          tag="el-collapse"
          :list="list"
          :component-data="collapseComponentData"
          @start="isDragging = true"
          @end="isDragging = false"
        >

            <el-collapse-item
              v-for="item in list"
              :key="item.id"
              :title="item.title"
              :name="item.id"
            >
              <transition-group type="transition" name="flip-list">
              <div v-for="(lign, idx) in item.text" :key="idx">{{ lign }}</div>
              </transition-group>
            </el-collapse-item>

        </draggable>
      </div>
     <div>
       {{activeNames}}
     </div>
    </div>
  </div>
</template>

<script>
  import "element-ui/lib/theme-chalk/index.css";
  import draggable from 'vuedraggable'
  const message = [
    "vue.draggable",
    "draggable",
    "component",
    "for",
    "vue.js 2.0",
    "based",
    "on",
    "Sortablejs"
  ];

  export default {
    components: {
      //调用组件
      draggable
    },
    data() {
      return {
        list: [
          {
            title: "Consistency",
            id: 1,
            text: [
              "Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;",
              "Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc."
            ]
          },
          {
            title: "Feedback",
            id: 2,
            text: [
              "Operation feedback: enable the users to clearly perceive their operations by style updates and interactive effects;",
              "Visual feedback: reflect current state by updating or rearranging elements of the page."
            ]
          },
          {
            title: "Efficiency",
            id: 3,
            text: [
              "Simplify the process: keep operating process simple and intuitive;",
              "Definite and clear: enunciate your intentions clearly so that the users can quickly understand and make decisions;",
              "Easy to identify: the interface should be straightforward, which helps the users to identify and frees them from memorizing and recalling."
            ]
          },
          {
            title: "Controllability",
            id: 4,
            text: [
              "Decision making: giving advices about operations is acceptable, but do not make decisions for the users;",
              "Controlled consequences: users should be granted the freedom to operate, including canceling, aborting or terminating current operation."
            ]
          }],
        isDragging: false,
        activeNames: [1],
        collapseComponentData: {
          on: {
            input: this.inputChanged
          },
          props: {
            value: this.activeNames
          }
        }
      };
    },
    computed:{
      draggingInfo() {
        return this.isDragging ? "isDragging" : "noDragging";
      }
    },
    methods: {
      inputChanged(val) {
        this.activeNames = val;
      }
    }
  };
</script>
<style scoped lang="less">
  .button {
    margin-top: 35px;
  }
  .flip-list-move {
    transition: transform 0.5s;
  }
  .no-move {
    transition: transform 0s;
  }
  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
  .list-group {
    min-height: 20px;
  }
  .list-group-item {
    cursor: move;
  }
  .list-group-item i {
    cursor: pointer;
  }
</style>
