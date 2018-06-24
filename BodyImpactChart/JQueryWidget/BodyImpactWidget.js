/// <reference path="jquery-1.11.0.js" />
/// <reference path="jquery-ui-1.10.4.custom.min.js" />

(function ($, undefined) {

    /* ------------
    --- GLOBALS ---
    ---------------*/
    var _canvasElement;
    var _hiddenElement;

    $.widget("msjps.BodyImpactChart", {
        /* ------------------------------------------------------------------------
        --- options:                                                            ---
        --- set of options.                       ---
        ----------------------------------------------------------------------------*/
        options: {
            //TODO: Add options for font, color, and background here
        },

        /* ------------------------------------------------------------------------
        --- _create:                                                            ---
        --- Function to create an instance of the widget.                       ---
        ----------------------------------------------------------------------------*/
        _create: function () {

            _canvasElement = $("<canvas id='canvDiagram'/>");
            _canvasElement.css("width", "300px");
            _canvasElement.css("height", "300px");
            _canvasElement.css("background", "url(body.png)");
            _canvasElement.css("border", "1px solid black");

            this.element.append(_canvasElement);

            _hiddenElement = this.element.append("<input type='hidden' id='divCoords'/>");
            //initialize the text field otherwise buggy
            _hiddenElement.value = "";
            this._bindEvents();
        },

        /* ------------------------------------------------------------------------
        --- _bindEvents:                                                          ---
        --- Function to initialize all the events for the widget                  ---
        ----------------------------------------------------------------------------*/
        _bindEvents: function() {
            this._on(_canvasElement, {
                click: function (event) {
                    //var $container = $(event.target);
                    this._canvClick(event.clientX, event.clientY);
                }
            });
        },

      

        /* ------------------------------------------------------------------------
        --- _destroy:                                                            ---
        --- Function to destroy an instance of the widget.                       ---
        ----------------------------------------------------------------------------*/
        destroy: function () {
            _canvasElement = null;
            _hiddenElement = null;
        },

        /* ------------------------------------------------------------------------
        --- _canvClick:                                                          ---
        --- Function to initialize all the events for the widget                  ---
        ----------------------------------------------------------------------------*/
        _canvClick: function (x, y) {
            var ctx = _canvasElement[0].getContext("2d");
            var rect = _canvasElement[0].getBoundingClientRect();
            ctx.font = "bold 8pt Arial";
            ctx.textAlign = "start";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "red";
            var locX = x - rect.left;
            var locY = (y - rect.top) / 2 //Not sure why we have to divide by 2. . . but only way it works. . .
            ctx.fillText("X", locX, locY);

            _hiddenElement.value = _hiddenElement.value + parseInt(x) + ":" + y + "|";
        },

        /* ------------------------------------------------------------------------
        --- clearCanvas:                                                          ---
        --- Function to clear the canvas                                          ---
        ----------------------------------------------------------------------------*/
        clearCanvas: function () {
            var ctx = _canvasElement[0].getContext("2d");
            var rect = _canvasElement[0].getBoundingClientRect();
            //clear the diagram
            ctx.clearRect(_canvasElement[0].clientLeft, _canvasElement[0].clientTop - 1, _canvasElement[0].width, rect.height);
            //clear the coordinates list
            _hiddenElement.value = "";
        },

        /* ------------------------------------------------------------------------
        --- saveCanvas:                                                          ---
        --- Function to save/retrieve values on the canvas                       ---
        ----------------------------------------------------------------------------*/
        saveCanvas: function () {
            return (_hiddenElement.value); //coordinate list
        },

        /* ------------------------------------------------------------------------
        --- saveCanvas:                                                          ---
        --- Function to save/retrieve values on the canvas                       ---
        ----------------------------------------------------------------------------*/
        loadCanvas: function (txtCordsList) { //coordinate list
            //clear the area
            this.clearCanvas();

            //split the string up into coordinate pairs
            var coordsArray = null;
            var coordsArray = txtCordsList.split("|");

            //Loop through each and plot back on diagram
            for (var i = 0; i < coordsArray.length - 1; i++) {
                var xyCoords = coordsArray[i].split(":");
                this._canvClick(xyCoords[0], xyCoords[1]);
            }
        }


    });
}(jQuery));