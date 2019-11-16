import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {CourseComponent} from "./course/course.component";
import {CourseResolver} from "./services/course.resolver";
import {MatTestComponent} from './mat-test/mat-test.component';
import {MdComponent} from './md/md.component';

const routes: Routes = [
    {
        path: "",
        //component: HomeComponent
        component: MdComponent

    },
    {
        path: "about",
        component: AboutComponent
    },
    {
        path: 'courses/:id',
        component: CourseComponent,
        resolve: {
            course: CourseResolver
        }
    },
    {
        path: 'test',
        component: MatTestComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
