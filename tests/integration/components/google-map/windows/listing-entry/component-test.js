import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('google-map/windows/listing-entry', 'Integration | Component | google map/windows/listing entry', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{google-map/windows/listing-entry}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#google-map/windows/listing-entry}}
      template block text
    {{/google-map/windows/listing-entry}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
