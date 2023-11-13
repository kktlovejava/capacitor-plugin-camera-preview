import { WebPlugin } from '@capacitor/core';
import { DCEFrame } from 'dynamsoft-camera-enhancer';
import { CameraPreviewPlugin, ScanRegion } from './definitions';
export declare class CameraPreviewWeb extends WebPlugin implements CameraPreviewPlugin {
    private camera;
    setDefaultUIElementURL(url: string): Promise<void>;
    initialize(): Promise<void>;
    getResolution(): Promise<{
        resolution: string;
    }>;
    setResolution(options: {
        resolution: number;
    }): Promise<void>;
    getAllCameras(): Promise<{
        cameras: string[];
    }>;
    getSelectedCamera(): Promise<{
        selectedCamera: string;
    }>;
    selectCamera(options: {
        cameraID: string;
    }): Promise<void>;
    setScanRegion(options: {
        region: ScanRegion;
    }): Promise<void>;
    setZoom(options: {
        factor: number;
    }): Promise<void>;
    setFocus(): Promise<void>;
    toggleTorch(options: {
        on: boolean;
    }): Promise<void>;
    startCamera(): Promise<void>;
    stopCamera(): Promise<void>;
    pauseCamera(): Promise<void>;
    resumeCamera(): Promise<void>;
    isOpen(): Promise<{
        isOpen: boolean;
    }>;
    takeSnapshot(options: {
        quality?: number;
    }): Promise<{
        base64: string;
    }>;
    takeSnapshot2(): Promise<{
        frame: DCEFrame;
    }>;
    takePhoto(): Promise<{
        base64: string;
    }>;
    requestCameraPermission(): Promise<void>;
}
