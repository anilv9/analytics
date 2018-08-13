$( document ).ready( function() {
	$.post( 'http://localhost:3000/adobe/analytics/report', {
		suite   : 'attconprod',
		activity: [
			3653065096,
			1572072234,
			367648878,
			372307963,
			1604132996,
		],
		start   : '3/29/2018',
		end     : '4/17/2018',
	} ).done( function( result ) {
		let report               = result.data.report;
		let meta                 = result.meta;
		let generateDataRow      = function( isControl, activity, data ) {
			let index = isControl === true ? 0 : 1;

			return {
				id        : data[ index ].id,
				name      : data[ index ].name,
				visitors  : numeral( data[ index ].visitors ).format( '0,0' ),
				clicks    : numeral( data[ index ].clicks[ activity ].total ).format( '0,0' ),
				conversion: data[ index ].clicks[ activity ].conversion + '% &plusmn;' + data[ index ].clicks[ activity ].variance + '%',
				lift      : data[ index ].clicks[ activity ].lift + '%',
				confidence: data[ index ].clicks[ activity ].confidence + '%',
				orders    : {
					total     : data[ index ].orders.total,
					conversion: data[ index ].orders.conversion + '% &plusmn;' + data[ index ].orders.variance + '%',
					lift      : data[ index ].orders.lift + '%',
					confidence: data[ index ].orders.confidence + '%',
				},
			};
		};
		let updateDataRow        = function( data ) {
			let isClicks       = $( data.el ).find( '#clicks' ).length;
			let tempLift       = isClicks ? data.data.lift : data.data.orders.lift;
			let tempConfidence = isClicks ? data.data.confidence : data.data.orders.confidence;

			$( data.el ).attr( 'data-id', data.data.id );
			$( data.el ).find( '#variant' ).first().html( data.data.name );
			$( data.el ).find( '#visitors' ).first().html( data.data.visitors );
			$( data.el ).find( '#clicks' ).first().html( data.data.clicks );
			$( data.el ).find( '#orders' ).first().html( data.data.orders.total );
			$( data.el ).find( '#conversion' ).first().html( isClicks ? data.data.conversion : data.data.orders.conversion );
			$( data.el ).find( '#lift' ).first().html( tempLift === '0%' ? '-' : tempLift );
			$( data.el ).find( '#confidence' ).first().html( tempConfidence === '0%' ? '-' : tempConfidence );
		};
		let shopNow              = {
			control: {
				el  : $( '#shop-now-control' ),
				data: generateDataRow( true, 4, report ),
			},
			variant: {
				el  : $( '#shop-now-variant' ),
				data: generateDataRow( false, 4, report ),
			},
		};
		let wirelessOrders       = {
			control: {
				el  : $( '#wireless-orders-control' ),
				data: generateDataRow( true, 4, report ),
			},
			variant: {
				el  : $( '#wireless-orders-variant' ),
				data: generateDataRow( false, 4, report ),
			},
		};
		let cellphoneProgression = {
			control: {
				el  : $( '#cellphone-progression-control' ),
				data: generateDataRow( true, 4, report ),
			},
			variant: {
				el  : $( '#cellphone-progression-variant' ),
				data: generateDataRow( false, 4, report ),
			},
		};
		updateDataRow( shopNow.control );
		updateDataRow( shopNow.variant );
		updateDataRow( wirelessOrders.control );
		updateDataRow( wirelessOrders.variant );
		updateDataRow( cellphoneProgression.control );
		updateDataRow( cellphoneProgression.variant );

		console.log( 'report', report );
		console.log( 'meta', meta );
	} ).fail( function( result ) {
		//
	} );
} );