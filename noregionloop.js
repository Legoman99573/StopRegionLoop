openaudio.playRegion = function(url, defaultTime) {
    var randomID = Math.floor(Math.random() * 60) + 1 + "_"; // MultiShot Disabled Fix to still play multiple sounds without ghost audio
    soundManager.stop("oa_region_" + randomID);
    soundManager.destroySound("oa_region_" + randomID);
    var regionsounds = soundManager.createSound({
        id: "oa_region_" + randomID,
        url: url,
        volume: volume,
        from: defaultTime * 1000,
        stream: true,
        onplay: function() {
            soundManager.getSoundById("oa_region_" + randomID ).metadata.region = true;
        },
        onerror: function(code, description) {
            soundManager._writeDebug("oa_region_" + randomID + " failed?", 3, code, description);
            if (this.loaded) {
                openaudio.stopRegion();
            } else {
                soundManager._writeDebug("Unable to decode oa_region_" + randomID + ". Well shit.", 3);
            }
        }
    });
    
    soundManager.play(regionsounds)

    openaudio.stopRegion = function() {
        fadeIdOut("oa_region_" + randomID );
        soundManager.destroySound("oa_region_" + randomID );
    };


    openaudio.regionsStop = function() {
        for (var i = 0; i < listSounds().split(',').length; i++) {
            listSounds().split(',')[i] = listSounds().split(',')[i].replace(/^\s*/, "").replace(/\s*$/, "");
            if (listSounds().split(',')[i].indexOf("oa_region_" + randomID) !== -1) {
                fadeIdOut(listSounds().split(',')[i]);
            }
        }
    };
};
