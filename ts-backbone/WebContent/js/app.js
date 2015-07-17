$(function() {

	var Usager = Backbone.Model.extend({

		defaults : {
			id : -1,
			lastname : 'lastname',
			firstname : 'firstname'
		},
		initialize : function() {

		}
	});

	var UsagerList = Backbone.Collection.extend({
		model : Usager,
		url : 'http://127.0.0.1:3000/users',
		initialize : function() {

		}
	});

	var UsagerView = Backbone.View.extend({
		tagName : 'div',
		el : $('#usagerView'),
		initialize : function() {
			this.model.bind('change', this.render, this);
		},
		template : _.template($('#usagerTemplate').html()),
		render : function() {

			$('#usagerListTemplate').empty();
			this.$el.empty();
			this.$el.append(this.template(this.model.toJSON()));

			return this;
		}
	});

	var UsagerListView = Backbone.View.extend({
		tagName : 'div',
		el : $('#usagerListView'),
		initialize : function() {

			this.model.bind('add', this.render, this);
			this.model.bind('change', this.render, this);
		},
		template : _.template($('#usagerListTemplate').html()),
		render : function() {

			this.$el.empty();
			this.$el.append(this.template({
				usagers : this.model.toJSON()
			}));

			return this;
		}
	});

	var usagerModel = new Usager;

	var usagerListModel = new UsagerList;

	var App = {

		models : {
			usagerModel : usagerModel,
			usagerListModel : usagerListModel
		},
		views : {
			usagerView : new UsagerView({
				model : usagerModel
			}),
			usagerListView : new UsagerListView({
				model : usagerListModel
			})
		},
		showView : function(view) {
			if (App.views.current != undefined) {
				$(App.views.current.el).hide();
			}
			App.views.current = view;
			$(App.views.current.el).show();
		}
	};

	var Router = Backbone.Router.extend({

		routes : {

			'user/:id' : 'user',
			'users' : 'users',
			'' : 'users'
		},

		users : function() {

			App.showView(App.views.usagerListView);

			App.models.usagerListModel.fetch({
				success : function() {
					App.models.usagerListModel.trigger('change');
				}
			});
		},

		user : function(id) {

			App.showView(App.views.usagerView);

			usagerModel.set('firstname', usagerListModel.get(id).get(
					'firstname'));
			usagerModel
					.set('lastname', usagerListModel.get(id).get('lastname'));
		}
	});

	var router = new Router;

	Backbone.history.start();
});