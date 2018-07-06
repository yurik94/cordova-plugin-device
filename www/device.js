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
    this.build_radioversion = null;
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
    this.buildversion_codename = null;
    this.buildversion_incremental = null;
    this.buildversion_release = null;
    this.buildversion_sdkint = null;
    this.buildversion_securitypatch = null;
    this.bootelapsed = null;
    this.wifi_mac = null;
    this.ble_mac = null;

    var me = this;

    channel.onCordovaReady.subscribe(function () {
        me.getInfo(function (info) {
            // ignoring info.cordova returning from native, we should use value from cordova.version defined in cordova.js
            // TODO: CB-5105 native implementations should not return info.cordova
            var buildLabel = cordova.version;
            me.available = true;
            me.platform = info.platform;
            me.version = info.version;
            me.uuid = info.uuid;
            me.cordova = buildLabel;
            me.model = info.model;
            me.isVirtual = info.isVirtual;
            me.manufacturer = info.manufacturer || 'unknown';
            me.serial = info.serial || 'unknown';
            me.build_bootloader = info.build_bootloader;
            me.build_brand = info.build_brand;
            me.build_device = info.build_device;
            me.build_display = info.build_display;
            me.build_fingerprint = info.build_fingerprint;
            me.build_radioversion = info.build_radioversion;
            me.build_hardware = info.build_hardware;
            me.build_host = info.build_host;
            me.build_id = info.build_id;
            me.build_manufacturer = info.build_manufacturer;
            me.build_model = info.build_model;
            me.build_product = info.build_product;
            me.build_tags = info.build_tags;
            me.build_time = info.build_time;
            me.build_type = info.build_type;
            me.build_user = info.build_user;
            me.buildversion_codename = info.buildversion_codename;
            me.buildversion_incremental = info.buildversion_incremental;
            me.buildversion_release = info.buildversion_release;
            me.buildversion_sdkint = info.buildversion_sdkint;
            me.buildversion_securitypatch = info.buildversion_securitypatch;
            me.bootelapsed = info.bootelapsed;
            me.wifi_mac = info.wifi_mac;
            me.ble_mac = info.ble_mac;
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
    exec(successCallback, errorCallback, 'Device', 'getDeviceInfo', []);
};

module.exports = new Device();
