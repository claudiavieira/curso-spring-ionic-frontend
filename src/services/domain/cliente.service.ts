import { API_CONFIG } from './../../config/api.config';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';
import { ClienteDTO } from '../../models/cliente.dto';
import { StorageService } from '../storage.service';

@Injectable()
export class ClienteService{

  constructor(public http: HttpClient, public storage: StorageService) {

  }

  //recebe email como argumento e retorna Observable de clienteDTO
  findByEmail(email: string) {
    return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
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

}
