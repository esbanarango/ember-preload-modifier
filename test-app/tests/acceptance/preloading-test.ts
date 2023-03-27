import { module, test } from 'qunit';
import { visit, triggerEvent } from '@ember/test-helpers';
import { setupApplicationTest } from 'test-app/tests/helpers';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | preloading', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('preloading when hovering a', async function (assert) {
    assert.expect(2);
    this.server.get('/vegan-places', () => {
      assert.step('vegan-places');
      return { data: [] };
    });

    await visit('/');

    await triggerEvent('a[href="/vegan-places"]', 'mouseenter');

    assert.verifySteps(['vegan-places']);
  });
});
