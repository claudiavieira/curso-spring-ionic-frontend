import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';
import { CameraOptions, Camera } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;
  picture: string;
  cameraOn: boolean = false //variavel vai determinar se a camera estará ligada ou nao


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public camera: Camera) {
  }

  ionViewDidLoad() {
   this.loadData();
  }

  loadData() {
     //Código provisório pra mostrar o email da pessoa na página de profile
     let localUser = this.storage.getLocalUser();
     if(localUser && localUser.email) {
       this.clienteService.findByEmail(localUser.email)
         .subscribe(response => {
           this.cliente = response as ClienteDTO;
           this.getImageIfExists(); //buscar imagem
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

  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id)
    .subscribe(response => {
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
    },
    error => {});
  }

  getCameraPicture() {

    this.cameraOn = true; //camera ligada

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn = false; //depois de tirar a foto a camera fica desligada
    }, (err) => {
    });
  }

  sendPicture() {
    this.clienteService.uploadPicture(this.picture)
      .subscribe(response => {
        this.picture = null; //se der tudo certo vou receber uma resposta. Dentro dessa resposta, como enviei minha img para o amazons3 e deu tudo certo, vou vir na imagem e deixar como nulo
        this.loadData();//recarregando os dados da página, força o recarregamento dos dados
      },
      error => {
      });
  }

  cancel() {
    this.picture = null;
  }
}

