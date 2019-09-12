# multiscalebigwig

[![](https://travis-ci.org/cmdcolin/multiscalebigwig.svg?branch=master)](https://travis-ci.org/cmdcolin/multiscalebigwig)

A JBrowse plugin with a storeclass that takes an array of bigwig files that are specified for different scales


## Example configs

Example for trackList.json

      {
         "storeClass" : "MultiScaleBigWig/Store/SeqFeature/MultiScaleBigWig",
         "scales" : {
            "100": {"url":"bw/100bp.bw"},
            "10000": {"url":"bw/10000bp.bw"},
            "1000000": {"url":"bw/1000000bp.bw"},
         ],
         "showTooltips": true,
         "label" : "MultiScaleBigWig",
         "type" : "JBrowse/View/Track/Wiggle/XYPlot"
      }


## Options


### Main configuration

* scales - An object of different scales, containing the url for a BW file

Example

    "scales": [
        { "url": "sample1.bw" }
    ]

## Install

- Clone repo into plugins folder in JBrowse and name folder MultiScaleBigWig
- Add "plugins": ["MultiScaleBigWig"] to trackList.json or jbrowse_conf.json


Please see http://gmod.org/wiki/JBrowse_FAQ#How_do_I_install_a_plugin for more information about installing plugins
