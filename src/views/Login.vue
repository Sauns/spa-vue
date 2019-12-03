<template lang="pug">
    .logIn
        router-link.link(to='/register/') Registration
        form(@submit.prevent='logIn')
            .form__row
                input(v-model='email' type='email' placeholder='login')
            .form__row
                input(v-model='password' type='password' placeholder='password')
            .form__row
                button(type='submit') LogIn
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
        async logIn(){
            try{
                const value = await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                console.log(value)
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
    color: red;
    font-size: 18px;
    margin-top: 15px;
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

.link{
    color: #000;
    text-decoration: none;
    display: block;
    margin: 20px 0 0;
}
</style>