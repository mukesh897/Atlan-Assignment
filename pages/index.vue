<template>
  <div id="app">
    <v-app id="inspire">
      <v-card>
        <v-card-title class="black white--text headline">
          SQL Editor App
        </v-card-title>
        <v-row
        >
          <v-col cols="2">
            <v-treeview
              :active.sync="active"
              :items="tables"
              :load-children="fetchUsers"
              :open.sync="open"
              activatable
              color="warning"
              open-all
              transition
              dense
            >
              <template v-slot:prepend="{ item, active }">
                <v-icon v-if="!item.children">mdi-table-large</v-icon>
              </template>
            </v-treeview>
            <v-divider></v-divider>
            <v-treeview
              :items="columns"
              :load-children="fetchUsers"
              :open.sync="open"
              color="warning"
              open-all
              transition
              dense
            >
                <template v-slot:append="{ item }">
                <span v-if="item.name !== 'Columns'" class="caption">VARCHAR</span>
                  <v-btn color="primary" outlined small v-else class="caption">PREVIEW TABLE</v-btn>
              </template>
            </v-treeview>
          </v-col>
    
          <v-divider vertical></v-divider>
    
          <v-col
            class="d-flex text-center"
            cols="8"
          >
            <v-scroll-y-transition mode="out-in">
  
              <v-card
                flat
              >
                <v-card-text>
         <v-row>
           <v-col>
             <v-row>
       <v-tabs
        v-model="tab"
        hide-slider
        show-arrows
        background-color="transparent"
        color="basil"
        grow
        height="30"
        next-icon="mdi-arrow-right-bold-box-outline"
        prev-icon="mdi-arrow-left-bold-box-outline"
      >
        <v-tab
          v-for="n in length"
          :key="n"
           dark
           width="50"
           class="ml-2 hoveredTab"
           @mouseover="selectItem(n)"
        >
          <span
                class="caption font-weight-bold">Query number {{ n }}
          </span>
          <v-btn 
           class="ml-5 font-weight-bold" 
           color="error"
           @click="length--" 
           small
           icon><v-icon  v-show="n === selectedTab" small>close</v-icon></v-btn>
        </v-tab>
         <v-tab @click="length++" >
           <v-icon small>add</v-icon>
        </v-tab>
      </v-tabs>
             </v-row>
             <v-row class="mb-5"><v-divider></v-divider></v-row>
             <v-row class="mt-1">
               <v-btn @click="run()" text color="secondary"><v-icon class="mr-1"small>play_arrow</v-icon>RUN</v-btn>
               <v-btn  @click="cancel()" text color="secondary"><v-icon class="mr-1" small>mdi-square</v-icon>CANCEL QUERY</v-btn>
               <v-btn  @click="Save()" text color="secondary"><v-icon class="mr-1" small>save</v-icon>SAVE QUERY</v-btn>
             </v-row>
             <v-row>
                               <v-textarea
                  v-model="query"
                  outlined
                  background-color=""
                  label="Your query">
                  </v-textarea>
  
             </v-row>
      
             <v-row>
        <v-tabs
        height="30"
        background-color="transparent"
      >
        <v-tab
           dark
           class="ml-2"
               height="10"
        >
          <span class="caption font-weight-bold">RESULTS</span>
        </v-tab>
        <v-tab
           dark
           class="ml-2"
               height="10"
        >
          <span class="caption font-weight-bold">RUNNING QUERIES</span>
        </v-tab>
        <v-tab
           dark
           width="50"
           class="ml-2"
        >
          <span class="caption font-weight-bold">HISTORY</span>
        </v-tab>
        <v-tab
           dark
           class="ml-2"
        >
          <span class="caption font-weight-bold">PREVIEW FOR SELECTED TABLE</span>
        </v-tab>
      </v-tabs>
               </v-row>
             <v-row><v-divider></v-divider></v-row>
             <v-row>
               <v-container fluid>
               <v-card outlined>
                 <v-card-text>
            <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="5"
    >
              <template v-slot:top>
                <v-layout align-end justify-end>
                  <v-flex shrink>
                <v-btn color="primary" text small><v-icon small>mdi-file-delimited</v-icon>DOWNLOAD CSV</v-btn>
                    </v-flex>
                  </v-layout>
                </template>
               </v-data-table>
                   </v-card-text>
                 </v-card>
                 </v-container>
             </v-row>
           </v-col>
         </v-row>
  
  
                </v-card-text>
  
              </v-card>
            </v-scroll-y-transition>
          </v-col>
        </v-row>
      </v-card>
    </v-app>
  </div>
</template>

<script>
import 'material-design-icons-iconfont/dist/material-design-icons.css'
  const avatars = [
  '?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban',
  '?accessoriesType=Sunglasses&avatarStyle=Circle&clotheColor=Gray02&clotheType=ShirtScoopNeck&eyeType=EyeRoll&eyebrowType=RaisedExcited&facialHairColor=Red&facialHairType=BeardMagestic&hairColor=Red&hatColor=White&mouthType=Twinkle&skinColor=DarkBrown&topType=LongHairBun',
  '?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Black&clotheType=ShirtVNeck&eyeType=Surprised&eyebrowType=Angry&facialHairColor=Blonde&facialHairType=Blank&hairColor=Blonde&hatColor=PastelOrange&mouthType=Smile&skinColor=Black&topType=LongHairNotTooLong',
  '?accessoriesType=Round&avatarStyle=Circle&clotheColor=PastelOrange&clotheType=Overall&eyeType=Close&eyebrowType=AngryNatural&facialHairColor=Blonde&facialHairType=Blank&graphicType=Pizza&hairColor=Black&hatColor=PastelBlue&mouthType=Serious&skinColor=Light&topType=LongHairBigHair',
  '?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Gray01&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=Default&facialHairColor=Red&facialHairType=Blank&graphicType=Selena&hairColor=Red&hatColor=Blue02&mouthType=Twinkle&skinColor=Pale&topType=LongHairCurly',
]
const pause = ms => new Promise(resolve => setTimeout(resolve, ms))
export default {
  name: 'IndexPage',




  data () {
    return{
    
    active: [],
    query: null,
    avatar: null,
    open: [],
    length: 10,
    tab: null,
    selectedTab: null,
    users: [],
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'left',
            sortable: false,
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
   desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%',
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%',
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%',
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%',
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
        ]
  }},

  computed: {
    tables () {
      return [
        {
          name: 'Tables',
          children: this.users,
        },
      ]
    },
    columns () {
      return [
        {
          name: 'Columns',
          children: this.users,
        },
      ]
    },
    selected () {
      if (!this.active.length) return undefined

      const id = this.active[0]

      return this.users.find(user => user.id === id)
    },
  },

  watch: {
    selected: 'randomAvatar',
  },

  methods: {
    async run() {
      //async method which calls a get api with sql with the user input query passed as params
      
      //the function returns the response as an array of objects which can be used to populate the table as in case of 
      //the local variable deserts
    },
    cancel() {
      //uses axios AbortController to cancel requests in fetch API
    },
    save() {
      // future feature when we enable user authentication
      //this post request can be used to save the queries, uses user input query and userId as body params
    },
    history() {
      // future feature when we enable user authentication
      //this get request can be used to fetch the queries made by the user which were saved
      // uses  userId as body params
    },
    async fetchUsers (item) {
      // Remove in 6 months and say
      // you've made optimizations! :)
      await pause(15)

      return fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(json => (item.children.push(...json)))
        .catch(err => console.warn(err))
    },
    selectItem (item) {
      this.selectedTab = item
    },
    randomAvatar () {
      this.avatar = avatars[Math.floor(Math.random() * avatars.length)]
    },
  },
}
</script>

<style>
.hoveredTab {
  border-left: 1px solid ;
  border-right: 1px solid ;
  border-top: 1px solid;
  border-radius: 5px 5px 0px 0px;
  background-color:'lightgray';
}
.nonHoveredTab {
  border-left: 1px solid ;
  border-right: 1px solid ;
  border-top: 1px solid;
  border-radius: 5px 5px 0px 0px;
  margin-left: 2px
}
</style>