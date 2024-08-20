import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { DetailsComponent } from "./details/details.component";
import { HousingLocationComponent } from "./housing-location/housing-location.component";
import { UserLibraryComponent } from "./user-library/user-library.component";
import { UserPageComponent } from "./user-page/user-page.component";
import { LoginComponent } from "./login/login.component";
import { UpdateUserAuthComponent } from "./forgot-info/update-user-auth/update-user-auth.component";
import { NewUserComponent } from "./forgot-info/new-user/new-user.component";
import { ForgotInfoComponent } from "./forgot-info/forgot-info.component";
const routeConfig: Routes = [
    //where each route goes for each view 
    {
        //base homepage route
        path: '',
        component: HomeComponent,
        title: 'Home Page',
    },
    {
        path:'details/:olid',
        component: DetailsComponent,
        title: 'Details Page'

    },
    {
        path: 'library/:user_id/:library_id',
        component: UserLibraryComponent,
        title: `Library Page`

    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login Page',
    },
    {
        path:'login/help',
        component: ForgotInfoComponent,
        title: 'Help',
        children: [
            {
                path: 'forgotPassword',
                component: UpdateUserAuthComponent,
                title: 'Forgot Password Page'
            },
            {
                path: 'newUser',
                component: NewUserComponent,
                title: 'New User'
            }
        ]
    }
  
    

];

export default routeConfig;