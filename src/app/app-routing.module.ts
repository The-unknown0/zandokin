import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddArticleComponent } from './add-article/add-article.component';
import { ArticleSettingsComponent } from './article-settings/article-settings.component';
import { ArticlesComponent } from './articles/articles.component';
import { AuthGuard } from './auth.guard';
import { BucketComponent } from './bucket/bucket.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { FAQsComponent } from './faqs/faqs.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MessageSettingsComponent } from './message-settings/message-settings.component';
import { MyArticlesComponent } from './my-articles/my-articles.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { SettingsComponent } from './settings/settings.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "sign-up", component: SingUpComponent, title : "S'inscrire"},
  {path: "log-in", component: LoginComponent, title : "Se connecter"},
  {
    path: "home", 
    component: HomeComponent,
    children : [
      {path: 'detail-article/:id', component: DetailArticleComponent},
    ],
  },
  {
    path: "settings", component: SettingsComponent, 
    title: "Paramètres", canActivate : [AuthGuard],
    children : [
      {path: 'user-settings', component: UserSettingsComponent},
      {path: 'message-settings', component: MessageSettingsComponent},
      {path: 'article-settings', component: ArticleSettingsComponent},
    ],
  },
  {
    path: "article", 
    component: ArticlesComponent,
    children : [
      {path: 'detail-article/:id', component: DetailArticleComponent},
    ],
  },
  {path: "add-article", component: AddArticleComponent, canActivate : [AuthGuard]},
  {path: "my-article", component: MyArticlesComponent, canActivate : [AuthGuard]},
  {
    path: "bucket", 
    component: BucketComponent, 
    children : [
      {path: 'detail-article/:id', component: DetailArticleComponent},
    ],
    canActivate : [AuthGuard]
  },
  {path: "faqs", component: FAQsComponent},
  {path: "policy", component: PrivacyPolicyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
