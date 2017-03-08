
Melown.Inspector.prototype.initGraphsPanel = function() {
    this.addStyle( ""
        + "#melown-graphs-panel {"
            + "position:absolute;"
            + "left:10px;"
            + "top:10px;"
            + "z-index: 7;"
            + "background-color: #FFFFFF;"
            + "padding: 5px;"
            + "border-radius: 4px;"
            + "font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;"
            + "color:#000000;"
            + "text-align: left;"
            + "font-size: 12px;"
            + "display:none;"
        + "}"

        + ".melown-graphs-canvas {"
            + "border: solid 1px #bbb;"
            + "image-rendering : pixelated;"
        + "}"

        + ".melown-graphs-info {"
            + "padding: 5px 2px;"
            + "font-size: 10px;"
        + "}"

        + ".melown-graphs-button {"
            + "padding: 2px 5px;"
            + "display:inline-block;"
            + "margin-right: 4px;"
            + "border-radius: 4px;"
            + "cursor:pointer;"
        + "}"

        + ".melown-graphs-button:hover {"
            + "box-shadow: 0 0 1px #0066ff;"
        + "}"
    );

    this.graphsElement_ = document.createElement("div");
    this.graphsElement_.id = "melown-graphs-panel";
    this.graphsElement_.innerHTML = ""
        + '<canvas id="melown-graphs-render" class="melown-graphs-canvas" width="900" height="100" ></canvas>'
        + '<div id="melown-graphs-info" class="melown-graphs-info" >&FilledSmallSquare; Frame: 1234 &nbsp <span style="color:#ff0000">&FilledSmallSquare;</span> Render: 1234 &nbsp <span style="color:#0000ff">&FilledSmallSquare;</span> Textures: 1234 &nbsp <span style="color:#005500">&FilledSmallSquare;</span> Mesh: 1234 &nbsp <span style="color:#00bb00">&FilledSmallSquare;</span> GpuMesh: 1234</div>'
        + '<canvas id="melown-graphs-cache" class="melown-graphs-canvas" width="900" height="100" ></canvas>'
        + '<div id="melown-graphs-info2" class="melown-graphs-info" >&FilledSmallSquare; Cache: 1234 &nbsp <span style="color:#ff0000">&FilledSmallSquare;</span> Used: 123 &nbsp <span style="color:#0000ff">&FilledSmallSquare;</span> Textures: 1234 &nbsp <span style="color:#00bb00">&FilledSmallSquare;</span> Mesh: &nbsp 1234</div>'
        + '<div id="melown-graphs-rec" class="melown-graphs-button" >Recording On</div>'
        + '<div id="melown-graphs-ref" class="melown-graphs-button" >Refresh On</div>'
        + '<div id="melown-graphs-res" class="melown-graphs-button" >Reset</div>'
        + '<div id="melown-graphs-zoom" class="melown-graphs-button" >Scale: Max value</div>'
        + '<div id="melown-graphs-magnify" class="melown-graphs-button" >Magnify Off</div>'
        + '<div id="melown-graphs-graph" class="melown-graphs-button" >Graph: Cache</div>';

    this.core_.element_.appendChild(this.graphsElement_);
    this.graphsCanvasRender_ = document.getElementById("melown-graphs-render");
    this.graphsCanvasCache_ = document.getElementById("melown-graphs-cache");
    this.graphsCanvasRenderCtx_ = this.graphsCanvasRender_.getContext("2d");
    this.graphsCanvasCacheCtx_ = this.graphsCanvasCache_.getContext("2d");

    document.getElementById("melown-graphs-rec").onclick = this.graphsRecordingPressed.bind(this);

    document.getElementById("melown-graphs-rec").onclick = this.graphsRecordingPressed.bind(this);
    document.getElementById("melown-graphs-ref").onclick = this.graphsRefreshPressed.bind(this);
    document.getElementById("melown-graphs-res").onclick = this.graphsResetPressed.bind(this);
    document.getElementById("melown-graphs-zoom").onclick = this.graphsZoomPressed.bind(this);
    document.getElementById("melown-graphs-magnify").onclick = this.graphsMagnifyPressed.bind(this);
    document.getElementById("melown-graphs-graph").onclick = this.graphsGraphPressed.bind(this);

    document.getElementById("melown-graphs-render").onmousemove = this.onGraphsMouseMove.bind(this);
    document.getElementById("melown-graphs-render").onmouseout = this.onGraphsMouseOut.bind(this);
    document.getElementById("melown-graphs-cache").onmousemove = this.onGraphsMouseMove.bind(this);
    document.getElementById("melown-graphs-cache").onmouseout = this.onGraphsMouseOut.bind(this);

    this.graphsElement_.addEventListener("mouseup", this.doNothing.bind(this), true);
    this.graphsElement_.addEventListener("mousedown", this.doNothing.bind(this), true);
    this.graphsElement_.addEventListener("mousewheel", this.doNothing.bind(this), false);
    this.graphsElement_.addEventListener("dblclick", this.doNothing.bind(this), false);


    this.graphsZoom_ = "max";
    this.graphsGraph_ = "Cache";
    this.graphsRefresh_ = true;

    this.graphsPanelVisible_ = false;
};

Melown.Inspector.prototype.showGraphsPanel = function() {
    this.graphsElement_.style.display = "block";
    this.graphsPanelVisible_ = true;
    this.graphsRecordingPressed(true);
};

Melown.Inspector.prototype.hideGraphsPanel = function() {
    this.graphsElement_.style.display = "none";
    this.graphsPanelVisible_ = false;
    this.graphsRecordingPressed(true);
};

Melown.Inspector.prototype.switchGraphsPanel = function() {
    if (this.graphsPanelVisible_ == true) {
        this.hideGraphsPanel();
    } else {
        this.showGraphsPanel();
    }
};

Melown.Inspector.prototype.graphsRecordingPressed = function(state_) {
    var map_ = this.core_.getMap();

    if (map_ == null) {
        return;
    }

    map_.stats_.recordGraphs_ = (state_ == null) ? state_ : !map_.stats_.recordGraphs_;
    this.updateGraphsPanel();
    this.updateGraphs(null, true);
};

Melown.Inspector.prototype.graphsRefreshPressed = function() {
    this.graphsRefresh_ = !this.graphsRefresh_;
    this.updateGraphsPanel();
    this.updateGraphs();
};

Melown.Inspector.prototype.graphsResetPressed = function() {
    var map_ = this.core_.getMap();

    if (map_ == null) {
        return;
    }

    map_.stats_.resetGraphs();
    this.updateGraphs(null, true);
};

Melown.Inspector.prototype.graphsZoomPressed = function() {
    switch (this.graphsZoom_) {
        case "max":     this.graphsZoom_ = "120avrg"; break;
        case "120avrg": this.graphsZoom_ = "180avrg"; break;
        case "180avrg": this.graphsZoom_ = "max"; break;
    }

    this.updateGraphsPanel();
    this.updateGraphs();
};

Melown.Inspector.prototype.graphsGraphPressed = function() {
    switch (this.graphsGraph_) {
        case "Cache":      this.graphsGraph_ = "Polygons"; break;
        case "Polygons":   this.graphsGraph_ = "Processing"; break;
        case "Processing": this.graphsGraph_ = "LODs"; break;
        case "LODs":       this.graphsGraph_ = "Flux"; break;
        case "Flux":       this.graphsGraph_ = "Cache"; break;
    }

    this.updateGraphsPanel();
    this.updateGraphs();
};


Melown.Inspector.prototype.graphsMagnifyPressed = function() {
    this.graphsMagnify_ = !this.graphsMagnify_;

    if (this.graphsMagnify_ == true) {
        this.graphsCanvasRender_.style.width = "1400px";
        this.graphsCanvasRender_.style.height = "200px";
        this.graphsCanvasCache_.style.width = "1400px";
        this.graphsCanvasCache_.style.height = "200px";
        document.getElementById("melown-graphs-magnify").innerHTML = "Magnify On";
    } else {
        this.graphsCanvasRender_.style.width = "900px";
        this.graphsCanvasRender_.style.height = "100px";
        this.graphsCanvasCache_.style.width = "900px";
        this.graphsCanvasCache_.style.height = "100px";
        document.getElementById("melown-graphs-magnify").innerHTML = "Magnify Off";
    }

    this.updateGraphsPanel();
    this.updateGraphs();
};

Melown.Inspector.prototype.updateGraphsPanel = function() {
    var map_ = this.core_.getMap();

    if (map_ == null) {
        return;
    }

    if (map_.stats_.recordGraphs_ == true) {
        document.getElementById("melown-graphs-rec").innerHTML = "Recording On";
    } else {
        document.getElementById("melown-graphs-rec").innerHTML = "Recording Off";
    }

    if (this.graphsRefresh_ == true) {
        document.getElementById("melown-graphs-ref").innerHTML = "Refresh On";
    } else {
        document.getElementById("melown-graphs-ref").innerHTML = "Refresh Off";
    }

    switch (this.graphsZoom_) {
        case "max":
            document.getElementById("melown-graphs-zoom").innerHTML = "Scale: Max value";
            break;

        case "120avrg":
            document.getElementById("melown-graphs-zoom").innerHTML = "Scale: 100% Avrg";
            break;

        case "180avrg":
            document.getElementById("melown-graphs-zoom").innerHTML = "Scale: 50% Avrg";
            break;
    }

    document.getElementById("melown-graphs-graph").innerHTML = "Graph: " + this.graphsGraph_;
};

Melown.Inspector.prototype.onGraphsMouseMove = function(event_) {
    var x = event_.clientX - this.graphsCanvasRender_.getBoundingClientRect().left;
    this.graphsShowCursor_ = true;

    if (this.graphsMagnify_ == true) {
        x = Math.floor(x * 900/1400);
    }

    this.graphsCursorIndex_ = x;

    var map_ = this.core_.getMap();

    if (map_ == null) {
        return;
    }

    if (map_.stats_.recordGraphs_ != true) {
        this.updateGraphs(null);
    }
};

Melown.Inspector.prototype.onGraphsMouseOut = function() {
    this.graphsShowCursor_ = false;
    this.updateGraphs(null);
};


Melown.Inspector.prototype.updateGraphs = function(stats_, ignoreRefresh_) {
    var map_ = this.core_.getMap();

    if (map_ == null || (this.graphsRefresh_ == false && !ignoreRefresh_) || this.graphsPanelVisible_ == false) {
        return;
    }

    stats_ = stats_ || map_.stats_;

    var width_ = this.graphsCanvasRender_.width;
    var height_ = this.graphsCanvasRender_.height;
    var ctx_ = this.graphsCanvasRenderCtx_;

    var samples_ = stats_.graphsTimeSamples_;
    var samplesIndex_ = stats_.graphsTimeIndex_;

    var factorX_ = width_ / samples_;

    ctx_.clearRect(0, 0, width_, height_);

    var maxValue_ = 0;
    var totalFrame_ = 0;
    var totalRender_ = 0;
    var totalTexture_ = 0;
    var totalMeshes_ = 0;
    var totalGpuMeshes_ = 0;
    var realCount_ = 0;

    var valuesFrame_ = stats_.graphsFrameTimes_;
    var valuesRender_ = stats_.graphsRenderTimes_;
    var valuesTextures_ = stats_.graphsCreateTextureTimes_;
    var valuesMeshes_ = stats_.graphsCreateMeshTimes_;
    var valuesGpuMeshes_ = stats_.graphsCreateGpuMeshTimes_;

    for (var i = 0; i < samples_; i++) {
        totalFrame_ += valuesFrame_[i];
        totalRender_ += valuesRender_[i];
        totalTexture_ += valuesTextures_[i];
        totalMeshes_ += valuesMeshes_[i];
        totalGpuMeshes_ += valuesGpuMeshes_[i];

        var v = valuesFrame_[i];

        if (v > maxValue_) {
            maxValue_ = v;
        }

        if (v > 0) {
            realCount_++;
        }
    }

    if (this.graphsZoom_ == "120avrg") {
        maxValue_ = (totalFrame_ / realCount_) * 1.0;
    }

    if (this.graphsZoom_ == "180avrg") {
        maxValue_ = (totalFrame_ / realCount_) * 0.5;
    }

    var factorY_ = height_ / maxValue_;

    for (var i = 0; i < samples_; i++) {
        var index_ = samplesIndex_ + i;
        index_ %= samples_;

        ctx_.fillStyle="#000000";
        ctx_.fillRect(i*factorX_, height_, 1, -(valuesFrame_[index_])*factorY_);
        ctx_.fillStyle="#ff0000";
        ctx_.fillRect(i*factorX_, height_, 1, -(valuesRender_[index_])*factorY_);

        ctx_.fillStyle="#0000ff";
        ctx_.fillRect(i*factorX_, height_, 1, -(valuesTextures_[index_])*factorY_);

        var y = height_ -(valuesTextures_[index_])*factorY_;

        ctx_.fillStyle="#007700";
        ctx_.fillRect(i*factorX_, y, 1, -(valuesMeshes_[index_])*factorY_);

        y -= (valuesMeshes_[index_])*factorY_;

        ctx_.fillStyle="#00ff00";
        ctx_.fillRect(i*factorX_, y, 1, -(valuesGpuMeshes_[index_])*factorY_);

    }

    if (this.graphsShowCursor_ == true) {
        ctx_.fillStyle="#aa00aa";
        var index_ = (this.graphsCursorIndex_) % samples_;
        ctx_.fillRect(Math.floor(index_*factorX_)-1, 0, 1, height_);
        ctx_.fillRect(Math.floor(index_*factorX_)+1, 0, 1, height_);
        index_ = (this.graphsCursorIndex_ + samplesIndex_) % samples_;

        var str_ = '&FilledSmallSquare; Frame: ' + valuesFrame_[index_].toFixed(2) +
                   ' &nbsp <span style="color:#ff0000">&FilledSmallSquare;</span> Render: ' + valuesRender_[index_].toFixed(2) +
                   ' &nbsp <span style="color:#0000ff">&FilledSmallSquare;</span> Textures: ' + valuesTextures_[index_].toFixed(2) +
                   ' &nbsp <span style="color:#005500">&FilledSmallSquare;</span> Meshes: ' + valuesMeshes_[index_].toFixed(2) +
                   ' &nbsp <span style="color:#00bb00">&FilledSmallSquare;</span> GpuMeshes: ' + valuesGpuMeshes_[index_].toFixed(2) + '</div>';
    } else {
        var str_ = '&FilledSmallSquare; Frame: ' + Math.round(totalFrame_) +
                   ' &nbsp <span style="color:#ff0000">&FilledSmallSquare;</span> Render: ' + Math.round(totalRender_) +
                   ' &nbsp <span style="color:#0000ff">&FilledSmallSquare;</span> Textures: ' + Math.round(totalTexture_) +
                   ' &nbsp <span style="color:#005500">&FilledSmallSquare;</span> Meshes: ' + Math.round(totalMeshes_) +
                   ' &nbsp <span style="color:#00bb00">&FilledSmallSquare;</span> GpuMeshes: ' + Math.round(totalGpuMeshes_) +'</div>';
    }

    document.getElementById("melown-graphs-info").innerHTML = str_;






    var width_ = this.graphsCanvasCache_.width;
    var height_ = this.graphsCanvasCache_.height;
    var ctx_ = this.graphsCanvasCacheCtx_;

    //var samples_ = graphs_["samples"];
    //var samplesIndex_ = graphs_["index"];

    var factorX_ = width_ / samples_;

    ctx_.clearRect(0, 0, width_, height_);

    switch (this.graphsGraph_) {
    case "Cache":
        {
            var factorY_ = height_ / ((map_.gpuCache_.maxCost_+map_.resourcesCache_.maxCost_+map_.metatileCache_.maxCost_));

            var maxMetatiles_ = 0;
            var maxResources_ = 0;
            var maxTextures_ = 0;
            var maxMeshes_ = 0;
            var maxGeodata_ = 0;
            var maxGpu_ = 0;

            var valuesMetatiles_ = stats_.graphsCpuMemoryMetatiles_;
            var valuesResources_ = stats_.graphsCpuMemoryUsed_;
            var valuesTextures_ = stats_.graphsGpuMemoryTextures_;
            var valuesMeshes_ = stats_.graphsGpuMemoryMeshes_;
            var valuesGeodata_ = stats_.graphsGpuMemoryGeodata_;
            var valuesGpu_ = stats_.graphsGpuMemoryRender_;

            for (var i = 0; i < samples_; i++) {
                maxMetatiles_ = valuesMetatiles_[i] > maxMetatiles_ ? valuesMetatiles_[i] : maxMetatiles_;
                maxResources_ = valuesResources_[i] > maxResources_ ? valuesResources_[i] : maxResources_;
                maxTextures_ = valuesTextures_[i] > maxTextures_ ? valuesTextures_[i] : maxTextures_;
                maxMeshes_ = valuesMeshes_[i] > maxMeshes_ ? valuesMeshes_[i] : maxMeshes_;
                maxGeodata_ = valuesGeodata_[i] > maxGeodata_ ? valuesGeodata_[i] : maxGeodata_;
                maxGpu_ = valuesGpu_[i] > maxGpu_ ? valuesGpu_[i] : maxGpu_;
            }

            for (var i = 0; i < samples_; i++) {
                var index_ = samplesIndex_ + i;
                index_ %= samples_;

                var value_ = valuesMetatiles_[index_] + valuesMeshes_[index_] + valuesTextures_[index_] + valuesGeodata_[index_] + valuesResources_[index_];
                ctx_.fillStyle="#000000";
                ctx_.fillRect(i*factorX_, height_, 1, -(value_)*factorY_);
                value_ -= valuesResources_[index_];

                ctx_.fillStyle="#0000ff";
                ctx_.fillRect(i*factorX_, height_, 1, -(value_)*factorY_);
                value_ -= valuesTextures_[index_];

                ctx_.fillStyle="#009999";
                ctx_.fillRect(i*factorX_, height_, 1, -(value_)*factorY_);
                value_ -= valuesGeodata_[index_];

                ctx_.fillStyle="#007700";
                ctx_.fillRect(i*factorX_, height_, 1, -(value_)*factorY_);
                value_ -= valuesMeshes_[index_];

                ctx_.fillStyle="#ff0000";
                ctx_.fillRect(i*factorX_, height_, 1, -(value_)*factorY_);

                value_ = valuesGpu_[index_];
                ctx_.fillStyle="#ffff00";
                ctx_.fillRect(i*factorX_, height_ -(value_)*factorY_, 1, 1);
            }

            if (this.graphsShowCursor_ == true) {
                var index_ = (this.graphsCursorIndex_ + samplesIndex_) % samples_;
                var str_ = '<span style="color:#555">&FilledSmallSquare;</span> Total: ' + Math.ceil((valuesMetatiles_[index_] + valuesResources_[index_] + valuesTextures_[index_] + valuesMeshes_[index_])/(1024*1024)) + "MB" +
                           ' &nbsp <span style="color:#000000">&FilledSmallSquare;</span> CPU: ' + Math.ceil(valuesResources_[index_]/(1024*1024)) + "MB" +
                           ' &nbsp <span style="color:#000000">&FilledSmallSquare;</span> GPU: ' + Math.ceil((valuesTextures_[index_] + valuesMeshes_[index_])/(1024*1024)) + "MB" +
                           ' &nbsp <span style="color:#0000ff">&FilledSmallSquare;</span> Te: ' + Math.ceil(valuesTextures_[index_]/(1024*1024)) + "MB" +
                           ' &nbsp <span style="color:#005500">&FilledSmallSquare;</span> Me: ' + Math.ceil(valuesMeshes_[index_]/(1024*1024)) + "MB" +
                           ' &nbsp <span style="color:#009999">&FilledSmallSquare;</span> Ge: ' + Math.ceil(valuesGeodata_[index_]/(1024*1024)) + "MB" +
                           ' &nbsp <span style="color:#ff0000">&FilledSmallSquare;</span> Met: ' + Math.ceil(valuesMetatiles_[index_]/(1024*1024)) + "MB" +
                           ' &nbsp <span style="color:#ffff00">&FilledSmallSquare;</span> Render: ' + Math.ceil(valuesGpu_[index_]/(1024*1024)) + "MB" +'</div>';
            } else {
                var str_ = '<span style="color:#555">&FilledSmallSquare;</span> Total: ' + Math.round((maxMetatiles_ + maxResources_ + maxTextures_ + maxMeshes_)/(1024*1024)) + "MB" +
                           ' &nbsp <span style="color:#000000">&FilledSmallSquare;</span> CPU: ' + Math.ceil(maxResources_/(1024*1024)) + "MB" +
                           ' &nbsp <span style="color:#000000">&FilledSmallSquare;</span> GPU: ' + Math.ceil((maxTextures_ + maxMeshes_)/(1024*1024)) + "MB" +
                           ' &nbsp <span style="color:#0000ff">&FilledSmallSquare;</span> Te ' + Math.ceil(maxTextures_/(1024*1024)) + "MB" +
                           ' &nbsp <span style="color:#005500">&FilledSmallSquare;</span> Me: ' + Math.ceil(maxMeshes_/(1024*1024)) + "MB" +
                           ' &nbsp <span style="color:#009999">&FilledSmallSquare;</span> Ge: ' + Math.ceil(maxGeodata_/(1024*1024)) + "MB" +
                           ' &nbsp <span style="color:#ff0000">&FilledSmallSquare;</span> Met: ' + Math.ceil(maxMetatiles_/(1024*1024)) + "MB" +
                           ' &nbsp <span style="color:#ffff00">&FilledSmallSquare;</span> Render: ' + Math.ceil(maxGpu_/(1024*1024)) + "MB" +'</div>';
            }

        }
        break;


    case "Polygons":
    case "Processing":
        {
            var max_ = 0;
            var min_ = 99999999999;
            var total_ = 0;
            var realCount_ = 0;
            var values_ = (this.graphsGraph_ == "Polygons") ? stats_.graphsPolygons_ : stats_.graphsBuild_;

            for (var i = 0; i < samples_; i++) {
                max_ = values_[i] > max_ ? values_[i] : max_;

                if (values_[i] > 0) {
                    min_ = values_[i] < min_ ? values_[i] : min_;
                    total_ += values_[i];
                    realCount_++;
                }
            }

            var factorY_ = height_ / max_;

            for (var i = 0; i < samples_; i++) {
                var index_ = samplesIndex_ + i;
                index_ %= samples_;

                ctx_.fillStyle="#007700";
                ctx_.fillRect(i*factorX_, height_, 1, -(values_[index_])*factorY_);
            }

            if (this.graphsShowCursor_ == true) {
                var index_ = (this.graphsCursorIndex_ + samplesIndex_) % samples_;
                var str_ = '<span style="color:#007700">&FilledSmallSquare;</span> ' + this.graphsGraph_ + ' Max: ' + Math.round(values_[index_]) +'</div>';
            } else {
                var str_ = '<span style="color:#007700">&FilledSmallSquare;</span> ' + this.graphsGraph_ + ' Max: ' + max_ +'</div>';
                str_ += ' &nbsp Min: ' + min_;
                str_ += ' &nbsp Avrg: ' + Math.round(total_ / realCount_) +'</div>';
            }
        }
        break;


    case "LODs":
        {
            var max_ = 0;
            var values_ = stats_.graphsLODs_;

            for (var i = 0; i < samples_; i++) {
                max_ = values_[i][0] > max_ ? values_[i][0] : max_;
            }

            var factorY_ = height_ / max_;

            ctx_.fillStyle="#000000";
            ctx_.fillRect(0, 0, width_, height_);

            for (var i = 0; i < samples_; i++) {
                var index_ = samplesIndex_ + i;
                index_ %= samples_;

                //ctx_.fillStyle="#000000";
                //ctx_.fillRect(i*factorX_, height_, 1, -(values_[index_][0])*factorY_);

                var y = height_;
                
                var lods_ = values_[index_][1]; 

                for (var j = 0, lj = lods_.length; j < lj; j++) {
                    if (lods_[j]) {
                        ctx_.fillStyle="hsl("+((j*23)%360)+",100%,50%)";
                        var value_ = Math.round((lods_[j])*factorY_);
                        ctx_.fillRect(i*factorX_, y, 1, -value_);
                        y -= value_;
                    }
                }

            }

            if (this.graphsShowCursor_ == true) {
                var index_ = (this.graphsCursorIndex_ + samplesIndex_) % samples_;

                var str_ = "LODs:" + values_[index_][0];
                var lods_ = values_[index_][1]; 

                for (var j = 0, lj = lods_.length; j < lj; j++) {
                    if (lods_[j]) {
                        str_ += '<span style="color:hsl('+((j*23)%360)+',100%,50%)">&FilledSmallSquare;</span>'+j+':'+lods_[j];
                    }
                }

            } else {
                var str_ = "LODs:" + values_[index_][0];
            }

            str_ += '</div>';
        }
        break;

    case "Flux":
        {
            var maxCount_ = 0;
            var maxSize_ = 0;

            var maxTexPlusCount_ = 0;
            var maxTexPlusSize_ = 0;
            var maxTexMinusCount_ = 0;
            var maxTexMinusSize_ = 0;

            var maxMeshPlusCount_ = 0;
            var maxMeshPlusSize_ = 0;
            var maxMeshMinusCount_ = 0;
            var maxMeshMinusSize_ = 0;

            var maxGeodataPlusCount_ = 0;
            var maxGeodataPlusSize_ = 0;
            var maxGeodataMinusCount_ = 0;
            var maxGeodataMinusSize_ = 0;

            var valuesTextures_ = stats_.graphsFluxTextures_;
            var valuesMeshes_ = stats_.graphsFluxMeshes_;
            var valuesGeodata_ = stats_.graphsFluxGeodatas_;

            for (var i = 0; i < samples_; i++) {
                var tmp_ = valuesTextures_[i][0][0] + valuesMeshes_[i][0][0];
                maxCount_ = tmp_ > maxCount_ ? tmp_ : maxCount_;
                tmp_ = valuesTextures_[i][1][0] + valuesMeshes_[i][1][0];
                maxCount_ = tmp_ > maxCount_ ? tmp_ : maxCount_;

                tmp_ = valuesTextures_[i][0][1] + valuesMeshes_[i][0][1];
                maxSize_ = tmp_ > maxSize_ ? tmp_ : maxSize_;
                tmp_ = valuesTextures_[i][1][1] + valuesMeshes_[i][1][1];
                maxSize_ = tmp_ > maxSize_ ? tmp_ : maxSize_;

                maxTexPlusCount_ = valuesTextures_[i][0][0] > maxTexPlusCount_ ? valuesTextures_[i][0][0] : maxTexPlusCount_;
                maxTexPlusSize_ = valuesTextures_[i][0][1] > maxTexPlusSize_ ? valuesTextures_[i][0][1] : maxTexPlusSize_;
                maxTexMinusCount_ = valuesTextures_[i][1][0] > maxTexMinusCount_ ? valuesTextures_[i][1][0] : maxTexMinusCount_;
                maxTexMinusSize_ = valuesTextures_[i][1][1] ? valuesTextures_[i][1][1] : maxTexMinusSize_;

                maxMeshPlusCount_ = valuesMeshes_[i][0][0] > maxMeshPlusCount_ ? valuesMeshes_[i][0][0] : maxMeshPlusCount_;
                maxMeshPlusSize_ = valuesMeshes_[i][0][1] > maxMeshPlusSize_ ? valuesMeshes_[i][0][1] : maxMeshPlusSize_;
                maxMeshMinusCount_ = valuesMeshes_[i][1][0] > maxMeshMinusCount_ ? valuesMeshes_[i][1][0] : maxMeshMinusCount_;
                maxMeshMinusSize_ = valuesMeshes_[i][1][1] > maxMeshMinusSize_ ? valuesMeshes_[i][1][1] : maxMeshMinusSize_;

                maxGeodataPlusCount_ = valuesGeodata_[i][0][0] > maxGeodataPlusCount_ ? valuesGeodata_[i][0][0] : maxGeodataPlusCount_;
                maxGeodataPlusSize_ = valuesGeodata_[i][0][1] > maxGeodataPlusSize_ ? valuesGeodata_[i][0][1] : maxGeodataPlusSize_;
                maxGeodataMinusCount_ = valuesGeodata_[i][1][0] > maxGeodataMinusCount_ ? valuesGeodata_[i][1][0] : maxGeodataMinusCount_;
                maxGeodataMinusSize_ = valuesGeodata_[i][1][1] > maxGeodataMinusSize_ ? valuesGeodata_[i][1][1] : maxGeodataMinusSize_;
            }

            var factorY_ = (height_*0.25-2) / maxCount_;
            var factorY2_ = (height_*0.25-2) / maxSize_;

            var base_ = Math.floor(height_*0.25);
            var base2_ = Math.floor(height_*0.75);

            for (var i = 0; i < samples_; i++) {
                var index_ = samplesIndex_ + i;
                index_ %= samples_;
                
                var y1Up_ = base_;
                var y1Down_ = base_+1;
                var y2Up_ = base2_;
                var y2Down_ = base2_+1;

                ctx_.fillStyle="#0000aa";
                ctx_.fillRect(i*factorX_, y1Up_, 1, -(valuesTextures_[index_][0][0])*factorY_);
                ctx_.fillRect(i*factorX_, y1Down_, 1, (valuesTextures_[index_][1][0])*factorY_);

                ctx_.fillRect(i*factorX_, y2Up_, 1, -(valuesTextures_[index_][0][1])*factorY2_);
                ctx_.fillRect(i*factorX_, y2Down_, 1, (valuesTextures_[index_][1][1])*factorY2_);

                y1Up_ -= (valuesTextures_[index_][0][0])*factorY_;
                y1Down_ += (valuesTextures_[index_][1][0])*factorY_;
                y2Up_ -= (valuesTextures_[index_][0][1])*factorY2_;
                y2Down_ += (valuesTextures_[index_][1][1])*factorY2_;

                ctx_.fillStyle="#007700";
                ctx_.fillRect(i*factorX_, y1Up_, 1, -(valuesMeshes_[index_][0][0])*factorY_);
                ctx_.fillRect(i*factorX_, y1Down_, 1, (valuesMeshes_[index_][1][0])*factorY_);

                ctx_.fillRect(i*factorX_, y2Up_, 1, -(valuesMeshes_[index_][0][1])*factorY2_);
                ctx_.fillRect(i*factorX_, y2Down_, 1, (valuesMeshes_[index_][1][1])*factorY2_);

                y1Up_ -= (valuesMeshes_[index_][0][0])*factorY_;
                y1Down_ += (valuesMeshes_[index_][1][0])*factorY_;
                y2Up_ -= (valuesMeshes_[index_][0][1])*factorY2_;
                y2Down_ += (valuesMeshes_[index_][1][1])*factorY2_;

                ctx_.fillStyle="#009999";
                ctx_.fillRect(i*factorX_, y1Up_, 1, -(valuesGeodata_[index_][0][0])*factorY_);
                ctx_.fillRect(i*factorX_, y1Down_, 1, (valuesGeodata_[index_][1][0])*factorY_);

                ctx_.fillRect(i*factorX_, y2Up_, 1, -(valuesGeodata_[index_][0][1])*factorY2_);
                ctx_.fillRect(i*factorX_, y2Down_, 1, (valuesGeodata_[index_][1][1])*factorY2_);

                ctx_.fillStyle="#aaaaaa";
                ctx_.fillRect(0, Math.floor(height_*0.5), width_, 1);
                ctx_.fillStyle="#dddddd";
                ctx_.fillRect(0, base_, width_, 1);
                ctx_.fillRect(0, base2_, width_, 1);
            }


            if (this.graphsShowCursor_ == true) {
                var index_ = (this.graphsCursorIndex_ + samplesIndex_) % samples_;
                var str_ = '<span style="color:#007700">&FilledSmallSquare;</span> Textures Count +/-: ' + valuesTextures_[index_][0][0] + "/" + valuesTextures_[index_][1][0];
                str_ += ' &nbsp Size +/-: ' + (valuesTextures_[index_][0][1]/1024/1024).toFixed(2) + "/" + (valuesTextures_[index_][1][1]/1024/1024).toFixed(2);
                str_ += ' &nbsp <span style="color:#0000aa">&FilledSmallSquare;</span> Meshes Count +/-: ' + valuesMeshes_[index_][0][0] + "/" + valuesMeshes_[index_][1][0];
                str_ += ' &nbsp Size +/-: ' + (valuesMeshes_[index_][0][1]/1024/1024).toFixed(2) + "/" + (valuesMeshes_[index_][1][1]/1024/1024).toFixed(2);
                str_ += ' &nbsp <span style="color:#009999">&FilledSmallSquare;</span> Geodata Count +/-: ' + valuesGeodata_[index_][0][0] + "/" + valuesGeodata_[index_][1][0];
                str_ += ' &nbsp Size +/-: ' + (valuesGeodata_[index_][0][1]/1024/1024).toFixed(2) + "/" + (valuesGeodata_[index_][1][1]/1024/1024).toFixed(2);
                str_ += '</div>';
            } else {
                var str_ = '<span style="color:#007700">&FilledSmallSquare;</span> Textures Count +/-: ' + maxTexPlusCount_ + "/" + maxTexMinusCount_;
                str_ += ' &nbsp Size +/-: ' + (maxTexPlusSize_/1024/1024).toFixed(2) + "/" + (maxTexMinusSize_/1024/1024).toFixed(2);
                str_ += ' &nbsp <span style="color:#0000aa">&FilledSmallSquare;</span> Meshes Count +/-: ' + maxMeshPlusCount_ + "/" + maxMeshMinusCount_;
                str_ += ' &nbsp Size +/-: ' + (maxMeshPlusSize_/1024/1024).toFixed(2) + "/" + (maxMeshMinusSize_/1024/1024).toFixed(2);
                str_ += ' &nbsp <span style="color:#009999">&FilledSmallSquare;</span> Geodata Count +/-: ' + maxGeodataPlusCount_ + "/" + maxGeodataMinusCount_;
                str_ += ' &nbsp Size +/-: ' + (maxGeodataPlusSize_/1024/1024).toFixed(2) + "/" + (maxGeodataMinusSize_/1024/1024).toFixed(2);
                str_ += '</div>';
            }

        }
        break;

    }

    if (this.graphsShowCursor_ == true) {
        ctx_.fillStyle="#aa00aa";
        var index_ = (this.graphsCursorIndex_) % samples_;
        ctx_.fillRect(Math.floor(index_*factorX_)-1, 0, 1, height_);
        ctx_.fillRect(Math.floor(index_*factorX_)+1, 0, 1, height_);
    }

    document.getElementById("melown-graphs-info2").innerHTML = str_;

};


