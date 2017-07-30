from django.core.mail import EmailMessage
from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.template import Context
from django.template.loader import get_template

from .forms import ContactForm
from personal_site import secret_settings

def index(request):
    """Handle form submission, or just return the landing page template."""
    # Send email on form POST requests
    if request.method == 'POST':
        form = ContactForm(data=request.POST)

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
            # import pdb; pdb.set_trace()
            content = template.render(context)

            email = EmailMessage(
                'New contact form submission',
                content,
                'Personal site' + '',
                [secret_settings.PERSONAL_EMAIL],
                headers = {'Reply-To': contact_email},
            )
            email.send()
            return redirect('/')
    # Not a form submission - return the template
    else:
        form = ContactForm()

    return render(request, 'homepage/index.html', {'form': form})

def bio(request):
    return render(request, 'homepage/bio.html')
