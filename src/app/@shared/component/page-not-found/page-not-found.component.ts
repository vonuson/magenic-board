import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mb-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.less']
})
export class PageNotFoundComponent implements OnInit {
  public errorTitle = "Error 404: Page not found.";
  public errorMessage = '';

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.router.url) {
      this.errorMessage = 'The requested URL ' + this.router.url + ' was not found on this server.';
      if (this.router.url.includes('/board/notFound')) { 
        const id = this.route.snapshot.paramMap.get('id');
        this.errorMessage = 'The requested board id ' + id + ' was not found on this server.';
      }
    }
  }

}
