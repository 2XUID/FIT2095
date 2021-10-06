import { Component, OnInit } from '@angular/core';
import {DatabaseService} from "src/app/database.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-invalid',
  templateUrl: './invalid.component.html',
  styleUrls: ['./invalid.component.css']
})
export class InvalidComponent implements OnInit {

  constructor(private dbService: DatabaseService, private router: Router) {}

  ngOnInit(): void {
  }

}
