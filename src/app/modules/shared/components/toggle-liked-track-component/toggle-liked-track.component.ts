import {Component, Input, trigger, state, transition, style, animate} from '@angular/core';
import {Track} from '../../../tracks/models/track';
import {Session} from '../../../session/models/session.model';
import {AuthService} from '../../services/auth.service';
import {UserAnalyticsService} from '../../../user-analytics/services/user-analytics.service';

@Component({
  selector: 'app-toggle-liked-track',
  styleUrls: ['./toggle-liked-track.style.scss'],
  templateUrl: './toggle-liked-track.template.html',
  // animations: [
  //   trigger('visibilityChanged', [
  //     state('true', style({width: '*', opacity: 1})),
  //     state('false', style({width: 0, display: 'none', opacity: 0})),
  //     state('void', style({width: 0, display: 'none', opacity: 0})),
  //     transition('* => *', animate('300ms ease-in-out'))
  //   ])
  // ]
})
export class ToggleLikedTrackComponent {
  private session = Session.getInstance();

  @Input() track: Track;

  public showAuthenticateTooltip = false;

  constructor(private authService: AuthService, private userAnalyticsService: UserAnalyticsService) {
  }

  showConnectTooltip() {
    this.showAuthenticateTooltip = true;
    setTimeout(() => {
      this.showAuthenticateTooltip = false;
    }, 2000);
  }

  hasLikedTrack(): boolean {
    if (this.track && this.track.id && Session.getInstance().user.likes.length > 0) {
      return !!Session.getInstance().user.likes.findWhere({id: this.track.id});
    }
  }

  connect() {
    this.authService.connect();
  }

  like(): void {
    if (this.session.isValid()) {
      Session.getInstance().user.likes.create(this.track.toJSON());
      this.userAnalyticsService.trackEvent('like_track', 'click', 'toggle-like-cmp');
    } else {
      this.showConnectTooltip();
    }
  }

  dislike(): void {
    const likedTrack = Session.getInstance().user.likes.get(this.track.toJSON());
    if (likedTrack) {
      this.userAnalyticsService.trackEvent('dislike_track', 'click', 'toggle-like-cmp');
      likedTrack.destroy();
    }
  }

  toggleLike(): void {
    if (!this.hasLikedTrack()) {
      this.like();
    } else {
      this.dislike();
    }
  }

}
