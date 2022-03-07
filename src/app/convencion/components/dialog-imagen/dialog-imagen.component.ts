import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-imagen',
  templateUrl: './dialog-imagen.component.html',
  styleUrls: ['./dialog-imagen.component.css']
})
export class DialogImagenComponent implements OnInit {

  constructor(public dialogo: MatDialogRef<DialogImagenComponent>, @Inject(MAT_DIALOG_DATA) public mensaje: string) { }
  cerrarDialogo(): void {
    this.dialogo.close(false);
  }
  confirmado(): void {
    this.dialogo.close(true);
  }

  ngOnInit(): void {
  }

}
