import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('google-map/multiple-listings', 'Integration | Component | google map/multiple listings', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{google-map/multiple-listings}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#google-map/multiple-listings}}
      template block text
    {{/google-map/multiple-listings}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
