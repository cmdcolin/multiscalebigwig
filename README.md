# multiscalebigwig


A JBrowse plugin with a storeClass that takes an array of bigwig files that are specified for different scales


## Example configs

Example for trackList.json

      {
         "storeClass" : "MultiScaleBigWig/Store/SeqFeature/MultiScaleBigWig",
         "scales" : {
            "100": "bw/100bp.bw",
            "10000": "bw/10000bp.bw",
            "1000000": "bw/1000000bp.bw",
         ],
         "showTooltips": true,
         "label" : "MultiScaleBigWig",
         "type" : "JBrowse/View/Track/Wiggle/XYPlot"
      }

Integration with MultiBigWig

    {
      "urlTemplates": [
        {
          "storeClass": "MultiScaleBigWig/Store/SeqFeature/MultiScaleBigWig",
          "scales": {
            "10": "volvox_microarray.bw",
            "100": "volvox_microarray_smaller.bw"
          },
          "name": "multiscaletest"
        }
      ],
      "type": "MultiBigWig/View/Track/MultiWiggle/MultiXYPlot",
      "label": "multiscale",
      "storeClass": "MultiBigWig/Store/SeqFeature/MultiBigWig"
    }


## Caveat

Stats are estimated from the first scale or lowest in the list of scales, so the bigwigs should not be radically different across different scales

## Install

- Clone repo into plugins folder in JBrowse and name folder MultiScaleBigWig
- Add "plugins": ["MultiScaleBigWig"] to trackList.json or jbrowse_conf.json


Please see http://gmod.org/wiki/JBrowse_FAQ#How_do_I_install_a_plugin for more information about installing plugins
