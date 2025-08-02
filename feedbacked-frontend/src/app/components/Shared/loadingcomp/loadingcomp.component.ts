import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-loadingcomp',
    imports: [],
    templateUrl: './loadingcomp.component.html',
    styleUrl: './loadingcomp.component.scss'
})
export class LoadingcompComponent {
  @Input() height: string = '50';

  @Input() index: any = 0;
}
