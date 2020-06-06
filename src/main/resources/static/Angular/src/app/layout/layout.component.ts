import {
    AfterViewInit,
    Compiler,
    Component,
    ComponentFactory,
    OnInit,
    Type,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {NbIconConfig, NbMenuItem, NbMenuService, NbSidebarService} from "@nebular/theme";
import {NbTokenService} from "@nebular/auth";

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit {
    @ViewChild('anchor', {read: ViewContainerRef}) anchor: ViewContainerRef;
    componentFactories: ComponentFactory<any>[];
    disabledIconConfig: NbIconConfig = {icon: 'settings-2-outline', pack: 'eva'}
    isCompact = true;
    items: NbMenuItem[] = [

        {
            title: 'Profile',
            icon: 'person-outline',
        },
        {
            title: 'Messages',
            icon: 'email-outline',
        },
        {
            title: 'User Management',
            icon: {icon: 'checkmark-outline', pack: 'eva'},

        },
        {
            title: 'Logout',
            icon: 'unlock-outline',
            link: '/login'
        },
    ];

    constructor(
        private sidebarService: NbSidebarService,
        private menuService: NbMenuService,
        private nbTokenService: NbTokenService,
        private compiler: Compiler,
    ) {
    }

    ngOnInit() {

    }

    toggleCompact() {
        this.sidebarService.toggle(true, 'left');
        this.isCompact = !this.isCompact
    }

    async loadUserModule() {
        this.loadModule(await import('../users/user.module').then(m => m.UserModule));
    }
    ngAfterViewInit(): void {
        this.menuService.onItemClick().subscribe((event) => {
            if (event.item.title === 'Logout') {
                this.nbTokenService.clear();
            }
            if (event.item.title === 'User Management') {
                this.loadUserModule().then( _ => {
                 let comp =  this.componentFactories.filter(c => c.selector === "app-user-list")
                    this.createComponent(comp[0]);
                });


            }
        });
    }

    private loadModule(moduleType: Type<any>) {
        this.anchor.clear();
        const moduleFactories = this.compiler.compileModuleAndAllComponentsSync(moduleType);
        this.componentFactories = moduleFactories.componentFactories;
    }
    createComponent(factory: ComponentFactory<any>) {
        this.anchor.clear();
        this.anchor.createComponent(factory);
    }

}
