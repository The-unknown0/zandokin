import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { ArticlesComponent } from './articles/articles.component';
import { MyArticlesComponent } from './my-articles/my-articles.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BucketComponent } from './bucket/bucket.component';
import { SettingsComponent } from './settings/settings.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './auth.guard';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { MessageSettingsComponent } from './message-settings/message-settings.component';
import { ArticleSettingsComponent } from './article-settings/article-settings.component';
import { FAQsComponent } from './faqs/faqs.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SingUpComponent,
    ArticlesComponent,
    MyArticlesComponent,
    LeftMenuComponent,
    LoginComponent,
    BucketComponent,
    SettingsComponent,
    HeaderComponent,
    UserSettingsComponent,
    MessageSettingsComponent,
    ArticleSettingsComponent,
    FAQsComponent,
    PrivacyPolicyComponent,
    AddArticleComponent,
    DetailArticleComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent, ]
})
export class AppModule { }
