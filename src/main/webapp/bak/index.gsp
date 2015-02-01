<head>
    <TITLE>Geo Fence</TITLE>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta name="layout" content="remote-forms"/>
    <link rel="stylesheet" href="${createLinkTo(dir: 'js/tipswindows', file: 'tipswindows.css')}" type="text/css"/>
    <link rel="stylesheet" href="${createLinkTo(dir: 'js', file: 'jquery/jquery.autocomplete.css')}" type="text/css"/>
    <link rel="stylesheet" href="${createLinkTo(dir: 'css', file: 'layout.css')}" type="text/css"/>
    <link rel="stylesheet" href="${createLinkTo(dir: 'css', file: 'leaflet.css')}" type="text/css"/>
    <!-- [if lte IE 8]>
        <link rel="stylesheet" href="${createLinkTo(dir: 'css', file: 'leaflet.ie.css')}" type="text/css"/>
        <![endif]-->
    <link rel="stylesheet" href="${createLinkTo(dir: 'css', file: 'leaflet.draw.css')}" type="text/css"/>
    <!-- [if lte IE 8]>
        <link rel="stylesheet" href="${createLinkTo(dir: 'css', file: 'leaflet.draw.ie.css')}" type="text/css"/>
        <![endif]-->
    <link rel="stylesheet" href="${createLinkTo(dir: 'css', file: 'mapbox.css')}" type="text/css"/>
    <!-- [if lte IE 8]>
        <link rel="stylesheet" href="${createLinkTo(dir: 'css', file: 'mapbox.ie.css')}" type="text/css"/>
        <![endif]-->
    <link rel="stylesheet" href="${createLinkTo(dir: 'css', file: 'main.css')}" type="text/css"/>
    <g:javascript src="jquery/jquery.blockUI.js"/>
    <g:javascript src="common.js"/>
    <g:javascript src="jquery/jquery.autocomplete.js"/>
    <g:javascript src="map/leaflet-src.js"></g:javascript>
    <g:javascript src="map/handler/Edit.Poly.js"></g:javascript>
    <g:javascript src="map/handler/Edit.SimpleShape.js"></g:javascript>
    <g:javascript src="map/handler/Edit.Circle.js"></g:javascript>
    <g:javascript src="map/handler/Edit.Rectangle.js"></g:javascript>
    <g:javascript src="map/handler/Draw.Feature.js"></g:javascript>
    <g:javascript src="map/handler/Draw.Polygon.js"></g:javascript>
    <g:javascript src="map/handler/Draw.Polyline.js"></g:javascript>
    <g:javascript src="map/handler/Draw.SimpleShape.js"></g:javascript>
    <g:javascript src="map/handler/Draw.Rectangle.js"></g:javascript>
    <g:javascript src="map/handler/Draw.Circle.js"></g:javascript>
    <g:javascript src="map/handler/Draw.Marker.js"></g:javascript>
    <g:javascript src="map/ext/LatLngUtil.js"></g:javascript>
    <g:javascript src="map/ext/LineUtil.Intersect.js"></g:javascript>
    <g:javascript src="map/ext/GeometryUtil.js"></g:javascript>
    <g:javascript src="map/ext/Polygon.Intersect.js"></g:javascript>
    <g:javascript src="map/ext/Polyline.Intersect.js"></g:javascript>
    <g:javascript src="map/Control.Draw.js"></g:javascript>
    <g:javascript src="map/Tooltip.js"></g:javascript>
    <g:javascript src="map/Toolbar.js"></g:javascript>
    <g:javascript src="map/DrawToolbar.js"></g:javascript>
    <g:javascript src="map/EditToolbar.js"></g:javascript>
    <g:javascript src="map/handler/EditToolbar.Edit.js"></g:javascript>
    <g:javascript src="map/handler/EditToolbar.Delete.js"></g:javascript>
    <g:javascript src="map/mapbox.js"></g:javascript>
    <g:javascript src="map/leaflet.draw-src.js"></g:javascript>
    <g:javascript src="mapbar/domain.js"></g:javascript>
    <g:javascript src="mapbar/alarmZone.js"></g:javascript>
    <g:javascript src="tipswindows/tipswindows.js"/>
    <script type="text/javascript">
        jQuery(document).ready(function () {
            jQuery("html").css("overflow", "hidden");
            jQuery("#centercon").css("overflow", "hidden");
            jQuery("#layoutBody").css("overflow-y", "auto");
            jQuery("#main").css("overflow", "hidden");

            calHeight(getBrowserHeight(), "#layoutBody", "#tophead");
            adjustHeight("#layoutBody", "#main");

            jQuery("#layoutBody").css("width", "100%");
            //定义在子页面
            if (typeof(initpage) == 'function') {
                initpage();
            }
        });

        function mainLayout() {
            pane = jQuery('#main').layout({
                        west__size:250, west__spacing_open:3, center__onresize:"resizePage"
                    });
        }

        //用于在左侧菜单关闭时打开菜单
        function openLeftMenu() {
            pane.open('west');
            jQuery("#openCenter").hide();
        }

        //用于在左侧菜单打开时关闭菜单
        function closeLeftMenu() {
            pane.close('west');
            jQuery("#openCenter").show();
        }

        function initpage() {
            initLayout();
            resizeMap();
        }

        function resizePage() {
            middleLayout.resizeAll();
            resizeMap();
        }

        function initLayout() {
            if (typeof(mainLayout) == 'function') {
                mainLayout();
            }
            adjustHeight("#main", "#rightBox");
            middleLayout = jQuery('#rightBox').layout({
                        center__paneSelector: ".inner-center"
                    });
        }

        function resizeMap() {
            var mapWidth = jQuery(".inner-center").width();
            var mapHeight = jQuery(".inner-center").height();
            var navHeight = jQuery("#topNav").height();
            jQuery("#mapbar").height(mapHeight - navHeight);
            jQuery("#mapbar").width(mapWidth);
        }
    </script>
</head>

<body>
<g:render template="menu"/>
<input type="hidden" id="zoomLevel" value="${view?.zoomLevel}"/>
<input type="hidden" id="center" value="${view?.center}"/>
<input type="hidden" id="pageid" value="alarmZone"/>
<input type="hidden" id="pageidSub" value="alarmArea"/>

<div id="gpsPoiDiv"
     style="display:none;position:absolute;top:140px;right:10px;width:200px;background:#fff;padding:0px; z-index:2;border:solid 1px #979797;"></div>

<div id="main">


    <div id="left" class="ui-layout-west">
        <div id="searchDiv">
            <div class="treecha">
                <label><img style="cursor:pointer" onclick="closeLeftMenu()"
                            src="${resource(dir: "images", file: "toleft.gif")}"/></label>
            </div>
            <table width="100%" cellpadding="0" cellspacing="1">
                <thead>
                <th style="text-align: center">Geo Fence</th>
                </thead>
                <tbody>
                <tr>
                    <td style="text-align: center">
                        Fence Name：<input id="keyword" name="keyword" type="text" size="12" value=""/>
                        <input type="button" id="searchButton" class="btn2" value="Search" style="cursor:pointer"/>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <div id="list" style="padding:4px 4px 0px 4px;">
            <table id="searchResult" width="100%" cellpadding="0" cellspacing="1" style="overflow:auto;">
                <thead>
                <th style="text-align: center;width:35%">Fence Name</th>
                <th style="text-align: center;width:25%">Fence Type</th>
                %{--<th style="text-align: center;width:18%">关联数</th>--}%
                <th style="text-align: center;width:32%">Action</th>
                </thead>
                <tbody>
                </tbody>
            </table>

            <div style="padding:4px 4px 0px 4px;text-align:right">
                <span id="lblCounts">[Total<span id="allResultNumber" style="font-weight: bold"></span>|Page<span
                        id="currentPageNumber" style="font-weight: bold"></span>/<span id="allPageNumber"
                                                                                       style="font-weight: bold"></span>]
                </span>
                <a href="javascript:void(0);">
                    <img id="result_first" title="First Page" alt="First Page"
                         src="${createLinkTo(dir: 'images', file: 'layout/pic/location/resultset_first.gif')}"/></a>
                <a href="javascript:void(0);">
                    <img id="result_previous" title="Previous" alt="Previous"
                         src="${createLinkTo(dir: 'images', file: 'layout/pic/location/resultset_previous.gif')}"/></a>
                <a href="javascript:void(0);">
                    <img id="result_next" title="Next" alt="Next"
                         src="${createLinkTo(dir: 'images', file: 'layout/pic/location/resultset_next.gif')}"/></a>
                <a href="javascript:void(0);">
                    <img id="result_last" title="Last Page" alt="Last Page"
                         src="${createLinkTo(dir: 'images', file: 'layout/pic/location/resultset_last.gif')}"/></a>
            </div>
        </div>
    </div>

    <div id="right" class="ui-layout-center">
        <div id="rightBox">
            <div id="zoomZone" class="inner-center">
                <div id="topNav" class="topNav clearfix">
                    <div id="openCenter" style="float:left;display:none;"><img onclick="openLeftMenu()"
                                                                               src="${resource(dir: 'images', file: 'toright2.gif')}"
                                                                               alt="Open Left Menu"/></div>

                    <div id="backGeography">
                        <ul class="navMenu">
                            <li><span class="nolink" id="place">Center of Map：</span></li>
                        </ul>
                    </div>
                </div>

                <div id="mapbar">
                </div>
                <script type='text/javascript'>
                    searchZone("", 1);
                    jQuery("#mapbar").height(jQuery(window).height() - 100);
                    var map = new L.mapbox.map('mapbar', 'beiowolf.map-niz3drxf').setView([-25,140], 8);
                    var featureGroup = L.featureGroup().addTo(map);
                    var drawControl = new L.Control.Draw({
                                position: 'topright',
                                draw: {
                                    polyline: {
                                        metric: true
                                    },
                                    polygon: {
                                        allowIntersection: false,
                                        showArea: true,
                                        drawError: {
                                            color: '#b00b00',
                                            timeout: 1000
                                        },
                                        shapeOptions: {
                                            color: '#bada55'
                                        }
                                    },
                                    circle: {
                                        shapeOptions: {
                                            color: '#662d91'
                                        }
                                    },
                                    marker: true
                                },
                                edit: {
                                    featureGroup: featureGroup,
                                    remove: true
                                }
                            });
                    map.addControl(drawControl);
                    map.on('draw:created', function (e) {
                        var type = e.layerType,
                                layer = e.layer;

                        if (type === 'marker') {
                            layer.bindPopup('A popup!');
                        }

                        featureGroup.addLayer(e.layer);
                    });

                    map.on('draw:edited', function (e) {
                        var layers = e.layers;
                        var countOfEditedLayers = 0;
                        layers.eachLayer(function(layer) {
                            countOfEditedLayers++;
                        });
                        console.log("Edited " + countOfEditedLayers + " layers");
                    });

                    /*L.DomUtil.get('changeColor').onclick = function () {
                        drawControl.setDrawingOptions({ rectangle: { shapeOptions: { color: '#004a80' } } });
                    };*/
                </script>
            </div>
        </div>
    </div>
</div>
</body>