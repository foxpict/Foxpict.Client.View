import { Component, OnInit } from '@angular/core';
import { ViewModelService } from 'src/app/@core/service/view-model.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  constructor(
    private viewmodel: ViewModelService
  ) { }

  ngOnInit() {
  }

}
