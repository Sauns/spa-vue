<template lang="pug">
    .detailRecords
        .detailRecordsEdit(v-if='mode== "edit"')
            h1.detailRecords__title Edit your records
            form(@submit.prevent='updateRecords')
                .form__row
                    input(v-model='recordsDetail.title' type='text' placeholder='title')
                .form__row 
                    input(v-model='recordsDetail.description' type='text' placeholder='description')
                .form__row
                    button(type='submit') Save
                .form__row
                    router-link.btn(to='/table/') Cancel
        .detailRecordsEdit(v-if='mode== "add"')
            h1.detailRecords__title Add new records
            form(@submit.prevent='addRecords')
                .form__row
                    input(v-model='recordsDetail.title' type='text' placeholder='title')
                .form__row 
                    input(v-model='recordsDetail.description' type='text' placeholder='description')
                .form__row
                    button(type='submit') Add
                .form__row
                    router-link.btn(to='/table/') Cancel
</template>

<script>

export default {
    data() {
        return {
            mode: '',
            recordsDetail: {
                title: '',
                description: ''
            }
        }
    },
    created() {
        this.checkMode()
    },
    methods: {
        checkMode(){
            if(this.$route.name == 'edit'){
                this.mode = 'edit'
                this.getRecordsFields()
            }else if(this.$route.name == 'add'){
                this.mode = 'add'
            }
        },
        addRecords(){
            if(this.recordsDetail.title && this.recordsDetail.description){
                this.$store.dispatch('LOAD_RECORDS').then(res =>{
                    if(!res.length){
                        this.recordsDetail.id = '1'
                    }else{
                        this.recordsDetail.id = (res.length +1).toString()
                    }
                    let now = new Date()  
                    let secondsSinceEpoch = Math.round(now.getTime() / 1000)
                    this.recordsDetail.date = {
                        nanoseconds: 0,
                        seconds: secondsSinceEpoch
                    }
                    this.updateRecords()
                })
            }else{
                alert('Fill in all the fields!')
            }
        },
        updateRecords(){
            this.$store.dispatch('UPDATE_RECORDS', this.recordsDetail)
            this.$router.replace({name: 'table'})
        },
        getRecordsFields(){
            this.$store.dispatch('LOAD_RECORDS').then(res =>{
                res.forEach(el => {
                    if(el.id == this.$route.params.id){
                        this.recordsDetail = el
                    }
                })
            })
        },
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

button, .btn {
    width: 400px;
    height: 75px;
    font-size: 100%;
    margin-bottom: 15px;
    -webkit-appearance: button;
    -webkit-writing-mode: horizontal-tb !important;
    text-rendering: auto;
    color: buttontext;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    text-align: center;
    align-items: flex-start;
    cursor: default;
    background-color: buttonface;
    box-sizing: border-box;
    margin: 0em;
    font: 400 13.3333px Arial;
    padding: 1px 6px;
    border-width: 2px;
    border-style: outset;
    border-color: buttonface;
    border-image: initial;
    width: 400px;
    height: 75px;
    font-size: 100%;
    margin-bottom: 15px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.detailRecords__title{
    margin-top: 20px;
}
</style>