<script>
import axios from 'axios';

export default{
    data(){
        return{
            name:"",
            password:"",
            isShow:false,
            tips:"",
        }
    },
    methods:{
        async Login(){
            if(this.name === "" || this.password === ""){
                this.tips="账号或密码为空！";
                this.isShow=true;
                return;
            }
            // 这里填写将账号密码传入后端并接收返回值的情况
            try{
                const response = await axios.post('http://127.0.0.1:4523/m1/5394050-5067403-default/login',{
                    user_id:this.name,
                    password: this.password,
                },
                {
                    headers: {
                    'Content-Type': 'application/json',
                    },
                });
                const a = response.data;
                if(a){
                    alert("登录成功！");
                }
                else{
                    alert("登录失败！");
                }
            }catch(error){
                console.error('登录请求失败：', error);
            }
        }
    }
}
</script>


<template>
    <router-view></router-view>
    <div class="container">
        <div class="Box">
            <h1>登录</h1>
            <div class="InputBox">
                <input type="text" v-model.trim="name" @keyup.enter="Login" placeholder="请输入账号">
            </div>
            <div class="line1"></div>

            <div class="InputBox">
                <input type="password" v-model.trim="password" @keyup.enter="Login" placeholder="请输入密码">
            </div>
            <div class="line2"></div>

            <div class="btnBox">
                <el-button class="loginBtn" @click="Login">登录</el-button>
            </div>

            <div :class="{tip: isShow}">
                {{ tips }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.container{
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
}
.Box{
    width: 480px;
    height: 370px;

    border:1px solid rgba(0,0,0,0.2);
    border-radius: 15px;
}
.Box h1{
    color: black;
    text-align: center;
    font-size: 40px;
    font-family: "StSong";
}
.Box input{
    width: 300px;
    height: 30px;
    border: none;
    outline: none;

    font-size: 14px;
}
.InputBox{
    width: 350px;
    height: 25px;
    padding: 10px;
    margin-bottom: 8px;
    margin-left: auto;
    margin-right: auto;
    border:1px solid rgba(0,0,0,0.2);
    border-radius: 15px;

    display: flex;
    align-items: center;
    justify-content: center;

    border:1px solid rgba(0,0,0,0.2);
    border-radius: 15px;
}

.logo{
    width: 28px;
    height: 28px;
    margin-right: 10px;
}
.btnBox{
    margin-top: 30px;
}
.loginBtn{
    width: 260px;
    height: 45px;
    margin-left: 110px;
    border-radius: 15px;

    background-color: rgba(80,0,0);
    color: white;
    font-size: 25px;
    font-weight: bold;
}
.tip{
    color: red;
    font-weight: bolder;
    font-size: 15px;
    text-align: center;
}
.line1{
    width: 400px;
    margin-left: 40px;
    margin-bottom: 30px;
    
    border-bottom: 1px solid rgba(0,0,0,0.2);
}
.line2{
    width: 400px;
    margin-left: 40px;
    margin-bottom: 10px;

    border-bottom: 1px solid rgba(0,0,0,0.2);
}
</style>