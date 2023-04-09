Hooks.once('init', async function() {

});

Hooks.once('ready', async function() {

});


function showVNPC(actor_id){
	//let actor_id = "uUOzxleQwzAulwlS"
	let actor_object = Actor.get(actor_id)

	let art = actor_object.img
	let name = actor_object.name

	console.log(art)
	console.log(name)


	let randomid_img = randomID()
	let randomid_nameplate = randomID()

	console.log(randomid_img)
	console.log(randomid_nameplate)

	let flag_data = {"art_id": randomid_img, "name_id": randomid_nameplate}


	actor_object.setFlag("VNPC", "effect_ids", flag_data)

	new Sequence()
	  .effect()  
		.file(art)  
		.screenSpace()  
		.screenSpaceAnchor({ x: 0.7, y: 0.5 })
		.animateProperty("sprite", "position.x", {from: window.innerWidth, to: 0, gridUnits: false, duration: 700})
		.fadeIn(500)
		.persist()
		.extraEndDuration(500)
		.origin(randomid_img)
	.play()

	const text_style = {
		"fill": "#fff",
		"fontFamily": "Arial Black",
		"fontSize": 42,
		"strokeThickness": 4
	}

	new Sequence()
	  .effect()  
		.screenSpace()  
		.screenSpaceAnchor({ x: 0.3, y: 0.9 })
		.text(name, text_style)
		.animateProperty("sprite", "position.x", {from: -window.innerWidth, to: 0, gridUnits: false, duration: 700})
		.fadeIn(500)
		.persist()
		.extraEndDuration(500)
		.origin(randomid_nameplate)
	.play()
}

function hideVNPC(actor_id){
	//let actor_id = "uUOzxleQwzAulwlS"

let actor_object = Actor.get(actor_id)

	let flag_data = actor_object.getFlag("VNPC", "effect_ids")

	Sequencer.EffectManager.endEffects({origin: flag_data.art_id})
	Sequencer.EffectManager.endEffects({origin: flag_data.name_id})


	await actor_object.unsetFlag("VNPC", "effect_ids")

	let art = actor_object.img
	let name = actor_object.name

	let randomid_img = randomID()
	let randomid_nameplate = randomID()

	console.log(randomid_img)
	console.log(randomid_nameplate)

	new Sequence()
	  .effect()  
		.file(art)  
		.screenSpace()  
		.screenSpaceAnchor({ x: 0.7, y: 0.5 })
		.animateProperty("sprite", "position.x", {to: window.innerWidth, from: 0, gridUnits: false, duration: 700, delay: 500})
	.play()

	const text_style = {
		"fill": "#fff",
		"fontFamily": "Arial Black",
		"fontSize": 42,
		"strokeThickness": 4
	}

	new Sequence()
	  .effect()  
		.screenSpace()  
		.screenSpaceAnchor({ x: 0.3, y: 0.9 })
		.text(name, text_style)
		.animateProperty("sprite", "position.x", {to: -window.innerWidth, from: 0, gridUnits: false, duration: 700, delay: 500})
	.play()
}