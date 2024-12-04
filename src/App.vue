<script>
import top from './components/top.vue'
import Sidebar from './components/Sidebar.vue';
import { RouterView } from 'vue-router';


export default {    
    components: {
        top,
        Sidebar
    },
    data() {
        return {
            isShow: true
        }
    }
}
</script>

<template>
    <div class="container" v-if="isShow">
        <top @change-show="isShow = !isShow" />
        <div class="container1">
            <Sidebar />
            <RouterView />
        </div>
    </div>

    <div class="container" v-if="!isShow">
            <RouterView />
    </div>



</template>


<style>
.container1 {
    display: flex;
}

.container {
    height: 100vh;
    width: 100%;
    padding: 0;
    flex-direction: column;
    background-color: rgba(0, 0, 0, .05);
}
</style>