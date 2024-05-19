from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import EmailMessage
from django.utils.translation import gettext_lazy as _
from djoser import utils
from templated_mail.mail import BaseEmailMessage

class ActivationEmail(BaseEmailMessage):
    template_name = "accounts/activation_email.html"

    def get_context_data(self):
        # ActivationEmail can be deleted
        context = super().get_context_data()

        user = context.get("user")
        context["uid"] = utils.encode_uid(user.pk)
        context["token"] = default_token_generator.make_token(user)
        context["url"] = settings.ACTIVATION_URL
        context['email']=user.email
        return context