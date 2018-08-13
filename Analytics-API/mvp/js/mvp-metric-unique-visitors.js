$( document ).ready( function() {
	let settings = {
		async      : true,
		crossDomain: true,
		url        : 'http://localhost:3000/adobe/analytics/report/activities',
		method     : 'GET',
		headers    : {
			'Cache-Control': 'no-cache',
		},
		dataType   : 'jsonp',
		timeout    : 15000,
	};
	/*
	$.get( 'http://localhost:3000/adobe/analytics/report/activities', function( result ) {
		console.log( 'outstanding', result );
	} );
	*/
	$.get( 'http://localhost:3000/adobe/analytics/report/activities' ).done( function( result ) {
		let activities       = result.data.activities;
		let getActivity      = function( activities, start, end ) {
			$.post( 'http://localhost:3000/adobe/analytics/report/metrics', {
				suite   : 'attconprod',
				activity: activities || [
					1621921405,
					2733300011,
				],
				start   : start || null,
				end     : end || null,
			} ).done( function( result ) {
				let metrics              = result.data.metrics;
				let meta                 = result.meta;
				let generateMetricLabels = function() {
					let metrics        = [
						'Unique Visitors',
						'Customer Type: Consumer (Hit)',
						'Device Type: Desktop (Visit)',
						'Page URL: /plans/unlimited-data-plans.html',
					];
					let makeMetricCell = function( index ) {
						let div = $( '<div id="metric' + index + '" class="cell small-2">' );

						for( let i = 0; i < index + 1; i++ ) {
							$( div ).append( '<p style="font-size: 12px">' + metrics[ i ] + '</p>' );
						}

						return div;
					};
					let container      = $( '#metric-header' );
					let firstCell      = $( '<div class="cell small-4"></div>' );

					$( container ).empty().append( firstCell );

					for( let i = 0, total = metrics.length; i < total; i++ ) {
						$( container ).append( makeMetricCell( i ) );
					}
				};
				let generateMetricTotals = function() {
					let makeMetricCell = function( sum ) {
						let div = $( '<div class="cell small-2">' );

						return $( div ).append( '<p style="font-size: 12px">' + sum + '</p>' );
					};
					let container      = $( '#metric-total' );
					let firstCell      = $( '<div class="cell small-4"><p>target activity &gt; experience</p></div>' );

					$( container ).empty().append( firstCell );

					for( let i = 0, total = metrics[ 0 ].metric.metrics.length; i < total; i++ ) {
						let sum = 0;

						for( let e = 0, max = metrics.length; e < max; e++ ) {
							sum += metrics[ e ].metric.metrics[ i ];
						}

						$( container ).append( makeMetricCell( sum ) );
					}
				};
				let generateMetricRow    = function() {
					let makeFirstCell  = function( data ) {
						return $( '<div id="' + data.id + '" class="cell small-4"><p style="font-size: 14px">' + data.name + '</p></div>' );
					};
					let makeMetricCell = function( sum ) {
						let div = $( '<div class="cell small-2">' );

						return $( div ).append( '<p style="font-size: 12px">' + sum + '</p>' );
					};
					let container      = $( '#metric-segment' );

					$( container ).empty();

					for( let i = 0, total = metrics.length; i < total; i++ ) {
						$( container ).append( makeFirstCell( metrics[ i ].metric ) );

						for( let e = 0, max = metrics[ i ].metric.metrics.length; e < max; e++ ) {
							$( container ).append( makeMetricCell( metrics[ i ].metric.metrics[ e ] ) );
						}
					}
				};

				generateMetricLabels();
				generateMetricTotals();
				generateMetricRow();
				console.log( 'metrics', metrics );
				console.log( 'meta', meta );
			} ).fail( function( result ) {
				console.log( 'ahhh, something went wrong...' );
			} );
		};
		let searchActivities = function( search ) {
			let result = [];
			let regex  = new RegExp( '^' + search, 'i' );

			for( let i = 0, total = activities.length; i < total; i++ ) {
				if( regex.test( activities[ i ].activity.name ) === true ) {
					result.push( activities[ i ].activity.id );
				}
			}

			if( result.length ) {
				getActivity( result );
			}
		};

		getActivity( [
			             1621921405,
			             2733300011,
		             ], '3/29/2018',
		             '4/17/2018' );
		$( '#search-input' ).attr( 'placeholder', 'cro-18' ).focus().on( 'input', function( event ) {
			event.preventDefault();

			if( $( this ).val().length > 5 ) {
				searchActivities( $( this ).val() );
				console.log( 'input changed', $( this ).val() );
			}
		} );
	} ).fail( function( jq, status, error ) {
		console.log( 'error', error );
	} );
} );