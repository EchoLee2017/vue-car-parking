<template lang="pug">
    .car_bind
        sticky
            tab(:line-width="1")
                tab-item(selected,@on-item-click="changeCar") 机动车车牌
                tab-item(@on-item-click="changeCar") 新能源车牌
        h2.enter_number 输入车牌号
        span.remark
        .code
            //clickBtn是为了确定黄色底标在哪个位置出现及让键盘出现
            button.index(:new="show===true",@click="clickBtn(1)" ) {{one}}
            span.line
            button.index(:new="show===true",@click="clickBtn(2)") {{two}}
            span.line
            button.index(:new="show===true",@click="clickBtn(3)") {{three}}
            span.line
            button.index(:new="show===true",@click="clickBtn(4)") {{four}}
            span.line
            button.index(:new="show===true",@click="clickBtn(5)") {{five}}
            span.line
            button.index(:new="show===true",@click="clickBtn(6)") {{six}}
            span.line
            button.index(:new="show===true",@click="clickBtn(7)") {{seven}}
            span(v-if="show===true").line
            button(v-if="show===true").index(:new="show===true",@click="clickBtn(8)") {{eight}}
        x-button.add-car 添加车牌
        .keyboard(v-for="item in list")
            .row
                button.btn(v-for="item in list.one",@click="changeKeyboard(item)",:disabled="disable===true") {{item}}
            .row
                button.btn(v-for="item in list.two",@click="changeKeyboard(item)") {{item}}
            .row
                button.btn(v-for="item in list.three",@click="changeKeyboard(item)") {{item}}
            .row
                button.btn(v-for="item in list.four",@click="changeKeyboard(item)") {{item}}


</template>
<script>
    import { Tab, TabItem, Sticky,XButton  } from 'vux'
    import $ from "jquery"
    export default {
        data() {
            return {
                title: '我要停车',
                show:false,
                key:false,
                list:'',
                //车牌号第二位时键盘只能输入字母
                disable:false,
                //车牌号每格对应的字
                one:'',
                two:'',
                three:'',
                four:'',
                five:'',
                six:'',
                seven:'',
                eight:'',
                //记录当前车牌号黄色底标的位置
                index:'',
                multiplier:1/14,
                rowOne:{
                    one:['京','津','冀','鲁','晋','蒙','辽','吉','黑','沪'],
                    two:['苏','浙','皖','闽','赣','豫','鄂','湘','粤','桂'],
                    three:['渝','川','贵','云','藏','陕','甘','青'],
                    four:['琼','新','港','澳','台','宁'],
                },
                rowTwo:{
                    one:['1','2','3','4','5','6','7','8','9','0'],
                    two:['Q','W','E','R','T','Y','U','I','O','P'],
                    three:['A','S','D','F','G','H','J','K','L'],
                    four:['A','S','D','F','G','H','J','K','L']
                },

            }
        },
        components: {
            Tab,
            TabItem,
            Sticky,
            XButton
        },
        mounted: function () {
            this.$nextTick(function () {
                this.onceInit(this.init);
            });
        },
        methods: {
            onceInit: function (callback) {
                callback();
            },
            init: function () {

            },
            changeCar:function(index){
                if(index===0){
                    this.multiplier=1/14;
                    this.show=false;
                }
                if(index===1){
                    this.multiplier=1/16;
                    this.show=true;
                }
                if(this.index){
                    let meter=(2*this.index-1)*this.multiplier*document.body.clientWidth-7;
                    $('span.remark.yellow').css('left',meter);
                }
            },
            clickBtn:function(number){
                this.index=number;
                $('span.remark').addClass('yellow');
                let meter=(2*number-1)*this.multiplier*document.body.clientWidth-7;
                $('span.remark.yellow').css('left',meter);
                this.key=!this.key;
                if(number===1){
                    this.list=this.rowOne;
                }else{
                    this.list=this.rowTwo;
                }
                if(number==2){
                    this.disable=true;
                }else{
                    this.disable=false;
                }
            },
            changeKeyboard:function(item){
                this.list=this.rowTwo;
                switch(this.index){
                    case 1:
                        this.one=item;
                        let meter1=(2*2-1)*this.multiplier*document.body.clientWidth-7;
                        $('span.remark.yellow').css('left',meter1);
                        this.index+=1;
                        this.disable=true;
                        break;
                    case 2:
                        this.two=item;
                        let meter2=(2*3-1)*this.multiplier*document.body.clientWidth-7;
                        $('span.remark.yellow').css('left',meter2);
                        this.index+=1;
                        this.disable=false;
                        break;
                    case 3:
                        this.three=item;
                        let meter3=(2*4-1)*this.multiplier*document.body.clientWidth-7;
                        $('span.remark.yellow').css('left',meter3);
                        this.index+=1;
                        break;
                    case 4:
                        this.four=item;
                        let meter4=(2*5-1)*this.multiplier*document.body.clientWidth-7;
                        $('span.remark.yellow').css('left',meter4);
                        this.index+=1;
                        break;
                    case 5:
                        this.five=item;
                        let meter5=(2*6-1)*this.multiplier*document.body.clientWidth-7;
                        $('span.remark.yellow').css('left',meter5);
                        this.index+=1;
                        break;
                    case 6:
                        this.six=item;
                        let meter6=(2*7-1)*this.multiplier*document.body.clientWidth-7;
                        $('span.remark.yellow').css('left',meter6);
                        this.index+=1;
                        break;
                    case 7:
                        this.seven=item;
                        this.index+=1;
                        break;
                    case 8:
                        this.eight=item;
                        let meter8=(2*8-1)*this.multiplier*document.body.clientWidth-7;
                        $('span.remark.yellow').css('left',meter8);
                        this.index+=1;
                        break;
                }
            }
        }
    }
</script>
