//Ici vous déposerez votre code, fichier à renommer pour chaque exercice => script1;js script2.js, etc...
$(document).ready(function(){
    $.getScript('scripts/squad.js', function() {
        let h1 = $("<h1></h1>");
        let p = $("<p></p>");  
        let header = $("<header></header>");
    
        $("section")
                    .append(header);
    
        $(header)
                    .append(h1)
                    .append(p);
    
        h1.append(squad.squadName);
        p.append("Base: " + squad.homeTown + " //" + squad.formed);
    
        squad.members.forEach((member) => {
            let article = $("<article></article>");
            let HeroName = $("<h2></h2>");
            let Powers = $("<ul></ul>");
            let button = $("<button class='addPower'></button>");
            HeroName.append(member.name);
            member.powers.forEach((power) => {
                Powers.append("<li class='power'>" + power + "</li>");
            })
            button.append("Add Power")
            $(article)
                        .append(HeroName)
                        .append("<p>Identité secrète :" + member.secretIdentity + "</p>")
                        .append("<p>Age :" + member.age + "</p>")
                        .append("<p>Pouvoirs :</p>")
                        .append(Powers)
                        .append(button)
            $("section").append(article);
        })   
    });

    $(document).on("click",".addPower", function(){
        let newPower = prompt("Please enter the power", "Ultimate Power");
        if (newPower != null) {
            $(this).parent().children("ul")
                                        .append("<li class='power'>" + newPower + "</li>");
        }
    });

    function handlerIn(){
        let deleteButton = $("<button id='delete'>Delete</button>");
        $(this).append(deleteButton);
        $(deleteButton).fadeIn("slow");
    }

    function handlerOut(){
        $("#delete").fadeOut("slow");
        $("#delete").remove();
    }  

    function deletePower(){
        $(this).parent().remove();
    }

    $(document).on("mouseenter", ".power", handlerIn );
    $(document).on("mouseleave", ".power", handlerOut );
    $(document).on("click", "#delete", deletePower );
});