new Vue({
	el: '#app',
	data: {
		currAngle: -12,
		myp5: null
	},
	methods: {
		initGame() {
			let _this = this

			function sketchInit(sketch) {
				let engine
				let world
				let sand = []
				let top
				let bottom
				let stack
				let pixels = []
				let pixels2 = []
				const LEFT_SIDE = [{
						x: -20,
						y: -20
					},
					{
						x: -20,
						y: 0
					},
					{
						x: -40,
						y: 0
					},
					{
						x: -40,
						y: -20
					},
					{
						x: -40,
						y: -40
					},
					{
						x: -40,
						y: 20
					},
					{
						x: -60,
						y: 20
					},
					{
						x: -60,
						y: 40
					},
					{
						x: -60,
						y: -40
					},
					{
						x: -60,
						y: -60
					},
					{
						x: -80,
						y: -80
					},
					{
						x: -80,
						y: -60
					},
					{
						x: -80,
						y: 60
					},
					{
						x: -80,
						y: 40
					},
					{
						x: -100,
						y: -100
					},
					{
						x: -100,
						y: -80
					},
					{
						x: -100,
						y: 60
					},
					{
						x: -100,
						y: 80
					},
					{
						x: -100,
						y: 100
					},
					{
						x: -100,
						y: 120
					},
					{
						x: -100,
						y: 140
					},
					{
						x: -100,
						y: 160
					},
					{
						x: -100,
						y: -120
					},
					{
						x: -100,
						y: -140
					},
					{
						x: -100,
						y: -160
					},
					{
						x: -100,
						y: -180
					}
				]
				const RIGHT_SIDE = [{
						x: 20,
						y: 0
					},
					{
						x: 40,
						y: 0
					},
					{
						x: 20,
						y: -20
					},
					{
						x: 40,
						y: -20
					},
					{
						x: 60,
						y: 40
					},
					{
						x: 40,
						y: 20
					},
					{
						x: 60,
						y: 20
					},
					{
						x: 80,
						y: 60
					},
					{
						x: 80,
						y: 40
					},
					{
						x: 100,
						y: 60
					},
					{
						x: 100,
						y: 80
					},
					{
						x: 100,
						y: 100
					},
					{
						x: 100,
						y: 120
					},
					{
						x: 100,
						y: 140
					},
					{
						x: 100,
						y: 160
					},
					{
						x: 100,
						y: -80
					},
					{
						x: 100,
						y: -100
					},
					{
						x: 80,
						y: -60
					},
					{
						x: 60,
						y: -60
					},
					{
						x: 60,
						y: -40
					},
					{
						x: 40,
						y: -40
					},
					{
						x: 100,
						y: -120
					},
					{
						x: 100,
						y: -140
					},
					{
						x: 100,
						y: -160
					},
					{
						x: 100,
						y: -180
					},
					{
						x: 80,
						y: -80
					}
				]
				const SAND_COUNT = 140
				const SAND_SIZE = 5
				const PIXEL_SIZE = 20
				const Engine = Matter.Engine
				const Render = Matter.Render
				const World = Matter.World
				const Bodies = Matter.Bodies
				const Body = Matter.Body
				const Composite = Matter.Composite
				const Composites = Matter.Composites

				sketch.preload = function () {}

				sketch.setup = function () {
					sketch.createCanvas(window.innerWidth, window.innerHeight)
					engine = Engine.create()
					world = engine.world
					var render = Render.create({
						element: document.getElementById('canvas_container'),
						engine: engine,
						options: {
							width: window.innerWidth,
							height: window.innerHeight,
							wireframes: false,
							background: 'transparent'
						}
					});

					Render.run(render)
					stack = Composite.create()
					sketch.ellipseMode(sketch.RADIUS)
					sketch.rectMode(sketch.CENTER)
					for (let x = 0; x < SAND_COUNT; x++) {
						sand.push(new Sand(sketch.random(-80, 80), sketch.random(-120, -180)))
					}
					top = new Edge(-100, -200, 260, 30)
					bottom = new Edge(-100, 180, 260, 30)
					for (let x = 0; x < LEFT_SIDE.length; x++) {
						pixels.push(new HourglassPixel(LEFT_SIDE[x].x, LEFT_SIDE[x].y))
						pixels2.push(new HourglassPixel(RIGHT_SIDE[x].x, RIGHT_SIDE[x].y))
					}
					Composite.translate(stack, {
						x: window.innerWidth / 2,
						y: window.innerHeight / 2
					}, true);
					Engine.run(engine)
				}

				sketch.draw = function () {
					sketch.clear()
					// sketch.translate(window.innerWidth / 2, window.innerHeight / 2);
					// Composite.rotate(stack, Math.sin(_this.currAngle) * 0.01, {
					Composite.rotate(stack, _this.currAngle * 0.001, {
						x: window.innerWidth / 2,
						y: window.innerHeight / 2
					}, true);
					// sketch.rotate(sketch.cos(_this.currAngle))
					for (let x = 0; x < SAND_COUNT; x++) {
						sand[x].show()
					}
					for (let x = 0; x < LEFT_SIDE.length; x++) {
						pixels[x].show()
						pixels2[x].show()
					}
					top.show()
					bottom.show()
				}
				class Sand {
					constructor(x, y) {
						this.body = Bodies.circle(x, y, SAND_SIZE, {
							restitution: 0,
							friction: .1,
							frictionAir: .1,
							density: 10,
							render: {
								fillStyle: '#4a08a0'
							}
						})
						World.add(world, this.body)
						Composite.add(stack, this.body)

					}
					show() {
						// var pos = this.body.position;
						// sketch.push()
						// sketch.noStroke()
						// sketch.fill(255, 0, 0)
						// sketch.ellipse(pos.x, pos.y, SAND_SIZE)
						// sketch.pop()
					}
				}
				class Edge {
					constructor(x, y, w, h) {
						this.body = Bodies.rectangle(x + 100, y, w, h, {
							isStatic: true,
							restitution: 0,
							friction: 1,
							render: {
								fillStyle: '#000000'
							}
						})
						this.w = w
						this.h = h
						World.add(world, this.body)
						Composite.add(stack, this.body)
					}
					show() {
						var pos = this.body.position;
						// sketch.push()
						// sketch.noStroke()
						// // sketch.stroke(0, 0, 0);
						// // sketch.strokeWeight(11)
						// sketch.fill(0, 0, 0);
						// // sketch.rotate(this.body.angle)
						// sketch.rect(pos.x, pos.y, this.w, this.h)
						// sketch.pop()
					}
				}
				class HourglassPixel {
					constructor(x, y) {
						this.pixel = Bodies.rectangle(x, y, PIXEL_SIZE, PIXEL_SIZE, {
							friction: .2,
							restitution: 0,
							isStatic: true,
							density: 10,
							render: {
								fillStyle: '#000000'
							}
						})
						World.add(world, this.pixel)
						Composite.add(stack, this.pixel)

					}
					show() {
						var pos = this.pixel.position;
						// sketch.push()
						// // sketch.translate(0, -5)
						// sketch.fill(0, 0, 0)
						// sketch.noStroke()
						// // sketch.rotate(1, [1000, 200])
						// sketch.rect(pos.x, pos.y, PIXEL_SIZE, PIXEL_SIZE)
						// sketch.pop()
					}
				}
			}
			let canv = (sketch) => {
				sketchInit(sketch)
			}
			this.myp5 = new p5(canv, 'canvas_container')
		}
	},
	mounted() {
		this.initGame()
	}
})
