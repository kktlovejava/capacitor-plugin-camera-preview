'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@capacitor/core');
var dynamsoftCameraEnhancer = require('dynamsoft-camera-enhancer');

exports.EnumResolution = void 0;
(function (EnumResolution) {
    EnumResolution[EnumResolution["RESOLUTION_AUTO"] = 0] = "RESOLUTION_AUTO";
    EnumResolution[EnumResolution["RESOLUTION_480P"] = 1] = "RESOLUTION_480P";
    EnumResolution[EnumResolution["RESOLUTION_720P"] = 2] = "RESOLUTION_720P";
    EnumResolution[EnumResolution["RESOLUTION_1080P"] = 3] = "RESOLUTION_1080P";
    EnumResolution[EnumResolution["RESOLUTION_2K"] = 4] = "RESOLUTION_2K";
    EnumResolution[EnumResolution["RESOLUTION_4K"] = 5] = "RESOLUTION_4K";
})(exports.EnumResolution || (exports.EnumResolution = {}));

const CameraPreview = core.registerPlugin('CameraPreview', {
    web: () => Promise.resolve().then(function () { return web; }).then(m => new m.CameraPreviewWeb()),
});

dynamsoftCameraEnhancer.CameraEnhancer.defaultUIElementURL = "https://cdn.jsdelivr.net/npm/dynamsoft-camera-enhancer@3.1.0/dist/dce.ui.html";
class CameraPreviewWeb extends core.WebPlugin {
    async setDefaultUIElementURL(url) {
        dynamsoftCameraEnhancer.CameraEnhancer.defaultUIElementURL = url;
    }
    async initialize() {
        this.camera = await dynamsoftCameraEnhancer.CameraEnhancer.createInstance();
        this.camera.on("played", (playCallBackInfo) => {
            this.notifyListeners("onPlayed", { resolution: playCallBackInfo.width + "x" + playCallBackInfo.height });
        });
        await this.camera.setUIElement(dynamsoftCameraEnhancer.CameraEnhancer.defaultUIElementURL);
        this.camera.getUIElement().getElementsByClassName("dce-btn-close")[0].remove();
        this.camera.getUIElement().getElementsByClassName("dce-sel-camera")[0].remove();
        this.camera.getUIElement().getElementsByClassName("dce-sel-resolution")[0].remove();
        this.camera.getUIElement().getElementsByClassName("dce-msg-poweredby")[0].remove();
    }
    async getResolution() {
        if (this.camera) {
            let rsl = this.camera.getResolution();
            let resolution = rsl[0] + "x" + rsl[1];
            return { resolution: resolution };
        }
        else {
            throw new Error('DCE not initialized');
        }
    }
    async setResolution(options) {
        if (this.camera) {
            let res = options.resolution;
            let width = 1280;
            let height = 720;
            if (res == exports.EnumResolution.RESOLUTION_480P) {
                width = 640;
                height = 480;
            }
            else if (res == exports.EnumResolution.RESOLUTION_720P) {
                width = 1280;
                height = 720;
            }
            else if (res == exports.EnumResolution.RESOLUTION_1080P) {
                width = 1920;
                height = 1080;
            }
            else if (res == exports.EnumResolution.RESOLUTION_2K) {
                width = 2560;
                height = 1440;
            }
            else if (res == exports.EnumResolution.RESOLUTION_4K) {
                width = 3840;
                height = 2160;
            }
            await this.camera.setResolution(width, height);
            return;
        }
        else {
            throw new Error('DCE not initialized');
        }
    }
    async getAllCameras() {
        if (this.camera) {
            let cameras = await this.camera.getAllCameras();
            let labels = [];
            cameras.forEach(camera => {
                labels.push(camera.label);
            });
            return { cameras: labels };
        }
        else {
            throw new Error('DCE not initialized');
        }
    }
    async getSelectedCamera() {
        if (this.camera) {
            let cameraInfo = this.camera.getSelectedCamera();
            return { selectedCamera: cameraInfo.label };
        }
        else {
            throw new Error('DCE not initialized');
        }
    }
    async selectCamera(options) {
        if (this.camera) {
            let cameras = await this.camera.getAllCameras();
            for (let index = 0; index < cameras.length; index++) {
                const camera = cameras[index];
                if (camera.label === options.cameraID) {
                    await this.camera.selectCamera(camera);
                    return;
                }
            }
        }
        else {
            throw new Error('DCE not initialized');
        }
    }
    async setScanRegion(options) {
        if (this.camera) {
            this.camera.setScanRegion({
                regionLeft: options.region.left,
                regionTop: options.region.top,
                regionRight: options.region.right,
                regionBottom: options.region.bottom,
                regionMeasuredByPercentage: options.region.measuredByPercentage
            });
        }
        else {
            throw new Error('DCE not initialized');
        }
    }
    async setZoom(options) {
        if (this.camera) {
            await this.camera.setZoom(options.factor);
            return;
        }
        else {
            throw new Error('DCE not initialized');
        }
    }
    async setFocus() {
        throw new Error('Method not implemented.');
    }
    async toggleTorch(options) {
        if (this.camera) {
            try {
                if (options["on"]) {
                    await this.camera.turnOnTorch();
                }
                else {
                    await this.camera.turnOffTorch();
                }
            }
            catch (e) {
                throw new Error("Torch unsupported");
            }
        }
    }
    async startCamera() {
        if (this.camera) {
            await this.camera.open(true);
        }
        else {
            throw new Error('DCE not initialized');
        }
    }
    async stopCamera() {
        if (this.camera) {
            this.camera.close(true);
        }
        else {
            throw new Error('DCE not initialized');
        }
    }
    async pauseCamera() {
        if (this.camera) {
            this.camera.pause();
        }
        else {
            throw new Error('DCE not initialized');
        }
    }
    async resumeCamera() {
        if (this.camera) {
            this.camera.resume();
        }
        else {
            throw new Error('DCE not initialized');
        }
    }
    async isOpen() {
        if (this.camera) {
            return { isOpen: this.camera.isOpen() };
        }
        else {
            throw new Error('DCE not initialized');
        }
    }
    async takeSnapshot(options) {
        if (this.camera) {
            let desiredQuality = 85;
            if (options.quality) {
                desiredQuality = options.quality;
            }
            let dataURL = this.camera.getFrame().toCanvas().toDataURL('image/jpeg', desiredQuality);
            let base64 = dataURL.replace("data:image/jpeg;base64,", "");
            return { base64: base64 };
        }
        else {
            throw new Error('DCE not initialized');
        }
    }
    async takeSnapshot2() {
        if (this.camera) {
            let frame = this.camera.getFrame();
            return { frame: frame };
        }
        else {
            throw new Error('DCE not initialized');
        }
    }
    async takePhoto() {
        if (this.camera) {
            let dataURL = this.camera.getFrame().toCanvas().toDataURL();
            return { base64: dataURL };
        }
        else {
            throw new Error('DCE not initialized');
        }
    }
    async requestCameraPermission() {
        const constraints = { video: true, audio: false };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        const tracks = stream.getTracks();
        for (let i = 0; i < tracks.length; i++) {
            const track = tracks[i];
            track.stop(); // stop the opened camera
        }
    }
}

var web = /*#__PURE__*/Object.freeze({
    __proto__: null,
    CameraPreviewWeb: CameraPreviewWeb
});

exports.CameraPreview = CameraPreview;
//# sourceMappingURL=plugin.cjs.js.map
