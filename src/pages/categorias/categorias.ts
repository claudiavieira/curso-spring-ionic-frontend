import { API_CONFIG } from './../../config/api.config';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';

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

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: CategoriaDTO[];

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
        this.items = response;
      },
      error => {  //se der erro
        console.log(error);
      });
  }

}
