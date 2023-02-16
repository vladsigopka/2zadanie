
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
    },})

let app = new Vue({
    el: '#app',
    

})