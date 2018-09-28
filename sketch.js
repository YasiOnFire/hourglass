new Vue({
	el: '#app',
	data: {
		currAngle: 0,
		myp5: null,
		allowRotate: true,
		gameOver: false,
		inGame: false,
		timeLimit: 11,
		timer: null,
		sandColor: '#4a08a0',
		boundsColor: '#BBBBBB',
		message: 'TIME OUT!',
		points: 0,
		hScale: window.innerHeight / 800
	},
	watch: {
		points(val, newVal) {
			if (val >= 110 && !this.gameOver) {
				this.gameOver = true
				this.message = 'YOU WIN!'
				clearInterval(this.timer)
			}
		},
		currAngle(val) {
			if (val !== 0) {
				if (!this.inGame) {
					this.inGame = true
					this.timer = setInterval(() => {
						this.timeLimit -= 1
					}, 1000)
				}
			}
		},
		timeLimit(val) {
			if (val <= 0) {
				clearInterval(this.timer)
				this.gameOver = true
				this.message = 'TIME OUT!'
			}
		}
	},
	methods: {
		restartGame() {
			window.location.reload(true)
		},
		initGame() {
			let bod = document.getElementsByTagName('body')[0]
			bod.addEventListener('click', function () {
				_this.allowRotate = true
			})
			let _this = this

			function sketchInit(sketch) {
				let engine
				let world
				let stack
				let sand = []
				let pixels = []
				let pixels2 = []
				const SAND_COUNT = 110
				const SAND_SIZE = 12
				const PIXEL_SIZE = 20
				const Engine = Matter.Engine
				const Render = Matter.Render
				const World = Matter.World
				const Bodies = Matter.Bodies
				const Composite = Matter.Composite
				const Events = Matter.Events
				const LEFT_SIDE = [{
						x: -40,
						y: -20
					},
					{
						x: -40,
						y: 0
					},
					{
						x: -60,
						y: 0
					},
					// {
					// 	x: -60,
					// 	y: -20
					// },
					{
						x: -60,
						y: -40
					},
					{
						x: -60,
						y: 20
					},
					{
						x: -80,
						y: 20
					},
					{
						x: -80,
						y: 40
					},
					{
						x: -80,
						y: -40
					},
					{
						x: -80,
						y: -60
					},
					{
						x: -100,
						y: -80
					},
					{
						x: -100,
						y: -60
					},
					{
						x: -100,
						y: 60
					},
					{
						x: -100,
						y: 40
					},
					{
						x: -120,
						y: -100
					},
					// {
					// 	x: -120,
					// 	y: -80
					// },
					{
						x: -120,
						y: 60
					},
					{
						x: -120,
						y: 80
					},
					{
						x: -120,
						y: 100
					},
					{
						x: -120,
						y: 120
					},
					{
						x: -120,
						y: 140
					},
					{
						x: -120,
						y: 160
					},

					{
						x: -120,
						y: -120
					},
					{
						x: -120,
						y: -140
					},
					{
						x: -120,
						y: -160
					},
					{
						x: -120,
						y: -180
					},
					{
						x: -140,
						y: 200
					},
					{
						x: -140,
						y: -220
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
					// {
					// 	x: 80,
					// 	y: 60
					// },
					{
						x: 80,
						y: 40
					},
					// {
					// 	x: 100,
					// 	y: 60
					// },
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
					},
					{
						x: 120,
						y: 200
					},
					{
						x: 120,
						y: -220
					}
				]

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

					World.add(world, [
						Bodies.rectangle(window.innerWidth / 2, 0, window.innerWidth, 50, {
							isStatic: true,
							render: {
								fillStyle: _this.boundsColor,
							}
						}),
						Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 50, {
							isStatic: true,
							id: 999,
							render: {
								fillStyle: _this.boundsColor,
							}
						}),
						Bodies.rectangle(window.innerWidth, window.innerHeight / 2, 50, window.innerHeight, {
							isStatic: true,
							render: {
								fillStyle: _this.boundsColor,
							}
						}),
						Bodies.rectangle(0, window.innerHeight / 2, 50, window.innerHeight, {
							isStatic: true,
							render: {
								fillStyle: _this.boundsColor,
							}
						})
					]);

					stack = Composite.create()

					new Edge(-110, -200, 280, PIXEL_SIZE)
					new Edge(-110, -240, 280, PIXEL_SIZE)
					new Edge(-110, 180, 280, PIXEL_SIZE)
					new Edge(-110, 220, 280, PIXEL_SIZE)
					let strongFloor = Bodies.rectangle(-10, 195, 270, 50, {
						isStatic: true,
						density: 100,
						render: {
							fillStyle: 'transparent',
						}
					})
					let strongWall = Bodies.rectangle(-120, 135, 20, 170, {
						isStatic: true,
						density: 100,
						render: {
							fillStyle: 'transparent',
						}
					})
					let strongWall2 = Bodies.rectangle(100, 150, 20, 160, {
						isStatic: true,
						density: 100,
						render: {
							fillStyle: 'transparent',
						}
					})
					let sensor = Bodies.rectangle(-10, -150, 200, 100, {
						label: 'sensor',
						isStatic: true,
						isSensor: true,
						render: {
							fillStyle: 'transparent',
						}
					})
					let sensor2 = Bodies.rectangle(-10, 110, 200, 200, {
						label: 'sensor',
						isStatic: true,
						isSensor: true,
						render: {
							fillStyle: 'transparent',
						}
					})
					World.add(world, [sensor, sensor2, strongWall, strongWall2, strongFloor])
					Composite.add(stack, [sensor, sensor2, strongWall, strongWall2, strongFloor])
					for (let x = 0; x < SAND_COUNT; x++) {
						// sand.push(new Sand(sketch.random(-80, 80), sketch.random(-120, -180)))
						sand.push(new Sand(sketch.random(-10, 8) * 10, sketch.random(6, 17) * 10))
					}
					for (let x = 0; x < LEFT_SIDE.length; x++) {
						pixels.push(new HourglassPixel(LEFT_SIDE[x].x, LEFT_SIDE[x].y))
						pixels2.push(new HourglassPixel(RIGHT_SIDE[x].x, RIGHT_SIDE[x].y))
					}
					Composite.translate(stack, {
						x: window.innerWidth / 2,
						y: window.innerHeight / 2
					}, true);
					Composite.scale(stack, _this.hScale, _this.hScale, {
						x: window.innerWidth / 2,
						y: window.innerHeight / 2
					}, true)

					Events.on(engine, 'collisionStart', function (event) {
						const pairs = event.pairs;

						for (var i = 0; i < pairs.length; i++) {
							var pair = pairs[i];
							if (pair.bodyA.label === "sand" && pair.bodyB.id == 999) {
								pair.bodyA.render.fillStyle = '#FF0000'
								pair.bodyB.render.fillStyle = '#FF0000'
								if (!_this.gameOver) {
									_this.gameOver = true
									_this.message = 'Game Over'
									clearInterval(_this.timer)
								}
							}
						}
					});

					Events.on(engine, 'collisionEnd', function (event) {
						var pairs = event.pairs;

						for (var i = 0, j = pairs.length; i != j; ++i) {
							var pair = pairs[i];

							if (pair.bodyA.label == "sensor") {
								// _this.sandColor = '#00FF00'
								_this.points++
								pair.bodyB.render.fillStyle = _this.sandColor;
							}
						}
					});

					Engine.run(engine)
				}

				sketch.draw = function () {
					sketch.clear()
					if (!_this.gameOver) {
						Composite.rotate(stack, _this.currAngle * 0.001, {
							x: window.innerWidth / 2,
							y: window.innerHeight / 2
						}, true);
					}
				}
				class Sand {
					constructor(x, y) {
						this.body = Bodies.rectangle(x, y, SAND_SIZE, SAND_SIZE, {
							restitution: 0,
							friction: .1,
							// frictionAir: .1,
							density: .000001,
							label: 'sand',
							render: {
								fillStyle: _this.sandColor
							}
						})
						World.add(world, this.body)
						Composite.add(stack, this.body)
					}
				}
				class Edge {
					constructor(x, y, w, h) {
						this.body = Bodies.rectangle(x + 100, y, w, h, {
							isStatic: true,
							restitution: 0,
							friction: 1,
							density: 10,
							render: {
								fillStyle: '#000000'
							}
						})
						this.w = w
						this.h = h
						World.add(world, this.body)
						Composite.add(stack, this.body)
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
