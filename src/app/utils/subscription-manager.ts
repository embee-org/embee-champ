import { Subscription } from 'rxjs';

export class SubscriptionManager {
  subscriptions: Subscription[] = [];

  add(subscription: Subscription): void {
    this.subscriptions.push(subscription);
  }

  destroy(): void {
    this.subscriptions.map((subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }
}
