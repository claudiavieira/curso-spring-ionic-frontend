import { StorageService } from '../storage.service';
import { Injectable } from '@angular/core';
import { Cart } from '../../models/cart';
import { ProdutoDTO } from '../../models/produto.dto';

@Injectable()
export class CartService {

  constructor(public storage: StorageService){
  }

  createOrClearCart() : Cart { //metodo retorna um Cart
    let cart: Cart = {items: []}; //criando um carrinho vazio
    this.storage.setCart(cart); //armazenando no localstorage
    return cart; //retorna no metodo
  }

  getCart() : Cart { //metodo para obter o carrinho
    let cart: Cart = this.storage.getCart();
    if(cart == null) {  //se for nulo ele nao existia
      cart = this.createOrClearCart();  //se nao existia, cria um cart
    }
    return cart;
  }

  addProduto(produto: ProdutoDTO) : Cart { //addProduto vai receber um produto do tipo ProdutoDTO e o método vai retornar o cart atualizado
    let cart = this.getCart();  //pega o carrinho

    //busca no carrinho se o produto ja existe
    //vai encontrar a posição, recebendo "cart.itens.findIndex" que é a função do js para encontrar a posição de um elemento
    //o findIndex vai receber um predicado como um argumento => eu quero encontrar nessa lista de itens, um produto que tenha o mesmo codigo do produto que estou procurando
    //eu quero encontrar um elemento x tal que (=>)o x.produto.id seja igual ao id desse produto que veio como argumento
    let position = cart.items.findIndex(x => x.produto.id == produto.id);
    ////////
    if(position == -1) { //se o produto nao existir na lista, vai ser retornado por padrão o valor -1 (assim funciona a função findIndex)
      cart.items.push({quantidade: 1, produto: produto}) //push é o metodo que insere um elemento na lista (será inserido um novo item de carrinho)
    }
    this.storage.setCart(cart); //atualiza o produto no localStorage
    return cart; //retorna o objeto cart atualizado
  }

  removeProduto(produto: ProdutoDTO) : Cart { //removeProduto vai receber um produto do tipo ProdutoDTO e o método vai retornar o cart atualizado
    let cart = this.getCart();  //pega o carrinho

    //busca no carrinho se o produto ja existe
    //vai encontrar a posição, recebendo "cart.itens.findIndex" que é a função do js para encontrar a posição de um elemento
    //o findIndex vai receber um predicado como um argumento => eu quero encontrar nessa lista de itens, um produto que tenha o mesmo codigo do produto que estou procurando
    //eu quero encontrar um elemento x tal que (=>)o x.produto.id seja igual ao id desse produto que veio como argumento
    let position = cart.items.findIndex(x => x.produto.id == produto.id);
    ////////
    if(position != -1) { //se o produto existir na lista, vai ser diferente de -1
      cart.items.splice(position, 1); //splice é o metodo que remove um elemento da lista
    }
    this.storage.setCart(cart); //atualiza o produto no localStorage
    return cart; //retorna o objeto cart atualizado
  }

  increaseQuantity(produto: ProdutoDTO) : Cart { //incrementa a quantidade
    let cart = this.getCart();  //pega o carrinho

    let position = cart.items.findIndex(x => x.produto.id == produto.id);
    ////////
    if(position != -1) { //se encontrar esse produto no carrinho
      cart.items[position].quantidade ++; //vou acessar a coleção de itens na posição "position" e vou incrementar a quantidade
    }
    this.storage.setCart(cart); //atualiza o produto no localStorage
    return cart; //retorna o objeto cart atualizado
  }

  decreaseQuantity(produto: ProdutoDTO) : Cart { //decrementa a quantidade
    let cart = this.getCart();  //pega o carrinho

    let position = cart.items.findIndex(x => x.produto.id == produto.id);
    ////////
    if(position != -1) { //se encontrar esse produto no carrinho
      cart.items[position].quantidade --; //vou acessar a coleção de itens na posição "position" e vou decrementar a quantidade
      if(cart.items[position].quantidade < 1) { //se for menor do que 1 o item será excluido do carrinho
        cart = this.removeProduto(produto);
      }
    }
    this.storage.setCart(cart); //atualiza o produto no localStorage
    return cart; //retorna o objeto cart atualizado
  }

  total() : number {
    let cart = this.getCart();
    let sum = 0;
    for (var i=0; i<cart.items.length; i++) {
      sum += cart.items[i].produto.preco * cart.items[i].quantidade;
    }
    return sum;
  }
}
