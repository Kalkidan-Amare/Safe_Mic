import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.probability import FreqDist
from heapq import nlargest

# Download NLTK resources
nltk.download('punkt')
nltk.download('stopwords')

def preprocess_text(text):
    """
    Preprocess the text: Tokenization, removing stopwords, and stemming.
    """
    stop_words = set(stopwords.words('english'))
    words = word_tokenize(text.lower())
    filtered_words = [word for word in words if word.isalnum() and word not in stop_words]
    return filtered_words

def get_sentence_scores(sentence_list, word_freq):
    """
    Calculate the score of each sentence based on word frequency.
    """
    sentence_scores = {}

    for sentence in sentence_list:
        word_count_in_sentence = len(word_tokenize(sentence))
        for word in word_tokenize(sentence.lower()):
            if word in word_freq.keys():
                if sentence not in sentence_scores.keys():
                    sentence_scores[sentence] = word_freq[word]
                else:
                    sentence_scores[sentence] += word_freq[word]
        if sentence in sentence_scores:
            sentence_scores[sentence] = sentence_scores[sentence] / word_count_in_sentence

    return sentence_scores

def summarize(text, num_sentences=10):
    """
    Summarize the text.
    """
    sentences = sent_tokenize(text)
    filtered_words = preprocess_text(text)
    word_freq = FreqDist(filtered_words)
    sentence_scores = get_sentence_scores(sentences, word_freq)
    summary_sentences = nlargest(num_sentences, sentence_scores, key=sentence_scores.get)
    summary = ' '.join(summary_sentences)
    return summary

