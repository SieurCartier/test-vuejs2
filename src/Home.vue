<template>
    <div id="app">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-2">
                    <label>Search :
                    <input v-model="userQuery"/>
                    </label>
                    <label>
                        Sort by :
                        <select v-model="selected">
                        <option value="name">Alphabetical</option>
                        <option value="age">Newest</option>
                    </select>
                    </label>
                </div>
                <div class="col-md-10">
                    <phone-list :query="userQuery" :orderBy="selected"></phone-list>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                userQuery: '',
                selected: 'age'
            }
        }
    }
</script>