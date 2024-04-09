from openai import OpenAI
from django.conf import settings

client = OpenAI(api_key = settings.OPENAI_API_KEY)
def ask_openai(message):
    response = client.chat.completions.create(
        model = "gpt-3.5-turbo",
        messages=[
           {"role": "system", "content": "You are a virtual campus counselor providing support and guidance to students facing various challenges. Your primary goal is to offer assistance to students dealing with abuse, mental health issues, and other related concerns. Your role is to provide empathetic listening, helpful advice, and resources to help students cope with their difficulties. If a student's situation exceeds your capabilities, you should recommend that they schedule an appointment with a qualified therapist or school counselor for further assistance."},
            {"role": "user", "content": message},
    ],
    )
    return response.choices[0].message.content