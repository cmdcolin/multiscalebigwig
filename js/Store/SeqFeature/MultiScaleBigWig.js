define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/promise/all',
    'JBrowse/Store/SeqFeature',
    'JBrowse/Store/DeferredStatsMixin',
    'JBrowse/Store/DeferredFeaturesMixin',
    'JBrowse/Store/SeqFeature/BigWig'
],
function (
    declare,
    lang,
    array,
    all,
    SeqFeatureStore,
    DeferredFeaturesMixin,
    DeferredStatsMixin,
    BigWig
) {
    return declare([SeqFeatureStore, DeferredFeaturesMixin, DeferredStatsMixin], {
        constructor(args) {
            this.scales = {};
            Object.keys(args.scales).forEach(k => {
                const v = args.scales[k];
                this.scales[parseInt(k, 10)] = new BigWig(dojo.mixin(args, { urlTemplate: v, name: v }));
            });
            Promise.all(Object.values(this.scales).map(store =>
                store._deferred.features
            )).then(() => {
                this._deferred.features.resolve({success: true});
                this._deferred.stats.resolve({success: true});
            }).catch(e =>
                this._failAllDeferred(e)
            );
        },

        _getSelectedScale: function(query,x) {
            const zoom = Math.floor(1/query.basesPerSpan * 1000);
            const arr = Object.keys(this.scales);
            let selected = arr[0];
            for (let i = arr.length - 1; i > 0; i--) {
                if (zoom > +arr[i]) {
                    selected = arr[i];
                    break;
                }
            }
            //console.log(selected,x,query)
            return this.scales[selected]
        },
        _getFeatures: function (query, featureCallback, endCallback, errorCallback) {
            this._getSelectedScale(query,'getfeats')._getFeatures(query, featureCallback, endCallback, errorCallback);
        },
        _getGlobalStats(successCallback, errorCallback) {
            const arr = Object.keys(this.scales);
            this.scales[arr[0]]._getGlobalStats(successCallback, errorCallback);
        },
        getRegionStats(query, successCallback, errorCallback) {
            this._getSelectedScale(query,'region').getRegionStats(query, successCallback, errorCallback);
        },

        saveStore: function () {
            return {
                scales: this.config.scales
            };
        }
    });
});
