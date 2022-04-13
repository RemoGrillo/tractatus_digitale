var tractatus;
language = "en";

function switch_to_language(language){
    if(language == "en"){
        $('.content_en').show();
        $('.content_de').hide();
    } else {
        $('.content_en').hide();
        $('.content_de').show();
    }
}

$(document).ready(function(){
    $.getJSON( "tractatus.json" , function( result ){
        tractatus = result;
        //Add first propositions
        addPropositionsToLevel("0");
        switch_to_language("en");
    });

    $(document).on('click', '.hasChildren', function(){
        clickOnProposition($(this))
    });


    var switchButton 			= document.querySelector('.switch-button');
    var switchBtnRight 			= document.querySelector('.switch-button-case.right');
    var switchBtnLeft 			= document.querySelector('.switch-button-case.left');
    var activeSwitch 			= document.querySelector('.active');

    function switchLeft(){
        switchBtnRight.classList.remove('active-case');
        switchBtnLeft.classList.add('active-case');
        activeSwitch.style.left = '0%';
        language = "en";
        switch_to_language(language);
    }

    function switchRight(){
        switchBtnRight.classList.add('active-case');
        switchBtnLeft.classList.remove('active-case');
        activeSwitch.style.left = '50%';
        language = "de";
        switch_to_language(language);
    }

    switchBtnLeft.addEventListener('click', function(){
        switchLeft();
    }, false);

    switchBtnRight.addEventListener('click', function(){
        switchRight();
    }, false);

});

function clickOnProposition(clicked){
    if($(clicked).hasClass("highlighted")){
    } else {
        addPropositionsToLevel($(clicked).attr('pnum'));
        highlightProposition(clicked);
    }
    switch_to_language(language);
}

function highlightProposition(clicked){
    $(clicked).siblings().removeClass("highlighted");
    $(clicked).siblings().addClass("nonHighlighted");
    $(clicked).removeClass("nonHighlighted");
    $(clicked).addClass("highlighted");
}

function getNode(node, proposition_number){
    if(node.key === proposition_number){
        return node;
    } else
        for(var i=0 ; i<node.children.length ; i++) {
            if(proposition_number.startsWith(node.children[i].key)){
                var res = getNode(node.children[i], proposition_number);
                if(res) return res;
            }
        }
    }

function getChildren(proposition_number){
    return getNode(tractatus, proposition_number).children
}

function cleanLevelsFrom(level) {
    for (var i = level; i <= 7; i++) {
        $('#level-' + i).html("");
    }
}

function addPropositionsToLevel(clickedProposition){
    if(clickedProposition == 0){
        nextlevel = 1;
    } else {
        let level = clickedProposition.split('.').join("").length;
        var nextlevel = level + 1;
    }

    cleanLevelsFrom(nextlevel);

    let children = getChildren(clickedProposition);
    $(children).each(function(k,v){
        if(!v.empty){
            content_en = v.content.en;
            content_de = v.content.de;
        } else {
            content_en = "(Ghost Node)";
            content_de = "(Ghost Node)";
        }

        if(v.children.length === 0){
            emptiness = "";
            hasChildren = "";
        } else {
            emptiness = ">";
            hasChildren = "hasChildren";
        }

        let proposition = "<div class='proposition " + hasChildren + "' pnum='"+ v.key +"'><div class='propositionHeader'><div class='key'>"+ v.key +"</div><div class='emptiness'>"+ emptiness +"</div></div><div class='content_en proposition_content'>" + content_en + "</div><div class='content_de proposition_content'>"+ content_de +"</div></div>";
        $(proposition).hide().appendTo('#level-' + nextlevel).fadeIn(500);
    })
}

function prettyKey(key){
    let first = key.Substring(0, 1)
    return clickedProposition.split('.').join("")
}
