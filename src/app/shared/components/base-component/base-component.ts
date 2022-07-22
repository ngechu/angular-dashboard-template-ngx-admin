import { Subscription, TeardownLogic } from 'rxjs';


export class BaseComponent {
  public subscription = new Subscription();
  public loading = true;
  public isEmptyData = false;

  /**
   * Add the teardown logic to the list of subscriptions
   */
  addSubscription(logic: TeardownLogic): void {
    this.subscription.add(logic);
  }

  /**
   * Unsubscribe from all observables added to the subscription
   */
  unsubscribe(): void {
    this.subscription.unsubscribe();
  }

}
