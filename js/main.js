
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
        eventBus.$on('addColumn3', card => {
            this.column3.push(card)
            this.column2.splice(this.column2.indexOf(card), 1)
        })
        eventBus.$on('addColumn1-3', card => {
            this.column3.push(card)
            this.column1.splice(this.column1.indexOf(card), 1)
        })

    }
})

Vue.component('newcard', {
    template: `
    <form class="addform" @submit.prevent="onSubmit">
            <label for="title">Ведите заметку </label>
        <p>
            <input id="title" required v-model="title" maxlength="30" type="text" placeholder="название">
        </p>
        <div>
            <input required id="subtask1" v-model="subtask1" maxlength="30" placeholder="задача">
        </div>
        <div>
            <input required id="subtask2" v-model="subtask2" maxlength="30" placeholder="задача">
        </div>
        <div>
            <input required id="subtask3" v-model="subtask3" maxlength="30" placeholder="задача">
        </div>
        <div>
            <input  id="subtask4" v-model="subtask4" maxlength="30" placeholder="задача">
        </div>
        <div>
            <input  id="subtask5" v-model="subtask5" maxlength="30" placeholder="задача">
        </div>
        <button type="submit">добавить заметку</button>
    </form>
    `,
    data() {
        return {
            title: null,
            subtask1: null,
            subtask2: null,
            subtask3: null,
            subtask4: null,
            subtask5: null,
            errors: [],
        }
    },
})

let app = new Vue({
    el: '#app',


})