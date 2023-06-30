import {Component, OnInit} from '@angular/core';
import {Ingrediente, Produto} from '../../models/produto';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../service/service_login/auth.service';
import {ProdutoService} from '../../service/service_produto/produto.service';
import {CarrinhoService} from '../../service/service_carrinho/carrinho.service';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-produtoss',
  templateUrl: './produtoss.component.html',
  styleUrls: ['./produtoss.component.scss']
})
export class ProdutossComponent implements OnInit {
  eAdm = this.authService.eadm();
  produtos: Ingrediente;
  produtos$: Observable<Ingrediente[]>;
  produto: Produto = {
    name: '',
    id: undefined,
    imageName: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private produtoService: ProdutoService,
    private carrinhoS: CarrinhoService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.produto.name = this.route.snapshot.paramMap.get('name');
    console.log(this.produtos$);
  }

  getIngredientes(name: string) {
    this.produtos$ =
      this.produtoService.getIngredientesByCategory(this.produto.name);
  }

  comprar() {
    this.carrinhoS.adicionarAoCarrinho(this.produtos).subscribe(res => {
      console.log(res);
      // this.route.navigate(['carrinho']);
      alert('enviado com sucesso!');
    });
  }

  remover(id: number) {
    this.router.navigateByUrl(`/delete-ingrediente/${id}`);

  }

  atualizar(id: number) {
    this.router.navigateByUrl(`/delete-ingrediente/${id}`);
  }
}
