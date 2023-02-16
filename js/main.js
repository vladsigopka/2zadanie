
Vue.component('cols', {
    template:`
 
    <div id="colsAForm">
       <div id="addcols">
 <newcard></newcard>
  <p class="error" v-for="error in errors">{{error}}</p>
 </div>
 <div id="cols">
       <col1 :column1="column1"></col1>
        <col2 :column2="column2"></col2>
        <col3 :column3="column3"></col3>
    </div>
    </div>
    
    
`,
    data() {
        return {
            column1: [],
            column2: [],
            column3: [],
            errors: []
        }
    },
    mounted() {
        eventBus.$on('addColumn1', card => {
            this.errors = []
            if (this.column1.length < 3) {
                this.column1.push(card)
            } else {
                this.errors.push('В первой колонке должно быть не более трех карточек')
            }
        })
        eventBus.$on('addColumn2', card => {
            this.errors = []
            if (this.column2.length < 5) {
                this.column2.push(card)
                this.column1.splice(this.column1.indexOf(card), 1)
            } else {
                his.errors.push("Во второй колонке должно быть не более пяти карточек")
            }
        })

    }
})

let app = new Vue({
    el: '#app',


})