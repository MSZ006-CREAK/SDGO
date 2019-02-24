<template>
  <div class="index">
    <el-row class="login-table">
      <el-col :xs="0" :sm="7" :md="6" :lg="5" :xl="4" style="background-color: #23255A;height: 100vh;">
        <el-row>
          <el-col :span="24" v-for="item in menulist" v-bind:key="item.id" class="menu">
            <div class="parent" @click="showchange(item)" v-bind:class="{ 'selct-child ': item.show, '': !(item.show) }">
              <div class="parent-text">
                {{item.name}}
              </div>
            </div>
            <div class="children" v-bind:class="{ 'selct-child ': x.show, '': !(x.show) }" v-for="x in item.children" v-bind:key="x.id">
              <div class="children-text">
                {{x.menuNname}}
              </div>
            </div>
          </el-col>
          <el-col :span="24" class="menu">
            <div class="parent">
              <div class="parent-text" @click="loadrobot">
                载入机库
              </div>
            </div>
          </el-col>
          <el-col :span="24" class="menu">
            <div class="parent">
              <div class="parent-text" @click="savedata">
                保存机库
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xs="24" :sm="17" :md="18" :lg="19" :xl="20" style="height: 100vh;">
        <el-col :xs="24" :sm="0" :md="0" :lg="0" :xl="0">
          <div @click="menuShow=true" style="height: 6vh;line-height: 6vh;position: fixed;width: 100%;top: 0px;background-color: white;z-index: 9999;">菜单</div>
        </el-col>
        <div class="bg">
          <el-col :xs="24" :sm="0" :md="0" :lg="0" :xl="0" style="margin-top: 5vh;">
            &nbsp;
          </el-col>
          <router-view/>
        </div>
      </el-col>
    </el-row>
    <el-dialog :title="titleName" :visible.sync="menuShow" :fullscreen="true">
      <el-form :inline="true" class="demo-form-inline">
        <el-row>
          <el-col :span="24" v-for="item in menulist" v-bind:key="item.id" class="menu">
            <div class="parent" @click="showchange(item)">
              <div class="parent-text" style="color: black;">
                {{item.name}}
              </div>
            </div>
          </el-col>
          <el-col :span="24" class="menu">
            <div class="parent">
              <div class="parent-text" @click="savedata">
                保存机库
              </div>
            </div>
          </el-col>
          <el-col :span="24" class="menu">
            <div class="parent">
              <div class="parent-text" @click="menuShow=false" style="color: black;">
                关闭菜单
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      //    var ttss = require('../components/test');
      //    console.log(ttss)
      //    console.log("ttss")
      return {
        menulist: [{
          name: "我的机库",
          route: "index-gundam"
        }, {
          name: "自定义扭蛋",
          route: "index-egg"
        }],
        checkdata: {},
        menuShow: false,
        titleName: ""
      }
    },
    mounted() {
      //    this.getmenulist();
      //    this.loadrobot();
    },
    methods: {
      savedata() {
        this.$http({
          url: this.$http.adornUrl("api/do"),
          method: 'POST',
          data: '"S"'
        }).then(({
          data
        }) => {
          this.$message({
            type: 'success',
            message: "保存成功"
          });
        });
      },
      loadrobot() {
        this.$http({
          url: this.$http.adornUrl("api/do"),
          method: 'POST',
          data: '"L"'
        }).then(({
          data
        }) => {});
      },
      showchange(item) {
        this.$router.push({
          path: item.route
        })
        this.menuShow = false;
      },
      getmenulist() {
        this.$http({
          url: 'http://39.105.85.21:3001/menu',
          method: 'GET',
          params: this.$http.adornParams()
        }).then(({
          data
        }) => {
          //        console.log(data)
          this.menulist = data.list
        });
      },
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .aside {
    background-color: #113569;
    color: white;
    height: 100%;
  }
  .aside-border {
    border-radius: 8px;
  }
  .content {
    /*position: absolute;*/
    width: 100%;
    height: 100%;
    margin-left: 260px;
    margin-top: 0px;
    padding-left: 0px;
    padding-right: 0px;
    /*background-color: #113569;*/
  }
  .parent {
    border: 1px solid #2D9DED;
    padding: 8px;
    overflow: hidden;
    font-weight: bolder;
    font-size: 18px;
    color: white;
  }
  .parent:hover {
    background-color: #373978;
  }
  .parent-text {
    /*float: right;
    margin-right: 1em;*/
    text-align: center;
  }
  .bg {
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    background-color: #1f324d;
  }
</style>
