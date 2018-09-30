import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.fragment.html',
  styleUrls: ['./footer.fragment.scss']
})
export class FooterFragment implements OnInit {

  private LOGEVENT: string = "[Foxpict][FooterFragment]";

  constructor() { }

  ngOnInit() {
    console.debug(this.LOGEVENT, "[ngOnInit] IN");
  }

}
