<?php
function enqueue_autocomplete_scripts() {
    wp_enqueue_script('jquery-ui-core');
    wp_enqueue_script('jquery-ui-autocomplete');
    wp_enqueue_style('jquery-ui-css', 'https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css');
    wp_enqueue_script('autocomplete-cities', get_template_directory_uri() . '/js/autocomplete-cities.js', array('jquery', 'jquery-ui-autocomplete'), null, true);
}
add_action('wp_enqueue_scripts', 'enqueue_autocomplete_scripts');

// Le reste du code de functions.php reste inchangé
function enqueue_datepicker_scripts() {
    wp_enqueue_script('jquery-ui-datepicker');
    wp_enqueue_style('jquery-ui-css', 'https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css');
}
add_action('wp_enqueue_scripts', 'enqueue_datepicker_scripts');

function initialize_datepicker() {
    ?>
    <script type="text/javascript">
    jQuery(document).ready(function($) {
        $(".datepicker").datepicker({
            dateFormat : "dd-mm-yy"
        });
    });
    </script>
    <?php
}
add_action('wp_footer', 'initialize_datepicker');

