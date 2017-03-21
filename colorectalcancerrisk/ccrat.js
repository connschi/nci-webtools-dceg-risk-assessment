$.validator.addMethod("lessThan", function(value,element,params) {
  var compareTo = params;
  var allowEqual = false;
  if (typeof params === 'object') {
    compareTo = $(params.element).val();
    allowEqual = params.allowEqual===undefined?false:params.allowEqual;
  }
  value = Number(value);
  compareTo = Number(compareTo);
  if (allowEqual) {
    return value <= compareTo;
  } else {
    return value < compareTo;
  }
});
$.validator.addMethod("greaterThan", function(value,element,params) {
  var compareTo = params;
  var allowEqual = false;
  if (typeof params === 'object') {
    compareTo = $(params.element).val();
    allowEqual = params.allowEqual===undefined?false:params.allowEqual;
  }
  value = Number(value);
  compareTo = Number(compareTo);
  if (allowEqual) {
    return value >= compareTo;
  } else {
    return value > compareTo;
  }
});

var validationRules = {
    race: {
        required: true
    },
    age: {
        required: true,
        min: 50,
        max: 85
    },
    gender: {
        required: true
    },
    height_feet: {
        required: true,
        max: 9
    },
    weight: {
        required: true,
        min: 50,
        max: 700
    },
    veg_servings: {
        required: true
    },
    exam: {
        required: true
    },
    polyp: {
        required: {
            depends: function (el) {
                return $("[name='exam']").val() == "0";
            }
        }
    },
    aspirin: {
        required: true
    },
    non_aspirin: {
        required: true
    },
    moderate_months: {
        required: true
    },
    moderate_hours: {
        required: {
            depends: function (el) {
                return $("[name='moderate_months']").val() > 0;
            }
        }
    },
    vigorous_months: {
        required: true
    },
    vigorous_hours: {
        required: {
            depends: function (el) {
                return $("[name='vigorous_months']").val() > 0;
            }
        }
    },
    "family_cancer": {
        required: true
    },
    family_count: {
        required: {
            depends: function (el) {
                return $("[name='family_cancer']").val() == "1";
            }
        }
    },
    veg_amount: {
        required: {
            depends: function (el) {
                return $("[name='veg_servings']").val() > 0;
            }
        }
    },
    cigarettes: {
        required: {
            depends: function (el) {
                return $("[name='gender']:checked").val() == "Male";
            }
        }
    },
    smoke_age: {
        required: {
            depends: function (el) {
                return $("[name='gender']:checked").val() == "Male" && $("#cigarettes").val() === "0";
            }
        },
        lessThan: { "element": "[name='age']", "allowEqual": true }
    },
    cigarettes_num: {
        required: {
            depends: function (el) {
                return $("[name='gender']:checked").val() == "Male" && $("#cigarettes").val() === "0" && $("#smoke_age").val() > 0;
            }
        }
    },
    smoke_now: {
        required: {
            depends: function (el) {
                return $("[name='gender']:checked").val() == "Male" && $("#cigarettes").val() === "0" && $("#smoke_age").val() > 0;
            }
        }
    },
    smoke_quit: {
        required: {
            depends: function (el) {
                return $("[name='gender']:checked").val() == "Male" && $("#cigarettes").val() === "0" && $("#smoke_age").val() > 0 && $("[name='smoke_now']:checked").val() == "0";
            }
        },
        lessThan: {
            depends: function (el) {
                return $("[name='gender']:checked").val() == "Male" && $("#cigarettes").val() === "0" && $("#smoke_age").val() > 0 && $("[name='smoke_now']:checked").val() == "0";
            },
            param: { "element": "[name='age']", "allowEqual": true }
        },
        greaterThan: {
            depends: function (el) {
                return $("[name='gender']:checked").val() == "Male" && $("#cigarettes").val() === "0" && $("#smoke_age").val() > 0 && $("[name='smoke_now']:checked").val() == "0";
            },
            param: { "element": "[name='smoke_age']", "allowEqual": true }
        }
    },
    period: {
        required: {
            depends: function (el) {
                return $("[name='gender']:checked").val() == "Female";
            }
        }
    },
    last_period: {
        required: {
            depends: function (el) {
                return $("[name='period']:checked").val() == '1';
            }
        }
    },
    hormones: {
        required: {
            depends: function (el) {
                return $("[name='last_period']").val() == '2';
            }
        }
    }
};

var validationMessages = {
    race: {
        required: "Your race must be selected"
    },
    age: {
        required: "Age is required",
        min: "This calculator can only be used by people between the ages 50 and 85",
        max: "This calculator can only be used by people between the ages 50 and 85"
    },
    gender: {
        required: "Gender must be selected"
    },
    height_feet: {
        required: "Enter height in feet and inches"
    },
    weight: {
        required: "Weight is required",
        min: "Weight must be greater than 50"
    },
    veg_servings: {
        required: "You must specify how many servings of vegetables you had in the past month"
    },
    veg_amount: {
        required: "You must specify the serving size of the vegetables"
    },
    exam: {
        required: "You must specify whether you had a colonoscopy or sigmoidoscopy exam in the last decade"
    },
    polyp: {
        required: "You must specify whther polyps were found during the exam"
    },
    aspirin: {
        required: "You must specify whether you have taken any medications containing asprin in the past month"
    },
    non_aspirin: {
        required: "You must specify whether you have taken any medications not containing asprin in the past month"
    },
    moderate_months: {
        required: "You must specify how many months you have participated in moderate exercise"
    },
    vigorous_months: {
        required: "You must specify how many months you have participated in vigorous exercise"
    },
    "family_cancer": {
        required: "You must specify whether any relatives had colorectal cancer"
    },
    "family_count": {
        required: "You must specify how many relatives had colorectal cancer"
    },
    cigarettes: {
        required: "You must specify whether you have smoked cigarettes"
    },
    cigarettes_num: {
        required: "You must specify the amount of cigarettes you have smoked regularly"
    },
    "smoke_age": {
        required: "You must specify the age you began smoking",
        lessThan: "Cigarette smoking \"start age\" cannot be greater than ACTUAL age. Please select an appropriate age."
    },
    "smoke_now": {
        required: "You must specify whether you currently smoke",
    },
    smoke_quit: {
        required: "You must specify the age at which you last quit smoking",
        lessThan: "Smoking cigarettes \"quit age\" cannot be greater than the ACTUAL age. Please select an appropriate age.",
        greaterThan: "Smoking cigarettes \"quit age\" cannot be less than the smoking cigarettes \"start age\". Please select an appropriate age."
    },
    period: {
        required: "You must specify whether you still have periods"
    },
    last_period: {
        required: "You must specify when you had your last period"
    },
    hormones: {
        required: "You must specify whether you are taking any female hormones"
    }
};
function toggleInputs(input) {
    if ($(input).attr("disabled"))
        $(input).removeAttr('disabled');
    else
        $(input).attr('disabled' ,true);
}

function resetInputs(index, input) {
    switch (input.type) {
        case "radio":
            $("[name='" + input.name + "']").removeAttr('checked');
            break;
        case "checkbox":
            $("[name='" + input.name + "']").removeAttr('checked');
            break;
        case "select":
            $(input).val("");
            break;
        default:
            // statements_def
            break;
   }
}

function invalidForm(e, validator) {
	document.getElementById("errors").scrollIntoView();
	$(document.forms.riskForm).addClass('submitted');
	$("#errors").addClass('alert alert-danger');
}

function processSubmission(form){
	var fd = new FormData(form);

	$.ajax({
		url: form.action,
		type: form.method,
		dataType: 'json',
		processData: false,
		contentType: false,
		data: fd,
	}).done(resultsDisplay)
	.fail(function(xhr, error, textStatus) {
        console.log(xhr, error, textStatus);
		console.log("error");
	})
	.always(function() {
		document.getElementById("errors").scrollIntoView();
	});
}

function resultsDisplay(response, textStatus, xhr) {
	$("#results").addClass('show').html(response.message);
}

function formScrollSpy() {
	var window_top = $(window).scrollTop();

	$.each($("#riskForm section"), function(ind, el) {	
		var div_top = $(el).offset().top;

		if ( window_top > div_top ){
			$("#form-steps li").removeClass('active');
			$("#form-steps li:eq(" + ind + ")").addClass('active');
		}
	});
}

function fixedToTop() {
	var window_top = $(window).scrollTop();
	var div_top = $(document.forms.riskForm).offset().top;

	if ( window_top > div_top )
		$("#form-steps").addClass('fixed');
	else
		$("#form-steps").removeClass('fixed');
}

function toggleFormDisplay(e) {
	e.preventDefault();

	$("#riskForm, #summary, #form-steps").toggleClass(function() {
		if($(this).hasClass('show')) {
			$(this).removeClass('show');
		}
		else {
			$(this).addClass('show');
		}
		return this;
	});
}

function toggleGender(e) {
    var value = $(e.target).val();
    switch (value) {
        case "Male":
            $.each($(".female").find("input, select"), function(index, el) {
                $(el).rules("remove", "required");
            });

            $.each($(".male").find("input, select"), function(index, el) {
                $(el).rules("add", { required: true });
            });

            $(".female").removeClass('show');
            $(".male").addClass('show');
            break;
        case "Female":
            $.each($(".male").find("input, select"), function(index, el) {
            $(el).rules("remove", "required");
            if($("[name='" + el.name + "']").val().length > 0)
                    $("[name='" + el.name + "']").val("");
            });

            $.each($(".female").find("input, select"), function(index, el) {
                $(el).rules("add", { required: true });
            });
            
            $(".male").removeClass('show');
            $(".female").addClass('show');
            break;
        default:
            $(".male, .female").removeClass('show').find("input, select").removeAttr("required");
            $.each($(".male, .female").find("input, select"), function(index, el) {
                $(el).rules("remove", "required");
            });
            break;
    }
}

$(window).scroll(function(e) {
	e.preventDefault();
	fixedToTop();
	formScrollSpy();
});

$(function() {
	$(document).on('click', "[type='reset']", function(e) {
		$(document.forms.riskForm).removeClass('submitted');
		$("#results").empty().removeClass('show');
		$(document.forms.riskForm).validate().resetForm();
		document.getElementById("errors").scrollIntoView();
	});

	$(".toggleTool").on("click", toggleFormDisplay);

	$(document).on('click keypress', ".responseOptions > label.radio", function(e) {
		if ($(e.target).hasClass('radio')) {
			$(e.target).prev().trigger('click');
		}
		else if ($(e.target).parents('.radio')) {
			$(e.target).parents('.radio').prev().trigger('click');
		}
		else {
			if(e.type == "keypress") {
				if ((e.keyCode == 13) || (e.keyCode == 32)){
					$(e.target).children(".radio").prev().trigger('click');
				}
			}
			if(e.type == "click") {
				$(e.target).children('.radio').prev().trigger('click');
			}
		}
	});

	$("button.select").on('click keypress', function(e) {
		if(e.type == "keypress") {
			if ((e.keyCode == 13) || (e.keyCode == 32)) {
				$(e.target).prev().trigger('click');
			}
		}
		if(e.type == "click") {
			$(e.target).prev().trigger('click');
		}
	});

	$("input[name='gender']").on("change", toggleGender);
	$("input[name='race']").on("change", function() {
		// $("form :input").not("[name='race']").removeAttr('disabled');

        switch (this.value) {
            case 1:
                $('#af-notice').addClass('show');
                break;
            case 2:
                $('#as-notice').addClass('show');
                break;
            default:
                return;
        }
        $("#raceModal").modal("show");
	});

    $("input[name='hispanic']").on("change", function (el) {

        if (this.value != "") {
            $.each(document.getElementsByName("race"), resetInputs);

            if (this.value == "0") {
                $("#hisp-notice").addClass("show");
                $("#raceModal").modal("show");
            }

            $.each( $("#riskForm :input").not("[name='" + el.target.name + "']"), function (i, input) {
                toggleInputs(input);
            });

        }

    });

    $("input[name='moderate_months']").on("blur", function () {
        $.each($("#subquestion-moderate-hours").find("select,input"), resetInputs);

        if (this.value > "0") {
            $("#subquestion-moderate-hours").addClass("show");
        }
        else {
            $("#subquestion-moderate-hours").removeClass("show");
        }
    });

    $("input[name='vigorous_months']").on("blur", function () {
        $.each($("#subquestion-vigorous_months").find("select,input"), resetInputs);

        if (this.value > "0") {
            $("#subquestion-vigorous_months").addClass("show");
        } else {
            $("#subquestion-vigorous_months").removeClass("show");
        }
    });

    $("select[name='veg_servings']").on("change", function () {
        $.each($("#subquestion-veg").find("select,input"), resetInputs);

        if (this.value > 0) {
            $("#subquestion-veg").addClass("show");
        } else {
            $("#subquestion-veg").removeClass("show");
        }
    });

    $("select[name='exam']").on("change", function () {
        $.each($("#subquestion-exam").find("select,input"), resetInputs);

        if (this.value == "0") {
            $("#subquestion-exam").addClass("show");
        } else {
            $("#subquestion-exam").removeClass("show");
        }
    });

    $("input[name='smoked']").on("change", function () {
        $.each($("#subquestion-smoke-age").find("select,input"), resetInputs);

        if(this.value == "0"){
            $("#subquestion-smoke-age").addClass("show");
        }
        else {
            $("#subquestion-smoke-age").removeClass("show");
        }
    });

    $("select[name='cigarettes']").on("change", function () {
        $.each($("#subquestion-smoke-age").find("select,input"), resetInputs);

        if (this.value === "0")
            $("#subquestion-smoke-age").addClass("show");
        else {
            $("#subquestion-smoke-age").removeClass("show");
            $("#subquestion-smoke-now").removeClass("show");
            $("#subquestion-smoke-quit").removeClass("show");
        }
    });

    $("select[name='smoke_age']").on("change", function () {
        $.each($("#subquestion-smoke-now").find("select,input"), resetInputs);

        if (this.value >= 6)
            $("#subquestion-smoke-now").addClass("show");
        else
            $("#subquestion-smoke-now").removeClass("show");
    });

    $("input[name='smoke_now']").on("change", function () {
        $.each($("#subquestion-smoke-quit").find("select,input"), resetInputs);

        if (this.value === "0")
            $("#subquestion-smoke-quit").addClass("show");
        else
            $("#subquestion-smoke-quit").removeClass("show");
    });

    $("input[name='period']").on("change", function () {
        $.each($("#subquestion-period, #subquestion-hormones").find("select,input"), resetInputs);

        if (this.value == "0")
            $("#subquestion-period, #subquestion-hormones").removeClass("show");
        else
            $("#subquestion-period").addClass("show");
    });

    $("select[name='last_period']").on("change", function () {
        if (this.value == "2")
            $("#subquestion-hormones").addClass("show");
        else
            $("#subquestion-hormones").removeClass("show");
    });

    $("select[name='family_cancer']").on("change", function () {
        $.each($("#subquestion-family-cancer").find("select,input"), resetInputs);

        if (this.value === "1") {
            $("#subquestion-family-cancer").addClass("show");
        } else {
            $("#subquestion-family-cancer").removeClass("show");
        }
    });


	$(document).on('hidden.bs.tab', 'a[data-toggle="tab"]', function(e) {
		if($("nav.navbar-collapse").hasClass('in'))
			$('button[data-toggle="collapse"]').trigger("click");
	});

	$(document).on('click keypress', 'a#state-listing', function(e) {
		e.preventDefault();
		$("#map, #listings").toggleClass('show');
	});

	$(document).on('click keypress', "#listings > button", function(e) {
		$("#state-listing").trigger('click');
	});

	$(document.forms.riskForm).validate({
		rules: validationRules,
		messages: validationMessages,
		ignore: ".skipValidate",
		errorLabelContainer: '#errors',
		errorContainer: "#errors",
		wrapper: 'p',
		submitHandler: processSubmission,
		invalidHandler: invalidForm
	});

});