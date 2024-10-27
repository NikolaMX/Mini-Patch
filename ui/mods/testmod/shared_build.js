var newBuild = {

   
    "/pa/units/orbital/orbital_carrier/orbital_carrier.json": ["factory", 1,{ row: 0, column: 0, titans: true }]
    
}

if (Build && Build.HotkeyModel && Build.HotkeyModel.SpecIdToGridMap) {
    _.extend(Build.HotkeyModel.SpecIdToGridMap, newBuild);
}