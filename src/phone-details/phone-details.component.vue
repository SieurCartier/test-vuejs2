<template>
    <div class="container-fluid">
        <img :src="'../' + mainImgURL" class="phone"/>

        <h1>{{phone.name}}</h1>

        <p>{{phone.description}}</p>

        <ul class="phone-thumbs">
            <li v-for="img in phone.images">
                <img :src="'../' + img" @click="setImage(img)"/>
            </li>
        </ul>

        <ul class="specs">
            <li>
                <span>Availability and Networks</span>
                <dl>
                    <dt>Availability</dt>
                    <dd v-for="availability in phone.availability">{{availability}}</dd>
                </dl>
            </li>
            <li>
                <span>Battery</span>
                <dl v-if="phone.battery">
                    <dt>Type</dt>

                    <dd>{{phone.battery.type}}</dd>
                    <dt>Talk Time</dt>
                    <dd>{{phone.battery.talkTime}}</dd>
                    <dt>Standby time (max)</dt>
                    <dd>{{phone.battery.standbyTime}}</dd>
                </dl>
            </li>
            <li>
                <span>Storage and Memory</span>
                <dl v-if="phone.storage">
                    <dt>RAM</dt>
                    <dd>{{phone.storage.ram}}</dd>
                    <dt>Internal Storage</dt>
                    <dd>{{phone.storage.flash}}</dd>
                </dl>
            </li>
            <li>
                <span>Connectivity</span>
                <dl v-if="phone.connectivity">
                    <dt>Network Support</dt>
                    <dd>{{phone.connectivity.cell}}</dd>
                    <dt>WiFi</dt>
                    <dd>{{phone.connectivity.wifi}}</dd>
                    <dt>Bluetooth</dt>
                    <dd>{{phone.connectivity.bluetooth}}</dd>
                    <dt>Infrared</dt>
                    <dd>{{phone.connectivity.infrared | checkmark}}</dd>
                    <dt>GPS</dt>
                    <dd>{{phone.connectivity.gps | checkmark}}</dd>
                </dl>
            </li>
            <li>
                <span>Android</span>
                <dl v-if="phone.android">
                    <dt>OS Version</dt>
                    <dd>{{phone.android.os}}</dd>
                    <dt>UI</dt>
                    <dd>{{phone.android.ui}}</dd>
                </dl>
            </li>
            <li>
                <span>Size and Weight</span>
                <dl v-if="phone.sizeAndWeight">
                    <dt>Dimensions</dt>
                    <dd v-for="dim in phone.sizeAndWeight.dimensions">{{dim}}</dd>
                    <dt>Weight</dt>
                    <dd>{{phone.sizeAndWeight.weight}}</dd>
                </dl>
            </li>
            <li>
                <span>Display</span>
                <dl v-if="phone.display">
                    <dt>Screen size</dt>
                    <dd>{{phone.display.screenSize}}</dd>
                    <dt>Screen resolution</dt>
                    <dd>{{phone.display.screenResolution}}</dd>
                    <dt>Touch screen</dt>
                    <dd>{{phone.display.touchScreen | checkmark}}</dd>
                </dl>
            </li>
            <li>
                <span>Hardware</span>
                <dl v-if="phone.hardware">
                    <dt>CPU</dt>
                    <dd>{{phone.hardware.cpu}}</dd>
                    <dt>USB</dt>
                    <dd>{{phone.hardware.usb}}</dd>
                    <dt>Audio / headphone jack</dt>
                    <dd>{{phone.hardware.audioJack}}</dd>
                    <dt>FM Radio</dt>
                    <dd>{{phone.hardware.fmRadio | checkmark}}</dd>
                    <dt>Accelerometer</dt>
                    <dd>{{phone.hardware.accelerometer | checkmark}}</dd>
                </dl>
            </li>
            <li>
                <span>Camera</span>
                <dl v-if="phone.camera">
                    <dt>Primary</dt>
                    <dd>{{phone.camera.primary}}</dd>
                    <dt>Features</dt>
                    <dd>{{phone.camera.features.join(', ')}}</dd>
                </dl>
            </li>
            <li>
                <span>Additional Features</span>
                <dd>{{phone.additionalFeatures}}</dd>
            </li>
        </ul>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'phone-details',
        data () {
            return {
                phone: {},
                mainImgURL: ''
            }
        },
        methods: {
            setImage(image){
                this.mainImgURL = image;
            }
        },

        beforeRouteEnter (to, from, next) {
            axios.get('/phones/' + to.params.phoneId + '.json').then(function (response) {
                next(self => {
                    self.phone = response.data;
                    self.setImage(self.phone.images[0]);
                });
            });
        },

        filters: {
            checkmark(input) {
                return input ? '\u2713' : '\u2718';
            }
        }
    }
</script>