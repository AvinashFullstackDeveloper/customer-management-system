import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl = 'https://stg-testdouble.quinnox.info/37b3aeab-77a2-4847-aaa7-61b5ea92687b-employee-data';

  constructor(private http:HttpClient) { }

  getCustomers() {
    return this.http.get<Customer[]>(this.baseUrl);
  }

  postCustomers(customer: Customer) {
    return this.http.post<Customer>(this.baseUrl,customer);
  }

  deleteCustomers(id: string) {
    return this.http.delete(this.baseUrl + '/' + id);
  }


}
