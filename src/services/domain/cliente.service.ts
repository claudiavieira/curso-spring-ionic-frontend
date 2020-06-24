import { API_CONFIG } from './../../config/api.config';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';
import { ClienteDTO } from '../../models/cliente.dto';
import { StorageService } from '../storage.service';
import { ImageUtilService } from '../image.util.service';

@Injectable()
export class ClienteService{

  constructor(
    public http: HttpClient,
    public storage: StorageService,
    public imageUtilService: ImageUtilService) {

  }

  //recebe email como argumento e retorna Observable de clienteDTO
  findByEmail(email: string) {
    return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
  }

  findById(id: string) {
    return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
  }

  getImageFromBucket(id: string) : Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
    return this.http.get(url, {responseType : 'blob'});
  }

  insert(obj: ClienteDTO){  //metodo insert vai receber um objeto do tipo ClienteDTO
    return this.http.post( //faz um post no endpoint clientes
      `${API_CONFIG.baseUrl}/clientes`,
      obj, //passa o obj e espera uma resposta do tipo texto "responseType: text"
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

  uploadPicture(picture) { //método vai receber a imagem (picture) na forma base 64. O papel dele vai ser chamar o backend o endpoint responsavel por fazer o upload da imagem

    let pictureBlob = this.imageUtilService.dataUriToBlob(picture);//convertendo a imagem que esta 64 pra Blob:
    let formData: FormData = new FormData();
    formData.set('file', pictureBlob, 'file.png');
    return this.http.post( //faz um post no endpoint clientes
      `${API_CONFIG.baseUrl}/clientes/picture`,
      formData, //passa o obj e espera uma resposta do tipo texto "responseType: text"
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

}
