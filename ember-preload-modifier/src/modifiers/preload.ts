import Modifier, { ArgsFor } from 'ember-modifier';
import { registerDestructor } from '@ember/destroyable';
import { service } from '@ember/service';

import type Owner from '@ember/owner';
import type RouterService from '@ember/routing/router-service';

type Positional = [route: string, ...models: unknown[]];

export interface PreloadSignature {
  Element: HTMLElement;

  Args: {
    Positional?: Positional;
  };
}

function cleanup(instance: PreloadModifier) {
  const { element } = instance;

  if (element) {
    element.removeEventListener('mouseenter', instance.handler);
  }
}

export default class PreloadModifier extends Modifier<PreloadSignature> {
  @service declare router: RouterService;

  element!: HTMLElement | HTMLAnchorElement;

  constructor(owner: Owner, args: ArgsFor<PreloadSignature>) {
    super(owner, args);
    registerDestructor(this, cleanup);
  }

  modify(element: HTMLElement /*positionalArgs: Positional*/) {
    this.addEventListener(element);
    registerDestructor(this, cleanup);
  }

  addEventListener = (element: HTMLElement) => {
    // Store the current element, event, and handler for when we need to remove
    // them during cleanup.
    this.element = element;

    this.element.addEventListener('mouseenter', this.handler);
  };

  handler = () => {
    this.preload();
  };

  preload() {
    // If we're element is an anchor tag, we can use the href to preload the
    // route. Otherwise, we'll use the positional arguments.

    if (this.element instanceof HTMLAnchorElement) {
      this.router.recognizeAndLoad(this.element.pathname);
    } else {
      // this.router.recognizeAndLoad(this.positionalArgs);
    }
  }
}
