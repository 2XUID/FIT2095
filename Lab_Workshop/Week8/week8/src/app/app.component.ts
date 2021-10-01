import {
  Component
} from '@angular/core';
import {
  v4 as uuidv4
} from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  firstName: string = '';
  lastName: string = '';
  dateOfBirth: Date | null = null;
  suburb: string = '';
  state: string = '';
  postCode: number | null = null;
  numOfPatients: number | null = null;
  numDocNoPatient: number = 0;
  docDb: any[] = [];
  saveDoc(): void {
    this.docDb.push({
      id: uuidv4(),
      firstName: this.formatString(this.firstName),
      lastName: this.formatString(this.lastName),
      dateOfBirth: this.dateOfBirth,
      numOfPatients: this.numOfPatients,
      address: this.formatString(this.suburb) + ', ' + this.state + ', ' + this.postCode,
    });
    if (this.numOfPatients === 0) {
      this.numDocNoPatient += 1;
    }
  }
  deleteDocById(id: string): void {
    this.docDb = this.docDb.filter((doctor) => doctor.id !== id);
  }
  deleteDocByPatient(): void {
    this.docDb = this.docDb.filter(
      (doctor) => doctor.numOfPatients !== 0
    );
    this.numDocNoPatient = 0;
  }
  addPatients(id: string): void {
    let val = 0
    for (let i = 0; i < this.docDb.length; i++) {
      if (this.docDb[i].id === id) {
        this.docDb[i].numOfPatients += 1;
      }
      if (this.docDb[i].numOfPatients === 0) {
        val++
      }
      this.numDocNoPatient = val;
    }
  }
  formatString(str: string): string {
    const lowerCase = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lowerCase.slice(1);
  }
}
