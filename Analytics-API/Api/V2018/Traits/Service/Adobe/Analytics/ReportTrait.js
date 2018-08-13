'use strict';

const Request                  = require( 'request' );
const Promise                  = require( 'promise' );
const Moment                   = require( 'moment' );
const Config                   = require( '../../../../Configurations/Configuration' );
const ActivityModel            = require( '../../../../Models/Service/Adobe/Analytics/ActivityModel' );
const ChannelModel             = require( '../../../../Models/Service/Adobe/Analytics/ChannelModel' );
const ChannelItemModel         = require( '../../../../Models/Service/Adobe/Analytics/Channel/ItemModel' );
const ClassificationModel      = require( '../../../../Models/Service/Adobe/Analytics/ClassificationModel' );
const ClassificationChildModel = require( '../../../../Models/Service/Adobe/Analytics/Classification/ChildModel' );
const ClassificationItemModel  = require( '../../../../Models/Service/Adobe/Analytics/Classification/ItemModel' );
const ElementModel             = require( '../../../../Models/Service/Adobe/Analytics/ElementModel' );
const GroupModel               = require( '../../../../Models/User/GroupModel' );
const MetricModel              = require( '../../../../Models/Service/Adobe/Analytics/MetricModel' );
const MetricComponentModel     = require( '../../../../Models/Service/Adobe/Analytics/Metric/ComponentModel' );
const MetricShareModel         = require( '../../../../Models/Service/Adobe/Analytics/Metric/ShareModel' );
const MetricTagModel           = require( '../../../../Models/Service/Adobe/Analytics/Metric/TagModel' );
const MetricUsageModel         = require( '../../../../Models/Service/Adobe/Analytics/Metric/UsageModel' );
const PropertyModel            = require( '../../../../Models/Service/Adobe/Analytics/PropertyModel' );
const PropertyItemModel        = require( '../../../../Models/Service/Adobe/Analytics/Property/ItemModel' );
const SegmentModel             = require( '../../../../Models/Service/Adobe/Analytics/SegmentModel' );
const SegmentItemModel         = require( '../../../../Models/Service/Adobe/Analytics/Segment/ItemModel' );
const SuiteModel               = require( '../../../../Models/Service/Adobe/Analytics/SuiteModel' );
const UserModel                = require( '../../../../Models/UserModel' );
const ErrorModule              = require( '../../../../Modules/Response/ErrorModule' );
const MetaModule               = require( '../../../../Modules/Response/MetaModule' );
const StandardModule           = require( '../../../../Modules/Service/Adobe/Analytics/Report/StandardModule' );
const ATrait                   = require( '../../../../Abstracts/Trait/ATrait' );
const OAuth1Trait              = require( '../OAuth/OAuth1Trait' );
const Calculate                = require( '../../../System/Calculate' );
const ProxyTrait               = require( '../../../System/ProxyTrait' );
const Utility                  = require( '../../../System/Utility' );

/**
 * @namespace {ReportTrait} App.Api.V2018.Traits.Service.Adobe.Analytics
 * @static
 * @access public
 * @author Isaac Ewing
 * @version 1.0.0 - 07/24/18 10:49 am - created
 */
class ReportTrait extends ATrait {
	constructor() {
		super();
	}

	/**
	 *
	 * @static
	 * @param {*} req
	 * @return {Promise}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/27/18 02:33 pm - created
	 */
	static getActivitiesList( req ) {
		req.parameters = req.parameters || {};
		console.log( 'running starter - get activities' );

		return new Promise( function( resolve ) {
			req.query.url   = 'https://appservice5-3.omniture.com/analytics/1.0/reports/topItems';
			req.query.range = req.query.range || Utility.startEndToDateRange( req.query.start, req.query.end );
			/*
			 Utility.download( req ).then( function( result ) {
			 if( !result instanceof ErrorModule ) {
			 let start       = data.number;
			 let pages       = data[ 'totalPages' ];
			 let limit       = data[ 'numberOfElements' ];
			 let mapActivity = function( data ) {
			 return {
			 id  : data.itemId,
			 name: data.value,
			 };
			 };
			 }
			 } );
			 */

			Request.get( {
				             url    : req.query.url || 'https://appservice5-3.omniture.com/analytics/1.0/reports/topItems',
				             qs     : {
					             local                            : 'en_US',
					             locale                           : 'en_US',
					             rsid                             : req.query.suite || 'attconprod',
					             page                             : req.query.page || 0,
					             limit                            : req.query.limit || 100,
					             generateTopItemsForTimeDimensions: 'true',
					             dimension                        : 'variables/targetraw.activityexperience',
					             dateRange                        : req.query.range || Utility.Dates.last30Days(),
				             },
				             headers: {
					             'Authorization'  : 'Bearer ' + Config.Adobe.OAuth.v2.shortcut,
					             'x-api-key'      : Config.Adobe.OAuth.v2.client,
					             'x-proxy-company': Config.Adobe.OAuth.v2.company,
					             'Accept'         : 'application/json',
					             'Cache-Control'  : 'no-cache',
					             'Content-Type'   : 'application/json',
				             },
				             body   : {},
				             json   : true,
			             },
			             function( err, httpResponse, body ) {
				             console.log( 'get activities', body );

				             if( body && Utility.isErrorFreeResult( body ) ) {
					             let start                  = body.number;
					             let pages                  = body[ 'totalPages' ];
					             let limit                  = body[ 'numberOfElements' ];
					             let elements               = body[ 'totalElements' ];
					             let timestamp              = Utility.Dates.seconds;
					             /**
					              *
					              * @param {object} data
					              * @return {ActivityModel}
					              * @access public
					              * @author Isaac Ewing
					              * @version 1.0.0 - 07/30/18 02:15 pm - created
					              */
					             let mapActivity            = function( data ) {
						             return new ActivityModel( {
							                                       id     : data.itemId,
							                                       name   : data.value,
							                                       created: timestamp,
							                                       updated: timestamp,
							                                       deleted: null,
						                                       } );
					             };
					             /**
					              * @param {object} data
					              */
					             let getRemainingActivities = function( data ) {
						             let temp = [];

						             for( let i = data.start + 1; i < data.pages; i++ ) {
							             req.query.page = i;
							             req.query.skip = 'true';
							             console.log( '... req query', req.query );
							             temp.push( Utility.download( req ) );
						             }

						             return Promise.all( temp );
					             };

					             for( let i = 0, total = body.rows.length; i < total; i++ ) {
						             Config.Adobe.Analytics.report.activities.push( mapActivity( body.rows[ i ] ) );
					             }

					             if( req.query.skip === 'true' ) {
						             resolve( new MetaModule( 200, Config.Adobe.Analytics.report.activities.length, {
							             activities: Config.Adobe.Analytics.report.activities,
						             } ) );
					             } else {
						             getRemainingActivities( {
							                                     start: start,
							                                     pages: pages,
							                                     limit: limit,
						                                     } ).then( function( result ) {
							             let activities = [];

							             for( let i = 0, total = result.length; i < total; i++ ) {
								             for( let e = 0, rows = result[ i ].data.body.rows.length; e < rows; e++ ) {
									             Config.Adobe.Analytics.report.activities.push( mapActivity( result[ i ].data.body.rows[ e ] ) );
								             }
							             }
							             for( let i = 0, total = Config.Adobe.Analytics.report.activities.length; i < total; i++ ) {
								             try {
									             let query   = { id: Config.Adobe.Analytics.report.activities[ i ].id };
									             let update  = { $set: { updated: timestamp } };
									             let options = {
										             new                : true,
										             upsert             : true,
										             setDefaultsOnInsert: true,
									             };

									             ActivityModel.findOneAndUpdate( query, update, options, function( err, doc ) {
										             if( doc ) {
											             if( Utility.isFail( doc.name ) || Utility.isFail( doc.created ) || Utility.isFail( doc.updated ) ) {
												             doc.id      = doc.id || Config.Adobe.Analytics.report.activities[ i ].id;
												             doc.name    = doc.name || Config.Adobe.Analytics.report.activities[ i ].name;
												             doc.created = doc.created || timestamp;
												             doc.updated = doc.updated || timestamp;
												             doc.deleted = doc.deleted || null;
												             doc.save().then( function( model ) {
													             //console.log( '--- check if the model was saved' );
												             } );
											             }
											             activities.push( {
												                              activity: {
													                              id  : doc.id,
													                              name: doc.name,
												                              },
											                              } );
											             console.log( '+++ added activity', activities[ activities.length - 1 ] );
										             } else {
											             console.log( 'activity exception', err );
										             }
										             if( Config.Adobe.Analytics.report.activities.length === activities.length ) {
											             resolve( new MetaModule( 200, Config.Adobe.Analytics.report.activities.length, {
												             activities: activities,
											             } ) );
										             } else {
											             console.log( '--- config', Config.Adobe.Analytics.report.activities.length, 'activities', activities.length, 'elements', elements );
										             }
									             } );
								             } catch( exception ) {
									             console.log( 'XXX activity exception', exception );
								             }
							             }
						             } );
					             }
				             } else {
					             resolve( ErrorModule.detectError( body || err ) );
				             }
			             } );
		} );
	}

	/**
	 *
	 * @static
	 * @return {Promise}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 03:57 pm - created
	 */
	static getUsersList() {
		console.log( 'running starter - get users' );

		return new Promise( function( resolve ) {
			Request.post( {
				              url    : 'https://api.omniture.com/admin/1.4/rest/',
				              qs     : {
					              method: 'Permissions.GetLogins',
				              },
				              headers: {
					              'Authorization'  : 'Bearer ' + Config.Adobe.OAuth.v1.shortcut,
					              'x-api-key'      : Config.Adobe.OAuth.v2.client,
					              'x-proxy-company': Config.Adobe.OAuth.v2.company,
					              'Accept'         : 'application/json',
					              'Cache-Control'  : 'no-cache',
					              'Content-Type'   : 'application/json',
				              },
				              body   : {},
				              json   : true,
			              },
			              function( err, httpResponse, body ) {
				              console.log( 'get users', body );

				              if( body && Utility.isErrorFreeResult( body ) ) {
					              let mapUser = function( data ) {
						              return new UserModel( {
							                                    username : data.login || '',
							                                    name     : {
								                                    first: data[ 'first_name' ] || '',
								                                    last : data[ 'last_name' ] || '',
							                                    },
							                                    title    : data.title || '',
							                                    email    : data.email || '',
							                                    lastLogin: data[ 'last_login' ] || '',
							                                    admin    : data[ 'is_admin' ] || false,
							                                    imsUserId: data[ 'ims_user_id' ] || 0,
						                                    } );
					              };
					              for( let i = 0, total = body.length; i < total; i++ ) {
						              Config.Adobe.Analytics.report.users.push( mapUser( body[ i ] ) );
					              }

					              resolve( new MetaModule( 200, Config.Adobe.Analytics.report.users.length, {
						              users: Config.Adobe.Analytics.report.users,
					              } ) );
				              } else {
					              resolve( ErrorModule.unauthorized() );
				              }
			              } );
		} );
	}

	/**
	 *
	 * @static
	 * @return {Promise}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 03:57 pm - created
	 */
	static getGroupsList() {
		console.log( 'running starter - get groups' );

		return new Promise( function( resolve ) {
			Request.post( {
				              url    : 'https://api.omniture.com/admin/1.4/rest/',
				              qs     : {
					              method: 'Permissions.GetGroups',
				              },
				              headers: {
					              'Authorization'  : 'Bearer ' + Config.Adobe.OAuth.v1.shortcut,
					              'x-api-key'      : Config.Adobe.OAuth.v2.client,
					              'x-proxy-company': Config.Adobe.OAuth.v2.company,
					              'Accept'         : 'application/json',
					              'Cache-Control'  : 'no-cache',
					              'Content-Type'   : 'application/json',
				              },
				              body   : {},
				              json   : true,
			              },
			              function( err, httpResponse, body ) {
				              console.log( 'get groups', body );

				              if( body && Utility.isErrorFreeResult( body ) ) {
					              let mapGroup = function( data ) {
						              return new GroupModel( {
							                                     id         : data[ 'group_id' ] || '',
							                                     name       : data[ 'group_name' ] || '',
							                                     description: data[ 'group_description' ] || '',
						                                     } );
					              };
					              for( let i = 0, total = body.length; i < total; i++ ) {
						              Config.Adobe.Analytics.report.groups.push( mapGroup( body[ i ] ) );
					              }

					              resolve( new MetaModule( 200, Config.Adobe.Analytics.report.groups.length, {
						              groups: Config.Adobe.Analytics.report.groups,
					              } ) );
				              } else {
					              resolve( ErrorModule.unauthorized() );
				              }
			              } );
		} );
	}

	/**
	 *
	 * @static
	 * @return {Promise}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 08:57 pm - created
	 */
	static getSuitesList() {
		console.log( 'running starter - get suites' );

		return new Promise( function( resolve ) {
			Request.post( {
				              url    : 'https://api.omniture.com/admin/1.4/rest/',
				              qs     : {
					              method: 'Company.GetReportSuites',
				              },
				              headers: {
					              'Authorization'  : 'Bearer ' + Config.Adobe.OAuth.v1.shortcut,
					              'x-api-key'      : Config.Adobe.OAuth.v2.client,
					              'x-proxy-company': Config.Adobe.OAuth.v2.company,
					              'Accept'         : 'application/json',
					              'Cache-Control'  : 'no-cache',
					              'Content-Type'   : 'application/json',
				              },
				              body   : {},
				              json   : true,
			              },
			              function( err, httpResponse, body ) {
				              console.log( 'get groups', body );

				              if( body && Utility.isErrorFreeResult( body ) ) {
					              let mapSuite = function( data ) {
						              return new SuiteModel( {
							                                     id  : data.rsid || '',
							                                     name: data[ 'site_title' ] || '',
						                                     } );
					              };

					              for( let i = 0, total = body[ 'report_suites' ].length; i < total; i++ ) {
						              Config.Adobe.Analytics.report.suites.push( mapSuite( body[ 'report_suites' ][ i ] ) );
					              }

					              resolve( new MetaModule( 200, Config.Adobe.Analytics.report.suites.length, {
						              suites: Config.Adobe.Analytics.report.suites,
					              } ) );
				              } else {
					              resolve( ErrorModule.unauthorized() );
				              }
			              } );
		} );
	}

	/**
	 *
	 * @static
	 * @param {*} req
	 * @return {Promise}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 09:17 pm - created
	 */
	static getElementsList( req ) {
		req.parameters = req.parameters || {};
		console.log( 'running starter - get elements' );

		return new Promise( function( resolve ) {
			Request.post( {
				              url    : 'https://api.omniture.com/admin/1.4/rest/',
				              qs     : {
					              method: 'Report.GetElements',
				              },
				              headers: {
					              'Authorization'  : 'Bearer ' + Config.Adobe.OAuth.v1.shortcut,
					              'x-api-key'      : Config.Adobe.OAuth.v2.client,
					              'x-proxy-company': Config.Adobe.OAuth.v2.company,
					              'Accept'         : 'application/json',
					              'Cache-Control'  : 'no-cache',
					              'Content-Type'   : 'application/json',
				              },
				              body   : {
					              'reportSuiteID': req.parameters[ 'suite' ] || Config.Adobe.Analytics.suites.conProd,
					              locale         : req.parameters[ 'locale' ] || 'en_US',
				              },
				              json   : true,
			              },
			              function( err, httpResponse, body ) {
				              console.log( 'get elements', body );

				              if( body && Utility.isErrorFreeResult( body ) ) {
					              let mapElement = function( data ) {
						              return new ElementModel( {
							                                       id         : data.id || '',
							                                       name       : data.name || '',
							                                       correlation: data.correlation || false,
							                                       subrelation: data.subrelation || false,
						                                       } );
					              };
					              for( let i = 0, total = body.length; i < total; i++ ) {
						              Config.Adobe.Analytics.report.elements.push( mapElement( body[ i ] ) );
					              }

					              resolve( new MetaModule( 200, Config.Adobe.Analytics.report.elements.length, {
						              elements: Config.Adobe.Analytics.report.elements,
					              } ) );
				              } else {
					              resolve( ErrorModule.unauthorized() );
				              }
			              } );
		} );
	}

	/**
	 *
	 * @static
	 * @param {*} req
	 * @return {Promise}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 09:32 pm - created
	 */
	static getMetricsList( req ) {
		req.parameters = req.parameters || {};
		console.log( 'running starter - get metrics' );
		let templateTokenModule = Config.Adobe.OAuth.v2.toTokenModule();

		return new Promise( function( resolve ) {
			Request.get( {
				             url    : Config.Adobe.OAuth.v2.url,
				             qs     : {
					             rsid  : Config.Adobe.Analytics.suites.conProd,
					             locale: 'en_US',
				             },
				             headers: {
					             'Authorization'  : templateTokenModule.type + ' ' + Config.Adobe.OAuth.v2.shortcut,
					             'x-api-key'      : Config.Adobe.OAuth.v2.client,
					             'x-proxy-company': Config.Adobe.OAuth.v2.company,
					             'Accept'         : 'application/json',
					             'Cache-Control'  : 'no-cache',
					             'Content-Type'   : 'application/json',
				             },
				             body   : {},
				             json   : true,
			             },
			             function( err, httpResponse, body ) {
				             console.log( 'get metrics', body );
				             console.log( 'get error', err );

				             if( body && Utility.isErrorFreeResult( body ) ) {
					             /**
					              *
					              * @param {*} data
					              * @returns MetricShareModel
					              * @access public
					              * @author Isaac Ewing
					              * @version 1.0.0 - 07/24/18 10:03 pm - created
					              */
					             let mapShare  = function( data ) {
						             return new MetricShareModel( {
							                                          id       : data[ 'shareId' ] || 0,
							                                          to       : {
								                                          id   : data[ 'shareToId' ] || 0,
								                                          type : data[ 'shareToType' ] || '',
								                                          name : data[ 'shareToDisplayName' ] || '',
								                                          login: data[ 'shareToLogin' ] || '',
							                                          },
							                                          component: {
								                                          id  : data[ 'componentId' ] || '',
								                                          type: data[ 'componentType' ] || '',
							                                          },
						                                          } );
					             };
					             /**
					              *
					              * @param {*} data
					              * @returns MetricUsageModel
					              * @access public
					              * @author Isaac Ewing
					              * @version 1.0.0 - 07/24/18 10:03 pm - created
					              */
					             let mapUsage  = function( data ) {
						             return new MetricUsageModel( {
							                                          item     : data.itemId || '',
							                                          count    : data.count || 0,
							                                          score    : data[ 'relevancyScore' ] || 0,
							                                          timestamp: data[ 'mostRecentTimestamp' ] || '',
						                                          } );
					             };
					             /**
					              *
					              * @param data
					              * @return MetricTagSchema
					              * @access public
					              * @author Isaac Ewing
					              * @version 1.0.0 - 07/24/18 10:03 pm - created
					              */
					             let mapTag    = function( data ) {
						             /**
						              *
						              * @param {*} data
						              * @return MetricComponentModel
						              * @access public
						              * @author Isaac Ewing
						              * @version 1.0.0 - 07/24/18 10:03 pm - created
						              */
						             let mapComponent = function( data ) {
							             return new MetricComponentModel( {
								                                              id  : data[ 'componentId' ] || '',
								                                              type: data[ 'componentType' ] || '',
								                                              tags: data.tags || [],
							                                              } );
						             };
						             /**
						              * @property {MetricTagModel} tag
						              * @access public
						              * @author Isaac Ewing
						              * @version 1.0.0 - 07/24/18 10:03 pm - created
						              */
						             let tag          = new MetricTagModel( {
							                                                    id         : data.id || 0,
							                                                    name       : data.name || '',
							                                                    description: data.description || '',
							                                                    components : [],
						                                                    } );
						             let components   = data.components || [];

						             for( let i = 0, total = components.length; i < total; i++ ) {
							             tag[ 'components' ].push( mapComponent( components[ i ] ) );
						             }

						             return tag;
					             };
					             let mapMetric = function( data ) {
						             let metric   = new MetricModel(
							             {
								             type       : data.type || '',
								             id         : data.id || '',
								             title      : {
									             name : data.title || '',
									             extra: data[ 'extraTitleInfo' ] || '',
								             },
								             name       : data.name || '',
								             category   : data.category || '',
								             precision  : data.precision || 0,
								             calculated : data.calculated || false,
								             description: data.description || '',
								             polarity   : data.polarity || 'positive',
								             hidden     : data.hidden || true,
								             help       : data[ 'helpLink' ] || '',
								             shares     : [],
								             approved   : data.approved || true,
								             favorite   : data.favorite || true,
								             usage      : mapUsage( data[ 'usageSummary' ] || {} ),
								             tags       : [],
								             support    : [],
							             } );
						             let shares   = data.shares || [];
						             let tags     = data.tags || [];
						             let supports = data.support || [];

						             for( let i = 0, total = shares.length; i < total; i++ ) {
							             metric[ 'shares' ].push( mapShare( shares[ i ] ) );
						             }
						             for( let i = 0, total = tags.length; i < total; i++ ) {
							             metric[ 'tags' ].push( mapTag( tags[ i ] ) );
						             }
						             for( let i = 0, total = supports.length; i < total; i++ ) {
							             metric[ 'support' ].push( supports[ i ] );
						             }

						             return metric;
					             };

					             for( let i = 0, total = body.length; i < total; i++ ) {
						             console.log( 'metric[' + i + ']', body[ i ] );
						             Config.Adobe.Analytics.report.metrics.push( mapMetric( body[ i ] ) );
					             }

					             resolve( new MetaModule( 200, Config.Adobe.Analytics.report.metrics.length, {
						             metrics: Config.Adobe.Analytics.report.metrics,
					             } ) );
				             } else {
					             resolve( ErrorModule.unauthorized() );
				             }
			             } );
		} );
	}

	/**
	 *
	 * @static
	 * @param {*} req
	 * @return {Promise}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 10:29 pm - created
	 */
	static getClassificationsList( req ) {
		req.parameters = req.parameters || {};
		console.log( 'running starter - get classifications' );

		return new Promise( function( resolve ) {
			Request.post( {
				              url    : 'https://api.omniture.com/admin/1.4/rest/',
				              qs     : {
					              method: 'ReportSuite.GetClassifications',
				              },
				              headers: {
					              'Authorization'  : 'Bearer ' + Config.Adobe.OAuth.v1.shortcut,
					              'x-api-key'      : Config.Adobe.OAuth.v2.client,
					              'x-proxy-company': Config.Adobe.OAuth.v2.company,
					              'Accept'         : 'application/json',
					              'Cache-Control'  : 'no-cache',
					              'Content-Type'   : 'application/json',
				              },
				              body   : {
					              'rsid_list': [
						              Config.Adobe.Analytics.suites.conProd,
					              ],
				              },
				              json   : true,
			              },
			              function( err, httpResponse, body ) {
				              console.log( 'get classifications', body );

				              if( body && Utility.isErrorFreeResult( body ) ) {
					              /**
					               *
					               * @param {object} data
					               * @returns ClassificationModel
					               */
					              let mapClassification = function( data ) {
						              return new ClassificationModel( {
							                                              id             : data.id,
							                                              name           : data.name,
							                                              classifications: [],
						                                              } );
					              };
					              /**
					               *
					               * @param {object} data
					               * @returns ClassificationItemModel
					               */
					              let mapItem           = function( data ) {
						              return new ClassificationItemModel( {
							                                                  type       : data.type,
							                                                  name       : data.name,
							                                                  description: data.description,
							                                                  dateEnabled: data[ 'date_enabled' ],
							                                                  children   : [],
						                                                  } );
					              };
					              /**
					               *
					               * @param {object} data
					               * @returns ClassificationChildModel
					               */
					              let mapChild          = function( data ) {
						              return new ClassificationChildModel( {
							                                                   type       : data.type,
							                                                   name       : data.name,
							                                                   description: data.description,
							                                                   parent     : data[ 'parent_name' ],
							                                                   dateEnabled: data[ 'date_enabled' ],
						                                                   } );
					              };

					              for( let x = 0, classificationTotal = body.length; x < classificationTotal; x++ ) {
						              //console.log( 'classification response', body[ x ] );
						              let classification = new ClassificationModel( {
							                                                            id             : body[ x ].rsid,
							                                                            name           : body[ x ][ 'site_title' ],
							                                                            classifications: [],
						                                                            } );

						              for( let i = 0, total = body[ x ][ 'element_classifications' ].length; i < total; i++ ) {
							              let aliasClassifications    = body[ x ][ 'element_classifications' ][ i ];
							              let aliasSubClassifications = aliasClassifications.classifications;
							              let tempClass               = mapClassification( aliasClassifications );

							              for( let e = 0, classes = aliasSubClassifications.length; e < classes; e++ ) {
								              let aliasHasChildren = typeof aliasSubClassifications[ e ].children !== 'undefined';
								              let item             = mapItem( aliasSubClassifications[ e ] );

								              console.log( '----------' );
								              console.log( 'alias has children', aliasHasChildren );
								              console.log( 'alias item map', item );
								              console.log( 'alias children', aliasSubClassifications[ e ].children );

								              if( aliasHasChildren ) {
									              let aliasChildren = aliasSubClassifications[ e ].children;

									              for( let j = 0, children = aliasChildren.length; j < children; j++ ) {
										              item.children.push( mapChild( aliasChildren[ j ] ) );
									              }

								              }

								              tempClass.classifications.push( item );
							              }

							              classification.classifications.push( tempClass );
						              }
						              Config.Adobe.Analytics.report.classifications.push( classification );
					              }

					              resolve( new MetaModule( 200, Config.Adobe.Analytics.report.classifications.length, {
						              classifications: Config.Adobe.Analytics.report.classifications,
					              } ) );
				              } else {
					              resolve( ErrorModule.unauthorized() );
				              }
			              } );
		} );
	}

	/**
	 *
	 * @static
	 * @param {*} req
	 * @return {Promise}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 11:04 pm - created
	 */
	static getSegmentsList( req ) {
		req.parameters = req.parameters || {};
		console.log( 'running starter - get segments' );

		return new Promise( function( resolve ) {
			Request.post( {
				              url    : 'https://api.omniture.com/admin/1.4/rest/',
				              qs     : {
					              method: 'ReportSuite.GetSegments',
				              },
				              headers: {
					              'Authorization'  : 'Bearer ' + Config.Adobe.OAuth.v1.shortcut,
					              'x-api-key'      : Config.Adobe.OAuth.v2.client,
					              'x-proxy-company': Config.Adobe.OAuth.v2.company,
					              'Accept'         : 'application/json',
					              'Cache-Control'  : 'no-cache',
					              'Content-Type'   : 'application/json',
				              },
				              body   : {
					              rsid_list: [
						              Config.Adobe.Analytics.suites.conProd,
					              ],
				              },
				              json   : true,
			              },
			              function( err, httpResponse, body ) {
				              console.log( 'get segments', body );

				              if( body && Utility.isErrorFreeResult( body ) ) {
					              /**
					               *
					               * @param {*} data
					               * @returns SegmentModel
					               */
					              let mapSegment     = function( data ) {
						              return new SegmentModel( {
							                                       id      : data.rsid,
							                                       segments: [],
						                                       } );
					              };
					              /**
					               *
					               * @param {*} data
					               * @returns SegmentItemModel
					               */
					              let mapSegmentItem = function( data ) {
						              return new SegmentItemModel( {
							                                           id      : data.id || '',
							                                           name    : data.name || '',
							                                           folder  : data.folder || '',
							                                           class   : data.class || '',
							                                           enabled : data[ 'suite_enabled' ] || false,
							                                           readOnly: data[ 'read_only' ] || false,
						                                           } );
					              };

					              for( let i = 0, total = body.length; i < total; i++ ) {
						              let segment = mapSegment( body[ i ] );

						              for( let e = 0, segments = body[ i ].segments.length; e < segments; e++ ) {
							              segment.segments.push( mapSegmentItem( body[ i ].segments[ e ] ) );
						              }

						              Config.Adobe.Analytics.report.segments.push( segment );
					              }

					              resolve( new MetaModule( 200, Config.Adobe.Analytics.report.segments.length, {
						              segments: Config.Adobe.Analytics.report.segments,
					              } ) );
				              } else {
					              resolve( ErrorModule.unauthorized() );
				              }
			              } );
		} );
	}

	/**
	 *
	 * @static
	 * @param {*} req
	 * @return {Promise}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/25/18 08:33 am - created
	 */
	static getPropertiesList( req ) {
		req.parameters = req.parameters || {};
		console.log( 'running starter - get properties' );

		return new Promise( function( resolve ) {
			Request.post( {
				              url    : 'https://api.omniture.com/admin/1.4/rest/',
				              qs     : {
					              method: 'ReportSuite.GetProps',
				              },
				              headers: {
					              'Authorization'  : 'Bearer ' + Config.Adobe.OAuth.v1.shortcut,
					              'x-api-key'      : Config.Adobe.OAuth.v2.client,
					              'x-proxy-company': Config.Adobe.OAuth.v2.company,
					              'Accept'         : 'application/json',
					              'Cache-Control'  : 'no-cache',
					              'Content-Type'   : 'application/json',
				              },
				              body   : {
					              rsid_list: [
						              Config.Adobe.Analytics.suites.conProd,
					              ],
				              },
				              json   : true,
			              },
			              function( err, httpResponse, body ) {
				              console.log( 'get properties', body );

				              if( body && Utility.isErrorFreeResult( body ) ) {
					              /**
					               *
					               * @param {*} data
					               * @returns PropertyModel
					               */
					              let mapProperty     = function( data ) {
						              return new PropertyModel( {
							                                        id        : data.rsid,
							                                        name      : data[ 'site_title' ],
							                                        properties: [],
						                                        } );
					              };
					              /**
					               *
					               * @param {*} data
					               * @returns PropertyItemModel
					               */
					              let mapPropertyItem = function( data ) {
						              return new PropertyItemModel( {
							                                            id           : data.id | '',
							                                            name         : data.name || '',
							                                            enabled      : data.enabled || false,
							                                            pathing      : data[ 'pathing_enabled' ] || false,
							                                            participation: data[ 'participation_enabled' ] || false,
							                                            description  : data.description || '',
							                                            list         : {
								                                            enabled  : data[ 'list_enabled' ] || false,
								                                            delimiter: data.delimiter || null,
							                                            },
							                                            case         : {
								                                            insensitive: data[ 'case_insensitive' ] || false,
								                                            dateEnabled: data[ 'case_insensitive_date_enabled' ] || null,
							                                            },
						                                            } );
					              };
					              for( let i = 0, total = body.length; i < total; i++ ) {
						              let property = mapProperty( body[ i ] );

						              for( let e = 0, properties = body[ i ][ 'props' ].length; e < properties; e++ ) {
							              property.properties.push( mapPropertyItem( body[ i ][ 'props' ][ e ] ) );
						              }

						              Config.Adobe.Analytics.report.properties.push( property );
					              }

					              resolve( new MetaModule( 200, Config.Adobe.Analytics.report.properties.length, {
						              properties: Config.Adobe.Analytics.report.properties,
					              } ) );
				              } else {
					              resolve( ErrorModule.unauthorized() );
				              }
			              } );
		} );
	}

	/**
	 *
	 * @static
	 * @param {*} req
	 * @return {Promise}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/25/18 08:49 am - created
	 */
	static getChannelsList( req ) {
		req.parameters = req.parameters || {};
		console.log( 'running starter - get channels' );

		return new Promise( function( resolve ) {
			Request.post( {
				              url    : 'https://api.omniture.com/admin/1.4/rest/',
				              qs     : {
					              method: 'ReportSuite.GetMarketingChannels',
				              },
				              headers: {
					              'Authorization'  : 'Bearer ' + Config.Adobe.OAuth.v1.shortcut,
					              'x-api-key'      : Config.Adobe.OAuth.v2.client,
					              'x-proxy-company': Config.Adobe.OAuth.v2.company,
					              'Accept'         : 'application/json',
					              'Cache-Control'  : 'no-cache',
					              'Content-Type'   : 'application/json',
				              },
				              body   : {
					              rsid_list: [
						              Config.Adobe.Analytics.suites.conProd,
					              ],
				              },
				              json   : true,
			              },
			              function( err, httpResponse, body ) {
				              console.log( 'get channels', body );

				              if( body && Utility.isErrorFreeResult( body ) ) {
					              /**
					               *
					               * @param {*} data
					               * @returns ChannelModel
					               * @access public
					               * @author Isaac Ewing
					               * @version 1.0.0 - 07/25/18 09:04 am - created
					               */
					              let mapChannel     = function( data ) {
						              return new ChannelModel( {
							                                       id      : data.rsid,
							                                       channels: [],
						                                       } );
					              };
					              /**
					               *
					               * @param {*} data
					               * @returns ChannelItemModelItemSchema
					               * @access public
					               * @author Isaac Ewing
					               * @version 1.0.0 - 07/25/18 09:04 am - created
					               */
					              let mapChannelItem = function( data ) {
						              return new ChannelItemModel( {
							                                           id       : data[ 'channel_id' ] || 0,
							                                           name     : data.name || '',
							                                           type     : data.type || '',
							                                           color    : data.color || '',
							                                           enabled  : data.enabled || false,
							                                           breakdown: data[ 'channel_breakdown' ] || 0,
							                                           override : data[ 'override_last_touch_channel' ] || false,
						                                           } );
					              };

					              for( let i = 0, total = body.length; i < total; i++ ) {
						              let channel = mapChannel( body[ i ] );

						              for( let e = 0, channels = body[ i ][ 'marketing_channels' ].length; e < channels; e++ ) {
							              channel.channels.push( mapChannelItem( body[ i ][ 'marketing_channels' ][ e ] ) );
						              }

						              Config.Adobe.Analytics.report.channels.push( channel );
					              }

					              resolve( new MetaModule( 200, Config.Adobe.Analytics.report.channels.length, {
						              channels: Config.Adobe.Analytics.report.channels,
					              } ) );
				              } else {
					              resolve( ErrorModule.unauthorized() );
				              }
			              } );
		} );
	}

	/**
	 *
	 * @static
	 * @param {*} req
	 * @return {Promise}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/25/18 09:53 am - created
	 */
	static getAllList( req ) {
		req.parameters = req.parameters || {};
		console.log( 'running starter - get all' );

		return Promise.all( [
			                    this.getActivitiesList( req ),
			                    this.getUsersList(),
			                    this.getGroupsList(),
			                    this.getSuitesList(),
			                    this.getElementsList( req ),
			                    this.getMetricsList( req ),
			                    this.getClassificationsList( req ),
			                    this.getSegmentsList( req ),
			                    this.getPropertiesList( req ),
			                    this.getChannelsList( req ),
		                    ] );
	}

	/**
	 * @static
	 * @param {object} req
	 * @param {object} res
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 12:41 pm - created
	 */
	static getStandardReport( req, res ) {
		let getClicks   = function( activities ) {
			let metricGenerator = function() {
				let count   = 0;
				let metrics = [];

				for( let i = 0, total = activities.length; i < total; i++ ) {
					metrics.push( {
						              'id'       : count,
						              'type'     : 'breakdown',
						              'dimension': 'variables/targetraw.activityexperience',
						              'itemId'   : activities[ i ].id,
					              } );
					count++;
				}
				console.log( '--- metrics2', metrics );

				return metrics;
			};
			let callback        = function( exception, httpResponse, body ) {
				if( body && Utility.isErrorFreeResult( body ) ) {
					let mapClicks = function( index, data ) {
						return activities[ index ].addClicks( data.itemId, data.value, data.data[ index ] );
					};
					console.log( '/adobe/analytics/report {body.rows2}', body.rows );
					//let user = mapUser( body );
					//console.log( '--- body', body );
					//console.log( '--- user', user );

					for( let a = 0, aTotal = activities.length; a < aTotal; a++ ) {
						for( let i = 0, total = body.rows.length; i < total; i++ ) {
							let data = body.rows[ i ];
							mapClicks( a, data );

							activities[ a ].clicks[ i ].conversion = Calculate.conversionRate( data.data[ a ], activities[ a ].visitors );
							activities[ a ].clicks[ i ].variance   = Calculate.conversionVariance( activities[ a ].clicks[ i ].conversion, activities[ a ].visitors );

							if( a !== 0 ) {
								let conversion1 = activities[ a - 1 ].clicks[ i ].conversion;
								let conversion2 = activities[ a ].clicks[ i ].conversion;

								activities[ a ].clicks[ i ].lift       = Calculate.lift( conversion1, conversion2 );
								activities[ a ].clicks[ i ].confidence = Calculate.confidence( conversion1, conversion2 );
							}
						}
					}

					console.log( '---report', activities );
					getOrders( activities );
				}
				else if( exception ) {
					ReportTrait.handleExceptionResponse( res, exception );
				} else {
					if( body ) {
						ReportTrait.handleExceptionResponse( res, body );
					} else {
						ReportTrait.toResponse( res, ErrorModule.badRequest() );
					}
				}
			};

			ProxyTrait.post( {
				                 url    : 'https://appservice5-1.omniture.com/analytics/1.0/reports/ranked',
				                 query  : ReportTrait.getStandardParams(),
				                 headers: ReportTrait.getStandardHeaders(),
				                 body   : {
					                 'rsid'           : 'attconprod',
					                 'globalFilters'  : [
						                 {
							                 'type'     : 'segment',
							                 'segmentId': 's300000384_5a8c6f6a0402fd60a444bdc3',
						                 },
						                 {
							                 'type'     : 'segment',
							                 'segmentId': 's300000384_58102727e4b0c7fcac6c1150',
						                 },
						                 {
							                 'type'     : 'segment',
							                 'segmentId': 's300000384_5b0dbd8e331998617d5af97a',
						                 },
						                 {
							                 'type'     : 'dateRange',
							                 'dateRange': req.body.dateRange || Utility.DateRange.last30Days,
						                 },
					                 ],
					                 'metricContainer': {
						                 'metrics'      : [
							                 {
								                 'columnId': '1',
								                 'id'      : 'metrics/visitors',
								                 'sort'    : 'desc',
								                 'filters' : [
									                 '0',
								                 ],
							                 },
							                 {
								                 'columnId': '3',
								                 'id'      : 'metrics/visitors',
								                 'filters' : [
									                 '1',
								                 ],
							                 },
						                 ],
						                 'metricFilters': metricGenerator(),
					                 },
					                 'dimension'      : 'variables/prop18',
					                 'settings'       : {
						                 'countRepeatInstances': true,
						                 'limit'               : 10,
						                 'page'                : 0,
					                 },
					                 'statistics'     : {
						                 'functions': [
							                 'col-max',
							                 'col-min',
						                 ],
					                 },
				                 },
			                 }, callback );
		};
		let getOrders   = function( activities ) {
			let generateContainer = function() {
				let count   = 0;
				let metrics = [];

				for( let i = 0, total = activities.length; i < total; i++ ) {
					metrics.push( {
						              'columnId': i + 1,
						              'id'      : 'metrics/visitors',
						              'sort'    : 'desc',
						              'filters' : [
							              count,
							              ++count,
						              ],
					              } );
					count++;
				}

				console.log( '--- orders[orders]', metrics );

				return metrics;
			};
			let metricGenerator   = function() {
				let count   = 0;
				let metrics = [];

				for( let i = 0, total = activities.length; i < total; i++ ) {
					metrics.push( {
						              'id'       : count,
						              'type'     : 'breakdown',
						              'dimension': 'variables/evar13.7',
						              'itemId'   : '3072726619',
					              },
					              {
						              'id'       : ++count,
						              'type'     : 'breakdown',
						              'dimension': 'variables/targetraw.activityexperience',
						              'itemId'   : activities[ i ].id,
					              } );
					count++;
				}

				console.log( '--- orders[generators]', metrics );

				return metrics;
			};
			let callback          = function( exception, httpResponse, body ) {
				if( body && Utility.isErrorFreeResult( body ) ) {
					let mapOrders = function( module, orders, visitors ) {
						let conversion = Calculate.conversionRate( orders, visitors );

						module.orders.total      = orders||0;
						module.orders.variance   = Calculate.conversionVariance( conversion, visitors );
						module.orders.conversion = conversion;
					};

					console.log( '/adobe/analytics/report {body.rows3}', body.rows );
					//let user = mapUser( body );
					//console.log( '--- body', body );
					//console.log( '--- user', user );

					for( let a = 0, aTotal = activities.length; a < aTotal; a++ ) {
						let total = 0;

						for( let i = 0, iTotal = body.rows.length; i < iTotal; i++ ) {
							console.log( '--- orders row[' + i + ']', body.rows[ i ] );
							total += body.rows[ i ].data[ a ];
						}

						mapOrders( activities[ a ], total, activities[ a ].visitors );

						for( let i = 0, iTotal = body.rows.length; i < iTotal; i++ ) {
							if( a !== 0 ) {
								let conversion1 = activities[ a - 1 ].clicks[ i ].conversion;
								let conversion2 = activities[ a ].clicks[ i ].conversion;

								activities[ a ].clicks[ i ].lift       = Calculate.lift( conversion1, conversion2 );
								activities[ a ].clicks[ i ].confidence = Calculate.confidence( conversion1, conversion2 );
							}
						}
					}

					let tempResult = [];

					for( let i = 0, total = activities.length; i < total; i++ ) {
						tempResult.push( activities[ i ].toJSON() );
					}

					console.log( '---report', activities );
					console.log( '__________ completed regular stats __________' );
					ReportTrait.toResponse( res, new MetaModule( 200, tempResult.length, {
						report: tempResult,
					} ) );
				}
				else if( exception ) {
					ReportTrait.handleExceptionResponse( res, exception );
				} else {
					if( body ) {
						ReportTrait.handleExceptionResponse( res, body );
					} else {
						ReportTrait.toResponse( res, ErrorModule.badRequest() );
					}
				}
			};

			ProxyTrait.post( {
				                 url    : 'https://appservice5-1.omniture.com/analytics/1.0/reports/ranked',
				                 query  : ReportTrait.getStandardParams(),
				                 headers: ReportTrait.getStandardHeaders(),
				                 body   : {
					                 'rsid'           : req.body[ 'suite' ] || 'attconprod',
					                 'globalFilters'  : [
						                 {
							                 'type'     : 'segment',
							                 'segmentId': 's300000384_5a8c6f6a0402fd60a444bdc3',
						                 },
						                 {
							                 'type'     : 'segment',
							                 'segmentId': 's300000384_58102727e4b0c7fcac6c1150',
						                 },
						                 {
							                 'type'     : 'dateRange',
							                 'dateRange': req.body.dateRange || Utility.DateRange.last30Days,
						                 },
					                 ],
					                 'metricContainer': {
						                 'metrics'      : generateContainer(),
						                 'metricFilters': metricGenerator(),
					                 },
					                 'dimension'      : 'variables/evar20.2',
					                 'search'         : {
						                 'itemIds': [
							                 '3867551523',
							                 '3081151326',
							                 '2007841419',
						                 ],
					                 },
					                 'settings'       : {
						                 'countRepeatInstances': true,
						                 'limit'               : 50000,
					                 },
					                 'statistics'     : {
						                 'functions': [
							                 'col-max',
							                 'col-min',
						                 ],
					                 },
				                 },
			                 }, callback );
		};
		let getVisitors = function() {
			let callback = function( exception, httpResponse, body ) {
				if( body && Utility.isErrorFreeResult( body ) ) {
					let activities = [];

					for( let i = 0, total = body.rows.length; i < total; i++ ) {
						let test = body.rows[ i ].data.length === 1 ? body.rows[ i ].data.pop() : body.rows[ i ].data;
						let temp = new StandardModule( body.rows[ i ].itemId, body.rows[ i ].value, test );

						console.log( 'visitors[' + i + ']', temp.visitors );

						activities.push( temp );
					}

					if( activities.length === 0 && req.body.activity.length !== 0 ) {
						for( let i = 0, total = req.body.activity.length; i < total; i++ ) {
							let temp = new StandardModule( req.body.activity[ i ], '--- No result for activity ' + req.body.activity[ i ] );
							console.log( 'visitors[' + i + ']', temp.visitors );
							activities.push( temp );
						}
					}

					console.log( '--- activities1', activities );

					getClicks( activities );
				} else if( exception ) {
					ReportTrait.toResponse( res, ErrorModule.detectError( exception ) );
				} else {
					if( body ) {
						ReportTrait.toResponse( res, ErrorModule.detectError( body ) );
					} else {
						ReportTrait.toResponse( res, ErrorModule.badRequest() );
					}
				}
			};

			ProxyTrait.post( {
				                 url    : 'https://appservice5-1.omniture.com/analytics/1.0/reports/ranked',
				                 query  : ReportTrait.getStandardParams(),
				                 headers: ReportTrait.getStandardHeaders(),
				                 body   : {
					                 'rsid'           : req.body[ 'suite' ] || 'attconprod',
					                 'globalFilters'  : [
						                 {
							                 'type'     : 'segment',
							                 'segmentId': 's300000384_5a8c6f6a0402fd60a444bdc3',
						                 },
						                 {
							                 'type'     : 'segment',
							                 'segmentId': 's300000384_58102727e4b0c7fcac6c1150',
						                 },
						                 {
							                 'type'     : 'segment',
							                 'segmentId': 's300000384_5b0dbc687f0bfd1320363413',
						                 },
						                 {
							                 'type'     : 'dateRange',
							                 'dateRange': req.body.dateRange || Utility.DateRange.last30Days,
						                 },
					                 ],
					                 'metricContainer': {
						                 'metrics': [
							                 {
								                 'columnId': '0',
								                 'id'      : 'metrics/visitors',
							                 },
						                 ],
					                 },
					                 'dimension'      : 'variables/targetraw.activityexperience',
					                 'search'         : {
						                 'itemIds': req.body[ 'activity' ] || [
							                 '1621921405',
							                 '2733300011',
						                 ],
					                 },
					                 'settings'       : {
						                 'countRepeatInstances': true,
						                 'limit'               : 50000,
						                 'dimensionSort'       : 'asc',
					                 },
					                 'statistics'     : {
						                 'functions': [
							                 'col-max',
							                 'col-min',
						                 ],
					                 },
				                 },
			                 }, callback );
		};
		let init        = function() {
			if( ReportTrait.isRequiredParamsAvailable( req.body ) ) {
				req.body.dateRange = Utility.startEndToDateRange( req.body.start, req.body.end );
				getVisitors();
			} else {
				ReportTrait.toResponse( res, ErrorModule.badRequest( null, 'missing required parameters' ) );
			}
		};

		init();
	}
}

module.exports = ReportTrait;
