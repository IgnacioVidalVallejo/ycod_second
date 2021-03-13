<template>

    <div  id="people-component--container" class="max-w-7xl m-auto">

        <h1 class="text-5xl font-bold mb-20 ml-3.5" style="color: #3C8999">My Team</h1>

        <div id="people-component--container--in" class="grid grid-cols-2 gap-20 m-4">

            <div>

                <h2 class="text-xl m-4">Add new team member</h2>

                <div class="flex flex-row flex-nowrap justify-between w-full">

                    <div id="file-upload" class="w-full mr-6 mt-9 mb-4 cursor-pointer">

                        <label for="photo" class="block text-sm font-medium text-gray-700">
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
                                        focus-within:ring-offset-2 focus-within:ring-indigo-500 m-auto">Click <br>to upload
                                        </label>

                                    </div>

                                    <p class="text-xs text-gray-500">
                                        JPG up to 100MB
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    <form class="w-full mb-4 mt-9 flex flex-col justify-between">

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

                <button @click.prevent="send()" type="button"  style="background-color: #3C8999" class="items-center px-6 py-3
                border border-transparent text-base font-medium rounded-md shadow-sm text-gray-200 bg-indigo-600 hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full hover:text-white hover:font-bold">
                    Submit
                </button>

            </div>

            <div>

                <ul id="people-component--list" class="divide-y divide-gray-200">

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

            //function executed on creation. It calls the Airtable API for getting the list of the grid view
            charge: function(){

                var vm = this;

                return axios

                .get("https://api.airtable.com/v0/appcvhsoh5yrfEAuq/Grid%20view",
                    {
                        headers: {

                            Authorization: "Bearer keyEUTCefv4BMf4hR"

                        }

                    }

                )

                .then(function(response) {

                //assignment of users at charging page or updating Airtable users list
                vm.c_users = vm.orderByLast(response.data.records);

                console.log("charge");

                })

                .catch(function(error) {

                console.log("charge ERROR: " + JSON.stringify(error));

                });



            },

            //function for the cloudinary upload widget (as popup window)
            cloudinaryUploadWidget: function(){

                var vm = this;

                var myWidget = cloudinary.applyUploadWidget(document.getElementById('file-upload'),
                    {
                        //CLOUDINARY WIDGET UPLOAD API CONFIG
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

                            console.log('Done uploading..');
                        }

                    });

                    //popup opener
                    myWidget.open();

            },

            //sending data function
            //if photo choosen, takes it, if not it takes a default cloudinary avatar image
            send: function(){

                var vm = this;

                //Airtable JS register creation
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
                        },10000);

                    });
            },

            orderByLast: function(UsersArray){

                var array = UsersArray.sort((a, b) => (a.createdTime > b.createdTime) ? -1 : 1);

                return array;
            }
        },

        watch: {

        },

        beforeCreate(){},

        created(){

            //execute AJAX call asking for registered users on Airtable
            this.charge();

            this.c_photoUrl = "https://res.cloudinary.com/demo/image/upload/d_avatar.png/non_existing_id.png";

        },
        mounted() {

            var vm = this;

            //add listener for launching cloudinary image chooser window
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

@media(max-width: 1440px){

    #people-component--container h1{
        text-align: center;
    }
    #people-component--container--in  div h2{
        text-align: center;
    }

}

@media(max-width: 900px){

    #people-component--container--in{
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
    }
    #people-component--container--in div{
        width: 100%;

    }
    #people-component--container--in button{
        width: 100%;


    }
    #people-component--list li img{
        margin-left: 30%;
        margin-right: 15px;
        border-radius: 50px;
        width: 50px;
        height: 50px;
    }
}

</style>

