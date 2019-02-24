<template>
  <div class="index-index">
    <div style="padding-right: 12px;padding-left: 6px;">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-button type="primary" size="small" @click="getms">抽蛋</el-button>
          <el-table :data="mobilesuitupdatalist.list" style="width: 100%;text-align: center;">
            <el-table-column prop="ID" label="代码">
            </el-table-column>
            <el-table-column label="操作" fixed="right">
              <template slot-scope="scope">
                <p>
                  <span class="font-green" @click="restnow(scope.row)">修改</span>
                </p>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <el-dialog :title="titleName" :visible.sync="mobilesuitShow" :fullscreen="true">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="当前机体">
          <div style="width: 160px;">
            <img :src="msinform.img" />
            <el-select v-model="selectms" placeholder="请选择" @change="nowms">
              <el-option label="空" value="{}"></el-option>
              <el-option v-for="item in gundamlist" :key="item.id" :label="item.name" :value="item.code">
              </el-option>
            </el-select>
            <el-input v-model="mobilesuitupdata.ID" placeholder="请输入id" @change="restnow(mobilesuitupdata)" clearable></el-input>
          </div>
        </el-form-item>
        <el-form-item label="概率">
          <el-input-number  v-model="mobilesuitupdata.P" placeholder="请输入概率" :max="100000" :min="0" clearable></el-input-number >
        </el-form-item>
        <el-form-item label="槽数">
          <el-input-number v-model="mobilesuitupdata.C" placeholder="请输入槽数" :max="4" :min="2" clearable></el-input-number>
        </el-form-item>
      </el-form>
      <el-row>
        <el-col :span="22" align="end" :offset="1">
          <el-button type="primary" size="small" @click="mobileupdata">修改</el-button>
          <el-button size="small" @click="mobilesuitShow=false">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        msinform: {},
        mySwiper: "",
        value: {},
        selectms: "{}",
        mySwipertwo: "",
        userid: {},
        gundamlist: [],
        mobilesuitupdatalist: {},
        login: {},
        titleName: "修改",
        addName: "新增",
        addShow: false,
        adddata: {},
        mobilesuitShow: false,
        mobilesuitupdata: {},
        searchdata: {},
        updatadata: {},
        allP: 0,
        Plist: [],
        botlist: {}
      }
    },
    mounted() {
      this.getgundamlist();
      this.getmobilesuitlist();
      this.getbotlist();
    },
    methods: {
      getbotlist() {
        this.userid = sessionStorage.nameid;
        this.$http({
          url: this.$http.adornUrl("api/bot"),
          method: 'GET',
          params: this.$http.adornParams(this.searchdata)
        }).then(({
          data
        }) => {
          console.log(data)
          this.botlist = data
        });
      },
      getms() {
        var rdnum = Math.random().toFixed(3);
        for(let i = 0; i < this.Plist.length; i++) {
          if(parseFloat(this.Plist[i]) > parseFloat(rdnum)) {
            var data = {
              "C": 4,
              "C4": "4D301020",
              "Charge": 2000,
              "Coat": [],
              "Color": [],
              "Exp": 0,
              "ID": this.mobilesuitupdatalist.list[i].ID,
              "Lock": false,
              "Lv": 1,
              "Polish": 10,
              "Pos": 1,
              "Sess": 6,
              "Skill": "124F9",
              "UUID": "ADDE0001",
              "Wing": 2,
              "WingLv": "00323232"
            }
            this.botlist.list.push(data);
            this.addbot();
            this.$message({
                  type: 'success',
                  message: "获得" + this.mobilesuitupdatalist.list[i].C + "槽的" + this.mobilesuitupdatalist.list[i].ID
            });
            return false;
          }
        }
      },
      showInform(C, ID) {
        this.$message({
            type: 'success',
            message: "获得" + C + "槽的" + ID
        });
      },
      addbot() {
        this.$http({
          url: this.$http.adornUrl("api/bot"),
          method: 'POST',
          data: this.$http.adornData(this.botlist)
        }).then(({
          data
        }) => {
          this.botlist();
        }).catch(({
          data
        }) => {});
      },
      getallP() {
        this.allP = 0;
        for(let i = 0; i < this.mobilesuitupdatalist.list.length; i++) {
          this.allP += this.mobilesuitupdatalist.list[i].P;
        }
        this.getPlist();
      },
      getPlist() {
        for(let i = 0; i < this.mobilesuitupdatalist.list.length; i++) {
          if(i != 0) {
            this.Plist[i] = parseFloat(parseFloat(this.Plist[i - 1]) + this.mobilesuitupdatalist.list[i].P / this.allP).toFixed(6);
          } else {
            this.Plist[i] = parseFloat(this.mobilesuitupdatalist.list[i].P / this.allP).toFixed(6);
          }
        }
      },
      nowms() {
        if(this.selectms == "{}") {
          this.msinform.code = "0";
          this.msinform.img = "0";
        } else {
          this.mobilesuitupdata.ID = this.selectms.toString();
          for(let i = 0; i < this.gundamlist.length; i++) {
            if(this.gundamlist[i].code == this.selectms) {
              this.msinform.img = this.gundamlist[i].img;
              this.selectms = this.gundamlist[i].code.toString()
              this.mobilesuitupdata.ID = this.gundamlist[i].code;
            }
          }
        }
      },
      restnow(item) {
        this.mobilesuitShow = true;
        this.mobilesuitupdata = item;
        this.selectms = "{}";
        if(item) {
          for(let i = 0; i < this.gundamlist.length; i++) {
            if(this.gundamlist[i].code == this.mobilesuitupdata.ID) {
              this.msinform.img = this.gundamlist[i].img;
              this.selectms = this.gundamlist[i].code.toString()
              this.mobilesuitupdata.ID = this.gundamlist[i].code;
            }
          }
        };
      },
      getmobilesuitlist() {
        this.userid = sessionStorage.nameid;
        this.$http({
          url: this.$http.adornUrl("api/egg"),
          method: 'GET',
        }).then(({
          data
        }) => {
          console.log(data)
          this.mobilesuitupdatalist = data;
          this.getallP();
        });
      },
      getgundamlist() {
        this.$http({
          url: 'http://39.105.85.21:3001/gundamlist',
          method: 'GET',
          params: this.$http.adornParams(this.searchdata)
        }).then(({
          data
        }) => {
          this.gundamlist = data.list
        });
      },
      mobileupdata() {
        this.mobilesuitupdata.P = parseFloat(this.mobilesuitupdata.P)
        var tdata = this.$http.adornData(this.mobilesuitupdatalist).toString();
        this.$http({
          url: this.$http.adornUrl("api/egg"),
          method: 'POST',
          data: tdata
        }).then(({
          data
        }) => {
          this.mobilesuitShow = false;
          this.getmobilesuitlist();
        }).catch(({
          data
        }) => {});
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
