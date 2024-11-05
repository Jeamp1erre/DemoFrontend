import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConsultaService } from '../../../../shared/services/consulta.service';  // Asegúrate de que la ruta sea correcta
import { Consulta } from '../../../../shared/models/Consulta.model';
import { EditconsultadialogComponent } from '../consultas/editconsultadialog/editconsultadialog.component';
import { OpenaddconsultadialogComponent } from './openaddconsultadialog/openaddconsultadialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-consultas',
  standalone: true,
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css'],
  imports: [
    CommonModule, 
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class ConsultasComponent implements OnInit {
  @Input() consultas: Consulta[] = [];
  @Input() length: number = 0;
  @Input() isLoading: boolean = false;
  @Input() pageSize: number = 10;
  @Input() pageIndex: number = 0;

  @Output() paginateChange = new EventEmitter<any>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() editConsulta = new EventEmitter<Consulta>();
  @Output() deleteConsulta = new EventEmitter<Consulta>();

  filteredConsultas: Consulta[] = [];

  constructor(
    private consultaService: ConsultaService, // Inyectamos el servicio
    private dialog: MatDialog // Inyectamos el servicio MatDialog
  ) {}

  ngOnInit(): void {
    this.filteredConsultas = this.consultas; // Inicia el filtrado con todas las consultas
  }

  onSearchChange(event: any): void {
    const searchTerm = event.target.value;
    this.searchChange.emit(searchTerm);
  }

  onPaginateChange(event: any): void {
    this.paginateChange.emit(event);
  }

  onEditConsulta(consulta: Consulta): void {
    this.editConsulta.emit(consulta);
  }

  onDeleteConsulta(consulta: Consulta): void {
    this.deleteConsulta.emit(consulta);
  }

  openAddConsultaDialog(): void {
  }


}
