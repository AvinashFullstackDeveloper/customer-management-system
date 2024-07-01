import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Customer } from './models/customer.model';
import { CustomerService } from './Services/customer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @ViewChild('addCustomerButton') addCustomerButton: any;
  title = 'customer-management-system';
  customers!: Customer[];
  customersToDisplay!: Customer[];
  customerForm: FormGroup;

  constructor(private fb:FormBuilder, private customerService: CustomerService){
    this.customerForm = fb.group({});
    this.customers = [];
    this.customersToDisplay = this.customers;
  }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      title: this.fb.control('default'),
      firstname: this.fb.control(''),
      lastname: this.fb.control(''),
      email: this.fb.control(''),
      contactnumber: this.fb.control(''),
      companyname: this.fb.control(''),
      street: this.fb.control(''),
      pincode: this.fb.control(''),
      city: this.fb.control('default'),
      country: this.fb.control('default'),
    })
    
    this.customerService.getCustomers().subscribe(res => {
      for(let cust of res) {
        this.customers.unshift(cust);
      }
      this.customersToDisplay = this.customers;
    } )
  }
  salutations = [
    'Mr',
    'Lord',
    'Prof',
    'Dr',
    'Madam'
  ];
  cityOptions = [
    'Baltimore',
    'Telford',
    'Auckland',
    'Portsmouth',
    'Plymouth',
    'Toledo',
    'Bradford',
    'Adelaide',
    'Oakland',
    'Wilmington'
  ];
  countryOptions = [
    'Falkland Islands (Malvinas)',
    'Somalia',
    'Andorra',
    'Bahamas',
    'Guyana',
    'American Samoa',
    'Macao',
    'Ethiopia',
    'Sri Lanka',
    'Senegal'
  ];

  addCustomer() {
    let customer: Customer = {
      title: this.salutations[parseInt(this.Title.value)],
      firstname: this.FirstName.value,
      lastname: this.LastName.value,
      email: this.Email.value,
      contactnumber: this.ContactNumber.value,
      companyname: this.CompanyName.value,
      street: this.Street.value,
      pincode: this.Pincode.value,
      city: this.cityOptions[parseInt(this.City.value)],
      country: this.countryOptions[parseInt(this.Country.value)]
    }

    this.customerService.postCustomers(customer).subscribe((res) => {
      this.customers.unshift(res);
      this.clearForm();
    })
  }

  clearForm() {
    this.Title.setValue('');
    this.FirstName.setValue('');
    this.LastName.setValue('');
    this.Email.setValue('');
    this.ContactNumber.setValue('');
    this.CompanyName.setValue('');
    this.Street.setValue('');
    this.Pincode.setValue('');
    this.City.setValue('');
    this.Country.setValue('');
  }

  removeCustomer(event:any) {
    this.customers.forEach((val,index) => {
      if(val.id === parseInt(event)){
        this.customerService.deleteCustomers(event).subscribe((res) => {
          this.customers.splice(index,1);
        })
      }
    });
  }

  editCustomer(event:any) {
    this.customers.forEach((val, ind) => {
      if(val.id === event) {
        this.setForm(val);
      }
    });
    this.removeCustomer(event);
    this.addCustomerButton.nativeElement.click();
  }

  setForm(cust:Customer){
    
    let titleIndex = 0;
    this.salutations.forEach((val,index) => {
      if(val === cust.title) titleIndex = index;
    })
    this.Title.setValue(titleIndex);

    this.FirstName.setValue(cust.firstname);
    this.LastName.setValue(cust.lastname);
    this.Email.setValue(cust.email);
    this.ContactNumber.setValue(cust.contactnumber);
    this.CompanyName.setValue(cust.companyname);
    this.Street.setValue(cust.street);
    this.Pincode.setValue(cust.pincode);

    let cityIndex = 0;
    this.cityOptions.forEach((val,index) => {
      if(val === cust.city) cityIndex = index;
    })
    this.City.setValue(cityIndex);


    let countryIndex = 0;
    this.countryOptions.forEach((val,index) => {
      if(val === cust.country) countryIndex = index;
    })
    this.Country.setValue(countryIndex);
  }

  searchCustomer(event:any){
    let filteredCustomers: Customer[] = [];

    if(event === ''){
      this.customersToDisplay = this.customers;
    }
    else {
      filteredCustomers = this.customers.filter((val,index) => {
        let targetKey = val.firstname.toLowerCase() + '' + val.lastname.toLowerCase();
        let searchKey = event.toLowerCase();
        return targetKey.includes(searchKey);
      });
      this.customersToDisplay = filteredCustomers;
    }
  }

  public get Title(): FormControl {
    return this.customerForm.get('title') as FormControl;
  }

  public get FirstName(): FormControl {
    return this.customerForm.get('firstname') as FormControl;
  }

  public get LastName(): FormControl {
    return this.customerForm.get('lastname') as FormControl;
  }

  public get Email(): FormControl {
    return this.customerForm.get('email') as FormControl;
  }

  public get ContactNumber(): FormControl {
    return this.customerForm.get('contactnumber') as FormControl;
  }

  public get CompanyName(): FormControl {
    return this.customerForm.get('companyname') as FormControl;
  }
  
  public get Street(): FormControl {
    return this.customerForm.get('street') as FormControl;
  }

  public get Pincode(): FormControl {
    return this.customerForm.get('pincode') as FormControl;
  }

  public get City(): FormControl {
    return this.customerForm.get('city') as FormControl;
  }

  public get Country(): FormControl {
    return this.customerForm.get('country') as FormControl;
  }

}
