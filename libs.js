/*
jquery-circle-progress - jQuery Plugin to draw animated circular progress bars

URL: http://kottenator.github.io/jquery-circle-progress/
Author: Rostyslav Bryzgunov <kottenator@gmail.com>
Version: 1.1.3
License: MIT
*/
(function($) {
    function CircleProgress(config) {
        this.init(config);
    }

    CircleProgress.prototype = {
        //----------------------------------------------- public options -----------------------------------------------
        /**
         * This is the only required option. It should be from 0.0 to 1.0
         * @type {number}
         */
        value: 0.0,

        /**
         * Size of the circle / canvas in pixels
         * @type {number}
         */
        size: 100.0,

        /**
         * Initial angle for 0.0 value in radians
         * @type {number}
         */
        startAngle: -Math.PI,

        /**
         * Width of the arc. By default it's auto-calculated as 1/14 of size, but you may set it explicitly in pixels
         * @type {number|string}
         */
        thickness: 'auto',

        /**
         * Fill of the arc. You may set it to:
         *   - solid color:
         *     - { color: '#3aeabb' }
         *     - { color: 'rgba(255, 255, 255, .3)' }
         *   - linear gradient (left to right):
         *     - { gradient: ['#3aeabb', '#fdd250'], gradientAngle: Math.PI / 4 }
         *     - { gradient: ['red', 'green', 'blue'], gradientDirection: [x0, y0, x1, y1] }
         *   - image:
         *     - { image: 'http://i.imgur.com/pT0i89v.png' }
         *     - { image: imageObject }
         *     - { color: 'lime', image: 'http://i.imgur.com/pT0i89v.png' } - color displayed until the image is loaded
         */
        fill: {
            gradient: ['#3aeabb', '#fdd250']
        },

        /**
         * Color of the "empty" arc. Only a color fill supported by now
         * @type {string}
         */
        emptyFill: 'rgba(0, 0, 0, .1)',

        /**
         * Animation config (see jQuery animations: http://api.jquery.com/animate/)
         */
        animation: {
            duration: 1200,
            easing: 'circleProgressEasing'
        },

        /**
         * Default animation starts at 0.0 and ends at specified `value`. Let's call this direct animation.
         * If you want to make reversed animation then you should set `animationStartValue` to 1.0.
         * Also you may specify any other value from 0.0 to 1.0
         * @type {number}
         */
        animationStartValue: 0.0,

        /**
         * Reverse animation and arc draw
         * @type {boolean}
         */
        reverse: false,

        /**
         * Arc line cap ('butt', 'round' or 'square')
         * Read more: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.lineCap
         * @type {string}
         */
        lineCap: 'butt',

        //-------------------------------------- protected properties and methods --------------------------------------
        /**
         * @protected
         */
        constructor: CircleProgress,

        /**
         * Container element. Should be passed into constructor config
         * @protected
         * @type {jQuery}
         */
        el: null,

        /**
         * Canvas element. Automatically generated and prepended to the {@link CircleProgress.el container}
         * @protected
         * @type {HTMLCanvasElement}
         */
        canvas: null,

        /**
         * 2D-context of the {@link CircleProgress.canvas canvas}
         * @protected
         * @type {CanvasRenderingContext2D}
         */
        ctx: null,

        /**
         * Radius of the outer circle. Automatically calculated as {@link CircleProgress.size} / 2
         * @protected
         * @type {number}
         */
        radius: 0.0,

        /**
         * Fill of the main arc. Automatically calculated, depending on {@link CircleProgress.fill} option
         * @protected
         * @type {string|CanvasGradient|CanvasPattern}
         */
        arcFill: null,

        /**
         * Last rendered frame value
         * @protected
         * @type {number}
         */
        lastFrameValue: 0.0,

        /**
         * Init/re-init the widget
         * @param {object} config - Config
         */
        init: function(config) {
            $.extend(this, config);
            this.radius = this.size / 2;
            this.initWidget();
            this.initFill();
            this.draw();
        },

        /**
         * @protected
         */
        initWidget: function() {
            var canvas = this.canvas = this.canvas || $('<canvas>').prependTo(this.el)[0];
            canvas.width = this.size;
            canvas.height = this.size;
            this.ctx = canvas.getContext('2d');
        },

        /**
         * This method sets {@link CircleProgress.arcFill}
         * It could do this async (on image load)
         * @protected
         */
        initFill: function() {
            var self = this,
                fill = this.fill,
                ctx = this.ctx,
                size = this.size;

            if (!fill)
                throw Error("The fill is not specified!");

            if (fill.color)
                this.arcFill = fill.color;

            if (fill.gradient) {
                var gr = fill.gradient;

                if (gr.length == 1) {
                    this.arcFill = gr[0];
                } else if (gr.length > 1) {
                    var ga = fill.gradientAngle || 0, // gradient direction angle; 0 by default
                        gd = fill.gradientDirection || [
                            size / 2 * (1 - Math.cos(ga)), // x0
                            size / 2 * (1 + Math.sin(ga)), // y0
                            size / 2 * (1 + Math.cos(ga)), // x1
                            size / 2 * (1 - Math.sin(ga))  // y1
                        ];

                    var lg = ctx.createLinearGradient.apply(ctx, gd);

                    for (var i = 0; i < gr.length; i++) {
                        var color = gr[i],
                            pos = i / (gr.length - 1);

                        if ($.isArray(color)) {
                            pos = color[1];
                            color = color[0];
                        }

                        lg.addColorStop(pos, color);
                    }

                    this.arcFill = lg;
                }
            }

            if (fill.image) {
                var img;

                if (fill.image instanceof Image) {
                    img = fill.image;
                } else {
                    img = new Image();
                    img.src = fill.image;
                }

                if (img.complete)
                    setImageFill();
                else
                    img.onload = setImageFill;
            }

            function setImageFill() {
                var bg = $('<canvas>')[0];
                bg.width = self.size;
                bg.height = self.size;
                bg.getContext('2d').drawImage(img, 0, 0, size, size);
                self.arcFill = self.ctx.createPattern(bg, 'no-repeat');
                self.drawFrame(self.lastFrameValue);
            }
        },

        draw: function() {
            if (this.animation)
                this.drawAnimated(this.value);
            else
                this.drawFrame(this.value);
        },

        /**
         * @protected
         * @param {number} v - Frame value
         */
        drawFrame: function(v) {
            this.lastFrameValue = v;
            this.ctx.clearRect(0, 0, this.size, this.size);
            this.drawEmptyArc(v);
            this.drawArc(v);
        },

        /**
         * @protected
         * @param {number} v - Frame value
         */
        drawArc: function(v) {
            var ctx = this.ctx,
                r = this.radius,
                t = this.getThickness(),
                a = this.startAngle;

            ctx.save();
            ctx.beginPath();

            if (!this.reverse) {
                ctx.arc(r, r, r - t / 2, a, a + Math.PI * 2 * v);
            } else {
                ctx.arc(r, r, r - t / 2, a - Math.PI * 2 * v, a);
            }

            ctx.lineWidth = t;
            ctx.lineCap = this.lineCap;
            ctx.strokeStyle = this.arcFill;
            ctx.stroke();
            ctx.restore();
        },

        /**
         * @protected
         * @param {number} v - Frame value
         */
        drawEmptyArc: function(v) {
            var ctx = this.ctx,
                r = this.radius,
                t = this.getThickness(),
                a = this.startAngle;

            if (v < 1) {
                ctx.save();
                ctx.beginPath();

                if (v <= 0) {
                    ctx.arc(r, r, r - t / 2, 0, Math.PI * 2);
                } else {
                    if (!this.reverse) {
                        ctx.arc(r, r, r - t / 2, a + Math.PI * 2 * v, a);
                    } else {
                        ctx.arc(r, r, r - t / 2, a, a - Math.PI * 2 * v);
                    }
                }

                ctx.lineWidth = t;
                ctx.strokeStyle = this.emptyFill;
                ctx.stroke();
                ctx.restore();
            }
        },

        /**
         * @protected
         * @param {number} v - Value
         */
        drawAnimated: function(v) {
            var self = this,
                el = this.el,
                canvas = $(this.canvas);

            // stop previous animation before new "start" event is triggered
            canvas.stop(true, false);
            el.trigger('circle-animation-start');

            canvas
                .css({ animationProgress: 0 })
                .animate({ animationProgress: 1 }, $.extend({}, this.animation, {
                    step: function (animationProgress) {
                        var stepValue = self.animationStartValue * (1 - animationProgress) + v * animationProgress;
                        self.drawFrame(stepValue);
                        el.trigger('circle-animation-progress', [animationProgress, stepValue]);
                    }
                }))
                .promise()
                .always(function() {
                    // trigger on both successful & failure animation end
                    el.trigger('circle-animation-end');
                });
        },

        /**
         * @protected
         * @returns {number}
         */
        getThickness: function() {
            return $.isNumeric(this.thickness) ? this.thickness : this.size / 14;
        },

        getValue: function() {
            return this.value;
        },

        setValue: function(newValue) {
            if (this.animation)
                this.animationStartValue = this.lastFrameValue;
            this.value = newValue;
            this.draw();
        }
    };

    //-------------------------------------------- Initiating jQuery plugin --------------------------------------------
    $.circleProgress = {
        // Default options (you may override them)
        defaults: CircleProgress.prototype
    };

    // ease-in-out-cubic
    $.easing.circleProgressEasing = function(x, t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    };

    /**
     * Draw animated circular progress bar.
     *
     * Appends <canvas> to the element or updates already appended one.
     *
     * If animated, throws 3 events:
     *
     *   - circle-animation-start(jqEvent)
     *   - circle-animation-progress(jqEvent, animationProgress, stepValue) - multiple event;
     *                                                                        animationProgress: from 0.0 to 1.0;
     *                                                                        stepValue: from 0.0 to value
     *   - circle-animation-end(jqEvent)
     *
     * @param configOrCommand - Config object or command name
     *     Example: { value: 0.75, size: 50, animation: false };
     *     you may set any public property (see above);
     *     `animation` may be set to false;
     *     you may use .circleProgress('widget') to get the canvas
     *     you may use .circleProgress('value', newValue) to dynamically update the value
     *
     * @param commandArgument - Some commands (like 'value') may require an argument
     */
    $.fn.circleProgress = function(configOrCommand, commandArgument) {
        var dataName = 'circle-progress',
            firstInstance = this.data(dataName);

        if (configOrCommand == 'widget') {
            if (!firstInstance)
                throw Error('Calling "widget" method on not initialized instance is forbidden');
            return firstInstance.canvas;
        }

        if (configOrCommand == 'value') {
            if (!firstInstance)
                throw Error('Calling "value" method on not initialized instance is forbidden');
            if (typeof commandArgument == 'undefined') {
                return firstInstance.getValue();
            } else {
                var newValue = arguments[1];
                return this.each(function() {
                    $(this).data(dataName).setValue(newValue);
                });
            }
        }

        return this.each(function() {
            var el = $(this),
                instance = el.data(dataName),
                config = $.isPlainObject(configOrCommand) ? configOrCommand : {};

            if (instance) {
                instance.init(config);
            } else {
                var initialConfig = $.extend({}, el.data());
                if (typeof initialConfig.fill == 'string')
                    initialConfig.fill = JSON.parse(initialConfig.fill);
                if (typeof initialConfig.animation == 'string')
                    initialConfig.animation = JSON.parse(initialConfig.animation);
                config = $.extend(initialConfig, config);
                config.el = el;
                instance = new CircleProgress(config);
                el.data(dataName, instance);
            }
        });
    };
})(jQuery);


/*!
Waypoints - 4.0.0
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/
(function() {
    'use strict'

    var keyCounter = 0
    var allWaypoints = {}

    /* http://imakewebthings.com/waypoints/api/waypoint */
        function Waypoint(options) {
            if (!options) {
                throw new Error('No options passed to Waypoint constructor')
            }
            if (!options.element) {
                throw new Error('No element option passed to Waypoint constructor')
            }
            if (!options.handler) {
                throw new Error('No handler option passed to Waypoint constructor')
            }

            this.key = 'waypoint-' + keyCounter
            this.options = Waypoint.Adapter.extend({}, Waypoint.defaults, options)
            this.element = this.options.element
            this.adapter = new Waypoint.Adapter(this.element)
            this.callback = options.handler
            this.axis = this.options.horizontal ? 'horizontal' : 'vertical'
            this.enabled = this.options.enabled
            this.triggerPoint = null
            this.group = Waypoint.Group.findOrCreate({
                name: this.options.group,
                axis: this.axis
            })
            this.context = Waypoint.Context.findOrCreateByElement(this.options.context)

            if (Waypoint.offsetAliases[this.options.offset]) {
                this.options.offset = Waypoint.offsetAliases[this.options.offset]
            }
            this.group.add(this)
            this.context.add(this)
            allWaypoints[this.key] = this
            keyCounter += 1
        }

        /* Private */
        Waypoint.prototype.queueTrigger = function(direction) {
            this.group.queueTrigger(this, direction)
        }

        /* Private */
        Waypoint.prototype.trigger = function(args) {
            if (!this.enabled) {
                return
            }
            if (this.callback) {
                this.callback.apply(this, args)
            }
        }

        /* Public */
        /* http://imakewebthings.com/waypoints/api/destroy */
        Waypoint.prototype.destroy = function() {
            this.context.remove(this)
            this.group.remove(this)
            delete allWaypoints[this.key]
        }

        /* Public */
        /* http://imakewebthings.com/waypoints/api/disable */
        Waypoint.prototype.disable = function() {
            this.enabled = false
            return this
        }

        /* Public */
        /* http://imakewebthings.com/waypoints/api/enable */
        Waypoint.prototype.enable = function() {
            this.context.refresh()
            this.enabled = true
            return this
        }

        /* Public */
        /* http://imakewebthings.com/waypoints/api/next */
        Waypoint.prototype.next = function() {
            return this.group.next(this)
        }

        /* Public */
        /* http://imakewebthings.com/waypoints/api/previous */
        Waypoint.prototype.previous = function() {
            return this.group.previous(this)
        }

        /* Private */
        Waypoint.invokeAll = function(method) {
            var allWaypointsArray = []
            for (var waypointKey in allWaypoints) {
                allWaypointsArray.push(allWaypoints[waypointKey])
            }
            for (var i = 0, end = allWaypointsArray.length; i < end; i++) {
                allWaypointsArray[i][method]()
            }
        }

        /* Public */
        /* http://imakewebthings.com/waypoints/api/destroy-all */
        Waypoint.destroyAll = function() {
            Waypoint.invokeAll('destroy')
        }

        /* Public */
        /* http://imakewebthings.com/waypoints/api/disable-all */
        Waypoint.disableAll = function() {
            Waypoint.invokeAll('disable')
        }

        /* Public */
        /* http://imakewebthings.com/waypoints/api/enable-all */
        Waypoint.enableAll = function() {
            Waypoint.invokeAll('enable')
        }

        /* Public */
        /* http://imakewebthings.com/waypoints/api/refresh-all */
        Waypoint.refreshAll = function() {
            Waypoint.Context.refreshAll()
        }

        /* Public */
        /* http://imakewebthings.com/waypoints/api/viewport-height */
        Waypoint.viewportHeight = function() {
            return window.innerHeight || document.documentElement.clientHeight
        }

        /* Public */
        /* http://imakewebthings.com/waypoints/api/viewport-width */
        Waypoint.viewportWidth = function() {
            return document.documentElement.clientWidth
        }

    Waypoint.adapters = []

    Waypoint.defaults = {
        context: window,
        continuous: true,
        enabled: true,
        group: 'default',
        horizontal: false,
        offset: 0
    }

    Waypoint.offsetAliases = {
        'bottom-in-view': function() {
            return this.context.innerHeight() - this.adapter.outerHeight()
        },
        'right-in-view': function() {
            return this.context.innerWidth() - this.adapter.outerWidth()
        }
    }

    window.Waypoint = Waypoint
}());
(function() {
    'use strict'

    function requestAnimationFrameShim(callback) {
        window.setTimeout(callback, 1000 / 60)
    }

    var keyCounter = 0
    var contexts = {}
    var Waypoint = window.Waypoint
    var oldWindowLoad = window.onload

    /* http://imakewebthings.com/waypoints/api/context */
        function Context(element) {
            this.element = element
            this.Adapter = Waypoint.Adapter
            this.adapter = new this.Adapter(element)
            this.key = 'waypoint-context-' + keyCounter
            this.didScroll = false
            this.didResize = false
            this.oldScroll = {
                x: this.adapter.scrollLeft(),
                y: this.adapter.scrollTop()
            }
            this.waypoints = {
                vertical: {},
                horizontal: {}
            }

            element.waypointContextKey = this.key
            contexts[element.waypointContextKey] = this
            keyCounter += 1

            this.createThrottledScrollHandler()
            this.createThrottledResizeHandler()
        }

        /* Private */
        Context.prototype.add = function(waypoint) {
            var axis = waypoint.options.horizontal ? 'horizontal' : 'vertical'
            this.waypoints[axis][waypoint.key] = waypoint
            this.refresh()
        }

        /* Private */
        Context.prototype.checkEmpty = function() {
            var horizontalEmpty = this.Adapter.isEmptyObject(this.waypoints.horizontal)
            var verticalEmpty = this.Adapter.isEmptyObject(this.waypoints.vertical)
            if (horizontalEmpty && verticalEmpty) {
                this.adapter.off('.waypoints')
                delete contexts[this.key]
            }
        }

        /* Private */
        Context.prototype.createThrottledResizeHandler = function() {
            var self = this

                function resizeHandler() {
                    self.handleResize()
                    self.didResize = false
                }

            this.adapter.on('resize.waypoints', function() {
                if (!self.didResize) {
                    self.didResize = true
                    Waypoint.requestAnimationFrame(resizeHandler)
                }
            })
        }

        /* Private */
        Context.prototype.createThrottledScrollHandler = function() {
            var self = this

                function scrollHandler() {
                    self.handleScroll()
                    self.didScroll = false
                }

            this.adapter.on('scroll.waypoints', function() {
                if (!self.didScroll || Waypoint.isTouch) {
                    self.didScroll = true
                    Waypoint.requestAnimationFrame(scrollHandler)
                }
            })
        }

        /* Private */
        Context.prototype.handleResize = function() {
            Waypoint.Context.refreshAll()
        }

        /* Private */
        Context.prototype.handleScroll = function() {
            var triggeredGroups = {}
            var axes = {
                horizontal: {
                    newScroll: this.adapter.scrollLeft(),
                    oldScroll: this.oldScroll.x,
                    forward: 'right',
                    backward: 'left'
                },
                vertical: {
                    newScroll: this.adapter.scrollTop(),
                    oldScroll: this.oldScroll.y,
                    forward: 'down',
                    backward: 'up'
                }
            }

            for (var axisKey in axes) {
                var axis = axes[axisKey]
                var isForward = axis.newScroll > axis.oldScroll
                var direction = isForward ? axis.forward : axis.backward

                for (var waypointKey in this.waypoints[axisKey]) {
                    var waypoint = this.waypoints[axisKey][waypointKey]
                    var wasBeforeTriggerPoint = axis.oldScroll < waypoint.triggerPoint
                    var nowAfterTriggerPoint = axis.newScroll >= waypoint.triggerPoint
                    var crossedForward = wasBeforeTriggerPoint && nowAfterTriggerPoint
                    var crossedBackward = !wasBeforeTriggerPoint && !nowAfterTriggerPoint
                    if (crossedForward || crossedBackward) {
                        waypoint.queueTrigger(direction)
                        triggeredGroups[waypoint.group.id] = waypoint.group
                    }
                }
            }

            for (var groupKey in triggeredGroups) {
                triggeredGroups[groupKey].flushTriggers()
            }

            this.oldScroll = {
                x: axes.horizontal.newScroll,
                y: axes.vertical.newScroll
            }
        }

        /* Private */
        Context.prototype.innerHeight = function() {
            /*eslint-disable eqeqeq */
            if (this.element == this.element.window) {
                return Waypoint.viewportHeight()
            }
            /*eslint-enable eqeqeq */
            return this.adapter.innerHeight()
        }

        /* Private */
        Context.prototype.remove = function(waypoint) {
            delete this.waypoints[waypoint.axis][waypoint.key]
            this.checkEmpty()
        }

        /* Private */
        Context.prototype.innerWidth = function() {
            /*eslint-disable eqeqeq */
            if (this.element == this.element.window) {
                return Waypoint.viewportWidth()
            }
            /*eslint-enable eqeqeq */
            return this.adapter.innerWidth()
        }

        /* Public */
        /* http://imakewebthings.com/waypoints/api/context-destroy */
        Context.prototype.destroy = function() {
            var allWaypoints = []
            for (var axis in this.waypoints) {
                for (var waypointKey in this.waypoints[axis]) {
                    allWaypoints.push(this.waypoints[axis][waypointKey])
                }
            }
            for (var i = 0, end = allWaypoints.length; i < end; i++) {
                allWaypoints[i].destroy()
            }
        }

        /* Public */
        /* http://imakewebthings.com/waypoints/api/context-refresh */
        Context.prototype.refresh = function() {
            /*eslint-disable eqeqeq */
            var isWindow = this.element == this.element.window
            /*eslint-enable eqeqeq */
            var contextOffset = isWindow ? undefined : this.adapter.offset()
            var triggeredGroups = {}
            var axes

            this.handleScroll()
            axes = {
                horizontal: {
                    contextOffset: isWindow ? 0 : contextOffset.left,
                    contextScroll: isWindow ? 0 : this.oldScroll.x,
                    contextDimension: this.innerWidth(),
                    oldScroll: this.oldScroll.x,
                    forward: 'right',
                    backward: 'left',
                    offsetProp: 'left'
                },
                vertical: {
                    contextOffset: isWindow ? 0 : contextOffset.top,
                    contextScroll: isWindow ? 0 : this.oldScroll.y,
                    contextDimension: this.innerHeight(),
                    oldScroll: this.oldScroll.y,
                    forward: 'down',
                    backward: 'up',
                    offsetProp: 'top'
                }
            }

            for (var axisKey in axes) {
                var axis = axes[axisKey]
                for (var waypointKey in this.waypoints[axisKey]) {
                    var waypoint = this.waypoints[axisKey][waypointKey]
                    var adjustment = waypoint.options.offset
                    var oldTriggerPoint = waypoint.triggerPoint
                    var elementOffset = 0
                    var freshWaypoint = oldTriggerPoint == null
                    var contextModifier, wasBeforeScroll, nowAfterScroll
                    var triggeredBackward, triggeredForward

                    if (waypoint.element !== waypoint.element.window) {
                        elementOffset = waypoint.adapter.offset()[axis.offsetProp]
                    }

                    if (typeof adjustment === 'function') {
                        adjustment = adjustment.apply(waypoint)
                    } else if (typeof adjustment === 'string') {
                        adjustment = parseFloat(adjustment)
                        if (waypoint.options.offset.indexOf('%') > -1) {
                            adjustment = Math.ceil(axis.contextDimension * adjustment / 100)
                        }
                    }

                    contextModifier = axis.contextScroll - axis.contextOffset
                    waypoint.triggerPoint = elementOffset + contextModifier - adjustment
                    wasBeforeScroll = oldTriggerPoint < axis.oldScroll
                    nowAfterScroll = waypoint.triggerPoint >= axis.oldScroll
                    triggeredBackward = wasBeforeScroll && nowAfterScroll
                    triggeredForward = !wasBeforeScroll && !nowAfterScroll

                    if (!freshWaypoint && triggeredBackward) {
                        waypoint.queueTrigger(axis.backward)
                        triggeredGroups[waypoint.group.id] = waypoint.group
                    } else if (!freshWaypoint && triggeredForward) {
                        waypoint.queueTrigger(axis.forward)
                        triggeredGroups[waypoint.group.id] = waypoint.group
                    } else if (freshWaypoint && axis.oldScroll >= waypoint.triggerPoint) {
                        waypoint.queueTrigger(axis.forward)
                        triggeredGroups[waypoint.group.id] = waypoint.group
                    }
                }
            }

            Waypoint.requestAnimationFrame(function() {
                for (var groupKey in triggeredGroups) {
                    triggeredGroups[groupKey].flushTriggers()
                }
            })

            return this
        }

        /* Private */
        Context.findOrCreateByElement = function(element) {
            return Context.findByElement(element) || new Context(element)
        }

        /* Private */
        Context.refreshAll = function() {
            for (var contextId in contexts) {
                contexts[contextId].refresh()
            }
        }

        /* Public */
        /* http://imakewebthings.com/waypoints/api/context-find-by-element */
        Context.findByElement = function(element) {
            return contexts[element.waypointContextKey]
        }

    window.onload = function() {
        if (oldWindowLoad) {
            oldWindowLoad()
        }
        Context.refreshAll()
    }

    Waypoint.requestAnimationFrame = function(callback) {
        var requestFn = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || requestAnimationFrameShim
        requestFn.call(window, callback)
    }
    Waypoint.Context = Context
}());
(function() {
    'use strict'

    function byTriggerPoint(a, b) {
        return a.triggerPoint - b.triggerPoint
    }

    function byReverseTriggerPoint(a, b) {
        return b.triggerPoint - a.triggerPoint
    }

    var groups = {
        vertical: {},
        horizontal: {}
    }
    var Waypoint = window.Waypoint

    /* http://imakewebthings.com/waypoints/api/group */
        function Group(options) {
            this.name = options.name
            this.axis = options.axis
            this.id = this.name + '-' + this.axis
            this.waypoints = []
            this.clearTriggerQueues()
            groups[this.axis][this.name] = this
        }

        /* Private */
        Group.prototype.add = function(waypoint) {
            this.waypoints.push(waypoint)
        }

        /* Private */
        Group.prototype.clearTriggerQueues = function() {
            this.triggerQueues = {
                up: [],
                down: [],
                left: [],
                right: []
            }
        }

        /* Private */
        Group.prototype.flushTriggers = function() {
            for (var direction in this.triggerQueues) {
                var waypoints = this.triggerQueues[direction]
                var reverse = direction === 'up' || direction === 'left'
                waypoints.sort(reverse ? byReverseTriggerPoint : byTriggerPoint)
                for (var i = 0, end = waypoints.length; i < end; i += 1) {
                    var waypoint = waypoints[i]
                    if (waypoint.options.continuous || i === waypoints.length - 1) {
                        waypoint.trigger([direction])
                    }
                }
            }
            this.clearTriggerQueues()
        }

        /* Private */
        Group.prototype.next = function(waypoint) {
            this.waypoints.sort(byTriggerPoint)
            var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
            var isLast = index === this.waypoints.length - 1
            return isLast ? null : this.waypoints[index + 1]
        }

        /* Private */
        Group.prototype.previous = function(waypoint) {
            this.waypoints.sort(byTriggerPoint)
            var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
            return index ? this.waypoints[index - 1] : null
        }

        /* Private */
        Group.prototype.queueTrigger = function(waypoint, direction) {
            this.triggerQueues[direction].push(waypoint)
        }

        /* Private */
        Group.prototype.remove = function(waypoint) {
            var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
            if (index > -1) {
                this.waypoints.splice(index, 1)
            }
        }

        /* Public */
        /* http://imakewebthings.com/waypoints/api/first */
        Group.prototype.first = function() {
            return this.waypoints[0]
        }

        /* Public */
        /* http://imakewebthings.com/waypoints/api/last */
        Group.prototype.last = function() {
            return this.waypoints[this.waypoints.length - 1]
        }

        /* Private */
        Group.findOrCreate = function(options) {
            return groups[options.axis][options.name] || new Group(options)
        }

    Waypoint.Group = Group
}());
(function() {
    'use strict'

    var $ = window.jQuery
    var Waypoint = window.Waypoint

        function JQueryAdapter(element) {
            this.$element = $(element)
        }

    $.each(['innerHeight', 'innerWidth', 'off', 'offset', 'on', 'outerHeight', 'outerWidth', 'scrollLeft', 'scrollTop'], function(i, method) {
        JQueryAdapter.prototype[method] = function() {
            var args = Array.prototype.slice.call(arguments)
            return this.$element[method].apply(this.$element, args)
        }
    })

    $.each(['extend', 'inArray', 'isEmptyObject'], function(i, method) {
        JQueryAdapter[method] = $[method]
    })

    Waypoint.adapters.push({
        name: 'jquery',
        Adapter: JQueryAdapter
    })
    Waypoint.Adapter = JQueryAdapter
}());
(function() {
    'use strict'

    var Waypoint = window.Waypoint

        function createExtension(framework) {
            return function() {
                var waypoints = []
                var overrides = arguments[0]

                if (framework.isFunction(arguments[0])) {
                    overrides = framework.extend({}, arguments[1])
                    overrides.handler = arguments[0]
                }

                this.each(function() {
                    var options = framework.extend({}, overrides, {
                        element: this
                    })
                    if (typeof options.context === 'string') {
                        options.context = framework(this).closest(options.context)[0]
                    }
                    waypoints.push(new Waypoint(options))
                })

                return waypoints
            }
        }

    if (window.jQuery) {
        window.jQuery.fn.waypoint = createExtension(window.jQuery)
    }
    if (window.Zepto) {
        window.Zepto.fn.waypoint = createExtension(window.Zepto)
    }
}());

/*!
 * jQuery Smooth Scroll - v1.7.2 - 2016-01-23
 * https://github.com/kswedberg/jquery-smooth-scroll
 * Copyright (c) 2016 Karl Swedberg
 * Licensed MIT
 */

(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($) {

    var version = '1.7.2';
    var optionOverrides = {};
    var defaults = {
        exclude: [],
        excludeWithin: [],
        offset: 0,

        // one of 'top' or 'left'
        direction: 'top',

        // if set, bind click events through delegation
        //  supported since jQuery 1.4.2
        delegateSelector: null,

        // jQuery set of elements you wish to scroll (for $.smoothScroll).
        //  if null (default), $('html, body').firstScrollable() is used.
        scrollElement: null,

        // only use if you want to override default behavior
        scrollTarget: null,

        // fn(opts) function to be called before scrolling occurs.
        // `this` is the element(s) being scrolled
        beforeScroll: function() {},

        // fn(opts) function to be called after scrolling occurs.
        // `this` is the triggering element
        afterScroll: function() {},
        easing: 'swing',
        speed: 400,

        // coefficient for "auto" speed
        autoCoefficient: 2,

        // $.fn.smoothScroll only: whether to prevent the default click action
        preventDefault: true
    };

    var getScrollable = function(opts) {
        var scrollable = [];
        var scrolled = false;
        var dir = opts.dir && opts.dir === 'left' ? 'scrollLeft' : 'scrollTop';

        this.each(function() {
            var el = $(this);

            if (this === document || this === window) {
                return;
            }

            if (document.scrollingElement && (this === document.documentElement || this === document.body)) {
                scrollable.push(document.scrollingElement);

                return false;
            }

            if (el[dir]() > 0) {
                scrollable.push(this);
            } else {
                // if scroll(Top|Left) === 0, nudge the element 1px and see if it moves
                el[dir](1);
                scrolled = el[dir]() > 0;

                if (scrolled) {
                    scrollable.push(this);
                }
                // then put it back, of course
                el[dir](0);
            }
        });

        if (!scrollable.length) {
            this.each(function() {
                // If no scrollable elements and <html> has scroll-behavior:smooth because
                // "When this property is specified on the root element, it applies to the viewport instead."
                // and "The scroll-behavior property of the … body element is *not* propagated to the viewport."
                // → https://drafts.csswg.org/cssom-view/#propdef-scroll-behavior
                if (this === document.documentElement && $(this).css('scrollBehavior') === 'smooth') {
                    scrollable = [this];
                }

                // If still no scrollable elements, fall back to <body>,
                // if it's in the jQuery collection
                // (doing this because Safari sets scrollTop async,
                // so can't set it to 1 and immediately get the value.)
                if (!scrollable.length && this.nodeName === 'BODY') {
                    scrollable = [this];
                }
            });
        }

        // Use the first scrollable element if we're calling firstScrollable()
        if (opts.el === 'first' && scrollable.length > 1) {
            scrollable = [scrollable[0]];
        }

        return scrollable;
    };

    $.fn.extend({
        scrollable: function(dir) {
            var scrl = getScrollable.call(this, {
                dir: dir
            });

            return this.pushStack(scrl);
        },
        firstScrollable: function(dir) {
            var scrl = getScrollable.call(this, {
                el: 'first',
                dir: dir
            });

            return this.pushStack(scrl);
        },

        smoothScroll: function(options, extra) {
            options = options || {};

            if (options === 'options') {
                if (!extra) {
                    return this.first().data('ssOpts');
                }

                return this.each(function() {
                    var $this = $(this);
                    var opts = $.extend($this.data('ssOpts') || {}, extra);

                    $(this).data('ssOpts', opts);
                });
            }

            var opts = $.extend({}, $.fn.smoothScroll.defaults, options);

            var clickHandler = function(event) {
                var escapeSelector = function(str) {
                    return str.replace(/(:|\.|\/)/g, '\\$1');
                };

                var link = this;
                var $link = $(this);
                var thisOpts = $.extend({}, opts, $link.data('ssOpts') || {});
                var exclude = opts.exclude;
                var excludeWithin = thisOpts.excludeWithin;
                var elCounter = 0;
                var ewlCounter = 0;
                var include = true;
                var clickOpts = {};
                var locationPath = $.smoothScroll.filterPath(location.pathname);
                var linkPath = $.smoothScroll.filterPath(link.pathname);
                var hostMatch = location.hostname === link.hostname || !link.hostname;
                var pathMatch = thisOpts.scrollTarget || (linkPath === locationPath);
                var thisHash = escapeSelector(link.hash);

                if (thisHash && !$(thisHash).length) {
                    include = false;
                }

                if (!thisOpts.scrollTarget && (!hostMatch || !pathMatch || !thisHash)) {
                    include = false;
                } else {
                    while (include && elCounter < exclude.length) {
                        if ($link.is(escapeSelector(exclude[elCounter++]))) {
                            include = false;
                        }
                    }

                    while (include && ewlCounter < excludeWithin.length) {
                        if ($link.closest(excludeWithin[ewlCounter++]).length) {
                            include = false;
                        }
                    }
                }

                if (include) {
                    if (thisOpts.preventDefault) {
                        event.preventDefault();
                    }

                    $.extend(clickOpts, thisOpts, {
                        scrollTarget: thisOpts.scrollTarget || thisHash,
                        link: link
                    });

                    $.smoothScroll(clickOpts);
                }
            };

            if (options.delegateSelector !== null) {
                this.undelegate(options.delegateSelector, 'click.smoothscroll')
                    .delegate(options.delegateSelector, 'click.smoothscroll', clickHandler);
            } else {
                this.unbind('click.smoothscroll')
                    .bind('click.smoothscroll', clickHandler);
            }

            return this;
        }
    });

    $.smoothScroll = function(options, px) {
        if (options === 'options' && typeof px === 'object') {
            return $.extend(optionOverrides, px);
        }
        var opts, $scroller, scrollTargetOffset, speed, delta;
        var scrollerOffset = 0;
        var offPos = 'offset';
        var scrollDir = 'scrollTop';
        var aniProps = {};
        var aniOpts = {};

        if (typeof options === 'number') {
            opts = $.extend({
                link: null
            }, $.fn.smoothScroll.defaults, optionOverrides);
            scrollTargetOffset = options;
        } else {
            opts = $.extend({
                link: null
            }, $.fn.smoothScroll.defaults, options || {}, optionOverrides);

            if (opts.scrollElement) {
                offPos = 'position';

                if (opts.scrollElement.css('position') === 'static') {
                    opts.scrollElement.css('position', 'relative');
                }
            }
        }

        scrollDir = opts.direction === 'left' ? 'scrollLeft' : scrollDir;

        if (opts.scrollElement) {
            $scroller = opts.scrollElement;

            if (!(/^(?:HTML|BODY)$/).test($scroller[0].nodeName)) {
                scrollerOffset = $scroller[scrollDir]();
            }
        } else {
            $scroller = $('html, body').firstScrollable(opts.direction);
        }

        // beforeScroll callback function must fire before calculating offset
        opts.beforeScroll.call($scroller, opts);

        scrollTargetOffset = (typeof options === 'number') ? options : px || ($(opts.scrollTarget)[offPos]() && $(opts.scrollTarget)[offPos]()[opts.direction]) || 0;

        aniProps[scrollDir] = scrollTargetOffset + scrollerOffset + opts.offset;
        speed = opts.speed;

        // automatically calculate the speed of the scroll based on distance / coefficient
        if (speed === 'auto') {

            // $scroller[scrollDir]() is position before scroll, aniProps[scrollDir] is position after
            // When delta is greater, speed will be greater.
            delta = Math.abs(aniProps[scrollDir] - $scroller[scrollDir]());

            // Divide the delta by the coefficient
            speed = delta / opts.autoCoefficient;
        }

        aniOpts = {
            duration: speed,
            easing: opts.easing,
            complete: function() {
                opts.afterScroll.call(opts.link, opts);
            }
        };

        if (opts.step) {
            aniOpts.step = opts.step;
        }

        if ($scroller.length) {
            $scroller.stop().animate(aniProps, aniOpts);
        } else {
            opts.afterScroll.call(opts.link, opts);
        }
    };

    $.smoothScroll.version = version;
    $.smoothScroll.filterPath = function(string) {
        string = string || '';

        return string.replace(/^\//, '')
            .replace(/(?:index|default).[a-zA-Z]{3,4}$/, '')
            .replace(/\/$/, '');
    };

    // default options
    $.fn.smoothScroll.defaults = defaults;

}));


/*!
 * Smooth scroll to top with CSS transitions
 *
 * Author: Corina Rudel @friccaW
 * Version: 1.02
 * Source: http://github.com/fricca/smooth-scroll-to-top-with-transition
 */

var scrollToTop = (function(w, d) {
    var // changable settings
    settings = {
        // Name of link(s) that trigger(s) scrolling
        // as selector: #id or .class
        linkName: '',
        // distance to scroll (in pixels) until scroll link is visible
        // only used if there's only ONE toplink
        hiddenDistance: '100',
        // content of topLink if created by script
        topLinkContent: 'To Top'
    },
    // unchangable settings
    data = {
        // class to be attached to toplink
        linkClass: 'sstt',
        // class for single link
        singleClass: 'is-single',
        // class to be set when toplink is hidden
        hiddenClass: 'is-hidden',
        // class to be set when toplink is visible
        visibleClass: 'is-visible',
        // class to be set on root element to trigger transition
        animationClass: 'is-animated'
    },
    root = d.documentElement,
        body = d.body,
        topLink = [],
        target,
        distance,
        startedAnim,
        scrollTimer,

        /**
         * HELPER
         */
        MCC = {
            test: {
                // Tests for transitionend event
                transitionEnd: (function transitionEvent() {
                    var el = d.documentElement,
                        transitions = {
                            'transition': 'transitionend',
                            'OTransition': 'otransitionend',
                            'MozTransition': 'transitionend',
                            'WebkitTransition': 'webkitTransitionEnd'
                        },
                        type,
                        prefix;

                    for (type in transitions) {
                        if (typeof transitions[type] !== 'undefined' && typeof el.style[type] !== 'undefined') {
                            return transitions[type];
                        }
                    }
                }())
            },

            // Return replacement pattern for certain class (cls)
            classPattern: function(cls) {
                var pattern = new RegExp("(^| )" + cls + "( |$)");
                return pattern;
            },

            // Check if element (el) has certain class (cls)
            hasClass: function(el, cls) {
                var pattern;
                if (el && cls) {
                    if (typeof el.classList !== 'undefined') {
                        return el.classList.contains(cls);
                    } else {
                        pattern = this.classPattern(cls);
                        return pattern.test(el.className);
                    }
                }
            },

            // Get all elements that have certain class
            getElementsByClass: function(cls) {
                var foundEls = [],
                    allEls,
                    i,
                    ii,
                    elem;

                if (d.getElementsByClassName) {
                    foundEls = d.getElementsByClassName(cls);
                } else {
                    if (d.all) {
                        allEls = d.all;
                    } else {
                        allEls = d.getElementsByTagName('*');
                    }
                    for (i = 0, ii = allEls.length; i < ii; i++) {
                        elem = allEls[i];
                        if (MCC.hasClass(elem, cls)) {
                            foundEls[foundEls.length] = elem;
                        }
                    }
                }
                return foundEls;
            },

            // Add class to element
            addClass: function(el, cls) {
                var classes;

                if (el && cls) {
                    if (typeof el.classList !== 'undefined') {
                        el.classList.add(cls);
                    } else if (el && cls && !this.hasClass(el, cls)) {
                        if (el.className !== '') {
                            classes = el.className + ' ' + cls;
                        } else {
                            classes = cls;
                        }
                        el.className = classes;
                    }
                }
            },

            // Remove class from element
            removeClass: function(el, cls) {
                var pattern;
                if (el && cls) {
                    if (typeof el.classList !== 'undefined') {
                        el.classList.remove(cls);
                    } else {
                        pattern = this.classPattern(cls);
                        // replace matching classname (with potential leading whitespace); $1 is backreference to (^| )
                        el.className = el.className.replace(pattern, "$1");
                        // replace potential trailing whitespace
                        el.className = el.className.replace(/ $/, "");
                    }
                }
            },

            // Add eventListener to element
            // @sources
            // http://ejohn.org/blog/flexible-javascript-events/
            // http://www.quirksmode.org/blog/archives/2005/10/_and_the_winner_1.html
            addEvent: function(obj, type, fn) {
                if (obj && type && fn) {
                    // Add event
                    if (obj.addEventListener) {
                        obj.addEventListener(type, fn, false);
                    } else if (obj.attachEvent) {
                        obj["e" + type + fn] = fn;
                        obj[type + fn] = function() {
                            obj["e" + type + fn](w.event);
                        };
                        obj.attachEvent("on" + type, obj[type + fn]);
                    }
                }
            },

            // Nomalize preventDefault
            stopDefault: function(evt) {
                if (evt && evt.preventDefault) {
                    evt.preventDefault();
                } else if (w.event && w.event.returnValue) {
                    w.event.returnValue = false;
                }
            }
        };

    /**
     * SPECIFIC FUNCTIONS
     */

    function check(config) {
        var item;
        for (item in config) {
            // set defaults to custom settings if valid values are passed in
            if (config.hasOwnProperty(item) && settings.hasOwnProperty(item)) {
                settings[item] = config[item];
            }
        }
    }

    function getNameFromSelector(selector) {
        var name = {};
        if (selector.indexOf('#') !== -1) {
            // The Id is everything after the #
            name.id = selector.substr(selector.indexOf('#') + 1);
        } else if (selector.indexOf('.') !== -1) {
            // The class is everything after the .
            name.className = selector.substr(selector.indexOf('.') + 1);
        }
        return name;
    }

    function clearAnimation() {
        root.removeEventListener(MCC.test.transitionEnd, endListener, false);
        MCC.removeClass(root, data.animationClass);

        // Reset margin and move window to top
        root.style.marginTop = root._marginTop || '';
        delete(root._marginTop);

        startedAnim = false;
    }

    function cancelAnimation() {
        var currentPos = w.pageYOffset || root.scrollTop,
            marginTop = parseInt(w.getComputedStyle(root, null).getPropertyValue("margin-top"), 10) || 0,
            newPos;

        if (startedAnim) {
            newPos = currentPos - marginTop;
            clearAnimation();
            w.scrollTo(0, newPos);
        }
    }

    function endListener(event) {
        if (event.propertyName === 'margin-top') {
            clearAnimation();
            w.scrollTo(0, 0);
        }
    }

    function scrollIt() {
        var rootTop;

        // clean up if something went wrong before
        if (startedAnim) {
            clearAnimation();
        }

        distance = w.pageYOffset || root.scrollTop;

        if (distance) {
            // smooth scrolling if browser supports transitionend event
            if (MCC.test.transitionEnd) {
                // check if root element has own top margin
                if (w.getComputedStyle) {
                    rootTop = parseInt(w.getComputedStyle(root, null).getPropertyValue("margin-top"), 10);
                    if (rootTop) {
                        distance = distance + rootTop;
                    }
                }

                // Store style.marginTop for later re-set
                root._marginTop = root.style.marginTop;

                // add eventListener for transitionend
                root.addEventListener(MCC.test.transitionEnd, endListener, false);

                // add is-animated class to root element
                MCC.addClass(root, data.animationClass);

                root.style.marginTop = distance + 'px';
                // Set indicator for started transition
                // used to clean up if something went wrong
                startedAnim = true;
            } else {
                // Move window to top
                w.scrollTo(0, 0);
            }
        }
    }

    function listener(event) {
        var evTarget = event.target || event.srcElement; // normal || IE <= 8;
        MCC.stopDefault(event);

        scrollIt();
    }

    function checkScroll(link) {

        // check if there's an unfinished transition left
        // might happen if the transionend event didn't fire
        // p.e. if the transition is set for the wrong properties or
        // left out completely
        // OR if the transition is disturbed by manual scrolling
        if (startedAnim) {
            cancelAnimation();
        }

        // Check if toplink should be visible or hidden
        if (link && settings.hiddenDistance) {
            // check for scroll position every 100ms
            if (scrollTimer) {
                clearTimeout(scrollTimer);
            }
            scrollTimer = setTimeout(function() {
                var top = w.pageYOffset || root.scrollTop;
                if (top >= settings.hiddenDistance) {
                    MCC.removeClass(link, data.hiddenClass);
                    MCC.addClass(link, data.visibleClass);
                } else {
                    MCC.addClass(link, data.hiddenClass);
                    MCC.removeClass(link, data.visibleClass);
                }
            }, 100);
        }
    }

    function createLink() {
        var link;

        link = d.createElement('a');
        link.href = "#";

        if (typeof link.textContent !== 'undefined') {
            link.textContent = settings.topLinkContent;
        } else {
            link.innerText = settings.topLinkContent;
        }
        body.appendChild(link);

        return link;
    }

    function prepareLinks(links) {
        var i,
        ii,
        top,
        oneLink;

        // for all links
        for (i = 0, ii = links.length; i < ii; i++) {
            MCC.addClass(links[i], data.linkClass);
            MCC.addEvent(links[i], 'click', listener);
        }

        // If only one link and hiddenDistance is set
        if (links.length === 1) {
            MCC.addClass(links[0], data.singleClass);

            top = w.pageYOffset || root.scrollTop;
            if (settings.hiddenDistance > 0) {
                oneLink = links[0];
            }
            // Inital hidden/visible class
            if (top < settings.hiddenDistance) {
                MCC.addClass(links[0], data.hiddenClass);
            } else {
                MCC.addClass(links[0], data.visibleClass);
            }
        }

        // Listener for scrolling
        // used to show/hide toplink (oneLink) on hiddenDistance
        // and to cancel Animation if something went wrong
        // ony needed if either there's only one top link or
        // if transitions are supported
        if (oneLink || MCC.test.transitionEnd) {
            MCC.addEvent(w, 'scroll',

            function() {
                checkScroll(oneLink);
            });
        }
    }

    function init(config) {
        var topLinkName;

        // Check for user defined configuration
        if (config) {
            check(config);
        }

        // Check for custom link selector
        if (settings.linkName) {
            // Get link name, returns either .id or .className
            topLinkName = getNameFromSelector(settings.linkName);

            if (topLinkName.hasOwnProperty('className')) {
                // Try to get link(s) from className
                topLink = MCC.getElementsByClass(topLinkName.className);
            } else if (topLinkName.hasOwnProperty('id')) {
                // Try to get link from ID
                topLink[0] = d.getElementById(topLinkName.id);
            }

            // If neither a useful class or ID are given: the end
            if (!topLink[0]) {
                return;
            }
        } else {
            // If no custom selector set: create link
            topLink[0] = createLink();
        }

        // Prepare link
        if (topLink.length > 0) {
            prepareLinks(topLink);
        }
    }

    return init;
}(window, document)); 
