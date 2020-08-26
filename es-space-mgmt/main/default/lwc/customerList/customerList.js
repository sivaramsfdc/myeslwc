import { LightningElement, api, wire } from 'lwc';
import getCustomerList from '@salesforce/apex/reservationManagerController.getCustomerList';

export default class CustomerList extends LightningElement {
    @api sobject = 'Lead';
    customers = [];

    errorMsg;
    msgForUser;
    wiredRecords;

    @wire(getCustomerList, { sObjectType: '$sobject' })
    wiredCustomers(value) {
        console.log(JSON.stringify(value));
        this.wiredRecords = value;
        if (value.error) {
            this.errorMsg = value.error;
            this.msgForUser = 'There was an issue loading customer.';
        } else if (value.data) {
            this.customers = value.data;
        }
    }

    publishSelect(event) {
        console.log(JSON.stringify(event.detail));
    }

}