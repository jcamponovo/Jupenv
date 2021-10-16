// toggle on/off prompts display in all codecells

define([
    'jquery',
    'base/js/namespace'
], function($, Jupyter) {
    "use strict";

    var toggle_all = function() {
        var toolbar_button = $('#toggle_all_prompts');
        toolbar_button.toggleClass('active', !toolbar_button.hasClass('active'));
        var vis = $(".prompt_container").css('visibility');
        if(vis == 'collapse'){
            $(".prompt_container").css('visibility', 'visible');
        } // define action, register with ActionHandler instance
        else {
            $(".prompt_container").css('visibility', 'collapse');
        }};

    var action = {
        icon: 'fa-exchange-alt',
        help: 'Toggle prompts in all codecells',
        help_index : 'zz',
        id: 'toggle_all_prompts',
        handler: toggle_all
    };

    var action_full_name; // will be set on registration

    var initialize = function () {
        // update default config vals with the newly loaded ones
        update_params();

        // register actions with ActionHandler instance
        action_full_name = Jupyter.keyboard_manager.actions.register(action, action_name, prefix);

        // create toolbar button
        Jupyter.toolbar.add_buttons_group([action_full_name]);

        
    };

    var load_ipython_extension = function() {
        return Jupyter.notebook.config.loaded.then(initialize);
    };

    var extension = {
        load_ipython_extension : load_ipython_extension
    };
    return extension;
});
