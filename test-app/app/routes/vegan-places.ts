import Route from '@ember/routing/route';
import { service } from '@ember/service';

import type StoreService from '@ember-data/store';

export default class VeganPlacesRoute extends Route {
  @service declare store: StoreService;

  beforeModel() {
    console.time('time loading vegan places');
  }

  async model() {
    return await this.store.findAll('vegan-place');
  }

  afterModel() {
    console.timeEnd('time loading vegan places');
  }
}
