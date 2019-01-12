//server.js
// 'use strict';
var http=require('http');
var url=require('url');
var util=require('util');
var express=require('express');
var app=express();
var req=require('request');

var cors = require("cors");
app.use(cors());


app.get('/', function(request, response){	
	var key="AIzaSyCakaKW2d0ilM98r8_hOzdQ6QtMzmsdX6k";
  var apikey="OtPJEfyeYS3P6k4yw0l_g7KEhZm7ae1bvvj2L8qVHiY_6n_Fce68JSsjlFSiPTAXzmMjr2BqHXRWZhzzhBFROXyiwb2QShrYXwHVWjoRGyqPczocT3zA23iSBuPCWnYx";
	var latitude;
	var longitude;
	var keyword;
	var category;
	var distance;
	var address;
  var nearbyurl;
	var pagetoken;
	// response.writeHead(200, {'Content-Type':'text/plain;charset=utf8', 'Access-Control-Allow-Origin':'*'});
    var params=url.parse(request.url, true).query;
    var search=params.search;
    var next=params.next;
    var yelp=params.yelp;
    var inputaddress=params.inputaddress;
    var getdirection=params.getdirection;
    if(getdirection){
      var placename=params.placename;
      var urlgetdir="https://maps.googleapis.com/maps/api/geocode/json?address="+placename+"&key="+key;
      req(urlgetdir, function(errordir, resdir, bodydir){
          if(!errordir && resdir.statusCode==200){
            var directionbody=JSON.parse(bodydir);
            var startlat=directionbody.results[0].geometry.location.lat;
            var startlng=directionbody.results[0].geometry.location.lng;
            var startpos={
                  "startlat":startlat,
                  "startlng":startlng           
            };
            var startstring=JSON.stringify(startpos);
            response.write(startstring, function(){response.end(); });
          }
      });
    }
    if(yelp){
      var name=params.name;
      var address1=params.address1;
      var city=params.city;
      var state=params.state;
      var country=params.country;
      const yelp=require('yelp-fusion');
      const client=yelp.client(apikey);
      client.businessMatch('best',{
        name:name,
        address1:address1,
        city:city,
        state:state,
        country:country
      }).then(resyelp=>{
        if(resyelp.jsonBody.businesses!=""){
          var id=resyelp.jsonBody.businesses[0].id;
          client.reviews(id).then(resid=>{
            var yelpreviews=JSON.stringify(resid.jsonBody.reviews);
            response.write(yelpreviews, function(){response.end(); });
          }).catch(e=>{
            console.log(e);
          });
        }else{
          var yelpmatch="No Match";
          response.write(yelpmatch, function(){response.end(); });
        }        
      }).catch(e=>{
        console.log(e);
      });
    }
    if(next){
      pagetoken=encodeURIComponent(params.pagetoken);
      var urlnextpage="https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken="
                     +pagetoken+"&key="+key;
      req(urlnextpage, function(errornextpage,resnextpage,bodynextpage){
        if(!errornextpage && resnextpage.statusCode==200){
          bodynextpage=JSON.parse(bodynextpage);
          var nextpageresults=bodynextpage.results;
          var nextpage=bodynextpage.next_page_token;
          if(nextpageresults=="" || nextpageresults==undefined || nextpageresults==null){
            nextpageresults=new Array();
          }
          if(nextpage=="" || nextpage==undefined || nextpage==null){
            nextpage="none";
          } 
          var nextpagearray={
            "nextpageresults":nextpageresults,
            "nextpage":nextpage
           };
           var nextpagestring=JSON.stringify(nextpagearray);
           response.write(nextpagestring, function(){response.end(); });
         }
       });
    }
    if(search){
      keyword=encodeURIComponent(params.keyword);
      category=encodeURIComponent(params.category);
      distance=encodeURIComponent(params.distance);
      if(inputaddress){
        address=encodeURIComponent(params.address);
        var urladdress="https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key="+key;
        
        req(urladdress, function(error, res, body){
          if(!error && res.statusCode==200){
            var addressbody=JSON.parse(body);
            latitude=addressbody.results[0].geometry.location.lat;
            longitude=addressbody.results[0].geometry.location.lng;
            nearbyurl="https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="
                     +latitude+","+longitude+"&radius="+distance+"&type="+category+"&keyword="
                     +keyword+"&key="+key;
            req(nearbyurl, function(errornearby, resnearby, bodynearby){
              if(!errornearby && resnearby.statusCode==200){
                var bodynearbyjson=JSON.parse(bodynearby);
                var nearbyresults=bodynearbyjson.results;
                var nextpage=bodynearbyjson.next_page_token;
                if(nearbyresults=="" || nearbyresults==undefined || nearbyresults==null){
                  nearbyresults=new Array();
                }
                if(nextpage=="" || nextpage==undefined || nextpage==null){
                  nextpage="none";
                }       
                var nearbyarray={
                  "latitude":latitude,
                  "longitude":longitude,
                  "nearbyresults":nearbyresults,
                  "nextpage":nextpage           
                };
                var nearbystring=JSON.stringify(nearbyarray);
                response.write(nearbystring, function(){response.end(); });
              }
            });
          }
        });
      }
      else{
       	latitude=encodeURIComponent(params.latitude);
       	longitude=encodeURIComponent(params.longitude);
        nearbyurl="https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="
                     +latitude+","+longitude+"&radius="+distance+"&type="+category+"&keyword="
                     +keyword+"&key="+key;
        req(nearbyurl, function(errornearby, resnearby, bodynearby){
          if(!errornearby && resnearby.statusCode==200){
            var bodynearbyjson=JSON.parse(bodynearby);
            var nearbyresults=bodynearbyjson.results;
            var nextpage=bodynearbyjson.next_page_token;
            if(nearbyresults=="" || nearbyresults==undefined || nearbyresults==null){
              nearbyresults=new Array();
            }
            if(nextpage=="" || nextpage==undefined || nextpage==null){
              nextpage="none";
            }       
            var nearbyarray={
              "latitude":latitude,
              "longitude":longitude,
              "nearbyresults":nearbyresults,
              "nextpage":nextpage           
            };
            var nearbystring=JSON.stringify(nearbyarray);
            response.write(nearbystring, function(){response.end(); });
          }
        });
      }       
    }    
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log("listen 3000");


