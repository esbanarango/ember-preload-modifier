import { HelperLike } from '@glint/template';
import AddonRegistry from 'ember-preload-modifier/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends AddonRegistry {
    'page-title': HelperLike<{
      Args: { Positional: [title: string] };
      Return: void;
    }>;
  }
}
