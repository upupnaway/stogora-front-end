import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    notifyMe: function(){
      var self = this;
      var betaEmail= this.get('email'),
        new_email_inst;
      var beta = {
        email: betaEmail
      };
      if(this.verifyEmail(beta.email)){
        this.set('isLoadingAjax',true);
        new_email_inst = this.store.createRecord('beta',beta);
        new_email_inst.save().then(function(resp){
          if(resp.isError === false) {
            self.set('submitted',true);
          }
          self.set('isLoadingAjax',false);
        });
      }
      this.resetFields();
      //open modal to tell them we will send an email out to them
    }
  },
  email: '',
  submitted: false,
  isLoadingAjax: false,
  resetFields: function() {
    this.set('email', '');
  },
  verifyEmail: function(emailInput){
    if (emailInput.length > 0) {
      if (emailInput.indexOf('@') === -1) {
        this.set('emailError', true);
        return false;
      } else {
        this.set('emailError', false);
        return true;
      }
    } else {
      this.set('emailError', true);
      return false;
    }
  }
});
