define(['jquery', 'ol3', 'underscore', 'backbone', 'collections/features', 'common'], function($, ol, _, Backbone, Features, Common) {
    var MapView = Backbone.View.extend({
        initialize: function() {
            this.listenTo(Features, 'add', this.addMarker);
            this.render();
        },
        render: function() {
            this.map = new ol.Map({
                target: 'map',
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.OSM()
                    })
                ],
                view: new ol.View({
                    center: ol.proj.fromLonLat([37.41, 8.82]),
                    zoom: 4
                })
            });
            this.vectorSource = new ol.source.Vector();
            this.vectorLayer = new ol.layer.Vector({
                source: this.vectorSource
            });
            this.map.addLayer(this.vectorLayer);
            Features.add([{
                "id": 257,
                "content": "literally there are cats everywhere",
                "lat": "8.82",
                "lng": "37.41",
                "user_id": 1
            }, {
                "id": 256,
                "content": "whos cats are these???",
                "lat": "38.340543",
                "lng": "-76.599324",
                "user_id": 1
            }]);
            return this;
        },
        addMarkers: function() {
            Features.each(function(model, idx) {}, this);
        },
        addMarker: function(model) {
            var marker = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([model.attributes.lng, model.attributes.lat]))
            });
            marker.setStyle(new ol.style.Style({
                image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
                    color: '#8959A8',
                    src: 'https://openlayers.org/en/v3.18.2/examples/data/dot.png'
                }))
            }));
            this.vectorSource.addFeature(marker);
        }
    });
    return MapView;
});