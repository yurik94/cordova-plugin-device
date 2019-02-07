/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */

var argscheck = require('cordova/argscheck');
var channel = require('cordova/channel');
var utils = require('cordova/utils');
var exec = require('cordova/exec');
var cordova = require('cordova');

channel.createSticky('onCordovaInfoReady');
// Tell cordova channel to wait on the CordovaInfoReady event
channel.waitForInitialization('onCordovaInfoReady');

/**
 * This represents the mobile device, and provides properties for inspecting the model, version, UUID of the
 * phone, etc.
 * @constructor
 */
function Device() {
    this.available = false;
    this.platform = null;
    this.version = null;
    this.uuid = null;
    this.cordova = null;
    this.model = null;
    this.manufacturer = null;
    this.isVirtual = null;
    this.serial = null;
    this.build_bootloader = null;
    this.build_brand = null;
    this.build_device = null;
    this.build_display = null;
    this.build_fingerprint = null;
    this.build_radio_version = null;
    this.build_hardware = null;
    this.build_host = null;
    this.build_id = null;
    this.build_manufacturer = null;
    this.build_model = null;
    this.build_product = null;
    this.build_tags = null;
    this.build_time = null;
    this.build_type = null;
    this.build_user = null;
    this.build_version_codename = null;
    this.build_version_incremental = null;
    this.build_version_release = null;
    this.build_version_sdk_int = null;
    this.buildversion_security_patch = null;
    this.boot_elapsed = null;
    this.wifi_mac = null;
    this.ble_mac = null;
    this.google_play_services_version_name = null;
    this.battery_level = null;
    this.battery_charging = null;

    this.setDeviceInfo = function(info){
        this.available = true;
        this.platform = info.platform;
        this.version = info.version;
        this.uuid = info.uuid;
        this.cordova = cordova.version;
        this.model = info.model;
        this.isVirtual = info.isVirtual;
        this.manufacturer = info.manufacturer || 'unknown';
        this.serial = info.serial || 'unknown';
        this.build_bootloader = info.build_bootloader;
        this.build_brand = info.build_brand;
        this.build_device = info.build_device;
        this.build_display = info.build_display;
        this.build_fingerprint = info.build_fingerprint;
        this.build_radio_version = info.build_radioversion;
        this.build_hardware = info.build_hardware;
        this.build_host = info.build_host;
        this.build_id = info.build_id;
        this.build_manufacturer = info.build_manufacturer;
        this.build_model = info.build_model;
        this.build_product = info.build_product;
        this.build_tags = info.build_tags;
        this.build_time = info.build_time;
        this.build_type = info.build_type;
        this.build_user = info.build_user;
        this.build_version_codename = info.buildversion_codename;
        this.build_version_incremental = info.buildversion_incremental;
        this.build_version_release = info.buildversion_release;
        this.build_version_sdk_int = info.buildversion_sdkint;
        this.build_version_security_patch = info.buildversion_securitypatch;
        this.boot_elapsed = info.bootelapsed;
        this.wifi_mac = info.wifi_mac;
        this.ble_mac = info.ble_mac;
        this.google_play_services_version_name = info.googlePlayServicesVersionName;
        this.battery_level = info.batteryLevel;
        this.battery_charging = info.batteryCharging;
    };

    var me = this;

    channel.onCordovaReady.subscribe(function () {
        me.getInfo(function (info) {
            me.setDeviceInfo(info);
            
            channel.onCordovaInfoReady.fire();
        }, function (e) {
            me.available = false;
            utils.alert('[ERROR] Error initializing Cordova: ' + e);
        });
    });
}

/**
 * Get device info
 *
 * @param {Function} successCallback The function to call when the heading data is available
 * @param {Function} errorCallback The function to call when there is an error getting the heading data. (OPTIONAL)
 */
Device.prototype.getInfo = function (successCallback, errorCallback) {
    argscheck.checkArgs('fF', 'Device.getInfo', arguments);

    var successUpdateCallback = function(info){
        window.device.setDeviceInfo(info);
        successCallback(info);
    };

    exec(successUpdateCallback, errorCallback, 'Device', 'getDeviceInfo', []);
};

module.exports = new Device();
