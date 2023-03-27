import { TestContext as _TestContext } from '@ember/test-helpers';
import { Server } from 'ember-cli-mirage';

declare module '@ember/test-helpers' {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore: TS2310
  export interface TestContext extends _TestContext {
    server: Server;
  }
}
