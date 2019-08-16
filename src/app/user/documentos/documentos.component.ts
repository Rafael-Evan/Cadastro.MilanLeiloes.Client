import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map, tap, takeUntil, filter } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { contains } from 'ramda';
import { UppyService } from 'src/app/uppy/uppy.service';


@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnDestroy, AfterViewInit {

  uppyEvent = new Subject<[string, any, any, any]>();

  onDestroy$ = new Subject<void>();

  constructor(private toastr: ToastrService, private uppyService: UppyService) {
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngAfterViewInit() {
    const uppy = this.uppyService.uppy;
    const instance3 = uppy.Core({ autoProceed: false })
      .use(uppy.Dashboard, {
        target: '.instance3',
        replaceTargetContent: true,
        inline: true,
      })
      // .use(uppy.Tus, { endpoint: 'https://master.tus.io/files/' })
      .use(uppy.Webcam, { target: uppy.Dashboard })
      .run();

    instance3.on("complete", (data) => this.toastr.success("Received 'complete' event from instance 3", 'Upload complete'));
  }

}
