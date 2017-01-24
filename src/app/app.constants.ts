import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public SERVER = {
        host: "http://192.168.2.29:8081/",
        apiUrl: "api/v1/"
    };
    public REST_URL = {
        register: 'user',
        login: 'authenticate'
    };
    public STATES = {
        login: 'login',
        register: 'register',
        home: 'home',
        datatable: 'datatable',
        updateData: 'updateData/:name/:email/:age/:city',
        infiniteScroll: 'infiniteScroll'
    }
}
