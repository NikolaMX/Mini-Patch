Prot-patch

UI






Gameplay section of settings menu will now scroll and gives significantly more space per row, which stops mods from stacking







Balance:


General

All units now leave the same amount of metal in their wreckage equal to half of their original build cost




<> Commander <>

Base Commander - DONE
- `wreckage_health_frac` added and set to 1 (increase from the default 0.5)
- death nuke `splash_radius` increased from 110 to 130
- death nuke `damage` icnreased from 2000 to 3000
- death nuke `initial_radius` increased from 20.0 to 30
- death nike `full_damage_splash_radius` increased from 20 to 30
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

- Advanced Air Factory
`factory_cooldown_time` increased from 2 to 4


- Teleporter - DONE
`max_health` decreased from 9750 to 7000    
`build_metal_cost` increased from 800 to 1000
Corrected a nav mesh bug in the model


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

- Atlas - DONE
`wreckage_health_frac` removed, will now be the same as Base Bot

- Bot Fabricator - EXPERIMENTAL - DONE
`energy` use when building decreased from 600 to 525
`metal` use when building decreased from 8 to7

- Spark - DONE
`max_range` increased from 65 to 67.5
ammo `lifetime` increased from 0.5 to 1 (restored to original value now that the AoE bug is fixed)

- Gill-E - EXPERIMENTAL - NOT IMPLEMENTED YET
Anti-missile weapon changed from beam to homing. Multiple Gill-Es will no longer try to intercept the same missile

- Skitter - DONE
`UNITTYPE_Offense` added (will now select with other combat units)

- Colonel - DONE
`wreckage_health_frac` removed, will now be the same as Base Bot

- Slammer - DONE
`UNITTYPE_Sub` added. Will no longer be ignored by torpedo weapons when submerged

- Locust - DONE
`build_metal_cost` increased from 260 to 500
`max_health` increased from 80 to 160
`rate_of_fire` increased from 5 to 10
`surface_and_air` and `underwater` vision increased from 40 to 45

- Stryker - DONE
`move_speed` decreased from 17 to 15
`max_range` increased from 75 to 80
`WL_Air` added to target layers


- Drifter - DONE
`damage` increased from 120 to 125
`initial_velocity` increased from 150 to 300
`max_velocity` increased from 150 to 300
 ammo `flight_type` set to `Seeking`
 ammo `turn_rate` set to 30
 ammo `lifetime` decreased from 2 to 1

`idle_aim_delay` increased from 3 to 5
`target_priorities` updated to
    `Mobile & Advanced`
    `Commander`
    `Mobile - Air`
    `Structure - Wall`
    `Wall`



Sea

 - Base Ship - DONE
`wreckage_health_frac` increased from 0.7 to 1



- Naval fab - DONE
`max_health` increased from 100 to 150
`move_speed` increased from 10 to 12
`turn_speed` increased from 90 to 120



- Piranha - DONE
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



- Squall (Typhoon drone)
`build_metal_cost` updated from 90 to 30 to reflect the real metal cost of squalls
`guard_radius` decreased from 250 to 100
`surface_and_air` and `underwater` view range decreased from 150 to 50




Orbital

- Omega - DONE
side-guns `max_range` decreased from 150 to 130