import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = 'http://localhost:8080/api/clientes'; // URL do seu backend

  constructor(private http: HttpClient) {}

  // Método para obter todos os clientes
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  // Método para criar um novo cliente
createCliente(cliente: Cliente): Observable<Cliente> {
  // Remover o idCliente antes de enviar a requisição, já que o banco gera esse valor automaticamente
  const { idCliente, ...clienteWithoutId } = cliente;
  return this.http.post<Cliente>(this.apiUrl, clienteWithoutId);  // Enviar sem o idCliente
}


  // Método para atualizar um cliente existente
  updateCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${id}`, cliente);
  }

  // Método para excluir um cliente
  deleteCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

   // Método para baixar o CSV
   downloadCSV(): Observable<string> {
    return this.http.get('http://localhost:8080/api/clientes/csv', {
      responseType: 'text' // Isso permite que o arquivo seja tratado como um blob binário
    });
}

}
