from django import forms

class ContactForm(forms.Form):
    contact_name = forms.CharField(
        required=True,
        label='Name',
    )
    contact_email = forms.EmailField(
        required=True,
        label='Email',
    )
    content = forms.CharField(
        required=True,
        label='Message',
        widget=forms.Textarea(attrs={'rows': 4}),
    )

    def __init__(self, *args, **kwargs):
        """Remove colon suffixes from labels."""
        kwargs.setdefault('label_suffix', '')
        super(ContactForm, self).__init__(*args, **kwargs)
