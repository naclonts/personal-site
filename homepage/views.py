from django.core.mail import EmailMessage
from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.template import Context
from django.template.loader import get_template

from .forms import ContactForm
from personal_site import secret_settings

def index(request):
    """Return the landing page template."""
    # Include email contact form
    form = ContactForm()
    return render(request, 'homepage/index.html', {'form': form})

def bio(request):
    return render(request, 'homepage/bio.html')


def send_email(request):
    """
    View that sends an email to site's admin. Returns a message in response,
    indicating successfulness.
    """
    # Send email on form POST requests
    if request.method == 'POST':
        form = ContactForm(data=request.POST)

        # Process the email if good
        if form.is_valid():
            contact_name = request.POST.get('contact_name', '')
            contact_email = request.POST.get('contact_email', '')
            form_content = request.POST.get('content', '')

            template = get_template('contact_template.txt')
            context = {
                'contact_name': contact_name,
                'contact_email': contact_email,
                'form_content': form_content,
            }

            content = template.render(context)

            email = EmailMessage(
                'New contact form submission',
                content,
                'Personal site' + '',
                [secret_settings.PERSONAL_EMAIL],
                headers = {'Reply-To': contact_email},
            )
            email.send()
            message = 'Email successfully sent.'

        # Form wasn't valid
        else:
            message = 'There was an issue with the form submission. Please try again.'

    # Non-POST requests
    else:
        message = 'It looks like the request was submitted incorrectly. Note that only POST requests are valid for this URL.'

    return HttpResponse(message)
