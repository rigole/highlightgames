import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements  OnInit, OnDestroy {
  
  constructor(private modal: ModalService){}
  
  ngOnDestroy(): void {
    this.modal.register('editClip')
  }
  
  ngOnInit(): void {
    this.modal.register('editClip')
  }

}
