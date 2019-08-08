import { Component, OnInit } from '@angular/core';
import { IUppy, UppyFile } from 'uppy-store-ngrx';
import * as Uppy from '@uppy/core';
import * as RestoreFiles from '@uppy/golden-retriever';
import * as Dashboard from '@uppy/dashboard';
import * as GoogleDrive from '@uppy/google-drive';
import * as Dropbox from '@uppy/dropbox';
import * as Instagram from '@uppy/instagram';
import * as Webcam from '@uppy/webcam';
import * as Tus from '@uppy/tus';


@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit {
  private uppy: IUppy<any, UppyFile<any>>;

  constructor() { }

  ngOnInit() {
    // this.uppy = new Uppy
    // ({})
    //   .use(Dashboard, {
    //     trigger: '.UppyModalOpenerBtn',
    //     inline: true,
    //     target: '.DashboardContainer',
    //     replaceTargetContent: true,
    //     note: 'Images and video only, 2–3 files, up to 1 MB',
    //     maxHeight: 450,
    //     metaFields: [
    //       { id: 'license', name: 'License', placeholder: 'specify license' },
    //       {
    //         id: 'caption',
    //         name: 'Caption',
    //         placeholder: 'describe what the image is about'
    //       }
    //     ]
    //   })
    //   .use(GoogleDrive, { target: Dashboard, host: 'https://server.uppy.io' })
    //   .use(Dropbox, { target: Dashboard, host: 'https://server.uppy.io' })
    //   .use(Instagram, { target: Dashboard, host: 'https://server.uppy.io' })
    //   .use(Webcam, { target: Dashboard })
    //   .use(Tus, { endpoint: 'http://217.64.47.142/files/', resume: true })
    //   .use(RestoreFiles, {
    //     serviceWorker: true,
    //     indexedDB: {
    //       maxFileSize: 2 * 1024 * 1024 * 1024, // 2GB => Each file
    //       maxTotalSize: 1024 * 1024 * 1024 * 1024 // 1 TB
    //     }
    //   })
    //   .run();

    // this.uppy.on('complete', result => {
    //   console.log('successful files:', result.successful);
    //   console.log('failed files:', result.failed);
    // });

    // const isServiceWorkerControllerReady = new Promise(function (resolve) {
    //   if (navigator.serviceWorker.controller) {
    //     return resolve();
    //   }
    //   navigator.serviceWorker.addEventListener('controllerchange', function (e) {
    //     return resolve();
    //   });
    // });

    // if ('serviceWorker' in navigator) {
    //   navigator.serviceWorker
    //     .register('/sw.bundle.js')
    //     .then(function (registration) {
    //       return isServiceWorkerControllerReady;
    //     })
    //     .then(function () {
    //       // uppy.emit('core:file-sw-ready');
    //     }).catch(function (error) {
    //       console.log('Registration failed with ' + error);
    //     });
    // }
  }
}
