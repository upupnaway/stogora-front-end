import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nav/notifications-messages', 'Integration | Component | nav/notifications messages', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{nav/notifications-messages}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#nav/notifications-messages}}
      template block text
    {{/nav/notifications-messages}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
