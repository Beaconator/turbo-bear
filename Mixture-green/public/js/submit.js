jQuery(function($) {
    $(document).on('submit', 'form[data-async]', function(event) {
        var $form = $(this);
        var $target = $($form.attr('data-target'));
        var submitButton = $("input[type='submit'][clicked=true], button[type='submit'][clicked=true]", $form);

        var formData = $form.serializeArray();
        if (submitButton.size() === 1) {
            formData.push({ name: $(submitButton[0]).attr("name"), value: "1" });
        }
        else if(submitButton.size() !== 0) {
            console.log("Multiple submit-buttons pressed. This should not happen!");
        }

        $.ajax({
            type: $form.attr('method'),
            url: $form.attr('action'),
            data: formData,

            success: function(data, status) {
                $target.html(data);
            }
        });

        event.preventDefault();
    });

    $(document).on("click", 'input[type="submit"], button[type="submit"]', function() {
        $('form[data-async] input[type=submit], form[data-async] button[type=submit]', $(this).parents("form")).removeAttr("clicked");
        $(this).attr("clicked", "true");
    });
});