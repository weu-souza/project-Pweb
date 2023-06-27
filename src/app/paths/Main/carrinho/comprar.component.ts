import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Ingrediente} from '../../models/produto';
import {CarrinhoService} from '../../service/service_carrinho/carrinho.service';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.scss']
})
export class ComprarComponent implements OnInit {
  produto: Ingrediente;
  produtos$: Observable<Ingrediente[]>;
  total = 0;

  constructor(private route: Router, private carrinhoService: CarrinhoService) {
  }

  ngOnInit(): void {
    this.getCarrinho();
  }

  getCarrinho() {
    console.log(this.produtos$);
    this.produtos$ = this.carrinhoService.obtemCarrinho()
      .pipe(
        catchError(error => {
          return throwError(error.message);
        })
      );
  }

  // calculaTotal() {
  //   this.total = this.itensCarrinho.reduce((prev, curr) => prev + (curr.price * this.itensCarrinho.length), 0);
  // }

  removeProdutoCarrinho(id: number) {
    this.carrinhoService.removerCarrinho(id);
    // this.calculaTotal();
  }

  comprar() {
    alert('parabéns, você finalizou a sua compra!');
    this.carrinhoService.limparCarrinho();
    this.route.navigate(['/']);
  }

}
