import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-Documents',
  templateUrl: './Documents.component.html',
  styleUrls: ['./Documents.component.css']
})
export class DocumentsComponent implements OnInit {

  documents: any = [
  {
    DocumentId: 1,
    CPF:420007481855
  }
  ];


  constructor(
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

}
