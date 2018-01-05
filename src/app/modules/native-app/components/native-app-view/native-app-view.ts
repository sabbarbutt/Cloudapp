import {Component, OnInit} from '@angular/core';
import {UserAnalyticsService} from '../../../user-analytics/services/user-analytics.service';
import {ClientDetector, OsNames, Result} from '../../../shared/services/client-detector.service';
import {NativeAppHandlerService} from '../../services/native-app-handler';

@Component({
  selector: 'app-native-app-view',
  styleUrls: ['./native-app-view.scss'],
  templateUrl: './native-app-view.html'
})
export class NativeAppViewComponent implements OnInit {
  public downloadLink: string;

  constructor(private userAnalyticsService: UserAnalyticsService,
              private nativeAppHandlerService: NativeAppHandlerService) {
  }

  public isWindowsPc(): boolean {
    return ClientDetector.isWindowsPC();
  }

  public isMacPc(): boolean {
    return ClientDetector.isMacPC();
  }

  public getDownloadLabel() {
    return `Download for ${ClientDetector.getOs().name}`;
  }

  public download() {
    this.userAnalyticsService.trackEvent(
      `download_desktop_app_${ClientDetector.getOs().name}`,
      'click',
      'app-desktop-app-view'
    );
  }

  ngOnInit(): void {
    this.nativeAppHandlerService.getLatestVersion().then((version) => {
      this.downloadLink = NativeAppHandlerService.getDownloadLinkForVersion(version);
    });
  }
}
