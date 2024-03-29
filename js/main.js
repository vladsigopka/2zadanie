let eventBus = new Vue()






Vue.component('cols', {  //определяет компоненты для приложения
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
        // Определение данных компонента (data)
        return {
            column1: [], // Массив для хранения данных колонки 1
            column2: [], // Массив для хранения данных колонки 2
            column3: [], // Массив для хранения данных колонки 3
            errors: [] // Массив для хранения ошибок
        }
    },
    method:{  // Определение методов компонента (methods)

    },
    mounted() {
        eventBus.$on('addColumn1', card => {
            this.errors = []
            if (this.column1.length < 3) {  // Проверка, может ли карточка быть добавлена в первую колонку
                this.column1.push(card)  // Добавление карточки в первую колонку
            } else {
                this.errors.push('В первой колонке должно быть не более трех карточек')  // Добавление ошибки
            }
        })
        eventBus.$on('addColumn2', card => {
            this.errors = []
            if (this.column2.length < 5) {   // Проверка, может ли карточка быть добавлена во вторую колонку
                this.column2.push(card)  // Добавление карточки
                this.column1.splice(this.column1.indexOf(card), 1)  // Удаление карточки из первой колонки
            } else {
                his.errors.push("Во второй колонке должно быть не более пяти карточек")  // Добавление ошибки
            }

        })
        eventBus.$on('addColumn3', card => {
            this.column3.push(card) // Добавление карточки в третью колонку
            this.column2.splice(this.column2.indexOf(card), 1)   // Удаление карточки из второй колонки
        })
        eventBus.$on('addColumn1-3', card => {
            this.column3.push(card)   // Добавление карточки в третью колонку
            this.column1.splice(this.column1.indexOf(card), 1)
        })

    },
    computed:{

    }
})

Vue.component('newcard', {
    template: `
    <form class="addform" @submit.prevent="onSubmit">
            <label for="title">Введите заметку </label>
        <p>
            <input id="title" required v-model="title" maxlength="30" type="text" placeholder="название">
        </p>
        <div class="subtasks">
            <input required id="subtask1" v-model="subtask1" maxlength="30" placeholder="задача">
        </div>
        <div class="subtasks">
            <input required id="subtask2" v-model="subtask2" maxlength="30" placeholder="задача">
        </div>
        <div class="subtasks">
            <input required id="subtask3" v-model="subtask3" maxlength="30" placeholder="задача">
        </div>
        <div class="subtasks">
            <input  id="subtask4" v-model="subtask4" maxlength="30" placeholder="задача">
        </div>
        <div class="subtasks">
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
    methods: {
        onSubmit(){    // Создаем объект заметки (card) с данными из формы
            let card = {
                title: this.title,
                subtasks: [{
                    title: this.subtask1, completed: false},
                    {title: this.subtask2, completed: false},
                    {title: this.subtask3, completed: false},
                    {title: this.subtask4, completed: false},
                    {title: this.subtask5, completed: false}],
                date: null,
                status: 0,
                errors: [],
            }
            eventBus.$emit('addColumn1', card)  // Используем eventBus для отправки данных о новой заметке
            // Сбрасываем значения полей формы
            this.title = null
            this.subtask1 = null
            this.subtask2 = null
            this.subtask3 = null
            this.subtask4 = null
            this.subtask5 = null
        }
    }
})



Vue.component('col1' , {
    template: `
    <div class="col">
         <div class="cards"
         v-for="card in column1"
     >
    <h2 class="bigtext">{{card.title}}</h2>
    <ul class="tasksUl">
   <li class="tasks" v-for="task in card.subtasks" 
                    v-if="task.title != null" 
                    @click="changeCompleted(card, task)" 
                    :class="{completed: task.completed}">
      {{task.title}}
     </li>
    </ul>
</div>
</div>
    `,
    props:{
        column1: {
            type: Array,
        },
        column2: {
            type: Array,
        },
        card: {
            type: Object,
        },
        errors: {
            type: Array
        }
    },
    methods: {
        changeCompleted(card, task) {
            task.completed = true  // Устанавливаем флаг "completed" для задачи в true
            card.status += 1 // Увеличиваем счетчик статуса заметки
            let count = 0
            for(let i = 0; i < 5; i++){  // Считаем общее количество задач в заметке
                if (card.subtasks[i].title != null) {
                    count++
                }
            }

            if ((card.status / count) * 100 >= 50) {   // Если более 50% задач завершены, отправляем событие "addColumn2"
                eventBus.$emit('addColumn2', card)
            }
            if ((card.status / count) * 100 === 100) {   
                card.date = new Date().toLocaleString()
                eventBus.$emit('addColumn1-3', card)
            }
        },
    },
})
Vue.component('col2', {
    template: `
        <div class="col">
    <div class="cards"
    v-for="card in column2"
    >
    <h2 class="bigtext">{{card.title}}</h2>
    <ul class="tasksUl">
    <li class="tasks" v-for="task in card.subtasks"
    v-if="task.title!=null"
    @click="changeCompleted(card,task)"
    :class="{completed: task.completed}"
    >
    {{task.title}}
        </li>
    </ul>
</div>
</div>
    `,
    props: {
        column2: {
            type: Array,
        },
        card: {
            type: Object,
        }
        },
    methods: {
        changeCompleted(card, task) {
            task.completed = true
            card.status += 1
            let count = 0
            for(let i = 0; i < 5; i++){
                if (card.subtasks[i].title != null) {
                    count++
                }
            }
            if ((card.status / count) * 100 === 100) {
                eventBus.$emit('addColumn3', card)
                card.date = new Date().toLocaleString();
            }
        }
    }
})
Vue.component('col3', {
    template: `
            <div class="col">
    <div class="cards"
    v-for="card in column3"
    >
    <h2 class="bigtext">{{card.title}}</h2>
    <ul class="tasksUl">
     <li class="tasks" v-for="task in card.subtasks" 
     :class="{completed: task.completed}">
                        {{task.title}}
                    </li>
                     <p>{{ card.date }}</p>
    </ul>
</div>
</div>
    `,
    props: {
        column3: {
            type: Array
        },
        card: {
            type: Object
        }
    }
})




let app = new Vue({
    el: '#app',
methods: {

}

})