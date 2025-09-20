Hooks.on("init", () => {})


Hooks.on("setup", () => {

    game.wng.config.weaponTraits = mergeObject(game.wng.config.weaponTraits, {
        "mortal": "Mortal",
    })

    game.wng.config.traitDescriptions = mergeObject(game.wng.config.traitDescriptions, {
        "mortal": "<p>The weapon deals horrific, deadly wounds that are nigh-impossible to withstand. For each Exalted Icon you roll on the weapon’s ED, you inflict X Mortal Wounds, in addition to any damage the attack inflicts.</p>",
    })

    game.wng.config.traitEffects.mortal = {
        name: "Mortal",
        type: "base",
        system: {
            transferData: {
                documentType: "Item",
        },
        scriptData: [
            {
                script: "let exalted = args.damageRoll.result.dice.filter(i => i.result == 6).length\nlet mortal = exalted * Number(this.item.system.traits.has("mortal")?.rating)\nargs.modifiers.mortal.push({label : this.effect.name, value : mortal})",
                label: "Mortal",
                trigger: "preApplyDamage",
            }
        }
    }

    game.wng.config.traitHasRating = mergeObject(game.wng.config.traitHasRating, {
        "mortal": true
    })
})