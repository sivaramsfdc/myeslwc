import { LightningElement, api, wire } from 'lwc';
import getCustomerList from '@salesforce/apex/reservationManagerController.getCustomerList';

import TILE_SELECTION_MC from '@salesforce/messageChannel/Tile_Selection__c';
import {
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext,
    publish
} from 'lightning/messageService';

export default class CustomerList extends LightningElement {
    @api sobject = 'Lead';
    customers = [];

    errorMsg;
    msgForUser;
    wiredRecords;

    @wire(MessageContext)
    messageContext;

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
        const payload = { tileType: 'customer', properties: event.detail };
        publish(this.messageContext, TILE_SELECTION_MC, payload);
    }
}