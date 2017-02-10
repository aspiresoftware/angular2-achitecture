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
        login: 'login',
        register: 'register',
        home: 'home',
        users: 'users',
        updateData: 'updateData/:name/:email/:age/:city',
        serviceslist: 'serviceslist'
    };
    public ROUTES = {
        notifications: '/notifications',
        login        : '/login',
        register     : '/register',
        users        : '/users',
        serviceslist : '/serviceslist'
    };
}
