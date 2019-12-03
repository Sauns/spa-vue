<template lang="pug">
    .register
        form(@submit.prevent='auth')
            .form__row
                input(v-model='email' type='email' placeholder='email')
            .form__row
                input(v-model='password' type='password' placeholder='password')
            .form__row
                button(type='submit') Register
            .error(v-if='error') {{error.message}}
</template>
<script>
import * as firebase from 'firebase/app'
import 'firebase/auth'

export default {
    data() {
        return {
            email: '',
            password: '',
            error: ''
        }
    },
    methods: {
        async auth(){
            try{
                const user = await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                console.log(user, 'user')
                this.$router.replace({name: 'table'})
            }catch(error){
                this.error = error
            }
            
        }
    },
}
</script>

<style lang="scss" scoped>
.error {
    margin-top: 15px;
    color: red;
    font-size: 18px;
}
input {
    width: 400px;
    padding: 30px;
    margin: 20px;
    font-size: 21px;
}
button {
    width: 400px;
    height: 75px;
    font-size: 100%;
}
</style>