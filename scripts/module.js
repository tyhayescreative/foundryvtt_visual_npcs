Hooks.once('init', async function() {

});

Hooks.once('ready', async function() {

});


function showVNPC(actor){
	//let actor_id = "uUOzxleQwzAulwlS"
	//let actor_object = Actor.get(actor_id)
	if (token)
	  {actor = token.actor}
	let actor_object = actor
	//let actor_object = actor
	console.log(actor_object)

	// does the actor already have an vpnc active?
	try {
		let existing_vnpc = await actor_object.getFlag("VNPC", "effect_ids")
	   console.log(existing_vnpc)
	   if (existing_vnpc != undefined){
			console.log("existing effect - abort creation")
			return
		}
	}
	catch (err) {
		console.log("no matching effect")
	}

	// is there another vnpc currently shown?
	let delay = 0
	try {
		let existing_vnpc = await game.scenes.current.getFlag("VNPC", "active_vnpc_actor")
	   console.log(existing_vnpc)
	   if (existing_vnpc != undefined){
			let dismissable_actor = await Actor.get(existing_vnpc)
			game.macros.getName("Hide Arbitrary NPC").execute({actor: dismissable_actor})
			console.log("existing effect - hiding other npc")
			delay = 300
		}
	}
	catch (err) {
		console.log("no matching effect")
	throw(err)
	}

	let art = actor_object.img
	let name = actor_object.name

	let randomid_img = randomID()
	let randomid_nameplate = randomID()

	let flag_data = {"art_id": randomid_img, "name_id": randomid_nameplate}


	actor_object.setFlag("VNPC", "effect_ids", flag_data)

	new Sequence()
	  .effect()  
		.file(art)  
		.screenSpace()  
		.screenSpaceAnchor({ x: 0.7, y: 0.5 })
		.animateProperty("sprite", "position.x", {from: window.innerWidth, to: 0, gridUnits: false, duration: 700, delay: delay})
		.fadeIn(500, {delay: delay + 100})
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
		.animateProperty("sprite", "position.x", {from: -window.innerWidth, to: 0, gridUnits: false, duration: 700, delay: delay})
		.fadeIn(500, {delay: delay})
		.persist()
		.extraEndDuration(500)
		.origin(randomid_nameplate)
	.play()

	game.scenes.current.setFlag("VNPC", "active_vnpc_actor", actor_object.id)

	console.log(actor_object)
}

function hideVNPC(actor){
		//let actor_id = "uUOzxleQwzAulwlS"
	//let actor_object = Actor.get(actor_id)
	if(token)
	   {actor = token.actor}
	let actor_object = actor
	console.log(actor_object)

	let flag_data = await actor_object.getFlag("VNPC", "effect_ids")
	console.log(flag_data)

	if (flag_data == undefined){
		console.log("no current effect - aborting")
		return
	}

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

	// is the currently active effect this npc?

	let existing_vnpc = await game.scenes.current.getFlag("VNPC", "active_vnpc_actor")

	if (existing_vnpc == actor_object.id){
		game.scenes.current.unsetFlag("VNPC", "active_vnpc_actor")
	}
}