import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public SERVER = {
        host: 'https://192.168.2.10:8081/',
        apiUrl: 'api/v1/'
    };
    public REST_URL = {
        register: 'user',
        login: 'authenticate',
        services: 'services'
    };
    public STATES = {
        login: 'login',
        register: 'register',
        home: 'home',
        datatable: 'datatable',
        updateData: 'updateData/:name/:email/:age/:city',
        infiniteScroll: 'infiniteScroll'
    };
    public ROUTES = {
        notifications: '/notifications'
    }
}
