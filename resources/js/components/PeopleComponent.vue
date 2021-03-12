<template>

    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">

        <h1 class="text-5xl font-bold mb-20 ml-3.5" style="color: #3C8999">My Team</h1>

        <div class="grid grid-cols-2 gap-20">

            <div>

                <h2 class="text-xl m-4">Add new team member</h2>

                <div class="flex flex-row flex-nowrap justify-between">

                    <div id="file-upload" class="w-full m-6">

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
                                        <!--<span>Upload a file</span>
                                        <input id="file-upload" name="file-upload" type="file" class="sr-only">-->
                                        </label>
                                        <p class="pl-1">or drag and drop</p>
                                    </div>

                                    <p class="text-xs text-gray-500">
                                        JPG up to 100MB
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    <form class="space-y-5 w-full m-6 mb-4 mt-9 flex flex-col justify-between">

                        <div>
                            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                            <div class="mt-1">
                            <input v-model="c_name" type="text" name="name" id="name" class="shadow-sm focus:ring-indigo-500
                            focus:border-indigo-500 block w-full sm:text-sm border-gray-300 p-3 border
                            rounded-md" placeholder="Calvin Hawkins" required>
                            </div>
                        </div>

                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                            <div class="mt-1">
                            <input v-model="c_email" type="text" name="email" id="email" class="shadow-sm focus:ring-indigo-500
                            focus:border-indigo-500 block w-full sm:text-sm border-gray-300 p-3 border
                            rounded-md" placeholder="you@example.com" required>
                            </div>
                        </div>

                    </form>

                </div>

                <button @click.prevent="send()" type="button" class="items-center px-6 py-3 border border-transparent
                text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-11/12 m-6">
                    Submit
                </button>

            </div>

            <div>

                <ul class="divide-y divide-gray-200">

                    <li v-for="(value, index) in c_users" :key="index" class="py-4 flex">

                        <img v-if="value.fields.Photo[0].thumbnails" class="h-10 w-10 rounded-full"
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
                c_name: null,
                c_email: null,
                c_users: [],
                c_photoUrl: null
            }
        },
        methods:{

            charge: function(){

                var vm = this;

                return axios

                .get("https://api.airtable.com/v0/appcvhsoh5yrfEAuq/Grid%20view",
                    {
                        headers: {
                            Authorization: "Bearer keyEUTCefv4BMf4hR"
                        },
                        params: {

                                pageSize: 10

                            }
                    }

                )

                .then(function(response) {

                //updates transportation and emits it
                vm.c_users = response.data.records;

                console.log("charge "/*, JSON.stringify(vm.c_users)*/);

                })

                .catch(function(error) {

                console.log("charge ERROR: " + JSON.stringify(error));

                })

                .finally(()=>{


                }
            )
            },
            cloudinaryUploadWidget: function(){

                var vm = this;

                var myWidget = cloudinary.applyUploadWidget(document.getElementById('file-upload'),
                    {
                        cloudName: 'ddcnjjimx',
                        uploadPreset: 'wleo4imq',
                        multiple: false ,
                        sources: ['local', 'camera', 'instagram'],
                        maxImageFileSize: 100000000,
                        minImageWidth: 200,
                        minImageHeight: 200,
                        showPoweredBy: false,
                        filedName: 'file-upload',
                        clientAllowedFormats: "jpeg",
                        showUploadMoreButton: true,
                        thumbnailTransformation: [{ width: 500, height: 500, crop: 'limit' }]


                    },
                    (error, result) => {
                    if (!error && result && result.event === "success") {

                        vm.c_photoUrl = result.info.secure_url;

                            console.log('Done uploading..: ', /*result.info*/);
                        }

                    });

                    myWidget.open();

            },
            send: function(){

                var vm = this;

                var Airtable = require('airtable');
                var base = new Airtable({apiKey: 'keyEUTCefv4BMf4hR'}).base('appcvhsoh5yrfEAuq');
                base('Grid view').create([
                    {
                        "fields": {
                            "Name": vm.c_name,
                            "Email": vm.c_email,
                            "Photo": [
                                {
                                "url": vm.c_photoUrl
                                }
                            ]
                        }
                    }
                    ], function(err, records) {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        records.forEach(function (record) {

                            console.log(record.getId());
                        });

                        //charges name and email.
                        //the image thumbnails need to be generated in the Airtable server before receiving it,
                        // and it takes some seconds for that
                        vm.charge();

                        //sufficient delay for thumbnails generation in server
                        //and charge again info
                        setTimeout(function(){
                            vm.charge();
                        },5000);

                    });
            }
        },

        watch: {},

        beforeCreate(){},

        created(){

            this.charge();

            this.c_photoUrl = "https://res.cloudinary.com/demo/image/upload/d_avatar.png/non_existing_id.png";

        },
        mounted() {
            var vm = this;
            document.getElementById("file-upload").addEventListener("click", function(){
                    vm.cloudinaryUploadWidget();
                }, false);
        }

    }
</script>

<style>

.cloudinary-button{
    display: none;
}
.cloudinary-thumbnails{
    margin-top: 45px;
    margin-left: 25px;

}

</style>

