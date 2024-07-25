import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { DetailsComponent } from "./details/details.component";
const routeConfig: Routes = [
    //where each route goes for each view 
    {
        //base homepage route
        path: '',
        component: HomeComponent,
        title: 'Home Page'
    },
    {
        path:'details/:olid',
        component: DetailsComponent,
        title: 'Details Page'

    }
];

export default routeConfig;