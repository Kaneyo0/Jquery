//Ici vous déposerez votre code, fichier à renommer pour chaque exercice => script1;js script2.js, etc...
$(document).ready(function(){
    $.getScript('scripts/squad.js', function() {    
        let teamButton = $("<button id='addTeam'>Add Team</button>");
        $("body>header").append(teamButton);
        printTeam(squad);
    });

    function printTeam(squad) {
        let section      = $("<section class='team'></section>");
        let players      = $("<section class='players'></section>")
        let playerButton = $("<button id='addPlayer'>Add Player</button>");
        let teamName           = $("<h1></h1>");
        let teamBase            = $("<p></p>");
        $("body").append(section);
        $(section)
                .append(teamName)
                .append(playerButton)
                .append(teamBase)
                .append(players);    
    
        teamName.append(squad.squadName);
        teamBase.append("Base: " + squad.homeTown + " //" + squad.formed);
        $(".players").sortable({
            revert: true
        });
    
        squad.members.forEach((member) => {
            printMember(member, players);
        })
    }

    function printMember(member, section) {
        let article     = $("<article class='member'></article>");
        let HeroName    = $("<h2></h2>");
        let Powers      = $("<ul></ul>");
        let powerButton = $("<button class='addPower'></button>");
        HeroName.append(member.name);
        member.powers.forEach((power) => {
            Powers.append("<li class='power'>" + power + "</li>");
        })
        powerButton.append("Add Power")
        $(article)
                    .append(HeroName)
                    .append("<p>Identité secrète :" + member.secretIdentity + "</p>")
                    .append("<p>Age :" + member.age + "</p>")
                    .append("<p>Pouvoirs :</p>")
                    .append(Powers)
                    .append(powerButton)
        section.append(article);
        
        $(".member").draggable({
            connectToSortable: ".players",
            revert: "invalid"
          });
        $( ".member" ).disableSelection();
    }

    function handlerIn(){
        let deleteButton    = $("<button id='delete'>Delete</button>");
        let modifyButton    = $("<button id='modify'>Modify</button>");
        let buttons         = $("<ul></ul>");
        $(this).append(buttons);
        $(buttons)     
                .append(deleteButton)
                .append(modifyButton);
        $(deleteButton).fadeIn("slow");
        $(modifyButton).fadeIn("slow");
    }

    function handlerOut(){
        $("#delete").parent().remove();
    } 
    
    function addPower(){
        let newPower = prompt("Please enter the power", "Ultimate Power");
        if (newPower != null) {
            $(this).parent().children("ul")
                                        .append("<li class='power'>" + newPower + "</li>");
        }
    }

    function deletePower(){
        $(this).parent().parent().remove();
    }

    function modifyPower(){
        let newPowerName = prompt("Please enter the new power name", $(this).parent().parent().text());
        if (newPowerName != null) {
            $(this).parent().parent().html(newPowerName);
        }
    }

    function addPlayer(){
        let newPlayerName           = prompt("Please enter the new player name", "All Might");
        let newPlayerSecretIdentity = prompt("Please enter the new player identity", "Jean Castex");
        let newPlayerAge            = prompt("Please enter the new player age", "65");
        let member = {
            "name": newPlayerName,
			"age": newPlayerAge,
			"secretIdentity": newPlayerSecretIdentity,
			"powers": []
        }
        if (newPlayerName != null && newPlayerSecretIdentity != null && newPlayerAge != null) {
            printMember(member, $(this).next().next());
        }
    }

    function addTeam(){
        let newTeamName         = prompt("Please enter the new team name: ", "Scouting Legion");
        let newTeamHomeTown     = prompt("Please enter the new team home", "Paradise");
        let newTeamFormed       = prompt("Please enter the new team creation date", "845");
        let newTeamSecretBase   = prompt("Please enter the new team secret base", "Outside the walls");
        let squad = {
			"squadName": newTeamName,
			"homeTown": newTeamHomeTown,
			"formed": newTeamFormed,
			"secretBase": newTeamSecretBase,
			"active": true,
			"members": [],
        }
        if (newTeamName != null && newTeamHomeTown != null && newTeamFormed != null && newTeamSecretBase != null) {
            printTeam(squad);
        }
    }

    $(document).on("mouseenter", ".power", handlerIn );
    $(document).on("mouseleave", ".power", handlerOut );
    $(document).on("click",".addPower", addPower );
    $(document).on("click", "#delete", deletePower );
    $(document).on("click", "#modify", modifyPower );
    $(document).on("click", "#addPlayer", addPlayer );
    $(document).on("click", "#addTeam", addTeam );
});