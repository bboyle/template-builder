angular.module( 'templateBuilder', [ 'ngRoute' ] )

	.value( 'supportedFramework', {
		'xssi': {
			htmlEncode: '<!--#echo encoding="entity" var="{{ variableName }}" -->',
			urlEncode: '<!--#echo encoding="url" var="{{ variableName }}" -->',
			jsStringEncode: '<!--#echo encoding="entity" var="{{ variableName }}" -->'
		},
		'php': {
			htmlEncode: "<?php print (empty($_SERVER['{{ variableName }}'])) ? '' : addslashes(htmlspecialchars($_SERVER['{{ variableName }}'])); ?>",
			urlEncode: "<?php print (empty($_SERVER['{{ variableName }}'])) ? '' : urlencode($_SERVER['{{ variableName }}']); ?>",
			jsStringEncode: "<?php print (empty($_SERVER['{{ variableName }}'])) ? '' : addslashes(htmlspecialchars($_SERVER['{{ variableName }}'])); ?>"
		},
		'ftl': {
			htmlEncode: '<span class="ng-non-bindable">${</span>{{ variableName }}?xhtml}',
			urlEncode: '<span class="ng-non-bindable">${</span>{{ variableName }}?url}',
			jsStringEncode: '<span class="ng-non-bindable">${</span>{{ variableName }}?xhtml}',
		},
		'jinja2' : {
			htmlEncode: "<?php print (empty($_SERVER['{{ variableName }}'])) ? '' : addslashes(htmlspecialchars($_SERVER['{{ variableName }}'])); ?>",
			urlEncode: '${page_title()}',
			// {{ full_current_url }}
			// {{ h.portal_type('site') }}.qld.gov.au
			// ${page_title()}
			jsStringEncode: '<span class="ng-non-bindable">{{</span>{{ variableName }}<span class="ng-non-bindable">}}</span>'
		}
	})


	.config(function( $routeProvider ) {
		$routeProvider
			.when( '/:templateFramework', {
				controller: 'TemplateCtrl',
				controllerAs: 'template'
			})

			.otherwise({ redirectTo: '/xssi' })
		;
	})


	.controller( 'TemplateCtrl', function( $scope, $routeParams ) {
		this.templateFramework = $routeParams.templateFramework;
		this.partials = [
			'head-assets-styles',
			'head-assets-scripts',
			'header',
			'page-options-post',
			'footer-page',
			'footer-stats',
		];
	})
;