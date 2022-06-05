import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class SweetAlert2Service {

  public clientName: string = 'School App'

  constructor() {}

  showAlertWarning(text:string) {
    Swal.fire({
      title: this.clientName,
      text: text,
      position: 'center',
      icon: 'warning',
      showConfirmButton: true,
      timer: 2100
    });
  }

  showAlertSuccess(text:string) {
    Swal.fire({
      title: this.clientName,
      text: text,
      position: 'center',
      icon: 'success',
      showConfirmButton: true,
      timer: 1500
    });
  }

  showSmallAlertSuccess(text: string){
    Swal.mixin({
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      timer: 1800,
      timerProgressBar: true,
    }).fire({
      icon: 'success',
      title: this.clientName,
      text: text
    });
  }

  showAlertError(text: string) {
    Swal.fire({
      title: this.clientName,
      text: text,
      position: 'center',
      icon: 'error'
    });
  }

  showAlertErrorServer() {
    Swal.fire({
      title: this.clientName,
      text: 'Error de servidor',
      position: 'center',
      icon: 'error'
    });
  }

  async dialogConfirmElimination({ title = "¡Confirmación de eliminación! ", text = "¿Eliminar Registro?" } = {}) {
    const result = await Swal.fire({
      title,
      text,
      icon: 'warning',
      showCloseButton: true,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar',
    });

    return result.isConfirmed;
  }

  async dialogConfirmAction({ title = "¡Confirmación! ", text = "¿Esta seguro que desea realizar esta acción?" } = {}) {
    const result = await Swal.fire({
      title,
      text,
      icon: 'question',
      showCloseButton: true,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar',
    });

    return result.isConfirmed;
  }
}
