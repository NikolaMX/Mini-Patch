﻿var model;
var handlers;

$(document).ready(function ()
{
    function ReplayBrowserViewModel()
    {
        var self = this;

        // Get session information about the user, his game, environment, and so on
        self.uberId = ko.observable().extend({ session: 'uberId' });

        self.otherUberId = ko.observable('');
        self.otherDisplayName = ko.observable('');
        self.otherUberId.subscribe(function(){
            LeaderboardUtility.getPlayerDisplayName(self.otherUberId()).subscribe(function(displayName) {
                self.otherDisplayName(displayName);
            })
        });

        self.signedInToUbernet = ko.observable().extend({ session: 'signed_in_to_ubernet' });
        self.gameTicket = ko.observable().extend({ session: 'gameTicket' });
        self.gameHostname = ko.observable().extend({ session: 'gameHostname' });
        self.gamePort = ko.observable().extend({ session: 'gamePort' });

        self.isLocalGame = ko.observable().extend({ session: 'is_local_game' });
        self.serverType = ko.observable().extend({ session: 'game_server_type' });
        self.serverSetup = ko.observable().extend({ session: 'game_server_setup' });
        self.gameType = ko.observable().extend({ session: 'game_type' });

        self.transitPrimaryMessage = ko.observable().extend({ session: 'transit_primary_message' });
        self.transitSecondaryMessage = ko.observable().extend({ session: 'transit_secondary_message' });
        self.transitDestination = ko.observable().extend({ session: 'transit_destination' });
        self.transitDelay = ko.observable().extend({ session: 'transit_delay' });

        self.devMode = ko.observable().extend({ session: 'dev_mode' });

        // Tracked for knowing where we've been for pages that can be accessed in more than one way
        self.lastSceneUrl = ko.observable().extend({ session: 'last_scene_url' });

        self.scrollBarWidth = ko.observable(0);

        // Set up dynamic sizing elements
        self.containerHeight = ko.observable('');
        self.containerWidth = ko.observable('');
        self.listWrapperHeight = ko.observable('');
        self.listHeight = ko.observable('');
        self.gameHeaderColWidth6 = ko.observable('50%');
        self.gameHeaderColWidth5 = ko.observable('41.66666666666667%');
        self.gameHeaderColWidth4 = ko.observable('33.33333333333333%');
        self.gameHeaderColWidth3 = ko.observable('25%');
        self.gameHeaderColWidth2 = ko.observable('16.66666666666667%');
        self.gameHeaderColWidth1 = ko.observable('8.33333333333333%');

        self.searchFilter = ko.observable('');
        self.replayListScope = ko.observable('');
        self.replayListSortOrder = ko.observable("Recent");
        self.replayListFilter = ko.observable("Multiplayer");

        self.replayListScopeOptions = ko.computed(function() {
            var options = [{'text': loc('!LOC:All Recent Games'), value: ''}, {'text': loc('!LOC:My Games Only'), value: self.uberId()}];
            if (self.otherUberId()) {
                options.unshift({'text': self.otherDisplayName(), value: self.otherUberId()});
            }
            return options;
        });

        self.replayListScope.subscribe(function () {
            model.updateReplayData();
        });

        self.replayListSortOrder.subscribe(function () {
            model.updateReplayData();
        });

        self.titleSuffix = ko.observable('');
        self.status = ko.observable('');

        function IsSavedGame(game) {
            return !!game.save;
        };

        function IsGalacticWarReplay(game)
        {
            return !!game.gw;
        };

        function IsVersusAI(game)
        {
            var players = _.filter(game.armies, function (element)
            {
                return !element.ai;
            });
            return players.length <= 1;
        };

        // Game lists: available and filtered
        self.gameList = ko.observableArray();
        self.filteredGameList = ko.computed({read: function()
        {
            var filteredGames = [];
            var selectedGameStillVisible = false;
            var filter = self.replayListFilter();

            _.forEach(self.gameList(), function (game)
            {
                var found = !!self.currentSelectedGame() && game.name === self.currentSelectedGame().name;

                // Look for games matching the search string
                if (self.searchFilter().length > 0)
                    if (game.searchable.indexOf(self.searchFilter().toUpperCase()) === -1)
                        return;

                // saved games will also match GW and Versus AI, so we reject them first.
                if (IsSavedGame(game) && filter !== 'Save')
                    return;

                // GW game will also match Versus AI, so we reject them first.
                if (IsGalacticWarReplay(game) && filter !== 'Galactic War')
                    return;

                switch (filter) {
                    case 'Save':
                        if (!IsSavedGame(game))
                            return;
                        break;
                    case 'Multiplayer':
                        if (IsVersusAI(game))
                            return;
                        break;
                    case 'Ladder':
                        if (game.game_type != 'Ladder1v1')
                            return;
                        break;
                    case 'Galactic War':
                        if (!IsGalacticWarReplay(game))
                            return;
                        break;
                    case 'Versus AI':
                        if (!IsVersusAI(game))
                            return;
                        break;
                    default:
                        break;
                }

                if (found)
                    selectedGameStillVisible = true;

                // If our filters haven't whacked the game from the list, include in our results
                filteredGames.push(game);
            });

            if (!selectedGameStillVisible)
                self.setSelected(null);

            return filteredGames;

        }, deferEvaluation: true});

        // Support selection, retained even on list refresh
        self.currentSelectedGame = ko.observable(null);
        self.currentSelectedGameHost = ko.observable(-1);

        self.setSelected = function (data)
        {
            self.currentSelectedGame(data);
            if (!!self.currentSelectedGame())
                self.currentSelectedGameHost(data.host_id);
            else
                self.currentSelectedGameHost(-1);
        }

        self.isSearchFilterLobbyId = function () {
            var filter = self.searchFilter();
            if (filter.length === 0) {
                return false;
            }
            var re = /^(\w+:)?\d+$/;
            return re.test(filter);
        }

        self.canViewReplay =  ko.computed(function () { return (!!self.currentSelectedGame()) || self.isSearchFilterLobbyId(); });
        self.viewSelectedReplay = function () {
            if (!self.canViewReplay())
                return;

            var replayId;
            var content = null;

            var currentSelectedGame = self.currentSelectedGame();

            // currently no way to tell what type of game this is until loaded (except gw below)
            self.gameType(undefined);

            if (currentSelectedGame && currentSelectedGame.host_id > 0)
            {
                if (currentSelectedGame.gw) {
                    self.gameType('Galactic War');
                }

                replayId = currentSelectedGame.host_id;
                if (currentSelectedGame.required_content)
                    content = currentSelectedGame.required_content;
            }
            else if (self.isSearchFilterLobbyId())
            {

                replayId = self.searchFilter();

                // Filtered lobby id can contain a content specification, in the form of
                // "content1:lobbyid". This is so that we can pass in content requirements
                // through the search bar.
                var contentSeparator = replayId.indexOf(':');
                if (contentSeparator >= 0)
                {
                    if (contentSeparator > 0)
                        content = replayId.substr(0, contentSeparator);
                    replayId = replayId.substr(contentSeparator + 1);
                }
            }

            if (replayId) {
                engine.call('disable_lan_lookout');
                self.lastSceneUrl('coui://ui/main/game/replay_browser/replay_browser.html');

                self.serverSetup('replay');

                var params = {
                    action: 'start',
                    replayid: replayId,
                    content: content,
                    mode: 'Config'
                };
                window.location.href = 'coui://ui/main/game/connect_to_game/connect_to_game.html?' + $.param(params);
                return; /* window.location.href will not stop execution. */
            }
        };

        self.watchDirectLobbyIdText = ko.computed(function() {
            if (self.isSearchFilterLobbyId() && (!self.currentSelectedGame() || self.currentSelectedGame().host_id === 0)) {
                return loc("!LOC:Watch Direct Lobby Id: __lobby_id__", { lobby_id: self.searchFilter() });
            }
            return "";
        });

        self.back = function() {
            engine.call('disable_lan_lookout');
            self.lastSceneUrl('coui://ui/main/game/replay_browser/replay_browser.html');
            window.location.href = 'coui://ui/main/game/start/start.html';
            return; /* window.location.href will not stop execution. */
        };

        // Takes a game beacon (sent by the game server) and turns it into our game data object
        self.processReplay = function(beacon, host_id, origGameInfo)
        {
            try
            {
                var game = {};
                var gameData = beacon;//.game;

                gameData.armies = gameData.armies || [];

                var duration = gameData.endOfTime;
                if ((duration === undefined) || (duration < 0.0)) {
                    duration = origGameInfo.Duration;
                }
                var durationText = "-";
                if ((duration !== undefined) && (duration >= 0.0)) {
                    durationText = UberUtility.createTimeString(duration);
                }

                var buildVersion = origGameInfo.BuildVersion;

                var armyCount = gameData.armies.length;
                var gameName = loc("!LOC:(no info available)");

                var aiCount = 0;
                if (!_.isEmpty(beacon.save))
                    gameName = beacon.save.name;
                else if (gameData.config_summary && gameData.config_summary.gw) {
                    var summary = gameData.config_summary;

                    var aiArmiesText = "?";
                    aiArmies = [];
                    _.forEach(gameData.armies, function (army) {
                        if (army.ai) {
                            aiArmies.push(army.name);
                        }
                    });
                    if (aiArmies.length > 0) {
                        aiArmiesText = aiArmies.join(", ");
                    }

                    gameName = loc('!LOC: __gwClientNames__: Galactic War "__gwWarName__" (turn __gwTurn__, __gwSystemName__), vs. __gwAiArmies__',
                        { 'gwClientNames': summary.client_names, 'gwWarName': summary.gw.name, 'gwTurn': summary.gw.stats.turns, 'gwSystemName': summary.system.name, 'gwAiArmies' : aiArmiesText }
                    );
                }
                else
                {
                    if (armyCount > 0)
                    {
                        gameName = "";
                        _.forEach(gameData.armies, function (army)
                        {
                            if (!army.ai)
                                gameName += army.name + " ";
                            else
                                aiCount += 1;
                        });
                        if (aiCount > 0)
                            gameName += loc("!LOC: (+ __aiCount__ AI)", { 'aiCount': aiCount });

                    }
                }

                if (!_.isEmpty(beacon.save))
                    gameName = beacon.save.name;

                var winners = _.map(_.filter(gameData.armies, function (army)
                {
                    return !army.defeated;
                }), function(army)
                {
                    return army.name + ( army.ai ? ' (AI)' : '');
                });

                var winner = winners.join(' ');

                game =
                {
                    name: gameName,
                    system_name:gameData.system_name,
                    game_type: gameData.game_type,
                    armies: gameData.armies,
                    duration: durationText,
                    buildVersion: buildVersion,
                    searchable : (gameName + ' ' + durationText + ' ' + buildVersion + ' ' + host_id).toUpperCase(),
                    host_id : host_id,
                    save: !_.isEmpty(beacon.save),
                    gw: !!(gameData.config_summary && !!gameData.config_summary.gw),
                    winners: winners,
                    winner: winner
                };

                if (_.has(gameData, 'required_content')) {
                    game.required_content = _.last(gameData.required_content);

                    if (_.size(gameData.required_content) > 1) {
                        console.error("replay with more than one required content");
                    }
               }

                return game;

            } catch (e) {
                console.error(e);
                return false;
            }
        };

        // This is what we do if we can't get a game list from UberNet
        self.failedToRetrieveReplayList = function()
        {
            model.transitPrimaryMessage(loc('!LOC:FAILED TO RETRIEVE REPLAY LIST'));
            model.transitSecondaryMessage(loc('!LOC:Returning to Main Menu'));
            model.transitDestination('coui://ui/main/game/start/start.html');
            model.transitDelay(5000);
            window.location.href = 'coui://ui/main/game/transit/transit.html';
            return; /* window.location.href will not stop execution. */
        }

        // This is set up to periodically poll UberNet and see what games are being reported
        self.updateReplayData = function ()
        {
            // Make a call to the engine to get a list of current replays

            api.net.getReplays(self.replayListSortOrder(), self.replayListScope())

                .done(function (data)
                {

                    // If we started with nothing in the game list, we'll need to trigger a resize
                    var startingGameListSize = self.gameList().length;

                    newGameList = [];

                    try {
                        data = JSON.parse(data);
                        var games = data.Games;
                        if (data.Status !== 'Ready')
                        {
                            games = [];
                            self.status(loc('!LOC: (Updating...)'));
                            setTimeout(model.updateReplayData, 1000); // don't wait too long to try another update
                        } else {
                            self.status('');
                        }
                    } catch (e)
                    {
                        self.failedToRetrieveReplayList();
                        return;
                    }

                    for (var i = 0; i < games.length; i++)
                    {
                        try
                        {
                            gameData = JSON.parse(games[i].ReplayInfoJson);

                            if (gameData.error)
                                continue;

                            game = self.processReplay(gameData, games[i].LobbyId, games[i]);
                            if (!!game)
                                newGameList.push(game);
                        }
                        catch (e)
                        {
                            console.error('failed to parse TitleData');
                            console.log(games[i].ReplayInfoJson);
                        }
                    }

                    // Update the master game list
                    self.gameList(newGameList);

                })

                .fail(self.failedToRetrieveReplayList)

                .always(self.adjustHeader);
        }

        self.adjustHeader = function()
        {
            var list = $("#game-list").get(0);

            var width = 0;

            if (list)
                width = Math.max(0, list.offsetWidth - list.clientWidth);

            self.scrollBarWidth(width + 'px');

            $('.tooltip').remove();
        }

        self.setup = function()
        {
            // Set up selectpickers to work as multi-select dropdowns

            var uberId = $.url().param('uberId');

            if (uberId)
            {
                self.otherUberId(uberId);
                self.replayListScope(uberId);
                self.otherDisplayName($.url().param('displayName') || 'Contact');
            }

            if (self.signedInToUbernet())
            {
                self.updateTimer = setInterval(self.updateReplayData, 30000);
                self.updateReplayData();
            }

            $('#region-filter').selectpicker({noneSelectedText:'Any region'});
            $('#replay-list-sort-order').selectpicker({ /*noneSelectedText:'Any system size'*/ });
            $('#replay-list-scope').selectpicker({ /*noneSelectedText:'Any player count'*/ });

            // Force knockout to update in response to default values
            $('#replay-list-sort-order').selectpicker('val', $('#replay-list-sort-order').selectpicker('val'));
            $('#replay-list-scope').selectpicker('val', $('#replay-list-scope').selectpicker('val'));
            $('#replay-list-filter').selectpicker('val', $('#replay-list-filter').selectpicker('val'))

            $(window).resize(self.adjustHeader);
        }
    }

    model = new ReplayBrowserViewModel();

    handlers = {};

    // inject per scene mods
    if (scene_mod_list['replay_browser']) {
        loadMods(scene_mod_list['replay_browser']);
    }

    // Activates knockout.js
    ko.applyBindings(model);

    model.setup();

    app.registerWithCoherent(model, handlers);
});
