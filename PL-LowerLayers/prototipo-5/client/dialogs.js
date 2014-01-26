// Efectos en los dialogos.
$(document).ready(function() {
		$( "#dialog_birthdate" ).dialog({
      		autoOpen: false,
     		show: {
        		effect: "blind",
        		duration: 300
      		},
     		hide: {
      			effect: "explode",
				duration: 200
			}
    	});

		$( "#dialog_nomatches" ).dialog({
      		autoOpen: false,
     		show: {
        		effect: "blind",
        		duration: 300
      		},
     		hide: {
      			effect: "explode",
				duration: 200
			}
    	});

		$( "#dialog_password" ).dialog({
      		autoOpen: false,
     		show: {
        		effect: "blind",
        		duration: 300
      		},
     		hide: {
      			effect: "explode",
				duration: 200
			}
    	});

		$( "#dialog_fullmatch" ).dialog({
      		autoOpen: false,
     		show: {
        		effect: "blind",
        		duration: 300
      		},
     		hide: {
      			effect: "explode",
				duration: 200
			}
    	});

		$( "#dialog_matchname" ).dialog({
      		autoOpen: false,
     		show: {
        		effect: "blind",
        		duration: 300
      		},
     		hide: {
      			effect: "explode",
				duration: 200
			}
    	});

		$( "#dialog_threeplayers" ).dialog({
      		autoOpen: false,
     		show: {
        		effect: "blind",
        		duration: 300
      		},
     		hide: {
      			effect: "explode",
				duration: 200
			}
    	});

		$( "#dialog_noadmin" ).dialog({
      		autoOpen: false,
     		show: {
        		effect: "blind",
        		duration: 300
      		},
     		hide: {
      			effect: "explode",
				duration: 200
			}
    	});

		$( "#dialog_nouser" ).dialog({
      		autoOpen: false,
     		show: {
        		effect: "blind",
        		duration: 300
      		},
     		hide: {
      			effect: "explode",
				duration: 200
			}
    	});

		$( "#dialog_nogameplayed" ).dialog({
      		autoOpen: false,
     		show: {
        		effect: "blind",
        		duration: 300
      		},
     		hide: {
      			effect: "explode",
				duration: 200
			}
    	});

		$( "#dialog_thisnoplayed" ).dialog({
      		autoOpen: false,
     		show: {
        		effect: "blind",
        		duration: 300
      		},
     		hide: {
      			effect: "explode",
				duration: 200
			}
    	});

		// Error deps autoFlush: si quito esta funcion, quito todos los divs o cambio las refs
		// del id desaparece, pero si quito el div correspondiente no
		$( "#dialog_bademail" ).dialog({
      		autoOpen: false,
     		show: {
        		effect: "blind",
        		duration: 300
      		},
     		hide: {
      			effect: "explode",
				duration: 200
			}
    	});

		$("#datepickerprof_dialog").datepicker({
			dateFormat: "dd/mm/yy",
			changeMonth: true,
			changeYear: true,
			yearRange: '1955:2020',
			maxDate: new Date(),
			showOn: "button",
			buttonImage: "Calendar-icon.gif",
			buttonImageOnly: true
		});
});
