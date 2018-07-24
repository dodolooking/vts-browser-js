
import Dom_ from '../../utility/dom';
import {utils as utils_} from '../../../core/utils/utils';

//get rid of compiler mess
var dom = Dom_;
var utils = utils_;


var UIControlMeasure = function(ui, visible, visibleLock) {
    this.ui = ui;
    this.browser = ui.browser;
    this.control = this.ui.addControl('measure',
      '<div id="vts-measure" class="vts-measure">'

        + '<img id="vts-measure-button"'
          + ' class="vts-measure-button"'
          + ' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2lpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkNjI1MjFjMi1mYzE5LTcyNDUtOTI5My1kNTU3MmE5N2E1MjgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODJGRUI2NzE2NzkwMTFFN0EzRUZFNzQ1NEFCMkVFQUQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODJGRUI2NzA2NzkwMTFFN0EzRUZFNzQ1NEFCMkVFQUQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRBMjkwN0JENjc4QzExRTc5QTQwRjk4NjQzOEI4RDczIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRBMjkwN0JFNjc4QzExRTc5QTQwRjk4NjQzOEI4RDczIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k3ySjQAAAdJJREFUeNrclk0oBGEYgHemjZOLm8tSyt9BqT2I1O7JSdSSkpsDxZGLi5MTjn5K4SDh4OfiaPfkIDebOPiPUqKUiLKet96pzzT7MztxMPX0le+b95n3Z2ZZmUwm9NuXHfqLK1smsVhsED5hKkhswc4mYJmHVxgNIvIslyE4hnLYDSqycwiaoCGVSnUFFdk5BH2wKHtBRbYKqlVwbQhGoNU5GETkZHKpggjMqaBFhaGgIltv/mKphRuQss1oZkPuG4oRWTLHlmU5fSlhOYNKSEK7xIUugj+6hmSHpROm2RvL9Q7arqf80IykdDEdgll4IWi/Bm+ECT8Z2R7l+DBKV6N/PoRnEbBuwIKf0nm+8S7RGuzDLaxLMuw/5OuR+bn60ROPt9/pUUQnUEa6A56SyeSWeTYejzs9GkC8ZIpySjxEy1APbdCM6MAlGmeZdIahYIlLVAU9kIA7KZFxrJrA5+bU8RBjBf+eGD26gk0oI4AItiU4dMOqHh+GTylbQT3JU7oj2IMLmNBJrIATKIUoD5L2LfEQJbRPvXAP0iPZj5J92vNl9Fk6mSCZsBV4dwuyflb8XJrRqX6C3iDsFhSdiXOzZlSnwxD2yuBHJv/iX6JvAQYAPSICqA82OnoAAAAASUVORK5CYII=">'

        + '<img id="vts-measure-button2"'
          + ' class="vts-measure-button"'
          + ' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2Nzg3NzczMzY3OEMxMUU3QjU2QUUxNTNCNzc4MzVBQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2Nzg3NzczNDY3OEMxMUU3QjU2QUUxNTNCNzc4MzVBQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjY3ODc3NzMxNjc4QzExRTdCNTZBRTE1M0I3NzgzNUFCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjY3ODc3NzMyNjc4QzExRTdCNTZBRTE1M0I3NzgzNUFCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+owD8TQAAAepJREFUeNrcls8rBGEYx993lIMfxR4kF/+AKMqBg7K1ajelLEWK025tKOTnjVykuAklNgcHuzmQg4MiTtz4Aza3TeGActDr+45nZt41s7tmBwdbn2l35933M9/3eead5UII9tsvjf3FK2uSiGgBKdDtZW6JllXA2DG4A3teRM7LZQl2QRuY9irScghGQRXb5KteRVoOQSMY0895FGkk8JHgSBH0gllzpAeRkeSRBAEwQIIZUJMxukARly3GOZdpivA5DnpAM2iQ5zFx3KE55DIugT6cT+a7PTTlKt9xHAT74AzU6vWJiEVQ4iWR9uXHhkgu3QhYB/JK3zBZE6WoBkE3Ivt9YolOQBd9uwJedQFjC+A8XyJ1J3G+4zNFV+CCmmMejINnY8sQG0wVzZnFlnW2Fd55ezGaIUAtPgzqwAsmv8mYMCLW8DaqdyY1g73w+RMFQRh0glse1RtDHRvDcdJp6XInsScKU3u3gnukSfCoOcoH0YPa3jif/P7zxEqUoPqUkWBZ398YqwdTNHqLdu+YuyTONToEl+AaTIAhUE61qwTtuJC0e4klkssQAn7QTy3+BA5AhRQgfdoovHvJp6iYli5EdTqlBKZA7a7CJFaiHdABUqBUFfyMxBJt06PBrwpskn/xl+hDgAEAH0j0b9rsgVUAAAAASUVORK5CYII=">'

        + '<div id="vts-measure-text-holder" class="vts-measure-text-holder">'
            + '<div class="vts-measure-text-holder2">'
                + '<div class="vts-measure-text">'
                  + '<textarea id="vts-measure-text-input" rows="10" cols="67" wrap="hard"></textarea>'
                + '</div>'
                + '<div class="vts-measure-tools">'
                    + '<div id="vts-measure-position" class="vts-measure-tools-button">Position</div>'
                    + '<div id="vts-measure-length" class="vts-measure-tools-button">Length</div>'
                    + '<div id="vts-measure-track" class="vts-measure-tools-button">Track Length</div>'
                    + '<div id="vts-measure-area" class="vts-measure-tools-button">Area</div>'
                    + '<div id="vts-measure-volume" class="vts-measure-tools-button">Volume</div>'
                    + '<div id="vts-measure-clear" class="vts-measure-tools-button">Clear Log</div>'
                    + '<div id="vts-measure-metric" class="vts-measure-tools-button">Metric Units ON</div>'
                + '</div>'
            + '</div>'
        + '</div>'

        + '<div id="vts-measure-info" class="vts-measure-info">'
        + '</div>'

        + '<div id="vts-measure-buttons" class="vts-measure-compute">'
            + '<div id="vts-measure-undo" class="vts-measure-tools-button">Undo</div>'
            + '<div id="vts-measure-compute" class="vts-measure-tools-button">Compute</div>'
        + '</div>'
        
     + ' </div>', visible, visibleLock);
     
    this.div = this.control.getElement('vts-measure');

    this.buttonOff = this.control.getElement('vts-measure-button');
    this.buttonOff.on('click', this.onSwitch.bind(this));
    this.buttonOff.on('dblclick', this.onDoNothing.bind(this));

    this.buttonOn = this.control.getElement('vts-measure-button2');
    this.buttonOn.on('click', this.onSwitch.bind(this));
    this.buttonOn.on('dblclick', this.onDoNothing.bind(this));

    this.info = this.control.getElement('vts-measure-info');
    this.compute = this.control.getElement('vts-measure-buttons');

    var computeButton = this.control.getElement('vts-measure-undo');
    computeButton.on('click', this.onCompute.bind(this, 0));
    computeButton.on('dblclick', this.onDoNothing.bind(this));
    computeButton = this.control.getElement('vts-measure-compute');
    computeButton.on('click', this.onCompute.bind(this, 1));
    computeButton.on('dblclick', this.onDoNothing.bind(this));

    var clearButton = this.control.getElement('vts-measure-clear');
    clearButton.on('click', this.onClear.bind(this));
    clearButton.on('dblclick', this.onDoNothing.bind(this));

    var toolButton = this.control.getElement('vts-measure-position');
    toolButton.on('click', this.onTool.bind(this, 0));
    toolButton.on('dblclick', this.onDoNothing.bind(this));
    toolButton = this.control.getElement('vts-measure-length');
    toolButton.on('click', this.onTool.bind(this, 1));
    toolButton.on('dblclick', this.onDoNothing.bind(this));
    toolButton = this.control.getElement('vts-measure-track');
    toolButton.on('click', this.onTool.bind(this, 2));
    toolButton.on('dblclick', this.onDoNothing.bind(this));
    toolButton = this.control.getElement('vts-measure-area');
    toolButton.on('click', this.onTool.bind(this, 3));
    toolButton.on('dblclick', this.onDoNothing.bind(this));
    toolButton = this.control.getElement('vts-measure-volume');
    toolButton.on('click', this.onTool.bind(this, 4));
    toolButton.on('dblclick', this.onDoNothing.bind(this));
    toolButton = this.control.getElement('vts-measure-metric');
    toolButton.on('click', this.onTool.bind(this, 5));
    toolButton.on('dblclick', this.onDoNothing.bind(this));
    this.metricButton = toolButton;


    this.measuring = false;
    this.counter = 1;
    this.renderCounter = 1;
    this.lastCoords = null;
    this.navCoords = null;
    this.tool = 0;
    this.metric = true;
    this.mapUpdateDestructor = null;

    this.listPanel = this.control.getElement('vts-measure-text-holder');
    this.list = this.control.getElement('vts-measure-text-input');

    if (this.measuring) {
        this.buttonOn.setStyle('display', 'block');
        this.buttonOff.setStyle('display', 'none');
    } else {
        this.buttonOn.setStyle('display', 'none');
        this.buttonOff.setStyle('display', 'block');
    }    

    this.onMouseMoveCall = this.onMouseMove.bind(this);
    this.onMouseLeaveCall = this.onMouseLeave.bind(this);
    this.onMouseClickCall = this.onMouseClick.bind(this);
    this.onMapUpdateCall = this.onMapUpdate.bind(this);

    this.update();
};


UIControlMeasure.prototype.onDoNothing = function(event) {
    dom.stopPropagation(event);    
};


UIControlMeasure.prototype.onMouseLeave = function(event) {
    this.info.setStyle('display', 'none');
};


UIControlMeasure.prototype.onMouseClick = function(event) {
    var map = this.browser.getMap();
    if (!map) {
        return;
    }

    var mapElement = this.ui.getMapElement();
    var state = mapElement.getDraggingState();

    //if (state['dragging']) { //TODO: why does not work this parameter? Fix it once you have time
      //  return;
    //}
    var delta = state['absMoved'];

    if ((delta[0]+delta[1]) > 0) {
        return;
    }

    var coords = event.getMouseCoords();
    var clickCoords = map.getHitCoords(coords[0], coords[1], 'fix');

    map.redraw();

    if (!clickCoords) {
        return;
    }

    var i, li, res, str;
    var space = '  ';

    for (i = 0, li = ('' + this.counter).length; i < li; i++) {
        space += ' ';
    }

    if (this.tool == 0) {
        this.navCoords = clickCoords;
        clickCoords = map.convertCoordsFromNavToPublic(clickCoords, 'fix');

        str = '------------------------------------------------------\n';
        str += '#' + this.counter + ' Position: ';
        str += '\n' + space + clickCoords[0].toFixed(7) + ', ' + clickCoords[1].toFixed(7) + ', ' + this.getTextNumber(clickCoords[2]);
        this.counter++;

    } else if (this.tool == 1) { 
        if (!this.navCoords || this.navCoords.length == 2) {
            this.navCoords = [clickCoords];
            clickCoords = map.convertCoordsFromNavToPublic(clickCoords, 'fix');

            str = '------------------------------------------------------\n';
            str += '#' + this.counter + ' Length: ';
            str += '\n' + space + 'p1: ' + clickCoords[0].toFixed(7) + ', ' + clickCoords[1].toFixed(7) + ', ' + this.getTextNumber(clickCoords[2]);
        } else {
            this.navCoords.push(clickCoords);
            clickCoords = map.convertCoordsFromNavToPublic(clickCoords, 'fix');
            
            str = space + 'p2: ' + clickCoords[0].toFixed(7) + ', ' + clickCoords[1].toFixed(7) + ', ' + this.getTextNumber(clickCoords[2]);
            str += '\n' + space + '------------------------';

            res = map.getDistance(this.lastCoords, clickCoords, false, true);
            str += '\n' +  space + 'great-circle distance: ' + this.getTextNumber(res[0]);
            str += '\n' + space + 'euclidean distance: ' + this.getTextNumber(res[2]);
            str += '\n' + space + 'elevation difference: ' + this.getTextNumber(clickCoords[2] - this.lastCoords[2]);
            str += '\n' + space + 'azimuth: ' + res[1].toFixed(2) + ' deg';

            this.counter++;
        }
    } else if (this.tool == 2) { 
        if (this.renderCounter != this.counter) {
            this.renderCounter = this.counter;
            this.onTool(2);
        }

        if (!this.navCoords) {
            this.navCoords = [clickCoords];
            clickCoords = map.convertCoordsFromNavToPublic(clickCoords, 'fix');
            str = '------------------------------------------------------\n';
            str += '#' + this.counter + ' Track Length: ';
            str += '\n' + space + 'p1: ' + clickCoords[0].toFixed(7) + ', ' + clickCoords[1].toFixed(7) + ', ' + this.getTextNumber(clickCoords[2]);
        } else {
            this.navCoords.push(clickCoords);
            clickCoords = map.convertCoordsFromNavToPublic(clickCoords, 'fix');

            str = space + 'p' + this.navCoords.length + ': ' + clickCoords[0].toFixed(7) + ', ' + clickCoords[1].toFixed(7) + ', ' + this.getTextNumber(clickCoords[2]);
        }
    }

    this.lastCoords = clickCoords;

    if (str) {
        var listElement = this.list.getElement();
        listElement.value += str + '\n';
        listElement.scrollTop = listElement.scrollHeight;    //scroll list to the last line
    }
};


UIControlMeasure.prototype.onMouseMove = function(event) {
    var map = this.browser.getMap();
    if (!map) {
        return;
    }

    var coords = event.getMouseCoords();
    var clickCoords = map.getHitCoords(coords[0], coords[1], 'fix');

    if (!clickCoords) {
        this.info.setStyle('display', 'none');
        return;    
    }

    clickCoords = map.convertCoordsFromNavToPublic(clickCoords, 'fix');

    var str = clickCoords[0].toFixed(7) + ', ' + clickCoords[1].toFixed(7) + ', ' + this.getTextNumber(clickCoords[2]);

    coords[0] -= this.divRect.left;
    coords[1] -= this.divRect.top;

    this.info.setStyle('display', 'block');
    this.info.setStyle('left', (coords[0]+20)+'px');
    this.info.setStyle('top', (coords[1]+10)+'px');
    this.info.setHtml(str);
};


UIControlMeasure.prototype.onSwitch = function() {
    this.measuring = !this.measuring;

    var mapElement = this.ui.getMapElement();

    if (this.measuring) {
        this.buttonOn.setStyle('display', 'block');
        this.buttonOff.setStyle('display', 'none');

        this.divRect = this.div.getRect();

        mapElement.on('mousemove', this.onMouseMoveCall);
        mapElement.on('mouseleave', this.onMouseLeaveCall);
        mapElement.on('click', this.onMouseClickCall);
        this.mapUpdateDestructor = this.browser.on('map-update', this.onMapUpdateCall);

    } else {
        this.buttonOn.setStyle('display', 'none');
        this.buttonOff.setStyle('display', 'block');

        mapElement.off('mousemove', this.onMouseMoveCall);
        mapElement.off('mouseleave', this.onMouseLeaveCall);
        mapElement.off('click', this.onMouseClickCall);
        
        if (this.mapUpdateDestructor) {
            this.mapUpdateDestructor();
        }
    }

    this.onTool(this.tool);

    this.compute.setStyle('display', 'none');

    var map = this.browser.getMap();
    if (map) {
        map.redraw();
    }

    this.update();
};


UIControlMeasure.prototype.onTool = function(tool) {
    if (tool == 5) {
        this.metric = !this.metric;
        this.metricButton.setHtml(this.metric ? 'Metric Units ON' : 'Metric Units OFF');
        return;
    }

    this.tool = tool;
    this.navCoords = null;

    this.compute.setStyle('display', 'none');

    var map = this.browser.getMap();
    if (map) {
        map.redraw();
    }
};


UIControlMeasure.prototype.onCompute = function(button) {
    if (!this.navCoords) {
        return;
    }

    var map = this.browser.getMap();
    if (!map) {
        return;
    }

    var str;

    if (button == 0) {
        this.navCoords.pop();
    } else {
        if (this.tool == 2) {

            var distance = 0;
            var distance2 = 0, i, li, coords, coords2, res;
            var emin = Number.POSITIVE_INFINITY;
            var emax = Number.NEGATIVE_INFINITY;

            var space = '  ';

            for (i = 0, li = ('' + this.counter).length; i < li; i++) {
                space += ' ';
            }

            str = space + '------------------------';

            for (i = 0, li = this.navCoords.length; i < li; i++) {
                coords = map.convertCoordsFromNavToPublic(this.navCoords[i], 'fix');

                if (coords[2] > emax) {
                    emax = coords[2];
                }

                if (coords[2] < emin) {
                    emin = coords[2];
                }
            }

            for (i = 0, li = this.navCoords.length - 1; i < li; i++) {
                coords = map.convertCoordsFromNavToPublic(this.navCoords[i], 'fix');
                coords2 = map.convertCoordsFromNavToPublic(this.navCoords[i+1], 'fix');
                res = map.getDistance(coords, coords2, false, true);
                distance += res[0];
                distance2 += res[2];
            }

            str += '\n' +  space + 'great-circle distance: ' + this.getTextNumber(distance);
            str += '\n' + space + 'euclidean distance: ' + this.getTextNumber(distance2);
            str += '\n' + space + 'max elevation: ' + this.getTextNumber(emax);
            str += '\n' + space + 'min elevation: ' + this.getTextNumber(emin);
            str += '\n' + space + 'elevation difference: ' + this.getTextNumber(emax - emin);

            this.counter++;
        }
    }

    if (str) {
        var listElement = this.list.getElement();
        listElement.value += str + '\n';
        listElement.scrollTop = listElement.scrollHeight;    //scroll list to the last line
    }

    map.redraw();
};


UIControlMeasure.prototype.onClear = function() {
    this.counter = 1;
    this.lastCoords = null;
    this.navCoords = null;

    var listElement = this.list.getElement();
    listElement.value = '';
    listElement.scrollTop = 0;

    this.compute.setStyle('display', 'none');

    var map = this.browser.getMap();
    if (map) {
        map.redraw();
    }
};


UIControlMeasure.prototype.update = function() {
    //var button = this.control.getElement('vts-measure-button');
    
    var left = 10 + (this.ui.config.controlZoom ? 70 : 0) +
                (this.ui.config.controlSpace ? 35 : 0);
    
    this.div.setStyle('left', left + 'px');
    this.listPanel.setStyle('display', this.measuring ? 'block' : 'none');
};


UIControlMeasure.prototype.onMapUpdate = function() {
    var map = this.browser.getMap();
    if (!map) {
        return;
    }

    var renderer = this.browser.getRenderer();

    if (!this.circleImage) {
        this.circleImage = utils.loadImage(
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QAAAAAAAD5Q7t/AAAACW9GRnMAAAAgAAAA4ACD+EAUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA/UlEQVRYw+2VPwqDMBTG3dz1Am56EnH2XLroETxGuwc3Z7cOdhY8QJpfSUBspUvStJAPPggvD973/uQligICAgL+DKViqygUV02hbaXLwJlio7gpyhNu2idzEXwwgfI8H+u6vnZdN/V9P3EuimLcCRlsiyArGcfxjWDLsmzyAGzc4aNFNDZ7/iw7AeQH4LNrh5WZYLgkJTaZCyHuVVVdkiSZ0zSdOWMzlaBFWkRrQ4A4Zk/A4wBie1MFYUMAz0wybCYAmR8FUAlzj6+2r18TgM2VAO8tOB1Cyk7mrofQ+zP0voheVjHtIBjDxjrmvCu7k1Xs/TP6ie84ICDAGR5uCYdPo0MWiAAAAABJRU5ErkJggg==',
                //"http://maps.google.com/mapfiles/kml/shapes/placemarkcircle.png",
                (function(){
                    this.circleTexture = renderer.createTexture({ 'source': this.circleImage });
                }).bind(this)
            );
    }

    if (!this.circleTexture) {
        return;
    }

    var i, li, coords, points;

    switch(this.tool) {
        case 0: //point

            if (this.navCoords) {
                coords = map.convertCoordsFromNavToCanvas(this.navCoords, "fix");

                renderer.drawImage({
                    rect : [coords[0]-12, coords[1]-12, 24, 24],
                    texture : this.circleTexture,
                    color : [255,0,0,255],  //white point is multiplied by red color so resulting point will be red
                    depth : coords[2],
                    depthTest : false,
                    blend : true   //point texture has alpha channel so blend is needed
                    });
            }

            break;

        case 1: //line
        case 2: //track

            if (this.navCoords) {
                points = [];

                for (i = 0, li = this.navCoords.length; i < li; i++) {
                    points.push(map.convertCoordsFromNavToCanvas(this.navCoords[i], "fix"));
                }

                if (li > 1) {

                    var points2 = [], points3 = [], tmp;

                    for (i = 0, li = this.navCoords.length - 1; i < li; i++) {
                        tmp = map.getGeodesicLinePoints(this.navCoords[i], this.navCoords[i+1]);
                        points2 = points2.concat(tmp);
                    }

                    for (i = 0, li = points2.length; i < li; i++) {
                        points3.push(map.convertCoordsFromNavToCanvas(points2[i], "fix"));
                    }

                    renderer.drawLineString({
                        points : points3,
                        size : 5.0,
                        color : [0,0,0,255],
                        depthTest : false,
                        //depthTest : true,
                        //depthOffset : [-0.01,0,0],
                        blend : false
                        });

                    renderer.drawLineString({
                        points : points3,
                        size : 2.0,
                        color : [255,0,0,255],
                        depthTest : false,
                        //depthTest : true,
                        //depthOffset : [-0.01,0,0],
                        blend : false
                        });
                }

                for (i = 0, li = points.length; i < li; i++) {
                    coords = points[i];

                    renderer.drawImage({
                        rect : [coords[0]-12, coords[1]-12, 24, 24],
                        texture : this.circleTexture,
                        color : [255,0,0,255],  //white point is multiplied by red color so resulting point will be red
                        depth : coords[2],
                        depthTest : false,
                        blend : true   //point texture has alpha channel so blend is needed
                        });
                }
            }


    }


    if (this.tool == 2 && points) {
        if (points.length < 2 || this.renderCounter != this.counter) {
            this.compute.setStyle('display', 'none');
            return;    
        }

        coords = points[points.length - 1];
        coords[0] -= this.divRect.left;
        coords[1] -= this.divRect.top;

        this.compute.setStyle('display', 'block');
        this.compute.setStyle('left', (coords[0]+20)+'px');
        this.compute.setStyle('top', (coords[1]+10)+'px');
    }

};

UIControlMeasure.prototype.getTextNumber = function(value) {
    var m2ft = 3.28084, km2mi = 0.621371;

    if (value >= 100000) {
        return (this.metric) ? (value*0.001).toFixed(2) + 'km' : (value*0.001*km2mi).toFixed(2) + 'mi';
    } else {
        return (this.metric) ? (value).toFixed(2) + 'm' : (value*m2ft).toFixed(2) + 'ft';
    }
};

export default UIControlMeasure;

