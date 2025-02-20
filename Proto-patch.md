Prot-patch




General

- Brand new Annihilation mode added! Players can continue fighting even after their commander is destroyed

- Dynamic alliances gamemode will now correctly break alliances when all other opponents are dead unless "alliance victory" is enabled







Balance:


General

All units now leave the same amount of metal in their wreckage equal to half of their original build cost




<> Commander <>

Base Commander - EXPERIMENTAL - DONE
- `wreckage_health_frac` added and set to 1 (increase from the default 0.5)
- death nuke `splash_radius` increased from 110 to 130
- death nuke `damage` icnreased from 2000 to 3000
- `splash_damages_allies` set to `false`



Air

- Base Flyer (applies to all air units) - DONE
`wreckage_health_frac` increased from 0.7 to 1


- Fabrication Aircraft - DONE
`max_health` increased from 25 to 100


- Firefly - DONE
`UNITTYPE_Offense` added
`max_health` increased from 20 to 85
`build_metal_cost` increased from 60 to 100 


- Pelican - DONE
`UNITTYPE_Offense` added


- Icarus - DONE
Added `maintain_priority_target` and set it to `false` (the same fix we gave the spark last patch)
`UNITTYPE_Offense` added


- Hornet - DONE
`max_health` increased from 500 to 600
Updated missile FX and model


- Horsefly - EXPEIMENTAL - DONE
updated description
removed `AT_Air` 
can now target air units
`splash_damage` increased from 0 to 15
`splash_radius` increased from 0 to 3
`projectiles_per_fire` decreased from 4 to 2
`damage` increased from 10 to 15


- Zeus - DONE
`wreckage_health_frac` removed, will now be the same as Base Flyer
`splash_radius` increased from 40 to 50




Structures

- Air Factory
`factory_cooldown_time` increased from 2 to 4


- Teleporter - DONE
`max_health` decreased from 9750 to 7000    
`build_metal_cost` increased from 800 to 1000


- Anti-Nuke Launcher - REMOVED CHANGE
interceptor missile `build_metal_cost` increased from 5000 to 10000


- Catapult - DONE
`rate_of_fire` decreased from 0.4 to 0.25
`target_priorities` added:
    `Mobile & Advanced`
    `Commander`
    `Mobile - Air`
    `Structure - Wall`
    `Wall`

`initial_velocity` increased from 80 to 120.0
`max_velocity` increased from 80 to 120.0
Updated missile FX and model


- Advanced Torpedo Launcher
`surface_and_air` sight reduced from 200 to 160
`underwater` sight reduced from 200 to 160



Land

- Base Bot - DONE
`wreckage_health_frac` increased from 0.7 to 1

- Base Vehicle - DONE
`wreckage_health_frac` increased from 0.7 to 1

- Ares - DONE
`wreckage_health_frac` removed, will now be the same as Base Vehicle

- Atlas - TODAY
`wreckage_health_frac` removed, will now be the same as Base Bot

- Bot Fabricator - EXPERIMENTAL - DONE
`energy` use when building decreased from 600 to 525
`metal` use when building decreased from 8 to7

- Spark - EXPERIMENTAL - DONE
`max_range` increased from 65 to 67.5
ammo `lifetime` increased from 0.5 to 1 (restored to original value now that the AoE bug is fixed)

- Stinger - EXPERIMENTAL - DONE
removed `UNITTYPE_58` (stinger disabled from PvP)

- Gill-E - EXPERIMENTAL - NOT IMPLEMENTED YET
Anti-missile weapon changed from beam to homing. Multiple Gill-Es will no longer try to intercept the same missile

- Skitter - DONE
`UNITTYPE_Offense` added (will now select with other combat units)

- Colonel - DONE
`wreckage_health_frac` removed, will now be the same as Base Bot

- Slammer - DONE
`UNITTYPE_Sub` added. Will no longer be ignored by torpedo weapons when submerged

- Locust - DONE - REVIEW
`build_metal_cost` increased from 260 to 500
`max_health` increased from 80 to 160
`rate_of_fire` increased from 5 to 10
`surface_and_air` and `underwater` vision increased from 40 to 45

- Stryker - EXPERIMENTAL - DONE
`move_speed` decreased from 17 to 15
`max_range` increased from 75 to 80
`WL_Air` added to target layers


- Drifter - DONE
`damage` increased from 120 to 125
`initial_velocity` increased from 150 to 200
`max_velocity` increased from 150 to 200
`idle_aim_delay` increased from 3 to 5
`target_priorities` updated to
    `Mobile & Advanced`
    `Commander`
    `Mobile - Air`
    `Structure - Wall`
    `Wall`
Weapon and ammo files changed from ballistic to seeking



Sea

 - Base Ship - DONE
`wreckage_health_frac` increased from 0.7 to 1



- Naval fab - EXPERIMENTAL - DONE
`max_health` increased from 100 to 150 - FERRET DOESNT LIKE HP
`move_speed` increased from 10 to 12
`turn_speed` increased from 90 to 120



- Piranha - EXPERIMENTAL - DONE
`move_speed` decreased from 20 to 18
`max_health` decreased from 175 to 150
projectile `lifetime` decreased from 3 to 1.5 s



- Narwhal - DONE
AA weapon `rate_of_fire` decreased from 3 to 2.5
AA weapon `max_range` decreased from 150 to 120
torpedo weapon `damage` decreased from 250 to 200



- Stingray - DONE
`initial_velocity` increased from 80 to 120
`max_velocity` increased from 80 to 120
`lifetime` decreased from 60 to 40
Updated missile FX and model



- Typhoon - REVISED - DONE

- Squall

`build_metal_cost` updated from 90 to 30 to reflect the real metal cost of squalls
`guard_radius` decreased from 250 to 100
`surface_and_air` and `underwater` view range decreased from 150 to 50




Orbital

- Omega - DONE
side-guns `max_range` decreased from 150 to 130