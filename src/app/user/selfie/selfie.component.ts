import { Component, OnInit } from '@angular/core';
import { MilanDocumentosService } from 'src/app/_services/milan-documentos.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

declare var require: any;

@Component({
  selector: 'app-selfie',
  templateUrl: './selfie.component.html',
  styleUrls: ['./selfie.component.css']
})
export class SelfieComponent implements OnInit {

 // documentos: Array<Documentos>;
  // documentos = new Documentos();
  email: any;

  constructor(private authService: MilanDocumentosService,
    public router: Router
    , private toastr: ToastrService) { }

  ngOnInit() {
    const Uppy = require('@uppy/core');
    const Dashboard = require('@uppy/dashboard');
    const Webcam = require('@uppy/webcam');
    const XHRUpload = require('@uppy/xhr-upload');
    const brazil = require('@uppy/locales/lib/pt_BR');
    this.email = sessionStorage.getItem('Email');

    const uppy = Uppy({
      debug: true,
      autoProceed: false,
      locale: brazil,
      restrictions: {
        maxFileSize: 2000000,
        maxNumberOfFiles: 1,
        minNumberOfFiles: 1,
        allowedFileTypes: ['image/*']
      }
    })
      .use(Dashboard, {
        trigger: '.UppyModalOpenerBtn',
        inline: true,
        target: '.DashboardContainer',
        replaceTargetContent: true,
        showProgressDetails: true,
        note: 'Tirar uma selfie com o documento cadastro na mão',
        height: 500,
        metaFields: [
          { id: 'name', name: 'Name', placeholder: 'file name' },
          { id: 'caption', name: 'Caption', placeholder: 'describe what the image is about' }
        ],
        browserBackButtonClose: true
      })
      .use(Webcam, { target: Dashboard })
      .use(XHRUpload, {
        method: 'post',
        endpoint: 'https://localhost:44378/Upload',
        formData: true,
        fieldName: 'files',
      });

    uppy.on('file-added', (file) => {
      uppy.setFileMeta(file.id, {
        email: this.email
      });
    });

    uppy.on('complete', result => {
      if (result.successful !== []) {
        this.router.navigate(['user/login']);
        this.toastr.success('Cadastro Finalizado com sucesso!');
        sessionStorage.clear();
      } else {
        this.toastr.error('Erro ao enviar a foto com o documento!');
      }
      console.log('successful files:', result.successful);
      console.log('failed files:', result.failed);
    });
  }

}
