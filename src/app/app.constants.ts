import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public SERVER = {
        host: 'http://192.168.2.29:8081/',
        apiUrl: 'api/v1/'
    };
    public REST_URL = {
        register: 'user',
        login: 'authenticate',
        eula: 'eula/2',
        user: 'users',
        services: 'services'
    };
    public STATES = {
        app: '/app',
        login: '/login',
        register: '/register',
        home: '/app/home',
        users: '/app/users',
        updateUser: '/app/updateUser',
        serviceslist: '/app/serviceslist',
        charts: '/app/charts',
        d3Charts: '/app/d3Charts',
        formElements: '/app/formElements',
        notifications: '/app/notifications',

    };
}
