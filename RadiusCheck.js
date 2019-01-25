//=============================================================================
// RadiusCheck.js
//=============================================================================

/*:
 * @plugindesc Checks area around target for specific information.
 * @author RainbowGrenade
 * 
 * @param Radar Radius 
 * @desc The size of the radar's radius in grid spaces.
 * @default 2
 * 
 * @param X Variable
 * @desc the variable in which target's map X is stored
 * @default 15
 * 
 * @param Y Variable
 * @desc the variable in which target's map Y is stored
 * @default 16
 * 
 * @param Event ID Match
 * @desc What value event number must equal to trigger common event
 * @default 1
 * 
 * @param Event ID Match Common Event
 * @desc What common event you would like to run if a "match" event is picked up on radar
 * @default 11
 * 
 * @param Event ID Greater Than
 * @desc What value event must be greater than to trigger common event
 * @default 0
 * 
 * @param Event ID Greater Than Common Event
 * @desc What common event you would like to run if a "greater than" event is picked up on radar
 * @default 12
 * 
 * @param Event ID Less Than
 * @desc What value event must be less then to trigger the common event
 * @default 1
 * 
 * @param Event ID Less Than Common Event
 * @desc the common event you would like to run if a "less than" event is picked up on radar
 * @default 13
 * 
 * @param Terrain Tag 
 * @desc What terrain tag triggers common event
 * @default 1
 * 
 * @param Terrain Common Event
 * @desc the common event you would like to run if specified terrain is picked up on radar
 * @default 14
 * 
 * @param Tile ID 
 * @desc What tile ID triggers common event
 * @default 1
 * 
 * @param Tile Common Event
 * @desc the common event you would like to run if specified Tile ID is picked up on radar
 * @default 15
 * 
 * @param Tile Layer
 * @desc which layer of tile to inspect
 * @default 0
 * 
 * @param Region ID
 * @desc What region ID triggers common event
 * @default 1
 * 
 * @param Region Common Event
 * @desc the common event you would like to run if specified Region ID is picked up on radar
 * @default 16
 * 
 * @help This plugin allows for the user to check the surrounding tiles of a spot
 * on the map, determined by X and Y coordinates.  The radar field ia a square.
 * The radius value determines how many grid spaces wide this area is.  If it's 1,
 * the spaces immediately surrounding the selected coordinates with be searched, 
 * including those surrounding diagonally.  If it's set to 3, the grid will reach 
 * the 3rd tile away from the selected coordinates in each compass direction, and 
 * diagonally.  Using plugin commands, you can choose to target a specified event ID,
 * terrain tag, tile ID, or region ID.  If one of these predefined values is matched 
 * on one of the specified tiles, a common event will trigger.  The common events for 
 * each search type can be set in the parameters.
 * 
 * ------------------------------------SETUP------------------------------------
 * 
 * Choose what point you want the radar to spawn from,  It could be the player, 
 * an event, or just a location on the map.  You need to store the location's X 
 * position to a variable, and it's Y to a second variable.  Once these 
 * variables have been set, assign their number's to their corresponding 
 * parameters.
 * 
 * 
 * ===============================Plugin Commands===============================
 * 
 * 
 * The template for the plugins is:
 * 
 * SearchType ID mapX mapY radius
 * 
 * The only command that differs is for searching for a Tile ID, since it 
 * requires layer info:
 * 
 * SearchType ID mapX mapY layer radius
 * 
 * You can use only the SearchType to perform a search with the preset parameters.
 * If you want to use some parameters, but not all, you can drop them off the end, 
 * but you can't skip one and enter the next without placing an 'x' in place of
 * the parameter you're skipping. This is to keep the wrong parameters from being
 * plugged into the wrong spots.
 * 
 * i.e. GOOD => SearchType ID
 *      GOOD => SearchType x x x radius
 *       BAD => SearchType mapX mapY
 * 
 * ---------------------------------TARGET EVENT---------------------------------
 * 
 * 
 * eventIDMatch [ID] [mapX] [mapY] [radius]
 * 
 * -example: eventIDMatch 13 21 10 2
 * 
 * --This will tell the plugin to search for event ID 13 on map coordinates 
 * --X21, Y10, within a radius of 2 grid spaces.
 * 
 * 
 * eventIDGreater [ID] [mapX] [mapY] [radius]
 * 
 * -example: eventIDGreater  
 * 
 * --This will tell the plugin to search for an event with an ID greater than
 * --the preset value, it will also use the preset values for X, Y, and radius.
 * 
 * 
 * eventIDLess [ID] [mapX] [mapY] [radius]
 * 
 * -example eventIDLess 10 42 5
 * 
 * --This will tell the plugin to search for an event with an ID less than
 * --10, on X42, Y5, using the preset value for radius.
 * 
 * 
 * -------------------------------TARGET TERRAIN--------------------------------
 * 
 * 
 * terrainTag [ID] [mapX] [mapY] [radius]
 * 
 * -example: terrainID 1 x x 3
 * 
 * --This will tell the plugin to search for a terrain ID that matches 1,
 * --it will use the preset X and Y values, within a radius of 3 grid spaces.
 * 
 * 
 * ---------------------------------TARGET TILE---------------------------------
 * 
 * 
 * tileID [ID] [mapX] [mapY] [tileLayer] [radius]
 * 
 * -example: tileID 1 x x 0 
 * 
 * --This tells the plugin to search for a tile with an ID matching 1, it
 * uses the preset X and Y values, on layer 0, and uses the preset radius size.
 * 
 * 
 * --------------------------------TARGET REGION--------------------------------
 * 
 * 
 * RegionID [ID] [mapX] [mapY] [tileLayer] [radius]
 * 
 * -example: regionID x x x 5
 * 
 * --This tells the plugin to search for a region with an ID matching the preset
 * --value.  It's also using the preset X and Y values, but the radius of the radar will be 5.
 * 
 * 
 * ===================================CREDITS===================================
 * 
 * Free to use in commercial and non=commercial games.
 * Please, credit as RainbowGrenade or Angela Drake
 * 
 */

var params = PluginManager.parameters('RadiusCheck');
var radius = Number(params['Radar Radius'] || 2);
var xVar = Number(params['X Variable'] || 15); 
var yVar = Number(params['Y Variable'] || 16);
var tileLayer = Number(params['Tile Layer'] || 1);
var eventIDMatch = Number(params['Event ID Match'] || 1);
var eventIDMatchCommon = Number(params['Event Id Match Common Event'] || 11);
var eventIDGreater = Number(params['Event ID Greater Than'] || 0);
var eventIDGreaterCommon = Number(params['Event ID Greater Common Event'] || 12);
var eventIDLess = Number(params['Event ID Less Than'] || 1);
var eventIDLessCommon = Number(params['Event ID Less Than Common Event'] || 13);
var terrainTag = Number(params['Terrain Tag'] || 1);
var terrainCommon = Number(params['Terrain Common Event'] || 14);
var tileID = Number(params['Tile ID'] || 1);
var tileCommon = Number(params['Tile Common Event'] || 15);
var regionID = Number(params['Region ID'] || 1);
var regionCommon = Number(params['Region Common Event'] || 16);

var radarCommands = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {

    radarCommands.apply(this);

    var xCoordinate = $gameVariables.value(xVar);
    var yCoordinate = $gameVariables.value(yVar);

    console.log("x = " + xCoordinate + " " + "y = " + yCoordinate);
    
    switch (command) {
        case 'eventIDMatch':
            console.log("eventMatch");
            userChoice = "eventIDMatch";
            if (args[0] != undefined && args[0] !== 'x'){
                console.log('args 0');
                eventIDMatch = args[0];
            }
            if (args[1] != undefined && args[2] != undefined && args[1] !== 'x' && args[2] !== 'x'){
                var xCoordinate = args[1];
                var yCoordinate = args[2];
                console.log('args 1 & 2');
                console.log("x = " + xCoordinate + " " + "y = " + yCoordinate);
            }
            if (args[3] != undefined && args[3] !== 'x'){
                console.log('args 3');
                radius = args[3];
            }
            radar(userChoice, xCoordinate, yCoordinate, tileLayer, eventIDMatch, terrainTag, tileID, regionID);
            break;
                        
        case 'eventIDGreater':
            console.log('eventGreater');
            userChoice = "eventIDGreater";
            if (args[0] != undefined && args[0] !== 'x'){
                console.log('args 0');
                eventIDMatch = args[0];
            }
            if (args[1] != undefined && args[2] != undefined && args[1] !== 'x' && args[2] !== 'x'){
                var xCoordinate = args[1];
                var yCoordinate = args[2];
                console.log('args 1 & 2');
                console.log("x = " + xCoordinate + " " + "y = " + yCoordinate);
            }
            if (args[3] != undefined && args[3] !== 'x'){
                console.log('args 3');
                radius = args[3];
            }
            radar(userChoice, xCoordinate, yCoordinate, tileLayer, eventIDGreater, terrainTag, tileID, regionID);
            break;

        case 'eventIDLesser':
            console.log('ceventLesser');
            userChoice = "eventIDLesser";
            if (args[0] != undefined && args[0] !== 'x'){
                console.log('args 0');
                eventIDMatch = args[0];
            }
            if (args[1] != undefined && args[2] != undefined && args[1] !== 'x' && args[2] !== 'x'){
                var xCoordinate = args[1];
                var yCoordinate = args[2];
                console.log('args 1 & 2');
                console.log("x = " + xCoordinate + " " + "y = " + yCoordinate);
            }
            if (args[3] != undefined && args[3] !== 'x'){
                console.log('args 3');
                radius = args[3];
            }
        
        case 'terrainTag':
            console.log("terrain");
            userChoice = "terrainTag";
            if (args[0] != undefined && args[0] !== 'x'){
                console.log('args 0');
                eventIDMatch = args[0];
            }
            if (args[1] != undefined && args[2] != undefined && args[1] !== 'x' && args[2] !== 'x'){
                var xCoordinate = args[1];
                var yCoordinate = args[2];
                console.log('args 1 & 2');
                console.log("x = " + xCoordinate + " " + "y = " + yCoordinate);
            }
            if (args[3] != undefined && args[3] !== 'x'){
                console.log('args 3');
                radius = args[3];
            }
            radar(userChoice, xCoordinate, yCoordinate, tileLayer, 0, terrainTag, tileID, regionID);
            break;

        case 'tileID':
            console.log("tile");
            userChoice = "tileID";
            if (args[0] != undefined && args[0] !== 'x'){
                console.log('args 1');
                eventIDLess = args[1];
            }
            if (args[1] != undefined && args[2] != undefined && args[1] !== 'x' && args[2] !== 'x'){
                var xCoordinate = args[1];
                var yCoordinate = args[2];
                console.log("x = " + xCoordinate + " " + "y = " + yCoordinate);
            }
            if (args[3] != undefined && args[3] !== 'x'){
                var tileLayer = args[3];
            }
            if (args[4] != undefined && args[4] !== 'x'){
                radius = args[4];
            }
            radar(userChoice, xCoordinate, yCoordinate, tileLayer, 0, terrainTag, tileID, regionID);
            break;

        case 'regionID':
            console.log("region");
            userChoice = "regionID";
            if (args[0] != undefined && args[0] !== 'x'){
                console.log('args 0');
                eventIDMatch = args[0];
            }
            if (args[1] != undefined && args[2] != undefined && args[1] !== 'x' && args[2] !== 'x'){
                var xCoordinate = args[1];
                var yCoordinate = args[2];
                console.log('args 1 & 2');
                console.log("x = " + xCoordinate + " " + "y = " + yCoordinate);
            }
            if (args[3] != undefined && args[3] !== 'x'){
                console.log('args 3');
                radius = args[3];
            }
            radar(userChoice, xCoordinate, yCoordinate, tileLayer, 0, terrainTag, tileID, regionID);
            break;
    }
    
};

function radar(choice, x, y, layer, eventID, terrainTag, tileID, regionID) {

    var outerLoop = 0;
    var innerLoop = 0;
    var loopMax = 2 * radius;
    var num1 = radius;
    var num2 = radius;
    var targetX = x;
    var targetY = y;
    var targetEventID = $gameMap.eventIdXy(targetX, targetY);
    var targetTerrainTag = $gameMap.terrainTag(targetX, targetY);
    var targetTileID = $gameMap.tileId(x, y, layer);
    var targetRegionID = $gameMap.regionId(x, y);

    console.log("x = " + targetX + " " + "y = " + targetY);
    
    while (outerLoop <= loopMax) {
        targetX = x;
        targetX -= num1;
    
        while (innerLoop <= loopMax) {
            targetY = y;
            targetY -= num2;
            num2 - 1;
            innerLoop += 1;
            targetEventID = $gameMap.eventIdXy(targetX, targetY);
            targetTerrainTag = $gameMap.terrainTag(targetX, targetY);
            targetTileID = $gameMap.tileId(x, y, layer);
            targetRegionID = $gameMap.regionId(x, y);
            console.log("x = " + targetX + " " + "y = " + targetY);
            console.log(choice);

            switch (choice) {
                case 'eventIDMatch':
                console.log("EVENT target:" + targetEventID + " param:" + eventID);
                    $gameTemp.reserveCommonEvent(eventIDMatchCommon);
                    return targetEventID;
                
                case 'eventIDGreater':
                console.log("EVENT target:" + targetEventID + " param:" + eventID);
                    if (targetEventID > eventID){
                        $gameTemp.reserveCommonEvent(eventIDGreaterCommon);
                        return targetEventID;
                    } 
                
                case 'eventIDLesser':
                console.log("EVENT target:" + targetEventID + " param:" + eventID);
                    if (targetEventID > eventID){
                        $gameTemp.reserveCommonEvent(eventIDLessCommon);
                        return targetEventID;                    
                    }
                
                
                case 'terrainTag':
                console.log("TERRAIN target:" + targetTerrainTag + " param:" + terrainTag);
                    if (targetTerrainTag === terrainTag){
                        $gameTemp.reserveCommonEvent(terrainCommon);
                        return targetTerrainTag;
                    }
                    
        
                case 'tileID':
                console.log("TILE target:" + targetTileID + " param:" + tileID);
                    if (targetTileID ===  tileID){
                        $gameTemp.reserveCommonEvent(tileCommon);
                        return targetTileID;
                    }
                    
        
                case 'regionID':
                console.log("REGION target:" + targetRegionID + " param:" + regionID);
                    if (targetRegionID === regionID){
                        $gameTemp.reserveCommonEvent(regionCommon);
                        return targetRegionID;
                
                    }
                                
            }
        }
    
        num1 - 1;
        outerLoop += 1;
        innerLoop = 0;
        num2 = radius;
    }
    
}    
