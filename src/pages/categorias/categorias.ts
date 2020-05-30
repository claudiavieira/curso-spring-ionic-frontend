import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoriaService: CategoriaService) {
  }

  ionViewDidLoad() { //Quando a página terminar de ser carregada, vai executar o que estiver aqui dentro do ionViewDidLoad
    //console.log('ionViewDidLoad CategoriasPage');
    this.categoriaService.findAll()
      .subscribe(response => { //executa quando a resposta da requisição for de sucesso
        console.log(response);
      },
      error => {  //se der erro
        console.log(error);
      });
  }

}
