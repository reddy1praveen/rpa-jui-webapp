import {Component, OnInit} from '@angular/core';
import { ConfigService } from './config.service';
import {NavigationEnd, Router, Event} from '@angular/router';
import { environment } from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    title = 'JUI Web App';
    config; // TODO add type

    constructor(private configService: ConfigService, private router: Router) {}

    ngOnInit() {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                this.title = this.getTitle(event.url);
            }
        });

        if (environment.googleAnalyticsKey) {
            // this.appendGaTrackingCode(); // TODO: fix analytics
        }
    }



    private appendGaTrackingCode() {
        try {
            const script = document.createElement('script');
            script.innerHTML = `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
            ga('create', '${environment.googleAnalyticsKey}', 'auto');`;
            document.head.appendChild(script);
        } catch (ex) {
            console.error('Error appending google analytics');
            console.error(ex);
        }
    }

    private getTitle(key): string {
        console.log(key)
        // /case/SSCS/Benefit/1540462621508578/summary"
       const titleMapping: {[id: string]: string} = {
           '/' : 'Your cases - Judicial case manager',
           'decision' : 'Make decision - Judicial case manager',
           'summary': 'Summary - Judicial case manager'

       };
        // Examples:
        // Your cases - Judicial case manager
        //
        // Reassign case - Judicial case manager
        //
        // Make decision - Judicial case manager
        //
        // Questions - Judicial case manager
        //
        // Question added - Questions - Judicial case manager
        //
        // Error: Questions - Judicial case manager
        //
        // Marriage certificate - Judicial case manager
       return titleMapping[key];
    }
}
