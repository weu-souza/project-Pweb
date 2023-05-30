import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  constructor(private route: Router) {
  }

  ngOnInit(): void {
  }

  comprar() {
    // vou mudar pra buscar pelo id quando for fazer o http
    this.route.navigate(['comprar']);
  }
}
