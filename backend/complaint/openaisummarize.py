from django.conf import settings
from openai import OpenAI

client = OpenAI(api_key=settings.OPENAI_API_KEY)

def refine_summary(summary):
    """
    Refine the summary using OpenAI's GPT.
    """
    # Define the prompt for GPT to refine the summary
    prompt =f"Refine the following summary:\n{summary}"

    # Generate refined summary using GPT-3
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Students have submitted complaints regarding various issues such as grade discrepancies, bullying incidents, and other concerns. These complaints detail the specific grievances and requests for resolution. For example, students have reported inconsistencies in grading criteria application, computational errors in grade calculations, and unwarranted deductions on assignments. They seek collaborative reviews of grading criteria, clarification on deductions, and reassessment of their work. Generate a summary of these complaints and the corresponding requests for resolution"},
            {"role": "user", "content": prompt},
        ],
    )

    # Extract the refined summary from GPT's response
    refined_summary = response.choices[0].message.content.strip()

    return refined_summary
