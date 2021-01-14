document.addEventListener('DOMContentLoaded', function(e) {
  FormValidation.formValidation(
      document.getElementById('submitform'), {
        fields: {
          title: {
            validators: {
              notEmpty: {
                message: 'The title is required'
              },
              stringLength: {
                min: 6,
                max: 80,
                message: 'The title must be more than 6 and less than 80 characters long'
              }
            }
          },
          author: {
            validators: {
              notEmpty: {
                message: 'The author name is required'
              }
            }
          },
          time: {
            validators: {
              notEmpty: {
                message: 'The case year is required'
              },
              numeric: {
                message: 'The case year must be a number'
              }
            }
          },
          source: {
            validators: {
              notEmpty: {
                message: 'The source link is required'
              }
            }
          },
          description: {
            validators: {
              notEmpty: {
                message: 'The description is required'
              }
            }
          },
          email: {
            validators: {
              notEmpty: {
                message: 'Your email is required'
              },
              emailAddress: {
                message: 'Your email address is not valid'
              }
            }
          },
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          bulma: new FormValidation.plugins.Bulma(),
          submitButton: new FormValidation.plugins.SubmitButton(),
          // defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
          icon: new FormValidation.plugins.Icon({
            valid: 'fa fa-check',
            invalid: 'fa fa-times',
            validating: 'fa fa-refresh'
          }),
        },
      }
    )
    .on('core.form.valid', function() {
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
      
      const form = document.forms['submit-to-google-sheet']
      const message = document.getElementById("sucessMessage")

      document.getElementById('SubmitTime').value = dateTime;
      console.log(dateTime);

      e.preventDefault()
      fetch('https://script.google.com/macros/s/AKfycbyzpPCI0oOoWzR4SkPyN1AZikzvrMCMUekYZ1CKOTp1ZCyrxUc/exec', {
          method: 'POST',
          body: new FormData(form)
        })
        .then(function(response) {
          console.log('Success!', response)
        })
        .catch(function(error) {
          console.error('Error!', error.message)
        })

        form.remove()

        message.classList.remove("is-invisible")

    });
});
