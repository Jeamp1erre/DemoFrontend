import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoriaMedicaService } from '../../../shared/services/historiamedica.service';
import { HistoriaMedica } from '../../../shared/models/HistoriaMedica.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddhistoriamedicadialogComponent } from '../openviewpaciente/addhistoriamedicadialog/addhistoriamedicadialog.component';
import { EdithistoriamedicadialogComponent } from '../openviewpaciente/edithistoriamedicadialog/edithistoriamedicadialog.component';
import { ConsultaService } from '../../../shared/services/consulta.service';  // Usamos ConsultaService
import { Consulta } from '../../../shared/models/Consulta.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ConsultasComponent } from './consultas/consultas.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';


@Component({
  selector: 'app-openviewpaciente',
  standalone: true,
  imports: [
    // Componentes y módulos
    CommonModule,
    ConsultasComponent,
    MatButtonModule,
    MatDialogModule,MatTabsModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatTableModule
  ],
  templateUrl: './openviewpaciente.component.html',
  styleUrls: ['./openviewpaciente.component.css']
})
export class OpenviewpacienteComponent implements OnInit {
  historiaMedica: HistoriaMedica | null = null;
  displayedColumns: string[] = ['antecedentesMedicos', 'cirugiasAnteriores', 'alergias', 'antecedentesFamiliares', 'acciones'];
  consultas: Consulta[] = [];
  length: number = 0;
  isLoading: boolean = false;
  pageSize: number = 10;
  pageIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private historiaMedicaService: HistoriaMedicaService,
    private consultaService: ConsultaService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const pacienteId = this.route.snapshot.paramMap.get('id');
    if (pacienteId) {
      this.loadHistoriaMedica(+pacienteId);
      this.loadConsultas(+pacienteId);
    }
  }

  loadConsultas(pacienteId: number): void {
    this.isLoading = true;  // Activamos la carga
    this.consultaService.getConsultasByPaciente(pacienteId).subscribe(
      (data) => {
        this.consultas = data;
        this.length = data.length;
        this.isLoading = false;  // Desactivamos la carga
      },
      (error) => {
        console.error('Error al cargar las consultas:', error);
        this.isLoading = false;  // Desactivamos la carga
      }
    );
  }
  

  private loadHistoriaMedica(pacienteId: number): void {
    this.historiaMedicaService.getHistoriaMedicaByPacienteId(pacienteId).subscribe(
      (data) => {
        this.historiaMedica = data;
      },
      (error) => {
        console.error('Error al cargar la historia médica:', error);
      }
    );
  }

  volver(): void {
    this.router.navigate(['dashbadmin/pacientes']);
  }

  openAddHistoriaMedicaDialog(): void {
    const pacienteId = +this.route.snapshot.paramMap.get('id')!;
    const dialogRef = this.dialog.open(AddhistoriamedicadialogComponent);

    dialogRef.componentInstance.newHistoriaMedica = { pacienteId: pacienteId } as HistoriaMedica;

    dialogRef.afterClosed().subscribe((result: HistoriaMedica | undefined) => {
      if (result) {
        this.historiaMedicaService.saveHistoriaMedica(result).subscribe(() => {
          this.loadHistoriaMedica(pacienteId);
        });
      }
    });
  }

  openEditHistoriaMedica(item: HistoriaMedica): void {
    const dialogRef = this.dialog.open(EdithistoriamedicadialogComponent, {
      data: item
    });

    dialogRef.afterClosed().subscribe((result: HistoriaMedica | undefined) => {
      if (result) {
        this.historiaMedicaService.updateHistoriaMedica(result.id, result).subscribe(() => {
          const id = this.route.snapshot.paramMap.get('id');
          if (id) {
            this.loadHistoriaMedica(+id);
          }
        });
      }
    });
  }

  deleteHistoriaMedica(item: HistoriaMedica): void {
    if (confirm(`¿Estás seguro de que deseas eliminar esta historia médica?`)) {
      this.historiaMedicaService.deleteHistoriaMedica(item.id).subscribe(() => {
        this.historiaMedica = null;
      });
    }
  }

  // Método para manejar la paginación en el componente hijo
  onPaginateChange(event: any): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.consultas = this.consultas.slice(startIndex, endIndex);
  }
  

  // Método para manejar los cambios de búsqueda
  onSearchChange(searchTerm: string): void {
    this.consultas = this.consultas.filter(consulta => 
      consulta.motivoConsulta.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  

  onEditConsulta(consulta: Consulta): void {
    // Puedes implementar la lógica de edición de consultas si lo necesitas
  }

  onDeleteConsulta(consulta: Consulta): void {
    // Implementa la lógica para eliminar las consultas si lo necesitas
  }

 
}
