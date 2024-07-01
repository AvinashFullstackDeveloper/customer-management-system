import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  @Input() customer:Customer;
  @Output() onRemoveCustomer = new EventEmitter<number>();
  @Output() onEditCustomer = new EventEmitter<number>();


  constructor() { 
    this.customer = {
      title: '',
      firstname: '',
      lastname: '',
      email: '',
      contactnumber: '',
      companyname: '',
      street: '',
      pincode: '',
      city: '',
      country: '',
    }
  }

  ngOnInit(): void {
    console.log(this.customer);
  }

  deleteCustomerClicked(){
    this.onRemoveCustomer.emit(this.customer.id);
  }

  editCustomerClicked(){
    this.onEditCustomer.emit(this.customer.id);
  }
}
