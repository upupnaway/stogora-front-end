import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('messages/message-bubble', 'Integration | Component | messages/message bubble', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{messages/message-bubble}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#messages/message-bubble}}
      template block text
    {{/messages/message-bubble}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
