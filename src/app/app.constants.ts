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
        updateUser: '/app/updateUser/:name/:email/:age/:city',
        serviceslist: '/app/serviceslist'
    };
    public ROUTES = {
        notifications: '/app/notifications',
        login        : '/login',
        register     : '/register',
        users        : '/app/users',
        serviceslist : '/app/serviceslist',
        app          : '/app'
    };
}
