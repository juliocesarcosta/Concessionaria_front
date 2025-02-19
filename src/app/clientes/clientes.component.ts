import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../models/cliente.model';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  clientes: Cliente[] = [];
  cliente: Cliente = { idCliente: 0, name: '', phone: '', email: '' };
  editMode: boolean = false;

  constructor(private clienteService: ClienteService) {
    this.loadClientes();  // Carregar a lista de clientes ao inicializar o componente
  }

  onSubmit() {
    // Converter o email para minúsculas ao enviar
    this.cliente.email = this.cliente.email.toLowerCase();

    if (this.editMode) {
      // Se estiver em modo de edição, atualiza o cliente
      this.clienteService.updateCliente(this.cliente.idCliente, this.cliente).subscribe(() => {
        this.resetForm();
        this.loadClientes();  // Atualiza a lista de clientes após a edição
      });
    } else {
      // Caso contrário, cria um novo cliente
      this.clienteService.createCliente(this.cliente).subscribe(() => {
        this.resetForm();
        this.loadClientes();  // Atualiza a lista de clientes após a criação
      });
    }
  }

  onDelete(id: number) {
    this.clienteService.deleteCliente(id).subscribe(() => {
      this.loadClientes();  // Atualiza a lista de clientes após a exclusão
    });
  }

  onEdit(cliente: Cliente) {
    this.cliente = { ...cliente };  // Preenche o formulário com os dados do cliente
    this.editMode = true;  // Ativa o modo de edição
  }

  public resetForm() {
    this.cliente = { idCliente: 0, name: '', phone: '', email: '' };  // Limpa o formulário
    this.editMode = false;  // Desativa o modo de edição
    alert(this.resetForm)
  }

  // Função chamada sempre que o email mudar
  onEmailChange() {
    this.cliente.email = this.cliente.email.toLowerCase();  // Garante que o email esteja em minúsculas
  }

  private loadClientes() {
    this.clienteService.getClientes().subscribe(clientes => {
      this.clientes = clientes;  // Atualiza a lista de clientes
    });
  }
  
   // Método para baixar o CSV
   onDownloadCSV(): void {
    this.clienteService.downloadCSV().subscribe({
      next: (response) => {
        // Criando um blob com o conteúdo recebido
        const blob = new Blob([response], { type: 'text/csv' });

        // Criando um link de download temporário
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'clientes.csv'; // Nome do arquivo CSV

        // Simulando o clique para iniciar o download
        link.click();
      },
      error: (error) => {
        console.error('Erro ao baixar o arquivo:', error);
      }
    });
  }
}





