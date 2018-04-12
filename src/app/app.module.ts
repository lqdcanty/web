import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
// import { FileUploadModule } from 'ng2-file-upload';
import { RouterModule } from '@angular/router';
import { HttpModule} from "@angular/http";
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
//import { Ng2UeditorModule } from 'ng2-ueditor';
//import { Validate } from './validate/validate';
import { CookieService } from 'ngx-cookie-service';

import { HomeComponent } from './home/home.component';
import { RankComponent } from './rank/rank.component';
import { TopUpComponent } from './top-up/top-up.component';
import { BookLibraryComponent } from './book-library/book-library.component';

import appRoutes from './app.routes';
import { NavComponent } from './common/nav/nav.component';
import { HeaderComponent } from './common/header/header.component';
import { RankListComponent } from './common/rank-list/rank-list.component';
import { FootComponent } from './common/foot/foot.component';
import { RanktypeListComponent } from './rank/ranktype-list/ranktype-list.component';
import { TypeNavComponent } from './rank/type-nav/type-nav.component';
import { MoreBooklistComponent } from './rank/more-booklist/more-booklist.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { WorkInteractionComponent } from './book-detail/work-interaction/work-interaction.component';
import { WorkDirectoryComponent } from './book-detail/work-directory/work-directory.component';
import { BookContentComponent } from './book-content/book-content.component';
import { UserComponent } from './user/user/user.component';
import { UsernavComponent } from './user/usernav/usernav.component';
import { BookStoreComponent } from './user/book-store/book-store.component';
import { MyStoreComponent } from './user/book-store/my-store/my-store.component';
import { RecentComponent } from './user/book-store/recent/recent.component';
import { AccountComponent } from './user/account/account.component';
import { ToupRecordsComponent } from './user/account/toup-records/toup-records.component';
import { ConsumptionRecordsComponent } from './user/account/consumption-records/consumption-records.component';
import { MySubscriptionComponent } from './user/my-subscription/my-subscription.component';
import { MyBookreviewComponent } from './user/my-bookreview/my-bookreview.component';
import { NewsComponent } from './user/news/news.component';
import { UpdataNewsComponent } from './user/news/updata-news/updata-news.component';
import { SystemNewsComponent } from './user/news/system-news/system-news.component';
import { SecurityComponent } from './user/security/security.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { AuthorComponent } from './author/author.component';
import { CommentLayerComponent } from './common/comment-layer/comment-layer.component';
import { LoginComponent } from './common/login/login.component';
import { RegisterComponent } from './newtempter/register/register.component';
import { RegisterOkComponent } from './newtempter/register-ok/register-ok.component';
import { PhonebindComponent } from './newtempter/phonebind/phonebind.component';
import { RechangePasswordComponent } from './user/security/rechange-password/rechange-password.component';
import { WriterzoneComponent } from './writerzone/writerzone.component';
import { AuthornavComponent } from './writerzone/authornav/authornav.component';
import { WorkmanagementListComponent } from './writerzone/workmanagement-list/workmanagement-list.component';
import { CreatworkComponent } from './writerzone/creatwork/creatwork.component';
import { WorksettingComponent } from './writerzone/worksetting/worksetting.component';
import { WorkmodifyComponent } from './writerzone/worksetting/workmodify/workmodify.component';
import { PublishedChapterComponent } from './writerzone/worksetting/published-chapter/published-chapter.component';
import { NewchapterComponent } from './writerzone/worksetting/newchapter/newchapter.component';
import { NewvolumeComponent } from './writerzone/worksetting/newvolume/newvolume.component';
import { SaveDraftComponent } from './writerzone/worksetting/save-draft/save-draft.component';
import { AuthorCommentComponent } from './writerzone/worksetting/author-comment/author-comment.component';
import { AuthorDataComponent } from './writerzone/author-data/author-data.component';
import { AuthorIncomeComponent } from './writerzone/author-income/author-income.component';
import { AcceptAgreementComponent } from './newtempter/accept-agreement/accept-agreement.component';
import { FillInformationComponent } from './newtempter/fill-information/fill-information.component';
import { FillOkComponent } from './newtempter/fill-ok/fill-ok.component';
import { AuthorjudgeComponent } from './common/authorjudge/authorjudge.component';
import { CustomPreloadingStrategy } from './preload';
import { HomeTypePipe } from './pipe/home-type.pipe';
import { HomeRankPipe } from './pipe/home-rank.pipe';
import { ExceptionalComponent } from './common/exceptional/exceptional.component';
import { TipLayerComponent } from './common/tip-layer/tip-layer.component';
import { UeditorComponent } from './common/ueditor/ueditor.component';
import { PhonebindOkComponent } from './newtempter/phonebind-ok/phonebind-ok.component';
import { DraftChapterComponent } from './writerzone/worksetting/draft-chapter/draft-chapter.component';
import { PageComponent } from './common/page/page.component';
import { CreatchapterComponent } from './writerzone/worksetting/creatchapter/creatchapter.component';
import { HomerankComponent } from './common/homerank/homerank.component';
import { ForgetpasswordComponent } from './newtempter/forgetpassword/forgetpassword.component';
import { ForgetpasswordOkComponent } from './newtempter/forgetpassword-ok/forgetpassword-ok.component';
import { HomeSlideComponent } from './common/home-slide/home-slide.component';
import { HomeOneslideComponent } from './common/home-oneslide/home-oneslide.component';
import { DetailSlideComponent } from './common/detail-slide/detail-slide.component';
import { PersonInfoComponent } from './user/person-info/person-info.component';
import { ActiveComponent } from './active/active.component';
import { SearchComponent } from './search/search.component';
import { YuanqiComponent } from './aboutyq/yuanqi/yuanqi.component';
import { YuanqiNavComponent } from './aboutyq/yuanqi-nav/yuanqi-nav.component';
import { YuanqiParentComponent } from './aboutyq/yuanqi-parent/yuanqi-parent.component';
import { NoticeComponent } from './aboutyq/notice/notice.component';
import { HelpComponent } from './aboutyq/help/help.component';
import { FeedbackComponent } from './aboutyq/feedback/feedback.component';
import { ContactComponent } from './aboutyq/contact/contact.component';
import { AgreementComponent } from './aboutyq/agreement/agreement.component';
import { SettimeService } from './serve/settime.service';


@NgModule({
  declarations: [//声明本模块中拥有的视图类。Angular 有三种视图类：组件、指令和管道。
    AppComponent,
    HomeComponent,
    RankComponent,
    TopUpComponent,
    NavComponent,
    TypeNavComponent,
    HeaderComponent,
    RankListComponent,
    FootComponent,
    TypeNavComponent,
    BookDetailComponent,
    WorkInteractionComponent,
    WorkDirectoryComponent,
    BookLibraryComponent,
    BookContentComponent,
    UserComponent,
    UsernavComponent,
    BookStoreComponent,
    RecentComponent,
    MyStoreComponent,
    RecentComponent,
    AccountComponent,
    ToupRecordsComponent,
    ConsumptionRecordsComponent,
    MySubscriptionComponent,
    MyBookreviewComponent,
    NewsComponent,
    UpdataNewsComponent,
    SystemNewsComponent,
    SecurityComponent,
    AnnouncementComponent,
    AuthorComponent,
    CommentLayerComponent,
    LoginComponent,
    RegisterComponent,
    RegisterOkComponent,
    PhonebindComponent,
    RechangePasswordComponent,
    WriterzoneComponent,
    AuthornavComponent,
    WorkmanagementListComponent,
    CreatworkComponent,
    WorksettingComponent,
    WorkmodifyComponent,
    PublishedChapterComponent,
    NewvolumeComponent,
    NewchapterComponent,
    SaveDraftComponent,
    AuthorCommentComponent,
    AuthorDataComponent,
    AuthorIncomeComponent,
    AcceptAgreementComponent,
    FillInformationComponent,
    FillOkComponent,
    AuthorjudgeComponent,
    HomeTypePipe,
    HomeRankPipe,
    ExceptionalComponent,
    TipLayerComponent,
    UeditorComponent,
    PhonebindOkComponent,
    DraftChapterComponent,
    PageComponent,
    CreatchapterComponent,
    HomerankComponent,
    ForgetpasswordComponent,
    ForgetpasswordOkComponent,
    HomeSlideComponent,
    HomeOneslideComponent,
    DetailSlideComponent,
    PersonInfoComponent,
    ActiveComponent,
    SearchComponent,
    YuanqiComponent,
    YuanqiNavComponent,
    YuanqiParentComponent,
    NoticeComponent,
    HelpComponent,
    FeedbackComponent,
    ContactComponent,
    AgreementComponent,
    RanktypeListComponent,
    MoreBooklistComponent
  ],
  imports: [//本模块声明的组件模板需要的类所在的其它模块。
    BrowserModule,
    RouterModule,
    appRoutes,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
    // FileUploadModule
  ],
  providers: [SettimeService,CustomPreloadingStrategy,CookieService,{provide: LocationStrategy, useClass: HashLocationStrategy} ],//服务的创建者，并加入到全局服务列表中，可用于应用任何部分。
  bootstrap: [AppComponent]//指定应用的主视图（称为根组件），它是所有其它视图的宿主。只有根模块才能设置bootstrap属性。
})
export class AppModule { }
   // Ng2UeditorModule