import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Importando o módulo de teste do HttpClient
import { ClientesComponent } from './clientes.component';
import { ClienteService } from '../services/cliente.service'; // Serviço que será mockado

describe('ClientesComponent', () => {
  let component: ClientesComponent;
  let fixture: ComponentFixture<ClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesComponent, HttpClientTestingModule],  // Adicionando o HttpClientTestingModule
      providers: [{ provide: ClienteService, useValue: jasmine.createSpyObj('ClienteService', ['getClientes', 'createCliente', 'updateCliente', 'deleteCliente', 'downloadCSV']) }] // Mock do ClienteService
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar o método onEdit ao clicar no botão de editar', () => {
    const cliente = { idCliente: 1, name: 'João', phone: '123456789', email: 'joao@example.com' };
    component.clientes = [cliente];
    fixture.detectChanges();

    spyOn(component, 'onEdit');

    const editButton = fixture.debugElement.nativeElement.querySelectorAll('button')[0]; // Seleciona o primeiro botão, "Editar"
    editButton.click();

    expect(component.onEdit).toHaveBeenCalledWith(cliente);
  });

  it('deve chamar o método onDelete ao clicar no botão de excluir', () => {
    const cliente = { idCliente: 1, name: 'João', phone: '123456789', email: 'joao@example.com' };
    component.clientes = [cliente];
    fixture.detectChanges();

    spyOn(component, 'onDelete');

    const deleteButton = fixture.debugElement.nativeElement.querySelectorAll('button')[1]; // Seleciona o segundo botão, "Excluir"
    deleteButton.click();

    expect(component.onDelete).toHaveBeenCalledWith(cliente.idCliente);
  });
});


