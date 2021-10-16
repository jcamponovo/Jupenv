// toggle on/off prompts display in all codecells

define([
    'jquery',
    'base/js/namespace'
], function($, Jupyter) {
    "use strict";
    
    var vis = 'visible';

    var toggle_all = function() {
        var toolbar_button = $('#toggle_all_prompts');
        toolbar_button.toggleClass('active', !toolbar_button.hasClass('active'));
        if(vis == 'collapse'){
            $(".prompt_container").css('visibility', 'visible');
            vis = "visible";
        } // define action, register with ActionHandler instance
        else {
            $(".prompt_container").css('visibility', 'collapse');
            vis = "collapse";
        }};

    var prefix = 'auto';
    var action_name = 'toggle-all-prompts';
    var action = {
        icon: 'fa-chevron-left',
        help: 'Toggle prompts in all codecells',
        help_index : 'za',
        id: 'toggle_all_prompts',
        handler: toggle_all
    };

    var action_full_name; // will be set on registration

    var initialize = function () {
        // register actions with ActionHandler instance
        action_full_name = Jupyter.keyboard_manager.actions.register(action, action_name, prefix);

        // create toolbar button
        Jupyter.toolbar.add_buttons_group([action_full_name]);
    };

    var load_ipython_extension = function() {
        Jupyter.notebook.events.on('create.Cell', function(evt, data){
           if(vis == 'visible'){
                $(".prompt_container").css('visibility', 'visible');
}
           else {
                $(".prompt_container").css('visibility', 'collapse');
}
});
        return Jupyter.notebook.config.loaded.then(initialize);
    };

    var extension = {
        load_ipython_extension : load_ipython_extension
    };
    return extension;
});
