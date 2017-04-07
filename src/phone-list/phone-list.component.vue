<template>
    <ul class="phones">
        <li  v-for="phone in filtered(phones)" class="thumbnail">
            <a @click="details(phone.id)" class="thumb">
                <img :src="phone.imageUrl" :alt="phone.name"/>
            </a>
            <a @click="details(phone.id)">{{phone.name}}</a>
            <p>{{phone.snippet}}</p>
        </li>
    </ul>
</template>

<script>
    import axios from "axios";

    export default {

        props: ['query', 'orderBy'],

        data() {
            return {
                phones: []
            }
        },

        methods: {
            filtered(phones) {
                let self = this;
                return phones.filter(function (phone) {
                    let re = new RegExp(self.query, "i");
                    return re.test(phone.name);
                })
            },

            fetchPhones() {
                let self = this;
                axios.get('/phones/phones.json').then(function (response) {
                    self.phones = response.data;
                });
            },

            details(id){
                this.$router.push('/details/' + id) ;
            }
        },

        created() {
            this.fetchPhones();
        },

        watch: {
            orderBy () {
                let self = this;
                this.phones.sort(function (premier, deuxieme) {
                    if (self.orderBy === 'age') {
                        return premier[self.orderBy] < deuxieme[self.orderBy];
                    } else {
                        return premier[self.orderBy].localeCompare(deuxieme[self.orderBy]);
                    }
                });
            }
        }
    }
</script>

