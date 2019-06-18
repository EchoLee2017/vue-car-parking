<template lang="pug">
    div
        .car_bind
            .code
                button.spot
                    div
                        //index1从0到7
                button.index(v-for="(item,index1) in carList", @click="clickBtn(index1,item)", :class="index1===index?'greencolor':''") {{item}}
            h2.enter_number 请输入车牌号
            button.add-car(:disabled="isClick",@click="bindCar",:class="!isClick?'':'grey'") 绑定车牌
            .keyboard(v-for="item in list")
                .row
                    button.btn(v-for="item in list.one",@click="changeKeyboard(item)",) {{item}}
                .row
                    button.btn(v-for="item in list.two",@click="changeKeyboard(item)") {{item}}
                .row
                    button.btn(v-for="item in list.three",@click="changeKeyboard(item)") {{item}}
                .row
                    button.switch(@click="change")
                        img.switch-img(:src="imgSrc")
                    button.btn(v-for="item in list.four",@click="changeKeyboard(item)") {{item}}
                    button.delete.btn(@click="deleteCode")
                        img.deleter-arrow(src="../assets/img/arrow.png")
</template>
<script>
  import { Tab, TabItem, Sticky, XButton } from "vux";
  import headerTitle from "@/components/header_title";

  export default {
    data() {
      return {
        title: "更改车牌",
        item: "",
        list: "",
        isNumber: false,
        //控制绑定车牌是否可以点击
        isClick: true,
        //车牌号每格对应的字
        carNum: "",
        //记录当前绿色背景的位置
        index: "",
        imgSrc: "",
        carList: ["", "", "", "", "", "", "", ""],
        rowOne: {
          one: ["京", "津", "冀", "鲁", "晋", "蒙", "辽", "吉", "黑", "沪"],
          two: ["苏", "浙", "皖", "闽", "赣", "豫", "鄂", "湘", "粤", "桂"],
          three: ["琼", "渝", "川", "贵", "云", "藏", "陕", "甘", "青", "宁"],
          four: ["新", "港", "澳", "台", "使", "领", "警"]
        },
        rowTwo: {
          one: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
          two: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
          three: ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
          four: ["Z", "X", "C", "V", "B", "N", "M"]
        }
      };
    },
    watch: {
      //通过光标的移动判断当前输入的车牌号位数，根据车牌号位数判断是否可以点击绑定车牌
      index: function() {
        var vm = this;
        if (vm.carList.indexOf("") == 7 || vm.carList.indexOf("") == -1) {
          vm.isClick = false;
        } else {
          vm.isClick = true;
        }
        if (vm.carList[0] != "警" && vm.carList[0] != "使" && vm.carList[0] != "领" && Number(vm.carList[1]) && vm.index == 1) {
          vm.carList[1] = "";
        }

      }
    },
    components: {
      Tab,
      TabItem,
      Sticky,
      XButton,
      headerTitle
    },
    mounted: function() {
      var vm = this;
      this.$nextTick(function() {
        this.onceInit(this.init);
      });
    },
    methods: {
      onceInit: function(callback) {
        callback();
      },
      change() {
        var vm = this;
        vm.list = vm.isNumber ? vm.rowOne : vm.rowTwo;
        vm.isNumber = !vm.isNumber;
        vm.imgSrc = vm.isNumber ? require("../assets/img/administrative.png") : require("../assets/img/number.png");
      },
      //绑定车牌业务
      bindCar: function() {
        var vm = this;
        vm.carNum = vm.carList.join("");
        var params = {
          carNum: vm.carNum
        };

      },
      init: function() {
        var vm = this;
        vm.carList = ["", "", "", "", "", "", "", ""];
        vm.imgSrc = require("../assets/img/number.png");
      },
      //点击上方请输入车牌号触发的事件
      clickBtn: function(number, code) {
        var vm = this;
        vm.index = number;
        vm.disable = number === 1;
        console.log(vm.carList[0]);
        //控制键盘切换
        if (number === 0) {
          vm.list = vm.rowOne;
          vm.isNumber = false;
          vm.imgSrc = require("../assets/img/number.png");
        } else {
          vm.list = vm.rowTwo;
          vm.isNumber = true;
          vm.imgSrc = require("../assets/img/administrative.png");
        }
        //控制键盘第一排数字是否可以点击
        // if (number == 1) {
        //   vm.disable = true;
        // } else {
        //   vm.list = vm.rowTwo;
        //   if(number===1&&(vm.carList[0]=='警'||vm.carList[0]=='使'||vm.carList[0]=='领')){
        //   }
        // }
        if (vm.index === 0 && code != "领" && code != "使" && code != "警" && typeof vm.carList[1] == Number) {
          vm.carList[1] = "";
        }
      },
      //点击键盘时触发
      changeKeyboard: function(item) {
        var vm = this;
        vm.item = item;
        //从第一个键盘切换到第二个键盘
        vm.list = vm.rowTwo;
        vm.isNumber = true;
        vm.imgSrc = require("../assets/img/administrative.png");
        //将点击触发的文字或者字母信息放进车牌list里，更新上方车牌号
        vm.$set(vm.carList, vm.index, item);
        if (vm.index >= 7) {
          return;
        } else {
          vm.index++;
        }
      },
      //删除车牌时候触发
      deleteCode: function() {
        var vm = this;
        if (!vm.carList[vm.index] && vm.index !== 0) {
          vm.index = Number(vm.index) - 1;
        }
        vm.$set(vm.carList, vm.index, "");
        if (vm.carList.indexOf("") == 7 || vm.carList.indexOf("") == -1) {
          vm.isClick = false;
        } else {
          vm.isClick = true;
        }
        if (vm.index === 0) {
          vm.list = vm.rowOne;
          vm.isNumber=false;
          vm.imgSrc = require("../assets/img/number.png");
        }
      }
    }
  };
</script>
<style scoped>
    @import '../assets/css/car.css';
</style>
