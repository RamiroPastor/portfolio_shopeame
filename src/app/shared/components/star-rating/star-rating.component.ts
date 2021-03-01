import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {

  stars: string;
  
  constructor() { }

  ngOnInit(): void {
  }

  @Input() rating: number;

  ngOnChanges() {
    this.stars = "";
    this.ratingToStars()
  }

  public ratingToStars() {
    let x = this.rating;
    if (x > 5) {x = 5}
    if (x < 0) {x = 0}
    this.stars += "<i class='fas fa-star'></i>".repeat(Math.floor(x));
    if (x % 1 != 0) {this.stars += "<i class='fas fa-star-half-alt'></i>"};
    this.stars += "<i class='far fa-star'></i>".repeat(Math.floor(5 - x));
  }
}
