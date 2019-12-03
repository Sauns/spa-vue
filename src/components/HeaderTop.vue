<template lang="pug">
    .headerTop
        .logo
            img(src='../assets/logo.png')
        .headerTop__logOut
            p.headerTop__btn(v-if='loggedIn' @click='signOut') LogOut
            router-link.headerTop__btn(v-else to='/login/') logIn
</template>
<script>
import * as firebase from 'firebase/app'
import 'firebase/auth'

export default {
    data() {
        return {
            loggedIn: false
        }
    },
    created() {
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.loggedIn = true
            }else{
                this.loggedIn = false
            }
        })
    },
    methods: {
        async signOut(){
            try{
                const data = await firebase.auth().signOut() 
                console.log(data)  
                this.$router.replace({name: 'login'})
            }catch(error){
                console.log(error)
            }    
        }
    },
}
</script>

<style lang="scss" scoped>
    .headerTop{
        background-image: linear-gradient(265deg, #0077e2, #108dfd);
        padding: 20px 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .headerTop__btn{
        color: #fff;
        font-size: 16px;
        cursor: pointer;
        font-weight: bold;
        padding: 0 15px;
        text-decoration: none;
    }
</style>