<template>
  <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
    <h1 class="text-5xl font-bold mb-20" style="color: #3C8999">My Team</h1>
    <div class="grid grid-cols-2 gap-20">
      <div>
        <h2 class="text-xl mb-5">Add new team member</h2>
        <form class="space-y-5">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <div class="mt-1">
              <input v-model="name" type="text" name="name" id="name" class="shadow-sm focus:ring-indigo-500
              focus:border-indigo-500 block w-full sm:text-sm border-gray-300 p-3 border
              rounded-md" placeholder="Calvin Hawkins" required>
            </div>
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <div class="mt-1">
              <input v-model="email" type="text" name="email" id="email" class="shadow-sm focus:ring-indigo-500
              focus:border-indigo-500 block w-full sm:text-sm border-gray-300 p-3 border
              rounded-md" placeholder="you@example.com" required>
            </div>
          </div>
          <div>
            <label for="photo" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Photo
            </label>
            <div class="mt-1">
              <div class="w-full flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300
              border-dashed rounded-md">
                <div class="space-y-1 text-center">
                  <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none"
                  viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0
                    01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4
                    0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium
                    text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2
                    focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" class="sr-only">
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
          <button @click.prevent="send()" type="button" class="inline-flex items-center px-6 py-3 border border-transparent
          text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Submit
          </button>
        </form>
      </div>
      <div>
        <ul class="divide-y divide-gray-200">
          <li v-for="(value, index) in c_users" :key="index" class="py-4 flex">
            <img class="h-10 w-10 rounded-full"
            :src="value.fields.Photo[0].thumbnails.large.url" :alt="value.fields.Photo[0].filename">
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-900">{{ value.fields.Name}}</p>
              <p class="text-sm text-gray-500">{{ value.fields.Email}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        props: [],
        data() {
            return {
                name: null,
                email: null,
                c_users: []
            }
        },
        methods:{

            charge: function(){

                var vm = this;

                return axios

                .get("https://api.airtable.com/v0/appcvhsoh5yrfEAuq/Grid%20view?maxRecords=3&view=Grid%20view",
                    {
                        params: {

                                api_key: "keyEUTCefv4BMf4hR",
                                pageSize: 10,
                                maxRecords: 10,

                            }
                    }

                )

                .then(function(response) {

                //updates transportation and emits it
                vm.c_users = response.data.records;

                console.log("charge ", JSON.stringify(vm.c_users));

                })

                .catch(function(error) {

                console.log("charge ERROR: " + JSON.stringify(error));

                })

                .finally(()=>{


                })
                ;
            },

            send: function(){

                return axios

                .post("/info-located-reload", {

                //data send to backend for retrieving refreshed data


                })

                .then(function(response) {

                //updates transportation and emits it

                console.log("Info-located-reload:", response);

                console.log('tune');

                })

                .catch(function(error) {

                console.log("ERROR: " + JSON.stringify(error));

                console.log('tune');

                })

                .finally(()=>{

                vm.c_thinkingDisplay = false;

                })
                ;
            }
        },
        watch: {},
        beforeCreate(){



        },
        created(){

            this.charge();

        },
        mounted() {

        },

    }
</script>

