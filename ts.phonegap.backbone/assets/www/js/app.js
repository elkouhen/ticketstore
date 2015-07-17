$(function() {

	var model = new Backbone.Model({
		lastname : 'lastname',
		firstname : 'firstname',
		defaults : {
			lastname : 'lastname',
			firstname : 'firstname'
		},
		initialize : function() {
			if (!this.get("lastname")) {
				this.set({
					"lastname" : this.defaults.lastname
				});
			}

			if (!this.get("firstname")) {
				this.set({
					"firstname" : this.defaults.firstname
				});
			}
		}
	});

	var UsagerView = Backbone.View.extend({
		tagName : 'div',
		model : model,
		el : $('#usager'),
		className : 'usager-container',
		initialize : function() {
			this.model.bind('change', this.render, this);
		},
		template : _.template($('#usagerTemplate').html()),
		render : function() {
			this.$el.append(this.template(this.model.toJSON()));

			return this;
		}
	});

	var usagerView = new UsagerView;

	model.set({
		firstname : 'Christine',
		lastname : 'El Kouhen'
	});
});