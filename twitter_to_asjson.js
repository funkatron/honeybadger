// get the fs module
var fs = require('fs');

fs.readFile('./data/public_timeline.json', 'utf8', function(err, data) {
	if (err) {
		throw err;
	}
	var public_tl = JSON.parse(data);

	for (var i=0; i < public_tl.length; i++) {
		console.dir(twitterStatusToAS(public_tl[i]));
	}

});

var twitterStatusToAS = function(ts) {

	var as = {
		"title":ts.text,
		'url': 'http://twitter.com/'+ts.user.screen_name+'status/'+ts.user.id_str,
		"postedTime": ts.created_at,
		"actor": {
			'url':ts.user.url,
			"objectType": "person",
			"id": "tag:twitter.com,"+ts.user.id_str,
			"image": {
				"url": ts.user.profile_image_url,
				"width": 48,
				"height": 48
			},
			"displayName": ts.user.name,
			"contact-entry": twitterUserToPoCo(ts.user),
		},
		"verb": "post",
		"object": {
			"url": 'http://twitter.com/'+ts.user.screen_name+'/status/'+ts.id_str,
			"id": 'tag:twitter.com,'+ts.id_str
		},
		"target": {
			"url": "http://twitter.com/"+ts.user.screen_name,
			"objectType": "microblog",
			"id": "tag:twitter.com",
			"displayName": "Twitter"
		},
		"position": twitterGeoToPosition(ts.geo),
		"generator": twitterSourceToGenerator(ts.source),
		'X-twitter.com': {
			in_reply_to_user_id: ts.in_reply_to_user_id,
			favorited: ts.favorited,
			coordinates: ts.coordinates,
			in_reply_to_screen_name: ts.in_reply_to_screen_name,
			in_reply_to_status_id_str: ts.in_reply_to_status_id_str,
			source: ts.source,
			contributors: ts.contributors,
			retweeted: ts.retweeted,
			in_reply_to_status_id: ts.in_reply_to_status_id,
			in_reply_to_user_id_str: ts.in_reply_to_user_id_str,
			retweeted: ts.retweeted,
			truncated: ts.truncated,
			"user": {
				default_profile: ts.user.default_profile,
				lang: ts.user.lang,
				profile_use_background_image: ts.user.profile_use_background_image,
				follow_request_sent: ts.user.follow_request_sent,
				created_at: ts.user.created_at,
				profile_background_color: ts.user.profile_background_color,
				description: ts.user.description,
				show_all_inline_media: ts.user.show_all_inline_media,
				geo_enabled: ts.user.geo_enabled,
				profile_background_image_url: ts.user.profile_background_image_url,
				friends_count: ts.user.friends_count,
				is_translator: ts.user.is_translator,
				contributors_enabled: ts.user.contributors_enabled,
				time_zone: ts.user.time_zone,
				profile_text_color: ts.user.profile_text_color,
				listed_count: ts.user.listed_count,
				statuses_count: ts.user.statuses_count,
				following: ts.user.following,
				profile_sidebar_fill_color: ts.user.profile_sidebar_fill_color,
				followers_count: ts.user.followers_count,
				verified: ts.user.verified,
				notifications: ts.user.notifications,
				profile_background_tile: ts.user.profile_background_tile,
				favourites_count: ts.user.favourites_count,
				'protected': ts.user['protected'],
				profile_link_color: ts.user.profile_link_color,
				profile_sidebar_border_color: ts.user.profile_sidebar_border_color,
			}
		}
	};

	return as;
};

// @fixme: needs to parse and fill an obj structure
var twitterSourceToGenerator = function(source)
{
	var generator = {
		"url": source
	};

	return generator;

};

// @fixme needs to convert geopoint to ISO 6709
var twitterGeoToPosition = function(geo) {
	return geo;
}

// Portable Contacts in JSON seems to be the favored way to represent
// profile data. I suspect it will be made an "official" AS extension.
// http://portablecontacts.net/draft-schema.html --Zach
var twitterUserToPoCo = function(user) {

	var poco = {
		"id": user.id,
		"displayName": user.name,
		"preferredUsername": user.screen_name,
		"aboutMe": user.description,
		"currentLocation": (user.location) ? user.location : null, // XXX: Why is this sometimes empty?
		 "photos": [
			{
				"value": user.default_profile_image,
				"type": "thumbnail"
			}
		],
		"utcOffset": user.utc_offset
	};

	return poco;
};
