import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-movie',
  templateUrl: './view-movie.component.html',
  styleUrls: ['./view-movie.component.scss'],
})
export class ViewMovieComponent implements OnInit {
  filmid:any;
  constructor(private router:Router,
    private route:ActivatedRoute  ) { }

  ngOnInit() {
    this.filmid = this.route.snapshot.paramMap.get('id'); 
  }
  onClickRouter(urlrouter){
    this.router.navigate(urlrouter);
  }
}
