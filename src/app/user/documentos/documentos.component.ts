import { Component, OnInit } from '@angular/core';
import { MilanDocumentosService } from 'src/app/_services/milan-documentos.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Documentos } from 'src/app/_models/Documentos';
declare var require: any;


@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit {

  documentos: Documentos;

  constructor(private authService: MilanDocumentosService,
    public router: Router
    , private toastr: ToastrService) { }

  ngOnInit() {
    const Uppy = require('@uppy/core');
    const Dashboard = require('@uppy/dashboard');
    const Webcam = require('@uppy/webcam');
    const Tus = require('@uppy/tus');
    const brazil = require('@uppy/locales/lib/pt_BR');

    const uppy = Uppy({
      debug: true,
      autoProceed: false,
      locale: brazil,
      restrictions: {
        maxFileSize: 2000000,
        maxNumberOfFiles: 3,
        minNumberOfFiles: 2,
        allowedFileTypes: ['image/*']
      }
    })
      .use(Dashboard, {
        trigger: '.UppyModalOpenerBtn',
        inline: true,
        target: '.DashboardContainer',
        replaceTargetContent: true,
        showProgressDetails: true,
        note: 'Inserir uma foto do documento RG ou CNH  -  Aberto (Frente e Verso)',
        height: 450,
        metaFields: [
          { id: 'name', name: 'Name', placeholder: 'file name' },
          { id: 'caption', name: 'Caption', placeholder: 'describe what the image is about' }
        ],
        browserBackButtonClose: true
      })
      .use(Webcam, { target: Dashboard })
      .use(Tus, { endpoint: 'https://master.tus.io/files/' });

    uppy.on('complete', result => {
      if (result.successful !== []) {
        this.documentos.extension = result.successful[0].extension;
        // this.documentos.name = result.successful[0].name;
        this.authService.documentos(this.documentos).subscribe(
          () => {
            this.router.navigate(['/Login']);
            this.toastr.error('Cadastro Finalizado com sucesso!');
          }, error => {
            this.toastr.error('Erro ao enviar os documentos!');
          });
      }
      console.log('successful files:', result.successful);
      console.log('failed files:', result.failed);
    });
  }

}
