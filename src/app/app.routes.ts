import {RouterModule, Routes} from "@angular/router";
import { PreloadAllModules } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BookLibraryComponent } from './book-library/book-library.component';
import { RankComponent } from './rank/rank.component';
import { TopUpComponent } from './top-up/top-up.component';
import { RanktypeListComponent } from './rank/ranktype-list/ranktype-list.component';
import { MoreBooklistComponent } from './rank/more-booklist/more-booklist.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { WorkInteractionComponent } from './book-detail/work-interaction/work-interaction.component';
import { WorkDirectoryComponent } from './book-detail/work-directory/work-directory.component';
import { UserComponent } from './user/user/user.component';
import { BookStoreComponent } from './user/book-store/book-store.component';
import { RecentComponent } from './user/book-store/recent/recent.component';
import { MyStoreComponent } from './user/book-store/my-store/my-store.component';
import { AccountComponent } from './user/account/account.component';
import { ConsumptionRecordsComponent } from './user/account/consumption-records/consumption-records.component';
import { ToupRecordsComponent } from './user/account/toup-records/toup-records.component';
import { MySubscriptionComponent } from './user/my-subscription/my-subscription.component';
import { MyBookreviewComponent } from './user/my-bookreview/my-bookreview.component';
import { NewsComponent } from './user/news/news.component';
import { UpdataNewsComponent } from './user/news/updata-news/updata-news.component';
import { SystemNewsComponent } from './user/news/system-news/system-news.component';
import { SecurityComponent } from './user/security/security.component';
import { BookContentComponent } from './book-content/book-content.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { AuthorComponent } from './author/author.component';
import { LoginComponent } from './common/login/login.component';
import { RegisterComponent } from './newtempter/register/register.component';
import { RegisterOkComponent } from './newtempter/register-ok/register-ok.component';
import { PhonebindComponent } from './newtempter/phonebind/phonebind.component';
import { PhonebindOkComponent } from './newtempter/phonebind-ok/phonebind-ok.component';
import { RechangePasswordComponent } from './user/security/rechange-password/rechange-password.component';
import { WriterzoneComponent } from './writerzone/writerzone.component';
import { WorkmanagementListComponent } from './writerzone/workmanagement-list/workmanagement-list.component';
import { CreatworkComponent } from './writerzone/creatwork/creatwork.component';
import { WorksettingComponent } from './writerzone/worksetting/worksetting.component';
import { WorkmodifyComponent } from './writerzone/worksetting/workmodify/workmodify.component';
import { PublishedChapterComponent } from './writerzone/worksetting/published-chapter/published-chapter.component';
import { NewvolumeComponent } from './writerzone/worksetting/newvolume/newvolume.component';
import { NewchapterComponent } from './writerzone/worksetting/newchapter/newchapter.component';
import { SaveDraftComponent } from './writerzone/worksetting/save-draft/save-draft.component';
import { AuthorCommentComponent } from './writerzone/worksetting/author-comment/author-comment.component';
import { AuthorDataComponent } from './writerzone/author-data/author-data.component';
import { AuthorIncomeComponent } from './writerzone/author-income/author-income.component';
import { AcceptAgreementComponent } from './newtempter/accept-agreement/accept-agreement.component';
import { FillInformationComponent } from './newtempter/fill-information/fill-information.component';
import { FillOkComponent } from './newtempter/fill-ok/fill-ok.component';
import { CreatchapterComponent } from './writerzone/worksetting/creatchapter/creatchapter.component';
import { ForgetpasswordComponent } from './newtempter/forgetpassword/forgetpassword.component';
import { ForgetpasswordOkComponent } from './newtempter/forgetpassword-ok/forgetpassword-ok.component';
import { PersonInfoComponent } from './user/person-info/person-info.component';
import { ActiveComponent } from './active/active.component';
import { SearchComponent } from './search/search.component';
import { YuanqiComponent } from './aboutyq/yuanqi/yuanqi.component';
import { YuanqiParentComponent } from './aboutyq/yuanqi-parent/yuanqi-parent.component';
import { ContactComponent } from './aboutyq/contact/contact.component';
import { AgreementComponent } from './aboutyq/agreement/agreement.component';
import { NoticeComponent } from './aboutyq/notice/notice.component';
import { HelpComponent } from './aboutyq/help/help.component';
import { FeedbackComponent } from './aboutyq/feedback/feedback.component';




const appRoutes=[
	/*{
		path:'',
		redirectTo:'/home',//路由的重定向
		pathMatch:'full'
	},*/
	{
		path:'home',
		component:HomeComponent
	},
	{
		path:'home',
		component:HomeComponent
	},
	{
		path:'active',
		component:ActiveComponent
	},
	{
		path:'search/:keyword',
		component:SearchComponent
	},
	{
		path:'yuanqi',
		component:YuanqiComponent
	},

	{
		path:'rank',
		component:RankComponent,
		children:[
			{
				path:'',
				redirectTo:'ranktypeList',//路由的重定向
				pathMatch:'full'
			},
			{
		    	path: 'ranktypeList',
		    	component: RanktypeListComponent 
	    	},
	    	{ 
	    		path: 'moreBooklist', 
	    		component: MoreBooklistComponent 
	    	}
		]
	},
	{
		path:'bookLibrary',
		component:BookLibraryComponent
	},
	{
		path:'forgetpassword',
		component:ForgetpasswordComponent
	},
	{
		path:'forgetpasswordOk/:phone',
		component:ForgetpasswordOkComponent
	},
	{
		path:'topUp/:url',//这个是.html的写的路径
		component:TopUpComponent
	},
	{
		path:'bookContent/:bookAndChapter',//这个是.html的写的路径
		component:BookContentComponent
	},
	{
		path:'bookDetail/:bookId',//这个是.html的写的路径
		component:BookDetailComponent,
		children:[
			// {
		 //    	path: '',
		 //    	redirectTo:'workInteraction:bookId',//路由的重定向
			// 	pathMatch:'full'
	  //   	},
			{
		    	path: 'workInteraction/:bookId',
		    	component: WorkInteractionComponent 
	    	},
	    	{ 
	    		path: 'workDirectory/:bookId', 
	    		component: 	WorkDirectoryComponent 
	    	}
		]
	},
	{
		path:'yuanqiParent',//这个是.html的写的路径
		component:YuanqiParentComponent,
		children:[
			{
		    	path: '',
		    	redirectTo:'yuanqi',//路由的重定向
				pathMatch:'full'
	    	},
	    	{
		    	path: 'yuanqi',
		    	component: YuanqiComponent 
	    	},
			{
		    	path: 'contact',
		    	component: ContactComponent 
	    	},
	    	{
		    	path: 'agreement',
		    	component: AgreementComponent 
	    	},
	    	{
		    	path: 'notice',
		    	component: NoticeComponent 
	    	},
	    	{
		    	path: 'help',
		    	component: HelpComponent 
	    	},
	    	{
		    	path: 'feedback',
		    	component: FeedbackComponent 
	    	}
		]
	},
	{
		path:'user',//这个是.html的写的路径
		component:UserComponent,
		children:[
			{
		    	path: '',
		    	redirectTo:'bookStore',
				pathMatch:'full'
	    	},
	    	{
		    	path: 'personInfo',
		    	component: PersonInfoComponent
	    	},
	    	{
	    		path: 'bookStore',
		    	component: BookStoreComponent,
		    	children:[
		    		{
		    			path: '',
				    	redirectTo:'myStore',//路由的重定向
						pathMatch:'full'
		    		},
			    	{
			    		path: 'myStore',
		    			component: MyStoreComponent,
			    	},
			    	{
			    		path:'recent',
			    		component: RecentComponent,
			    	}
		    	]
	    	},
	    	{
		    	path: 'account',
		    	component: AccountComponent,
		    	children:[
		    		{
		    			path: '',
				    	redirectTo:'consumptionRecords',//路由的重定向
						pathMatch:'full'
		    		},
			    	{
			    		path: 'consumptionRecords',
		    			component: ConsumptionRecordsComponent,
			    	},{
			    		path:'toupRecords',
			    		component: ToupRecordsComponent,
			    	}
		    	]
	    	},
	    	{
		    	path: 'mySubscription',
		    	component: MySubscriptionComponent
	    	},
	    	{
		    	path: 'myBookreview',
		    	component: MyBookreviewComponent
	    	},
	    	{
		    	path: 'security',
		    	component: SecurityComponent
	    	},
	    	{
		    	path: 'rechangePassword',
		    	component: RechangePasswordComponent
	    	},
	    	{
		    	path: 'news',
		    	component: NewsComponent,
		    	children:[
		    		{
		    			path: '',
				    	redirectTo:'updataNews',//路由的重定向
						pathMatch:'full'
		    		},
			    	{
			    		path: 'updataNews',
		    			component: UpdataNewsComponent,
			    	},
			    	{
			    		path:'systemNews',
			    		component: SystemNewsComponent,
			    	}
		    	]
	    	}
		]
	},
	{
		path: 'announcement/:noticeId',
		component: AnnouncementComponent
	},
	{
		path: 'author/:authorCode',
		component: AuthorComponent
	},
	{
		path: 'register',
		component: RegisterComponent
	},
	{
		path: 'registerOk/:phone',
		component: RegisterOkComponent
	},
	{
		path: 'phonebind',
		component: PhonebindComponent
	},
	{
		path: 'phonebindOk/:phone',
		component: PhonebindOkComponent
	},
	{
		path: 'acceptAgreement',
		component: AcceptAgreementComponent
	},
	{
		path: 'fillInformation',
		component: FillInformationComponent
	},
	{
		path: 'fillOk',
		component: FillOkComponent
	},
	{
		path: 'writerzone',
		component: WriterzoneComponent,
		children:[
			{
    			path: '',
		    	redirectTo:'workmanagementList',//路由的重定向
				pathMatch:'full'
    		},
	    	{
	    		path: 'creatework',
    			component: CreatworkComponent
	    	},
	    	{
	    		path: 'workmanagementList',
    			component: WorkmanagementListComponent
	    	},
	    	{
	    		path: 'authorData',
    			component: AuthorDataComponent
	    	},
	    	{
	    		path: 'authorIncome',
    			component: AuthorIncomeComponent
	    	},
	    	{
	    		path:'worksetting/:bookId',
	    		component: WorksettingComponent,
	    		children:[
	    			/*{
		    			path: '',
				    	redirectTo:'workmodify',//路由的重定向
						pathMatch:'full'
		    		},*/
			    	{
			    		path: 'workmodify/:bookId',
		    			component: WorkmodifyComponent
			    	},
			    	{
			    		path: 'publishedChapter/:bookId',
		    			component: PublishedChapterComponent
			    	},
			    	{
			    		path: 'newvolume/:bookId',
		    			component: NewvolumeComponent
			    	},
			    	{
			    		path: 'newchapter/:bookId',
		    			component: NewchapterComponent
			    	},
			    	{
			    		path: 'createchapter/:bookId',
		    			component: CreatchapterComponent
			    	},
			    	{
			    		path: 'saveDraft/:bookId',
		    			component: SaveDraftComponent
			    	},
			    	{
			    		path: 'authorComment/:bookId',
		    			component: AuthorCommentComponent
			    	}
	    		]
	    	}
	    
		]
	},
	{
		path:'**',//fallback router must in the last后备路由器必须放在最后一个
		component:HomeComponent
	}
];
export default RouterModule.forRoot(appRoutes,{preloadingStrategy: PreloadAllModules});