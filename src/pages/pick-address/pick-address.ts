import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];

  pedido: PedidoDTO; //pedido que vai trafegar nas páginas de fechamento de pedido e ao longo de cada passo vou preenchendo os dados dele

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    //Código provisório pra mostrar o email da pessoa na página de profile
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['enderecos'];

          let cart = this.cartService.getCart();

          this.pedido = {
            cliente: {id: response['id']},
            enderecoDeEntrega: null,
            pagamento: null,
            itens: cart.items.map(x => {return {quantidade: x.quantidade, produto: {id: x.produto.id}}}) //map vai percorrer toda a lista, fazendo alguma coisa com cada elemento x dessa lista e agor eu posso definir dentro das chaves, o que vou fazer com cada elemento dessa lista original para transformar esses elementos em outros elementos que vao compor a minha lista de destino (que é a lista de itens de pedido)
          }
        },
        error => {
          if(error.status == 403) {
            this.navCtrl.setRoot('HomePage');
          }
        });
    }
    else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  nextPage(item: EnderecoDTO) {
    this.pedido.enderecoDeEntrega = {id: item.id};
    console.log(this.pedido);
  }

}
